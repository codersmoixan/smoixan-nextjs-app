import Post from "@/components/post";
import { Grid } from "@/components/ui/grid";
import { getPosts } from "@/lib/post";
import { type Post as PostSlug } from "@/types/post";

export default async function Posts() {
  const { posts }: { posts: PostSlug[] } = await getPosts();

  return (
    <Grid>
      {posts.map((post) => (
        <Post key={post.metadata.slug} post={post} />
      ))}
    </Grid>
  );
}
