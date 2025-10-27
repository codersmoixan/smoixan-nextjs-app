# syntax=docker.io/docker/dockerfile:1

# 基础镜像，适用于 Node.js 20 的 Alpine 镜像
FROM node:20-alpine AS base

# 安装构建依赖，仅在需要时安装 libc6-compat 依赖
RUN apk add --no-cache libc6-compat

# 工作目录设置为 /app
WORKDIR /app

# 安装构建依赖并锁定包版本
FROM base AS deps
# 将 package.json 和 lock 文件复制到容器中
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# 安装依赖
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 构建镜像，创建 Next.js 构建产物
FROM base AS builder
WORKDIR /app
# 从 deps 镜像复制 node_modules 文件夹
COPY --from=deps /app/node_modules ./node_modules
# 将源代码复制到容器中
COPY . .
# 执行构建
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 生产环境镜像，仅包含生产运行所需的文件
FROM base AS runner
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# 创建并使用非 root 用户运行容器
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 将构建好的文件复制到生产镜像
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 设置默认用户为 nextjs，确保容器以非 root 用户运行
USER nextjs

# 暴露应用运行的端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["node", "server.js"]
