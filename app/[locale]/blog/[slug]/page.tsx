"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, Clock, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost } from "@/data/BlogData";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const tPosts = useTranslations("BlogPosts");

  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const contentKey = post.contentKey.split(".")[0];

  return (
    <main className="min-h-screen">
      <article className="container mx-auto px-4 py-16 md:py-24">
        {/* Back to Blog */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            {t("backToBlog")}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            {tPosts(`${contentKey}.title`)}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{t("byAuthor", { author: post.author.name })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{t("publishedOn", { date: formatDate(post.date) })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{t("readTime", { minutes: post.readTime })}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {tPosts(`${contentKey}.description`)}
          </p>
        </motion.header>

        {/* Cover Image */}
        <motion.div
          className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-900 to-slate-700">
            <Image
              src={post.coverImage}
              alt={tPosts(`${contentKey}.title`)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {tPosts(`${contentKey}.content.intro`)}
            </p>
          </div>

          {/* Why Binary Matters */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {tPosts(`${contentKey}.content.whyBinaryMatters.title`)}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              {tPosts(`${contentKey}.content.whyBinaryMatters.text`)}
            </p>

            {/* Illustration 1 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                <Image
                  src={post.firstImage}
                  alt="Binary conversion illustration"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>

          {/* Binary in RAM */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {tPosts(`${contentKey}.content.binaryInRam.title`)}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {tPosts(`${contentKey}.content.binaryInRam.text`)}
            </p>
          </section>

          {/* Encoding Text and Colors */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {tPosts(`${contentKey}.content.encodingTextColors.title`)}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              {tPosts(`${contentKey}.content.encodingTextColors.text`)}
            </p>

            {/* Illustration 2 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                <Image
                  src={post.secondImage}
                  alt="Text and color encoding illustration"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>

          {/* Practical Example */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {tPosts(`${contentKey}.content.practicalExample.title`)}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              {tPosts(`${contentKey}.content.practicalExample.text`)}
            </p>

            {/* Illustration 3 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                <Image
                  src={post.thirdImage}
                  alt="Image storage illustration"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>
        </motion.div>

        {/* Share Section */}
        <motion.div
          className="border-t border-gray-200 dark:border-slate-700 pt-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Front-end Developer
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: tPosts(`${contentKey}.title`),
                    text: tPosts(`${contentKey}.description`),
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
            >
              <Share2 className="w-4 h-4" />
              {t("shareArticle")}
            </button>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
