import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

const THEME_KEY = "xego_admin_theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored as Theme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (value: Theme) => setThemeState(value);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
