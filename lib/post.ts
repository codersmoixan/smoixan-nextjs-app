import { PostsByMonth, Post } from '@/types/post';
import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getPosts(): Promise<{ posts: Post[]; postsByMonth: PostsByMonth }> {
  const postsDirectory = path.join(process.cwd(), ...(['content', 'posts']))
  let filenames = await fs.promises.readdir(postsDirectory)
  filenames = filenames.reverse()

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.promises.readFile(fullPath, 'utf8')

      const { data, content } = matter(fileContents)
      const month = dayjs(data.date).format('YYYY-MM-DD').slice(0, 7);

      return {
        id: month,
        metadata: data, // slug/url title date
        title: data.title,
        slug: data.slug,
        content,
      }
    })
  )

  // Group by month
  const postsByMonth: PostsByMonth = posts.reduce((acc: PostsByMonth, post: Post) => {
    const month = dayjs(post.metadata.date).format('YYYY-MM-DD').slice(0, 7);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(post);
    return acc;
  }, {});

  return {
    posts,
    postsByMonth
  }
}
