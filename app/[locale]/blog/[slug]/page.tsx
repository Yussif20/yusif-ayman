"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, Clock, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost } from "@/data/BlogData";
import { notFound } from "next/navigation";
import { use } from "react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Types for dynamic content
interface ColorTheme {
  bg: string;
  primary: string;
  light: string;
  border: string;
  text: string;
  content: string;
}

interface ContentSection {
  key: string;
  title: string;
  text: string;
  subsections: Array<{ key: string; content: string }>;
}

// Color themes for sections
const sectionColors: ColorTheme[] = [
  {
    bg: "blue",
    primary: "bg-blue-600",
    light: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-400",
    content: "text-blue-700 dark:text-blue-300",
  },
  {
    bg: "purple",
    primary: "bg-purple-600",
    light: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-800 dark:text-purple-400",
    content: "text-purple-700 dark:text-purple-300",
  },
  {
    bg: "orange",
    primary: "bg-orange-600",
    light: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-800 dark:text-orange-400",
    content: "text-orange-700 dark:text-orange-300",
  },
  {
    bg: "teal",
    primary: "bg-teal-600",
    light: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
    text: "text-teal-800 dark:text-teal-400",
    content: "text-teal-700 dark:text-teal-300",
  },
  {
    bg: "red",
    primary: "bg-red-600",
    light: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-400",
    content: "text-red-700 dark:text-red-300",
  },
  {
    bg: "green",
    primary: "bg-green-600",
    light: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-800 dark:text-green-400",
    content: "text-green-700 dark:text-green-300",
  },
  {
    bg: "indigo",
    primary: "bg-indigo-600",
    light: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-800",
    text: "text-indigo-800 dark:text-indigo-400",
    content: "text-indigo-700 dark:text-indigo-300",
  },
];

// Icons for different content types
const contentIcons: Record<string, string> = {
  example: "✓",
  memoryExample: "💾",
  unicodeDetails: "🔤",
  imageProcessing: "🖼️",
  realWorldUse: "🌍",
  realWorldApplications: "🌍",
  code: "💻",
  note: "📝",
  tip: "💡",
  warning: "⚠️",
  info: "ℹ️",
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const locale = useLocale();
  const t = useTranslations("Blog");
  const tPosts = useTranslations("BlogPosts");

  const post = getBlogPost(slug);

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

  // Helper function to check if a translation key exists
  const hasTranslation = (key: string): boolean => {
    try {
      const result = tPosts(key);
      // Check if the result looks like a translation key (contains dots and matches the input pattern)
      const isTranslationKey =
        typeof result === "string" &&
        (result === key ||
          result.includes("BlogPosts.") ||
          result.includes(".content."));

      return (
        !isTranslationKey && typeof result === "string" && result.length > 0
      );
    } catch {
      return false;
    }
  };

  // Function to get all content sections dynamically
  const getContentSections = (): ContentSection[] => {
    const sections: ContentSection[] = [];

    // For now, let's use the known structure from your binary post
    // This can be expanded as you add more posts with different structures
    const knownSections = [
      {
        key: "whyBinaryMatters",
        subsections: ["example"],
      },
      {
        key: "binaryInRam",
        subsections: ["memoryExample"],
      },
      {
        key: "encodingTextColors",
        subsections: ["unicodeDetails"],
      },
      {
        key: "practicalExample",
        subsections: ["imageProcessing", "realWorldUse"],
      },
      {
        key: "bitwiseOperations",
        subsections: [],
      },
      {
        key: "conclusion",
        subsections: [],
      },
    ];

    knownSections.forEach((sectionInfo) => {
      const titleKey = `${contentKey}.content.${sectionInfo.key}.title`;
      const textKey = `${contentKey}.content.${sectionInfo.key}.text`;

      try {
        const title = tPosts(titleKey);
        // Only proceed if we get a real translation (not the key back)
        if (!title.includes("BlogPosts.") && !title.includes(".content.")) {
          const text = tPosts(textKey);

          const section: ContentSection = {
            key: sectionInfo.key,
            title: title,
            text:
              !text.includes("BlogPosts.") && !text.includes(".content.")
                ? text
                : "",
            subsections: [],
          };

          // Add known subsections
          sectionInfo.subsections.forEach((subKey) => {
            const subSectionKey = `${contentKey}.content.${sectionInfo.key}.${subKey}`;
            try {
              const content = tPosts(subSectionKey);
              if (
                !content.includes("BlogPosts.") &&
                !content.includes(".content.")
              ) {
                section.subsections.push({
                  key: subKey,
                  content: content,
                });
              }
            } catch {
              // Subsection doesn't exist, skip it
            }
          });

          sections.push(section);
        }
      } catch {
        // Section doesn't exist, skip it
      }
    });

    return sections;
  };

  // Function to render a subsection with appropriate styling
  const renderSubsection = (
    subsection: { key: string; content: string },
    colorTheme: ColorTheme
  ) => {
    const icon = contentIcons[subsection.key] || "📄";

    // Map content keys to translation keys
    const keyMapping: Record<string, string> = {
      realWorldUse: "realWorldApplications",
    };

    // Try to get translated label, fallback to formatted key
    let label: string;
    try {
      // Use mapped key if available, otherwise use original key
      const translationKey = keyMapping[subsection.key] || subsection.key;
      const translatedLabel = t(translationKey);

      // Check if we got a translation or just the key back
      label =
        translatedLabel !== `Blog.${translationKey}`
          ? translatedLabel
          : subsection.key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
    } catch {
      // Format the key nicely if no translation exists
      label = subsection.key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    }

    return (
      <div
        key={subsection.key}
        className={`${colorTheme.light} border ${colorTheme.border} rounded-xl p-6`}
      >
        <h4
          className={`font-semibold ${colorTheme.text} mb-3 flex items-center gap-2`}
        >
          <span
            className={`w-6 h-6 ${colorTheme.primary} text-white rounded-full flex items-center justify-center text-sm`}
          >
            {icon}
          </span>
          {label}
        </h4>
        <p className={`${colorTheme.content} leading-relaxed`}>
          {subsection.content}
        </p>
      </div>
    );
  };

  const contentSections = getContentSections();

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
          {hasTranslation(`${contentKey}.content.intro`) && (
            <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-gray-200 dark:border-slate-600">
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                {tPosts(`${contentKey}.content.intro`)}
              </p>
            </div>
          )}

          {/* Dynamic Content Sections */}
          {contentSections.map((section, index) => {
            const colorTheme = sectionColors[index % sectionColors.length];
            const isConclusion = section.key === "conclusion";

            return (
              <section key={section.key} className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <span
                    className={`w-10 h-10 ${
                      isConclusion
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : colorTheme.primary
                    } text-white rounded-lg flex items-center justify-center text-xl font-bold`}
                  >
                    {isConclusion ? "✓" : index + 1}
                  </span>
                  {section.title}
                </h2>

                {section.text && (
                  <div className={`space-y-6 ${isConclusion ? "" : "mb-6"}`}>
                    {isConclusion ? (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
                        <p className="text-lg leading-relaxed text-blue-800 dark:text-blue-200 font-medium">
                          {section.text}
                        </p>
                      </div>
                    ) : (
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        {section.text}
                      </p>
                    )}
                  </div>
                )}

                {/* Subsections */}
                {!isConclusion &&
                  section.subsections &&
                  section.subsections.length > 0 && (
                    <div className="space-y-6">
                      {section.subsections.map((subsection) =>
                        renderSubsection(subsection, colorTheme)
                      )}
                    </div>
                  )}

                {/* Dynamic Images - Check if images exist for this section */}
                {!isConclusion && (
                  <>
                    {index === 0 && post.firstImage && (
                      <div className="relative rounded-xl overflow-hidden shadow-lg mt-8">
                        <div className="relative h-64 md:h-80 bg-transparent">
                          <Image
                            src={post.firstImage}
                            alt={`${section.title} illustration`}
                            fill
                            className="max-w-[600px] mx-auto"
                          />
                        </div>
                      </div>
                    )}
                    {index === 2 && post.secondImage && (
                      <div className="relative rounded-xl overflow-hidden shadow-lg mt-8">
                        <div className="relative h-64 md:h-80 bg-transparent">
                          <Image
                            src={post.secondImage}
                            alt={`${section.title} illustration`}
                            fill
                            className="max-w-[600px] mx-auto"
                          />
                        </div>
                      </div>
                    )}
                    {index === 3 && post.thirdImage && (
                      <div className="relative rounded-xl overflow-hidden shadow-lg mt-8">
                        <div className="relative h-64 md:h-80 bg-transparent">
                          <Image
                            src={post.thirdImage}
                            alt={`${section.title} illustration`}
                            fill
                            className="max-w-[600px] mx-auto"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </section>
            );
          })}
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
