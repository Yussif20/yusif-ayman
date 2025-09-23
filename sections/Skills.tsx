"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Zap, Workflow } from "lucide-react";

export default function Skills() {
  const t = useTranslations("Skills");

  const skillCategories = [
    {
      key: "frontend",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "apis",
      icon: Zap,
      color: "from-orange-500 to-yellow-500",
    },
    {
      key: "workflow",
      icon: Workflow,
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            const categoryData = t.raw(category.key);
            const skills = categoryData.skills;

            return (
              <motion.div
                key={category.key}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: categoryIndex * 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-500/10 transition-all duration-300 h-full">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {categoryData.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    {skills.map(
                      (
                        skill: { name: string; level: string },
                        skillIndex: number
                      ) => (
                        <motion.div
                          key={skill.name}
                          className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg border border-slate-200/30 dark:border-slate-600/30"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {skill.name}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              skill.level === "Expert" || skill.level === "خبير"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : skill.level === "Advanced" ||
                                  skill.level === "متقدم"
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                : skill.level === "Proficient" ||
                                  skill.level === "ماهر"
                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
