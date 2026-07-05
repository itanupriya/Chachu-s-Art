// each category gets its own neon "glow" color, like a real sticker sheet
export const categoryColors = {
  Bike: "#00e5ff", // cyan
  Car: "#ff2d95", // magenta
  Glass: "#c6ff00", // lime
  Wall: "#ff8a00", // orange
  Helmet: "#b14bff", // violet
  Other: "#4dd0e1", // soft teal
};

export function getCategoryColor(category) {
  return categoryColors[category] || "#00e5ff";
}
