"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code, Globe } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/ProjectsData";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const t = useTranslations("Projects");

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-slate-700"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 border border-gray-200 dark:border-slate-600"
                  aria-label={t("closeModal") || "Close modal"}
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[90vh]">
                  {/* Project Image */}
                  <div className="relative h-64 md:h-80 w-full bg-gradient-to-br from-blue-900 to-slate-700">
                    <Image
                      src={project.image}
                      alt={`${project.title} ${t("projectScreenshot")}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Project Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-16">
                      <h1
                        id="project-modal-title"
                        className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg"
                      >
                        {project.title}
                      </h1>
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span className="text-sm">{t("liveDemo")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          <span className="text-sm">{t("sourceCode")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Description */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {t("aboutProject")}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {t(`descriptions.${project.descriptionKey}`)}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        {t("technologiesUsed")}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, index) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800/20 text-blue-900 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-800 font-medium text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {t("projectLinks")}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 font-medium"
                        >
                          <ExternalLink className="w-5 h-5" />
                          {t("viewLive")}
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-3 border-2 border-blue-900 text-blue-900 dark:border-slate-400 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 font-medium"
                        >
                          <Github className="w-5 h-5" />
                          {t("viewCode")}
                        </a>
                      </div>
                    </div>

                    {/* Project Status */}
                    {/* <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {t("projectStatus")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">
                            {t("liveAndRunning")}
                          </span>
                        </div>
                        {project.featured && (
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">
                              {t("featuredProject")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
