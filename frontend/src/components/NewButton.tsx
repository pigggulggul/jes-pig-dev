export interface NewButtonProps {
  label: string;
  backgroundColor?: string;
  color?: string;
  width?: number;
  onClick?: () => void;
}
function NewButton({
  label,
  backgroundColor,
  color,
  width = 128,
  onClick,
}: NewButtonProps) {
  return (
    <div
      className={` flex bg-slate-400 rounded-md px-2 py-2 text-white justify-center items-center cursor-pointer`}
      onClick={onClick}
      style={{ backgroundColor, color, width: width }}
    >
      <p>{label}</p>
    </div>
  );
}
export default NewButton;
