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
    { href: `/${locale}/services`, labelKey: "services" },
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
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
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
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 transition-colors"
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
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed top-0 right-0 rtl:right-auto rtl:left-0 h-full w-64 bg-white dark:bg-slate-900 shadow-2xl md:hidden z-50 transform transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-label={t("mobileMenu") || "Mobile navigation menu"}
          >
            <div className="p-4 flex flex-col h-full">
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 mb-4"
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

              {/* Mobile Navigation Links */}
              <nav aria-label={t("mobileNavigation") || "Mobile navigation"}>
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 ${
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
              </nav>

              {/* Theme Switcher and Language Selector for Mobile */}
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
                <ThemeSwitcher />
                <LanguageSelector />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
