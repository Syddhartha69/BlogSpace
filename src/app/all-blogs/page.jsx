import SearchBar from "../../components/SearchBar";
import Link from "next/link";

// This page displays all blogs with search and pagination functionality

// --- AllBlogs Page Component Start ---

async function getPosts(page = 1, limit = 9) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(posts.length / limit),
  };
}

export default async function AllBlogs({ searchParams }) {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || "";
  const { posts, totalPages } = await getPosts(currentPage);

  // Filter posts if there's a search query
  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[40vh] py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-100 opacity-80 blur-2xl animate-gradient" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight animate-fadeInUp">
            Explore All Blogs
          </h1>
          <p className="text-xl text-gray-600 animate-fadeInUp">
            Discover stories, ideas, and expertise from writers on any topic
          </p>
        </div>
      </section>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar />
      </div>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 animate-fadeInUp">
            <span className="text-2xl font-bold text-gray-800 mb-4">
              Requested post is unavailable.
            </span>
            <span className="text-gray-600">
              Please check your requested search and try again
            </span>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-indigo-600">
                      Post #{post.id}
                    </span>
                    <span className="text-sm text-gray-600">
                      Posted by: User ID #{post.userId}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
                  <Link
                    href={`/posts/${post.id}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors font-medium group-hover:gap-2"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2 items-center">
          {/* Previous Button */}
          <Link
            href={`/all-blogs?page=${Math.max(1, currentPage - 1)}${
              searchQuery ? `&search=${searchQuery}` : ""
            }`}
            className={`px-3 py-2 rounded-lg font-bold text-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          >
            {"<"}
          </Link>

          {/* First Page */}
          <Link
            href={`/all-blogs?page=1${
              searchQuery ? `&search=${searchQuery}` : ""
            }`}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            1
          </Link>

          {/* Show 2, 3, 4 if on first pages, or ellipsis if not */}
          {currentPage <= 3 && totalPages > 1 && (
            <>
              {totalPages >= 2 && (
                <Link
                  href={`/all-blogs?page=2${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 2
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  2
                </Link>
              )}
              {totalPages >= 3 && (
                <Link
                  href={`/all-blogs?page=3${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 3
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  3
                </Link>
              )}
              {/* Show page 4 if on page 3 */}
              {currentPage === 3 && totalPages >= 4 && (
                <Link
                  href={`/all-blogs?page=4${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 4
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  4
                </Link>
              )}
              {((currentPage < 3 && totalPages > 3) ||
                (currentPage === 3 && totalPages > 4)) && (
                <span className="px-2">...</span>
              )}
            </>
          )}

          {/* Middle pages with ellipsis */}
          {currentPage > 3 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2">...</span>
              <Link
                href={`/all-blogs?page=${currentPage - 1}${
                  searchQuery ? `&search=${searchQuery}` : ""
                }`}
                className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100"
              >
                {currentPage - 1}
              </Link>
              <Link
                href={`/all-blogs?page=${currentPage}${
                  searchQuery ? `&search=${searchQuery}` : ""
                }`}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                {currentPage}
              </Link>
              <Link
                href={`/all-blogs?page=${currentPage + 1}${
                  searchQuery ? `&search=${searchQuery}` : ""
                }`}
                className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100"
              >
                {currentPage + 1}
              </Link>
              <span className="px-2">...</span>
            </>
          )}

          {/* Last 3 pages if near the end */}
          {currentPage >= totalPages - 2 && totalPages > 3 && (
            <>
              <span className="px-2">...</span>
              {totalPages > 3 && (
                <Link
                  href={`/all-blogs?page=${totalPages - 2}${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages - 2
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {totalPages - 2}
                </Link>
              )}
              {totalPages > 2 && (
                <Link
                  href={`/all-blogs?page=${totalPages - 1}${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages - 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {totalPages - 1}
                </Link>
              )}
            </>
          )}

          {/* Last Page (always show if more than 1 page) */}
          {totalPages > 1 && (
            <Link
              href={`/all-blogs?page=${totalPages}${
                searchQuery ? `&search=${searchQuery}` : ""
              }`}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </Link>
          )}

          {/* Next Button */}
          <Link
            href={`/all-blogs?page=${Math.min(totalPages, currentPage + 1)}${
              searchQuery ? `&search=${searchQuery}` : ""
            }`}
            className={`px-3 py-2 rounded-lg font-bold text-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
          >
            {">"}
          </Link>
        </div>
      </section>
    </div>
  );
}

// --- AllBlogs Page Component End ---
