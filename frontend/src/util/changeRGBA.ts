export const changeRGBA = (hex: string): string => {
  // Validate the input
  if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex)) {
    throw new Error("Invalid hex color format");
  }

  // If hex is in shorthand (#fff), expand it to full form (#ffffff)
  if (hex.length === 4) {
    hex = `#${[...hex.slice(1)].map((ch) => ch + ch).join("")}`;
  }

  // Extract RGB values
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Return RGBA string
  return `rgba(${r}, ${g}, ${b}, 1.0)`;
};
