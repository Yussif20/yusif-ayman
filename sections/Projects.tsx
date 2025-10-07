"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/ProjectsData";

interface ProjectsProps {
  locale: string;
}

export default function Projects({ locale }: ProjectsProps) {
  const t = useTranslations("Projects");

  // Get featured projects (first 3)
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="text-center mb-12">
        <h2
          id="projects-heading"
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
          style={{
            WebkitBoxDecorationBreak: "clone",
            boxDecorationBreak: "clone",
          }}
        >
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Project Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-900 to-slate-700">
              <Image
                src={project.image}
                alt={`${project.title} ${t("projectScreenshot")}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {t(`descriptions.${project.descriptionKey}`)}
              </p>

              {/* Technologies */}
              <div
                className="flex flex-wrap gap-2 mb-4"
                role="list"
                aria-label={t("technologiesUsed")}
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-slate-600"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`${t("viewLive")} ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  {t("viewLive")}
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-900 text-blue-900 dark:border-slate-400 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`${t("viewCode")} ${project.title}`}
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  {t("viewCode")}
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View All Projects Button */}
      <div className="text-center">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 font-medium"
        >
          {t("viewAllProjects")}
          <ExternalLink className="w-5 h-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
