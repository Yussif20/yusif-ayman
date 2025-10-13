"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, Clock, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/data/BlogData";

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const tPosts = useTranslations("BlogPosts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const allPosts = getAllBlogPosts();

  // Get all unique tags
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  // Filter posts based on search and tag
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      tPosts(`${post.contentKey.split(".")[0]}.title`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tPosts(`${post.contentKey.split(".")[0]}.description`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
            style={{
              WebkitBoxDecorationBreak: "clone",
              boxDecorationBreak: "clone",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Tag Filters */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t("filterByTag")}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
                  selectedTag === "all"
                    ? "bg-gradient-to-r from-blue-900 to-slate-700 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600"
                }`}
              >
                <Tag className="w-4 h-4 inline mr-2" />
                {t("allTags")}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-blue-900 to-slate-700 text-white shadow-md"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {filteredPosts.length > 0
            ? `Showing ${filteredPosts.length} article${
                filteredPosts.length !== 1 ? "s" : ""
              }`
            : t("noPostsFound")}
        </p>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-900 to-slate-700">
                <Image
                  src={post.coverImage}
                  alt={tPosts(`${post.contentKey.split(".")[0]}.title`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 text-gray-800 dark:text-gray-200 rounded-md border border-gray-200 dark:border-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {tPosts(`${post.contentKey.split(".")[0]}.title`)}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {tPosts(`${post.contentKey.split(".")[0]}.description`)}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {t("readTime", { minutes: post.readTime })}
                    </span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 text-sm font-medium"
                >
                  {t("readMore")}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("noPostsFound")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
