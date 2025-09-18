"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (systemDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const themeToggleHandler = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setIsAnimating(true);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <>
      {/* Desktop Version - Two buttons */}
      <div className="hidden sm:flex relative">
        <div className="flex items-center p-1 bg-white/40 dark:bg-gray-700 rounded-xl shadow-inner border border-gray-300 dark:border-gray-600 transition-all duration-300 backdrop-blur-sm">
          <button
            onClick={themeToggleHandler}
            className={`relative flex items-center justify-center w-10 h-8 rounded-lg transition-all duration-300 transform ${
              theme === "light"
                ? "bg-white dark:bg-gray-800 shadow-md scale-105 text-[#b8860b]"
                : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-500"
            } ${isAnimating ? "animate-pulse" : ""}`}
            aria-label="Switch to light mode"
            title="Light mode"
          >
            <Sun
              className={`w-4 h-4 transition-all duration-300 ${
                theme === "light"
                  ? "text-[#b8860b] drop-shadow-sm"
                  : "text-gray-500 dark:text-gray-500"
              }`}
            />
            {theme === "light" && (
              <div className="absolute inset-0 rounded-lg bg-[#b8860b]/10 animate-ping"></div>
            )}
          </button>

          <button
            onClick={themeToggleHandler}
            className={`relative flex items-center justify-center w-10 h-8 rounded-lg transition-all duration-300 transform ${
              theme === "dark"
                ? "bg-white dark:bg-gray-800 shadow-md scale-105 text-[#006C35]"
                : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-500"
            } ${isAnimating ? "animate-pulse" : ""}`}
            aria-label="Switch to dark mode"
            title="Dark mode"
          >
            <Moon
              className={`w-4 h-4 transition-all duration-300 ${
                theme === "dark"
                  ? "text-[#006C35] drop-shadow-sm"
                  : "text-gray-500 dark:text-gray-500"
              }`}
            />
            {theme === "dark" && (
              <div className="absolute inset-0 rounded-lg bg-[#006C35]/10 animate-ping"></div>
            )}
          </button>
        </div>
        {/* Subtle indicator dot */}
        <div
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-all duration-300 ${
            theme === "light" ? "bg-[#b8860b]" : "bg-[#006C35]"
          } ${isAnimating ? "animate-bounce" : ""}`}
        ></div>
      </div>

      {/* Mobile Version - Single icon that always shows and toggles theme */}
      <div className="flex sm:hidden">
        <button
          onClick={themeToggleHandler}
          className={`relative p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg border-2 ${
            theme === "light"
              ? "bg-white hover:bg-gray-50 text-[#1a3d1a] border-[#006C35]/30 hover:border-[#006C35]/50 shadow-[#006C35]/20"
              : "bg-gray-800 hover:bg-gray-700 text-[#FFD700] border-[#FFD700]/30 hover:border-[#FFD700]/50 shadow-[#FFD700]/10"
          } ${isAnimating ? "animate-pulse" : ""}`}
          aria-label={`Toggle theme (currently ${theme})`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {/* Always show current theme icon, not the target */}
          {theme === "light" ? (
            <Sun className="w-6 h-6 text-[#b8860b] transition-all duration-300 drop-shadow-sm" />
          ) : (
            <Moon className="w-6 h-6 text-[#006C35] transition-all duration-300 drop-shadow-sm" />
          )}

          {/* Subtle glow effect */}
          <div
            className={`absolute inset-0 rounded-xl transition-all duration-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-amber-500/10 to-yellow-600/10"
                : "bg-gradient-to-r from-blue-500/10 to-indigo-500/10"
            } ${isAnimating ? "animate-ping" : ""}`}
          ></div>

          {/* Active state indicator dot */}
          <div
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
              theme === "light"
                ? "bg-amber-600 shadow-amber-600/50"
                : "bg-blue-400 shadow-blue-400/50"
            } ${isAnimating ? "animate-bounce" : ""} shadow-lg`}
          ></div>
        </button>
      </div>
    </>
  );
}
