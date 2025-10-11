"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { projectsData } from "@/data/ProjectsData";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectsPage() {
  const t = useTranslations("Projects");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);

  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(projectsData.flatMap((project) => project.technologies))
  );

  // Filter projects by selected technology
  const filteredProjects =
    selectedTech === "all"
      ? projectsData
      : projectsData.filter((project) =>
          project.technologies.includes(selectedTech)
        );

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
            style={{
              WebkitBoxDecorationBreak: "clone",
              boxDecorationBreak: "clone",
            }}
          >
            {t("allProjects")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Technology Filter */}
        <div className="mb-12">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t("filterByTech")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedTech("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
                selectedTech === "all"
                  ? "bg-gradient-to-r from-blue-900 to-slate-700 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600"
              }`}
            >
              {t("allProjects")}
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
                  selectedTech === tech
                    ? "bg-gradient-to-r from-blue-900 to-slate-700 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Count */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {t("showingProjects", { count: filteredProjects.length })}
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-blue-900 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-label={`${t("viewDetails")} ${project.title}`}
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-48 aspect-video md:aspect-auto w-full overflow-hidden bg-gradient-to-br from-blue-900 to-slate-700">
                <Image
                  src={project.image}
                  alt={`${project.title} ${t("projectScreenshot")}`}
                  fill
                  className="object-contain md:object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {t("clickToViewDetails")}
                  </p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h2>

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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        project.liveUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 text-sm font-medium"
                    aria-label={`${t("viewLive")} ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    {t("viewLive")}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        project.githubUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-900 text-blue-900 dark:border-slate-400 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 text-sm font-medium"
                    aria-label={`${t("viewCode")} ${project.title}`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    {t("viewCode")}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </section>
    </main>
  );
}
