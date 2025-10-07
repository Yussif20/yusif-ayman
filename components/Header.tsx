"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("Navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { href: `/${locale}`, labelKey: "home" },
    { href: `/${locale}/projects`, labelKey: "projects" },
    { href: `/${locale}/blog`, labelKey: "blog" },
    { href: `/${locale}/contact`, labelKey: "contact" },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 shadow-md"
      role="banner"
    >
      <nav
        className="container mx-auto px-4 py-4 flex items-center justify-between"
        aria-label={t("mainNavigation") || "Main navigation"}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-2xl font-bold bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 rounded-md px-2"
          aria-label={t("homeLabel") || "Go to homepage"}
        >
          YA
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-900 to-slate-700 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Switcher and Language Selector */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors border border-gray-200 dark:border-slate-700"
          aria-label={
            isMobileMenuOpen
              ? t("closeMenu") || "Close menu"
              : t("openMenu") || "Open menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed top-0 right-0 rtl:right-auto rtl:left-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl md:hidden z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-slate-700"
            role="dialog"
            aria-modal="true"
            aria-label={t("mobileMenu") || "Mobile navigation menu"}
          >
            <div className="p-6 flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-900 via-slate-700 to-slate-600 dark:from-blue-400 dark:via-slate-400 dark:to-slate-300 bg-clip-text text-transparent">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors"
                  aria-label={t("closeMenu") || "Close menu"}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav
                aria-label={t("mobileNavigation") || "Mobile navigation"}
                className="flex-1"
              >
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-6 py-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 text-lg font-medium ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-blue-900 to-slate-700 text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:shadow-md"
                        }`}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Theme Switcher and Language Selector for Mobile */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("theme")}
                  </span>
                  <ThemeSwitcher />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("language")}
                  </span>
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
