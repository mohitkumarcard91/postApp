import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { POSTS_URL } from "@/constant/config";

type Post = {
  id: number;
  title: string;
  body: string;
};

const PostPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(state || null);
  const [loading, setLoading] = useState(!state);

  useEffect(() => {
    if (id) {
      axios
       .get(`${POSTS_URL}/posts/${id}`)

        .then((res) => setPost(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading post...
      </div>
    );

  if (!post) return null;

  return (
    <div className="flex-1 h-full overflow-y-hidden min-h-screen bg-slate-600 px-6 py-10 text-white">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-sm text-amber-400 hover:underline"
        >
          ← Back to posts
        </Link>

        <div className="rounded-2xl bg-slate-500 p-8 shadow-lg border border-slate-600">
          <h1 className="flex flex-col sm:flex-row gap-1 sm:gap-2 leading-tight">
            <label className="text-lg sm:text-2xl font-semibold">Title:</label>
            <p className="text-base sm:text-[20px] font-normal break-words">
              {post.title}
            </p>
          </h1>

          <div className="mt-4 h-px bg-zinc-800" />

          <p className="mt-6 text-zinc-300 leading-relaxed">{post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
