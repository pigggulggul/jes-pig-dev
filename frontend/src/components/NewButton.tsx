export interface NewButtonProps {
  label: string;
  backgroundColor?: string;
  color?: string;
  onClick?: () => void;
}
function NewButton({ label, backgroundColor, color, onClick }: NewButtonProps) {
  return (
    <div
      className=" flex w-32 bg-slate-400 rounded-md px-2 py-2 text-white"
      onClick={onClick}
      style={{ backgroundColor, color }}
    >
      <p>{label}</p>
    </div>
  );
}
export default NewButton;
