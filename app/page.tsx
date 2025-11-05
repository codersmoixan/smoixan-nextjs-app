import { getPosts } from "@/lib/post";
import { Post, PostsByMonth } from "@/types/post";

export default async function Home() {
  const { posts, postsByMonth }: { posts: Post[]; postsByMonth: PostsByMonth } =
    await getPosts();

  return (
    <div className="flex flex-col w-full gap-6 items-center justify-center flex-1">
      <span className="text-xl">嗨，我是 zhengji.su</span>
      <span className="text-center text-[32px] font-bold">
        一个Web开发者 · 写点前端也会写点后端 · 闲暇之余也会写一点客户端
      </span>
      <span className="text-center text-xl">
        我喜欢学习新的技术和框架，目前在一家跨境电商担任开发工程师。
      </span>
    </div>
  );
}
