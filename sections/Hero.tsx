"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("Hero");

  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12"
      aria-labelledby="hero-heading"
    >
      {/* Text Content */}
      <motion.div
        className="flex-1 text-center md:text-left rtl:md:text-right"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
          style={{
            WebkitBoxDecorationBreak: "clone",
            boxDecorationBreak: "clone",
          }}
        >
          {t("name")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {t("summary")}
        </p>

        {/* Call to Action Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center md:justify-start rtl:md:justify-start"
          role="group"
          aria-label={t("ctaButtons") || "Call to action buttons"}
        >
          <Link
            href={`/${locale}/projects`}
            className="px-6 py-3 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 font-medium"
          >
            {t("viewProjects")}
          </Link>
          <a
            href="/Yousef_Ayman.pdf"
            download
            className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
            aria-label={t("downloadCVAria") || "Download CV as PDF"}
          >
            {t("downloadCV")}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="px-6 py-3 border-2 border-blue-900 text-blue-900 dark:border-slate-400 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 font-medium"
          >
            {t("contact")}
          </Link>
        </div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-800 via-slate-600 to-slate-700 rounded-full blur-2xl opacity-30 animate-pulse"
            aria-hidden="true"
          ></div>
          <Image
            src="/yusif.jpg"
            alt={
              t("profileImageAlt") ||
              `${t("name")} - Professional profile photo`
            }
            fill
            className="rounded-full object-cover shadow-2xl relative z-10 border-4 border-white dark:border-slate-800"
            priority
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          />
        </div>
      </motion.div>
    </section>
  );
}
