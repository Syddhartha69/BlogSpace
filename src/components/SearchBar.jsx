"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- SearchBar Component Start ---
// This component provides a search bar for searching blogs by text or ID
const SearchBar = () => {
  const [searchType, setSearchType] = useState("text");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchType === "id") {
      router.push(`/posts/${searchQuery}`);
    } else {
      router.push(
        `/all-blogs?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex gap-4">
      <div className="relative">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="appearance-none px-12 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 pr-12 cursor-pointer hover:border-indigo-300"
        >
          <option value="text">Search by Text</option>
          <option value="id">Search by ID</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {searchType === "text" ? (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="relative flex-1">
        <input
          type={searchType === "id" ? "number" : "text"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            searchType === "id" ? "Enter post ID..." : "Search blogs..."
          }
          className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 hover:border-indigo-300"
          min={searchType === "id" ? "1" : undefined}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
// --- SearchBar Component End ---
