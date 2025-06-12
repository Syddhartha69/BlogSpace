# 📝 BlogSpace - Bloggers Unite

![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js&style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?logo=react&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-green?logo=tailwindcss&style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

A modern, responsive blogging platform built with **Next.js 14**, **React**, and **Tailwind CSS**. BlogSpace empowers writers and readers to share stories, explore content, and manage blogs in a clean, user-friendly interface.

---

## 🚀 **Features**

- ✍️ **Write & Publish Blogs** – Create blog posts with a title, content, category, and optional image  
- 🔍 **Smart Search** – Search blogs by keyword or post ID with instant filtering  
- 📃 **Read Full Posts** – View blog post content on a dedicated page or modal  
- 🗑️ **Delete Posts** – Remove your blogs with one click, no page reload  
- 📚 **Paginated Browsing** – Explore all blogs across multiple pages  
- 🧭 **Persistent Navigation** – Navigate between Home, All Blogs, Your Blogs, and Contact  
- 💬 **Contact Form** – Reach out to the BlogSpace team via a responsive contact page  
- 📱 **Responsive Design** – Optimized for desktops, tablets, and mobile devices  
- 🎞️ **Smooth Animations** – Elegant transitions for a modern experience  

---

## 🛠️ **Tech Stack**

| Category        | Tech                                                    |
|----------------|----------------------------------------------------------|
| Framework       | [Next.js 14 (App Router)](https://nextjs.org/docs)      |
| UI Library      | React                                                   |
| Styling         | [Tailwind CSS](https://tailwindcss.com)                 |
| API (Mock Data) | [JSONPlaceholder](https://jsonplaceholder.typicode.com) |

---

## 📂 **Project Structure**

src/
└── app/
├── layout.jsx # Root layout with Navbar and Footer
├── page.jsx # Home page with hero and featured blogs
├── all-blogs/
│ └── page.jsx # All blogs list with pagination + search
├── your-blogs/
│ └── page.jsx # Create, view, delete your blogs
├── posts/
│ └── [id]/page.jsx # Individual post detail page
├── contact/
│ └── page.jsx # Contact form
└── components/ # Reusable components (Navbar, SearchBar, BlogCard, etc.)

yaml
Copy
Edit

---

## 🧑‍💻 **Getting Started**

### Prerequisites

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd next-task-blog
Install dependencies:

bash
Copy
Edit
npm install
Run the development server:

bash
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser.

🔗 API Integration
BlogSpace uses JSONPlaceholder for mock blog data:

All Posts – https://jsonplaceholder.typicode.com/posts

Single Post – https://jsonplaceholder.typicode.com/posts/{id}

🌟 User Capabilities
✅ Write Blogs – Easily draft and publish personal blog entries

✅ Delete Blogs – Remove your entries with a single click

✅ Explore Posts – Browse blogs from all users with search and pagination

✅ Read Posts – Dive into detailed content with optional images

✅ Use Smart Search – Instantly find blogs by keyword or ID

✅ Contact Support – Get in touch through the Contact form

✅ Navigate Seamlessly – Use the navigation bar to move across sections

🎨 UI & UX Highlights
Built with Tailwind CSS for utility-first, responsive styling

Modern interactions powered by React Hooks

Optimized layout with Next.js App Router

Fully responsive, mobile-first interface

Fast, client-side navigation and interactive elements

⚙️ Customization Tips
Modify app/page.jsx for homepage layout and featured content

Add new components under components/

Use Tailwind’s utility classes for quick styling

Replace mock APIs with your own backend when ready

🚀 Deploy on Vercel
You can deploy BlogSpace instantly using Vercel:

Push your project to GitHub

Connect your repository to Vercel

Configure build settings (defaults work for Next.js)

Deploy and share your live blogging platform!

📘 Learn More
Next.js Documentation

Tailwind CSS Docs

JSONPlaceholder API

📄 License
This project is licensed under the MIT License.

💬 Support
For support, open an issue on GitHub or contact the development team via the Contact page in the app.

Made with 💙 using Next.js, React, and Tailwind CSS
