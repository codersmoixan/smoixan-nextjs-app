import Comments from "@/components/Comments";
import TOC from "@/components/TOC";
import MDXComponents from "@/components/mdx/MDXComponents";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/post";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Props = {
  params: {
    slug: string;
  };
};

const options = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          defaultLang: {
            block: "typescript",
            inline: "javascript",
          },
          theme: "github-light",
        },
      ],
    ],
  },
};

export const revalidate = 60;

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const { posts }: { posts: Post[] } = await getPosts();
  const post: Post | undefined = posts.find(
    (post) => post.metadata.slug === slug
  );

  return {
    ...siteConfig,
    title: `${post?.metadata.title || "404"} | ${siteConfig.name}`,
    openGraph: {
      ...siteConfig.openGraph,
      title: `${post?.metadata.title || "404"} | ${siteConfig.name}`,
    },
    twitter: {
      ...siteConfig.twitter,
      title: `${post?.metadata.title || "404"} | ${siteConfig.name}`,
    },
  };
}

export default async function PostDetailsPage({ params }: any) {
  const { slug } = await params;
  const { posts }: { posts: Post[] } = await getPosts();
  const postIndex = posts.findIndex((post) => post.metadata.slug === slug);
  const post = posts[postIndex];
  // Reverse list order, thus invert condition check
  const nextPost = postIndex - 1 >= 0 ? posts[postIndex - 1] : null;
  const prevPost = postIndex + 1 < posts.length ? posts[postIndex + 1] : null;

  if (!post) {
    notFound();
  }

  const { content, metadata } = post;

  return (
    <div
      className="flex flex-row w-full pt-0 max-w-[1280px]"
      style={{ fontFamily: "var(--post-font)" }}
    >
      <div className="w-full md:w-4/5 px-6">
        <article id={`article`}>
          <div className="flex gap-2 align-bottom mt-4 mb-8">
            <h1 className="my-0">{metadata.title}</h1>
            <span className="text-sm text-blue-500 border rounded-sm p-1 border-blue-500 h-fit leading-none">
              {post.type}
            </span>
          </div>
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={options as any}
          />
        </article>
        <div className="my-12 border-dashed border-gray-300 border-t" />
        <div className="w-full flex gap-4 flex-col sm:flex-row mb-6">
          {prevPost ? (
            <Link
              href={prevPost.metadata.slug}
              className="link-none w-1/2 rounded-md p-4 border border-gray-100 hover:border-blue-500 flex flex-col justify-space-between gap-6 hover:text-blue-500 bg-white"
            >
              <span className="text-sm">上一篇</span>
              <span className="text-sm">{prevPost.title}</span>
            </Link>
          ) : (
            <></>
          )}
          {nextPost ? (
            <Link
              href={nextPost.metadata.slug}
              className="link-none w-1/2 text-gray-500 rounded-md p-4 border border-gray-100 hover:border-blue-500 flex flex-col justify-space-between gap-6 hover:text-blue-500 bg-white"
            >
              <span className="text-sm">下一篇</span>
              <span className="text-sm">{nextPost.title}</span>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="text-sm text-gray-500">
          发布时间：{dayjs(metadata.date).format("YYYY-MM-DD")}
        </div>
        <Comments />
      </div>
      <div className="hidden md:flex flex-col justify-start md:w-1/5 pr-6">
        <TOC />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { posts }: { posts: Post[] } = await getPosts();

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}
