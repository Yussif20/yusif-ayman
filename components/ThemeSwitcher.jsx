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
        <div className="flex items-center p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg shadow-slate-900/10 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300">
          <button
            onClick={themeToggleHandler}
            className={`relative flex items-center justify-center w-10 h-8 rounded-lg transition-all duration-300 transform ${
              theme === "light"
                ? "bg-white/90 dark:bg-slate-700/90 shadow-lg shadow-slate-500/25 scale-105 text-slate-600"
                : "bg-transparent hover:bg-slate-50/80 dark:hover:bg-slate-800/80 text-slate-500 dark:text-slate-400"
            } ${isAnimating ? "animate-pulse" : ""}`}
            aria-label="Switch to light mode"
            title="Light mode"
          >
            <Sun
              className={`w-4 h-4 transition-all duration-300 ${
                theme === "light"
                  ? "text-slate-600 drop-shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            />
            {theme === "light" && (
              <div className="absolute inset-0 rounded-lg bg-slate-600/10 animate-ping"></div>
            )}
          </button>

          <button
            onClick={themeToggleHandler}
            className={`relative flex items-center justify-center w-10 h-8 rounded-lg transition-all duration-300 transform ${
              theme === "dark"
                ? "bg-white/90 dark:bg-slate-700/90 shadow-lg shadow-slate-500/25 scale-105 text-slate-600"
                : "bg-transparent hover:bg-slate-50/80 dark:hover:bg-slate-800/80 text-slate-500 dark:text-slate-400"
            } ${isAnimating ? "animate-pulse" : ""}`}
            aria-label="Switch to dark mode"
            title="Dark mode"
          >
            <Moon
              className={`w-4 h-4 transition-all duration-300 ${
                theme === "dark"
                  ? "text-slate-600 drop-shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            />
            {theme === "dark" && (
              <div className="absolute inset-0 rounded-lg bg-slate-600/10 animate-ping"></div>
            )}
          </button>
        </div>
        {/* Subtle indicator dot */}
        <div
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-all duration-300 ${
            theme === "light" ? "bg-amber-500" : "bg-blue-600"
          } ${isAnimating ? "animate-bounce" : ""}`}
        ></div>
      </div>

      {/* Mobile Version - Single icon that always shows and toggles theme */}
      <div className="flex sm:hidden">
        <button
          onClick={themeToggleHandler}
          className={`relative p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg border-2 ${
            theme === "light"
              ? "bg-white/90 hover:bg-slate-50/90 text-slate-600 border-slate-200/50 hover:border-slate-300/50 shadow-slate-500/20"
              : "bg-slate-800/90 hover:bg-slate-700/90 text-slate-400 border-slate-700/50 hover:border-slate-600/50 shadow-slate-900/20"
          } ${isAnimating ? "animate-pulse" : ""}`}
          aria-label={`Toggle theme (currently ${theme})`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {/* Always show current theme icon, not the target */}
          {theme === "light" ? (
            <Sun className="w-6 h-6 text-slate-600 transition-all duration-300 drop-shadow-sm" />
          ) : (
            <Moon className="w-6 h-6 text-slate-400 transition-all duration-300 drop-shadow-sm" />
          )}

          {/* Subtle glow effect */}
          <div
            className={`absolute inset-0 rounded-xl transition-all duration-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-slate-500/10 to-slate-600/10"
                : "bg-gradient-to-r from-slate-600/10 to-slate-700/10"
            } ${isAnimating ? "animate-ping" : ""}`}
          ></div>

          {/* Active state indicator dot */}
          <div
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
              theme === "light"
                ? "bg-amber-500 shadow-amber-500/50"
                : "bg-blue-600 shadow-blue-600/50"
            } ${isAnimating ? "animate-bounce" : ""} shadow-lg`}
          ></div>
        </button>
      </div>
    </>
  );
}
