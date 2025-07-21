"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Animation styles
const fadeInUp = {
  opacity: 0,
  transform: "translateY(20px)",
  animation: "fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards",
};
const fadeIn = {
  opacity: 0,
  animation: "fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards",
};
const scaleIn = {
  opacity: 0,
  transform: "scale(0.96)",
  animation: "scaleIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
};
const slideIn = {
  opacity: 0,
  transform: "translateX(-20px)",
  animation: "slideIn 0.6s ease-out forwards",
};
const floatAnimation = {
  animation: "float 6s ease-in-out infinite",
};
const shimmerAnimation = {
  background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 2s infinite",
};

// Custom blog data
const hotBlogs = [
  {
    id: 1,
    title: "Building Modern Web Apps with Next.js and React",
    excerpt:
      "Discover how Next.js and React are revolutionizing web development with server-side rendering, static generation, and seamless client-side navigation.",
    content: `Next.js and React have transformed the way we build modern web applications. With Next.js's powerful features like server-side rendering (SSR) and static site generation (SSG), developers can create blazing-fast applications that are SEO-friendly and provide an excellent user experience.

Key benefits of using Next.js with React:
- Server-side rendering for improved performance and SEO
- Automatic code splitting for faster page loads
- Built-in API routes for backend functionality
- File-system based routing
- Hot module replacement for faster development

The combination of Next.js and React provides a robust foundation for building scalable web applications. Whether you're building a small blog or a large-scale enterprise application, this stack offers the tools and features you need to succeed.`,
    image: "/images/Nextjs.png",
    category: "Web Development",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "MongoDB: The Future of Database Management",
    excerpt:
      "Explore how MongoDB's flexible document model and powerful querying capabilities are changing the way we store and manage data in modern applications.",
    content: `MongoDB has revolutionized database management with its flexible document model and powerful features. As a NoSQL database, MongoDB offers unparalleled flexibility and scalability for modern applications.

Key features of MongoDB:
- Document-based storage for flexible data modeling
- Horizontal scalability through sharding
- Rich querying capabilities
- Built-in support for geospatial queries
- Automatic failover and high availability

MongoDB's document model allows developers to store data in a way that's natural and intuitive, making it easier to work with complex data structures. The database's ability to scale horizontally makes it an excellent choice for applications that need to handle large amounts of data and high traffic.`,
    image: "/images/MongoDB.png",
    category: "Database",
    readTime: "4 min read",
  },
];

const featuredStories = [
  {
    id: 3,
    title: "Getting Started with React: A Comprehensive Guide",
    excerpt:
      "Learn the fundamentals of React, from components and props to hooks and state management. Perfect for beginners and intermediate developers.",
    content: `React has become the go-to library for building modern user interfaces. This comprehensive guide will help you understand the core concepts and best practices of React development.

Key topics covered:
- Components and props
- State management with hooks
- React Router for navigation
- Context API for global state
- Performance optimization techniques

Whether you're new to React or looking to deepen your understanding, this guide provides practical examples and real-world scenarios to help you master React development.`,
    image: "/images/React.png",
    category: "Frontend",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Vite: The Next Generation Frontend Tooling",
    excerpt:
      "Why Vite is becoming the preferred choice for modern web development, offering lightning-fast hot module replacement and optimized builds.",
    content: `Vite is revolutionizing frontend development with its lightning-fast build times and excellent developer experience. Built on top of modern web standards, Vite provides a development server that's significantly faster than traditional bundlers.

Key advantages of Vite:
- Instant server start
- Lightning-fast hot module replacement
- Optimized production builds
- Built-in TypeScript support
- Framework-agnostic architecture

Vite's architecture leverages native ES modules in the browser, eliminating the need for bundling during development. This results in a much faster development experience and more efficient production builds.`,
    image: "/images/Vite.png",
    category: "Development Tools",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "VS Code: Essential Extensions for Web Developers",
    excerpt:
      "Boost your productivity with these must-have VS Code extensions for web development, debugging, and code quality.",
    content: `Visual Studio Code has become the preferred code editor for web developers worldwide. With its extensive ecosystem of extensions, VS Code can be customized to enhance your development workflow.

Essential extensions for web developers:
- ESLint for code quality
- Prettier for code formatting
- GitLens for enhanced Git integration
- Live Server for local development
- JavaScript and TypeScript support

These extensions can significantly improve your productivity and code quality. Learn how to configure and use them effectively in your development workflow.`,
    image: "/images/VSCode.png",
    category: "Development Tools",
    readTime: "3 min read",
  },
];

// Blog Modal Component
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
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-contain p-6 bg-gray-50 rounded-t-2xl"
          />
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
            <span>{blog.readTime}</span>
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

// --- Home Page Component Start ---
// This is the main landing page for the blog application
// It displays the hero section, hot blogs, and featured stories
export default function Home() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = "hidden";
  };
  const handleCloseModal = () => {
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 text-center overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-100 opacity-80 blur-2xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight"
            style={fadeInUp}
          >
            Share Your Story with the World
          </h1>
          <p className="text-2xl text-gray-600 mb-8" style={fadeIn}>
            Join a vibrant community of writers and readers. Publish your
            thoughts, ideas, and experiences with a beautiful, modern platform.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={fadeIn}
          >
            <Link
              href="/your-blogs"
              className="px-8 py-4 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-lg"
            >
              Start Writing
            </Link>
            <Link
              href="/all-blogs"
              className="px-8 py-4 rounded-lg font-semibold bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 transition-all shadow-lg"
            >
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Blogs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hot Blogs
            </h2>
            <p className="text-xl text-gray-600">
              Trending topics in web development and technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {hotBlogs.map((blog, index) => (
              <button
                key={blog.id}
                onClick={() => handleBlogClick(blog)}
                className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animate-fadeInUp"
                style={{ ...scaleIn, animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-80 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      width={360}
                      height={360}
                      className="object-contain max-w-full max-h-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
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
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
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
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-600">
              Discover the latest and most engaging content from our community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => handleBlogClick(story)}
                className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animate-fadeInUp"
                style={{ ...scaleIn, animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      width={220}
                      height={220}
                      className="object-contain max-w-full max-h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full shadow">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{story.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.excerpt}
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
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to share your story with the world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ ...scaleIn, animationDelay: "0.1s" }}
            >
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2.5 2.5 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Easy to Write
              </h3>
              <p className="text-gray-600">
                Simple and intuitive interface for writing and publishing your
                blog posts. Our platform makes it easy to create, edit, and
                format your content.
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ ...scaleIn, animationDelay: "0.3s" }}
            >
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Engage with Readers
              </h3>
              <p className="text-gray-600">
                Connect with your audience through comments and discussions.
                Build a community around your content and get valuable feedback.
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ ...scaleIn, animationDelay: "0.5s" }}
            >
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Your content is safe and secure with our advanced security
                measures. We protect your data and ensure your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-100 to-blue-100 opacity-60 blur-2xl animate-gradient" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={fadeInUp}
          >
            Ready to Start Your Journey?
          </h2>
          <p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            style={fadeIn}
          >
            Join our community of writers and share your unique perspective with
            the world.
          </p>
          <Link
            href="/your-blogs"
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={fadeIn}
          >
            <span className="flex items-center justify-center">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Start Writing Now
            </span>
          </Link>
        </div>
      </section>

      {/* Animations */}
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
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
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={handleCloseModal} />
      )}
    </div>
  );
}
// --- Home Page Component End ---
