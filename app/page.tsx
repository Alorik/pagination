"use client";

import { useState, useEffect} from "react";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/posts?page=${page}&limit=${limit}`);
      const data = await res.json();
      setPosts(data.data);
      setTotalPages(data.totalPages);
    }
    fetchPosts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">📜 Paginated Posts</h1>
      <div className="grid gap-4 w-full max-w-xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow p-4 rounded-lg border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
      {/* pagination control */}
      <div className="flex gap-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ⬅️ Prev
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page===totalPages}
        >Next ➡️</button>
      </div>
    </div>
  );
}
