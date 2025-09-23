"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Experience() {
  const t = useTranslations("Experience");

  const experienceEntries = [
    {
      key: "freelance",
      title: t("freelance.title"),
      company: t("freelance.company"),
      duration: t("freelance.duration"),
      location: t("freelance.location"),
      details: t.raw("freelance.details"),
    },
    {
      key: "almdrasa",
      title: t("almdrasa.title"),
      company: t("almdrasa.company"),
      duration: t("almdrasa.duration"),
      location: t("almdrasa.location"),
      details: t.raw("almdrasa.details"),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-ivory-100 dark:bg-charcoal-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("title")}
        </motion.h2>
        <div className="space-y-6">
          {experienceEntries.map((entry, index) => (
            <motion.article
              key={entry.key}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              aria-labelledby={`${entry.key}-title`}
            >
              <h3
                id={`${entry.key}-title`}
                className="font-serif text-xl font-medium text-gray-900 dark:text-white"
              >
                {entry.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {entry.company} | {entry.duration} | {entry.location}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                {entry.details.map((detail: string, i: number) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
