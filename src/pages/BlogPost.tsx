import { useParams, Link } from "react-router-dom";
import { posts } from "../blog/posts";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <div className="mx-auto max-w-[720px] px-4 py-16 text-center"><div className="text-sm font-bold">Post not found</div><Link to="/blog" className="text-sm font-extrabold underline">Back to blog</Link></div>;
  return (
    <div className="bg-[#BFE6F7]/14 border-b border-[#A6D8F0]/25">
      <div className="mx-auto max-w-[720px] px-4 py-10 md:px-6">
      <Link to="/blog" className="inline-flex items-center gap-1 rounded-full border border-[#E9E7F5] bg-white px-3 py-1.5 text-xs font-bold hover:bg-[#F2F3F8]"><ArrowLeft size={12} /> Blog</Link>
      <div className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#8A8EA6]"><span className="rounded-full bg-[#F2F3F8] border px-2 py-1 text-[#1A1E2E]">{post.tag}</span> {post.date} · {post.read}</div>
      <h1 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[36px]">{post.title}</h1>
      <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[#8A8EA6]">{post.excerpt}</p>
      <article className="prose max-w-none mt-6 whitespace-pre-line rounded-[20px] border border-[#E9DEF8] bg-white p-6 text-[15px] font-semibold leading-relaxed text-[#1A1E2E] shadow-cute">
        {post.content.trim()}
      </article>
      <div className="mt-6 flex gap-3">
        <Link to="/tracker" className="rounded-full bg-[#C9B6FF] px-5 py-2.5 text-sm font-extrabold text-[#111827] hover:bg-[#B8A6F0]">Track your week</Link>
        <Link to="/blog" className="rounded-full border border-[#E9E7F5] bg-white px-5 py-2.5 text-sm font-bold hover:bg-[#F2F3F8]">More posts</Link>
      </div>
      </div>
    </div>
  );
}
