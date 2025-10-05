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
      color: "from-blue-900 to-slate-700",
    },
    {
      key: "apis",
      icon: Zap,
      color: "from-slate-700 to-slate-600",
    },
    {
      key: "workflow",
      icon: Workflow,
      color: "from-blue-800 to-slate-600",
    },
  ];

  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
        style={{
          WebkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
        }}
      >
        {t("title")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          const categoryData = t.raw(category.key);
          const skills = categoryData.skills;

          return (
            <motion.article
              key={category.key}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              aria-labelledby={`skill-category-${category.key}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${category.color} shadow-md`}
                  aria-hidden="true"
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3
                  id={`skill-category-${category.key}`}
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {categoryData.title}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="space-y-4" role="list">
                {skills.map(
                  (
                    skill: { name: string; level: string },
                    skillIndex: number
                  ) => (
                    <li
                      key={skillIndex}
                      className="flex justify-between items-center group"
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-900 dark:group-hover:text-slate-300 transition-colors">
                        {skill.name}
                      </span>
                      <span
                        className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 font-medium"
                        aria-label={`Proficiency level: ${skill.level}`}
                      >
                        {skill.level}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
