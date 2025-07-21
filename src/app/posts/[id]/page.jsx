import Link from "next/link";

async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The post you're looking for doesn't exist.
          </p>
          <Link
            href="/all-blogs"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[40vh] py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-100 opacity-80 blur-2xl animate-gradient" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-full text-lg font-semibold mb-6 animate-fadeInUp">
            Post #{post.id}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight animate-fadeInUp">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 animate-fadeInUp">
            Posted by: User ID #{post.userId}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/all-blogs"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to All Blogs
            </Link>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
