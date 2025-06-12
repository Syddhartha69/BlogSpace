"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// This page allows users to create, view, and delete their own blogs

// BlogModal component (adapted for local blogs)
const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-white/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp">
        <div className="relative h-64 md:h-80">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="object-contain p-6 bg-gray-50 rounded-t-2xl w-full h-full"
              style={{ maxHeight: "320px", objectFit: "contain" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-t-2xl p-6">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 bg-white/80 hover:bg-gray-200 rounded-full p-2 shadow transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
              {blog.category}
            </span>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{blog.date ? new Date(blog.date).toLocaleString() : ""}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {blog.content.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function YourBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "general",
    image: null,
    imageUrl: "",
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      id: Date.now(),
      ...newBlog,
      date: new Date().toISOString(),
    };
    setBlogs([blog, ...blogs]);
    setNewBlog({
      title: "",
      content: "",
      category: "general",
      image: null,
      imageUrl: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewBlog((prev) => ({ ...prev, image: file, imageUrl }));
    }
  };

  const handleRemoveImage = () => {
    setNewBlog((prev) => ({ ...prev, image: null, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Animation styles
  const fadeInUp = {
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards",
  };
  const scaleIn = {
    opacity: 0,
    transform: "scale(0.96)",
    animation: "scaleIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[40vh] py-16 text-center overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-100 opacity-80 blur-2xl" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
            style={fadeInUp}
          >
            Your Personal Blog Space
          </h1>
          <p className="text-xl text-gray-600" style={fadeInUp}>
            Share your thoughts and stories with the world
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* New Blog Form */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fadeInUp"
          style={scaleIn}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Create New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={newBlog.category}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-gray-700 font-semibold mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-semibold mb-2"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white"
              />
              {newBlog.imageUrl && (
                <div className="mt-4 flex justify-center relative">
                  <img
                    src={newBlog.imageUrl}
                    alt="Preview"
                    className="object-contain h-48 w-full rounded-xl bg-gray-50 shadow"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1 shadow-md transition"
                    aria-label="Remove image"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-all shadow-lg"
            >
              Publish Blog
            </button>
          </form>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animate-fadeInUp relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setSelectedBlog(blog)}
                className="w-full text-left"
              >
                <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    {blog.imageUrl ? (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="object-contain max-w-full max-h-full"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full shadow">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>
                      {blog.date ? new Date(blog.date).toLocaleString() : ""}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content.length > 120
                      ? blog.content.slice(0, 120) + "..."
                      : blog.content}
                  </p>
                  <div className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(blog.id);
                }}
                className="absolute top-4 right-4 bg-white/80 hover:bg-red-100 text-gray-700 hover:text-red-600 rounded-full p-2 shadow transition-colors"
                aria-label="Delete blog"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        {/* Blog Modal */}
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      </section>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: left;
          }
          50% {
            background-position: right;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
}

// --- YourBlogs Page Component End ---
