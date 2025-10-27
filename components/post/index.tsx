import { IconHash } from '@tabler/icons-react'

import Link from 'next/link'
import Block from '@/components/ui/block'
import { type Post as PostSlug } from "@/types/post";

interface PostProps {
  post: PostSlug
}

export default async function Post({ post }: PostProps) {

  return (
    <Block
      className='group grid grid-rows-[1fr_min-content_2fr] bg-gradient-to-b from-surface-1 to-white dark:bg-[linear-gradient(rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_100%)] max-lg:p-2 max-md:row-span-2 max-sm:col-span-2 max-sm:row-span-1 xl:grid-rows-[1fr_min-content_2fr_auto]'
      data-type='posts'
    >
      <div className='row-span-4 grid grid-rows-subgrid gap-1 xl:gap-2'>
        <Link
          aria-label={`Post ${post.title}`}
          className='relative flex items-center text-balance text-sm font-bold lg:text-base xl:text-xl'
          href={`/posts/${post.slug}`}
        >
          <h2>
            {post.title}
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {/*{firstLabel && (*/}
            {/*  <i*/}
            {/*    className='absolute -bottom-1 left-1 block h-1 w-1/3 opacity-80'*/}
            {/*    style={{ background: `#${firstLabel.color}` }}*/}
            {/*  />*/}
            {/*)}*/}
          </h2>
        </Link>
        {/*<p className='mt-1 truncate text-color-2'>*/}
        {/*  {labels.nodes.map(node => (*/}
        {/*    <Link*/}
        {/*      key={node.id}*/}
        {/*      aria-label={`Tag ${node.name}`}*/}
        {/*      className='relative inline-flex items-center px-1 text-xs underline-offset-1 before:absolute before:-inset-x-0 before:-inset-y-4 before:content-["_"] after:content-[",_"] first:pl-0 last:after:content-none hover:underline'*/}
        {/*      href={`/tags/${node.name}`}*/}
        {/*    >*/}
        {/*      <IconHash className='size-2.5' />*/}
        {/*      {node.name}*/}
        {/*    </Link>*/}
        {/*  ))}*/}
        {/*</p>*/}
        <p className='text-xs dark:text-color-4 xl:text-sm'>{post.content?.slice(0, 30)}</p>
        <p className='flex justify-end max-xl:hidden'>
          <Link
            aria-label={`Read more about ${post.title}`}
            className='translate-y-2 items-center rounded-full border bg-surface px-2.5 py-1.5 font-semibold opacity-0 outline-offset-4 ring-surface-3 transition-all duration-700 ease-out hover:scale-105 hover:border-transparent hover:ring-4 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100'
            href={`/posts/${post.slug}`}
          >
            Read more <span className='sr-only'>about {post.title}</span>
          </Link>
        </p>
      </div>
    </Block>
  )
}
