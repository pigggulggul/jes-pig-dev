export interface PenPaletteProps {
  width?: number;
  height?: number;
  backgroundColor: string;
  onClick?: () => void;
}
function PenPalette({
  width = 8,
  height = 8,
  backgroundColor,
  onClick,
}: PenPaletteProps) {
  const calWidth: string = width * 4 + "px";
  const calHeight: string = height * 4 + "px";
  return (
    <li
      className="w-8 h-8 border color-border-purple1 rounded-md m-1 color-bg-purple1 cursor-pointer"
      style={{ width: calWidth, height: calHeight, backgroundColor }}
      onClick={onClick}
    />
  );
}
export default PenPalette;
