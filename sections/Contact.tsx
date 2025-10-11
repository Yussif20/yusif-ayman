"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Github,
  Linkedin,
  // Twitter,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const t = useTranslations("Contact");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("form.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("form.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("form.emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("form.subjectRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("form.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll just show success
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("info.emailLabel"),
      value: t("info.email"),
      href: `mailto:${t("info.email")}`,
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Phone,
      label: t("info.phoneLabel"),
      value: t("info.phone"),
      href: `tel:${t("info.phone")}`,
      color: "from-green-600 to-green-700",
    },
    {
      icon: MapPin,
      label: t("info.locationLabel"),
      value: t("info.location"),
      href: null,
      color: "from-purple-600 to-purple-700",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: t("social.followOnGithub"),
      href: "https://github.com/Yussif20",
      color: "hover:bg-gray-800",
    },
    {
      icon: Linkedin,
      label: t("social.connectOnLinkedin"),
      href: "https://linkedin.com/in/yussif-ayman",
      color: "hover:bg-blue-600",
    },
    // {
    //   icon: Twitter,
    //   label: t("social.followOnTwitter"),
    //   href: "https://twitter.com/yussif-ayman",
    //   color: "hover:bg-blue-400",
    // },
  ];

  return (
    <section
      className="container mx-auto px-4 py-16 md:py-24"
      aria-labelledby="contact-heading"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          id="contact-heading"
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent leading-tight pb-2"
          style={{
            WebkitBoxDecorationBreak: "clone",
            boxDecorationBreak: "clone",
          }}
        >
          {t("title")}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-slate-700"
            aria-label={t("form.formLabel")}
          >
            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300"
              >
                {t("form.success")}
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300"
              >
                {t("form.error")}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("form.name")}
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("form.namePlaceholder")}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all duration-200 ${
                      errors.name
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </div>
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("form.email")}
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("form.emailPlaceholder")}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-slate-600"
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("form.subject")}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={t("form.subjectPlaceholder")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all duration-200 ${
                  errors.subject
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p
                  id="subject-error"
                  className="mt-2 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("form.message")}
              </label>
              <div className="relative">
                <MessageSquare
                  className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("form.messagePlaceholder")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-all duration-200 resize-none ${
                    errors.message
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-slate-600"
                  } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
              </div>
              {errors.message && (
                <p
                  id="message-error"
                  className="mt-2 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-900 to-slate-700 text-white rounded-lg hover:from-blue-950 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              aria-label={t("form.submitLabel")}
            >
              {isSubmitting ? (
                <>
                  <div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  {t("form.sending")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" aria-hidden="true" />
                  {t("form.send")}
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const content = (
                <div className="flex items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-200">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${info.color} text-white mx-3 flex-shrink-0`}
                  >
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {info.label}
                    </p>
                    <p
                      className={`font-medium text-gray-900 dark:text-white ${
                        info.icon === Phone ? "ltr" : ""
                      }`}
                      dir={info.icon === Phone ? "ltr" : undefined}
                      style={
                        info.icon === Phone ? { textAlign: "left" } : undefined
                      }
                    >
                      {info.value}
                    </p>
                  </div>
                </div>
              );

              return info.href ? (
                <motion.a
                  key={index}
                  href={info.href}
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 rounded-xl"
                  aria-label={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {content}
                </motion.div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 dark:bg-slate-800/50 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
            <div className="flex items-center mb-4">
              <Clock
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-2"
                aria-hidden="true"
              />
              <h3 className="font-medium text-gray-900 dark:text-white">
                {t("info.availability")}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {t("info.responseTime")}
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t("social.title")}
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-lg ${social.color} hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2`}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
