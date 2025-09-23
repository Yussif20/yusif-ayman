"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

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
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-600/3 via-gray-500/3 to-zinc-600/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-slate-800 mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-700 h-full transform sm:-translate-x-1/2 shadow-lg shadow-slate-500/20"></div>

          {experienceEntries.map((entry, index) => (
            <motion.article
              key={entry.key}
              className={`mb-12 flex flex-col sm:flex-row items-start w-full ${
                index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                ease: "easeOut",
              }}
            >
              {/* Timeline dot */}
              <div className="hidden sm:block absolute left-1/2 w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full transform -translate-x-1/2 z-20 shadow-lg shadow-slate-500/30 border-4 border-white dark:border-slate-900">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <Briefcase className="w-3 h-3 text-slate-600" />
                </div>
              </div>

              <motion.div
                className={`w-full sm:w-5/12 ml-12 sm:ml-0 ${
                  index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-500/10 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg shadow-slate-500/25">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {entry.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                        {entry.company}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>{entry.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{entry.location}</span>
                    </div>
                    <div className="mt-4">
                      <ul className="space-y-2">
                        {entry.details.map((detail: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
