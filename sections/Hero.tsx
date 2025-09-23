"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("Hero");

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-center text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Image
            src="/yusif.jpg"
            alt={t("imageAlt")}
            width={160}
            height={160}
            className="rounded-full border-2 border-slate-200/50 dark:border-slate-700/50 mb-6 sm:mb-8 object-cover shadow-xl shadow-slate-900/10"
            priority
          />
        </motion.div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 dark:text-white mb-4">
          {t("name")}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-4">
          {t("summary")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            href={`/${locale}/projects`}
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl border border-slate-600/50 hover:from-slate-700 hover:to-slate-800 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-lg shadow-slate-500/25"
            aria-label={t("viewProjects")}
          >
            {t("viewProjects")}
          </Link>
          <a
            href="/cv.pdf"
            download
            className="inline-block px-6 py-3 text-sm font-medium text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-50/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-lg shadow-slate-900/10"
            aria-label={t("downloadCV")}
          >
            {t("downloadCV")}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-6 py-3 text-sm font-medium text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-50/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-lg shadow-slate-900/10"
            aria-label={t("contact")}
          >
            {t("contact")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
