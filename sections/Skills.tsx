"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Monitor, Server, Settings } from "lucide-react";
import Image from "next/image";

export default function Skills() {
  const t = useTranslations("Skills");

  const skillCategories = [
    {
      key: "frontend",
      icon: Monitor,
      color: "from-blue-600 to-blue-700",
    },
    {
      key: "backend",
      icon: Server,
      color: "from-green-600 to-green-700",
    },
    {
      key: "tools",
      icon: Settings,
      color: "from-purple-600 to-purple-700",
    },
  ];

  // Component to render skill icon
  const SkillIcon = ({
    iconName,
    skillName,
  }: {
    iconName: string;
    skillName: string;
  }) => {
    return (
      <div className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-300">
        <Image
          src={`/skills/${iconName}.svg`}
          alt={`${skillName} icon`}
          fill
          className="object-contain"
          sizes="32px"
        />
      </div>
    );
  };

  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24"
      aria-labelledby="skills-heading"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          id="skills-heading"
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight"
        >
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          const categoryData = t.raw(category.key);
          const skills = categoryData.skills;

          return (
            <motion.article
              key={category.key}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              aria-labelledby={`skill-category-${category.key}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
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

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-4">
                {skills.map(
                  (
                    skill: { name: string; icon: string },
                    skillIndex: number
                  ) => (
                    <motion.div
                      key={skillIndex}
                      className="group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-slate-600">
                        {/* Skill Icon */}
                        <div className="mb-3">
                          <SkillIcon
                            iconName={skill.icon}
                            skillName={skill.name}
                          />
                        </div>

                        {/* Skill Name */}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
