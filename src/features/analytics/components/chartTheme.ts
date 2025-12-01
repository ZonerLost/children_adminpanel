import { useTheme } from "../../../shared/hooks/useTheme";

export const useChartColors = () => {
  const { theme } = useTheme();

  const primary = theme === "dark" ? "#A855F7" : "#FF7A3C"; // bars / main
  const secondary = theme === "dark" ? "#22c55e" : "#16a34a"; // lines
  const accent = theme === "dark" ? "#f97316" : "#ef4444"; // other line
  const grid =
    theme === "dark" ? "rgba(148,163,184,0.25)" : "rgba(148,163,184,0.35)";
  const tooltipBg = theme === "dark" ? "#190928" : "#FFFFFF";

  return { theme, primary, secondary, accent, grid, tooltipBg };
};
