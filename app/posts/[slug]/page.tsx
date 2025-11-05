import Comments from "@/components/Comments";
import TOC from "@/components/TOC";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Separator } from "@/components/ui/separator";
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

  console.log(content, "content");

  return (
    <div
      className="flex flex-row w-full pt-0 max-w-[1280px]"
      style={{ fontFamily: "var(--post-font)" }}
    >
      <div className="w-full md:w-4/5 px-6">
        <article id={`article`}>
          <h1>{metadata.title}</h1>
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={options as any}
          />
        </article>
        <Separator className="my-12 bg-gray-600" />
        <div className="flex justify-between">
          <div>发布时间：{dayjs(metadata.date).format("YYYY-MM-DD")}</div>
          <div className="flex gap-2 flex-col sm:flex-row">
            {prevPost ? (
              <Link href={prevPost.metadata.slug} className="link-underline">
                上一篇
              </Link>
            ) : (
              <></>
            )}
            {nextPost ? (
              <Link href={nextPost.metadata.slug} className="link-underline">
                下一篇
              </Link>
            ) : (
              <></>
            )}
            <Link href="/" className="link-underline">
              去首页
            </Link>
            <Link
              href="https://twitter.com/weijunext/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="link-underline"
            >
              Twitter/X
            </Link>
          </div>
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
