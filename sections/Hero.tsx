"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("Hero");

  return (
    <section className="py-16 sm:py-24 bg-ivory-100 dark:bg-charcoal-900">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-center text-center"
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
            className="rounded-full border-2 border-gray-200 dark:border-gray-600 mb-6 sm:mb-8 object-cover"
            priority
          />
        </motion.div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
          {t("name")}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4">
          {t("summary")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            href={`/${locale}/projects`}
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-200 dark:text-gray-900 rounded-md border border-gray-900 dark:border-gray-200 hover:bg-gray-800 dark:hover:bg-gray-100 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-label={t("viewProjects")}
          >
            {t("viewProjects")}
          </Link>
          <a
            href="/cv.pdf"
            download
            className="inline-block px-6 py-3 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-label={t("downloadCV")}
          >
            {t("downloadCV")}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-6 py-3 text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-label={t("contact")}
          >
            {t("contact")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
