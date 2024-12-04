export interface TypeButtonProps {
  label: string;
  img?: string;
  onClick?: () => void;
}
import defaultIcon from "/src/assets/icon/icon_heart.png";
function TypeButton({ label, img = defaultIcon, onClick }: TypeButtonProps) {
  return (
    <div
      className="w-[100%] flex flex-col items-center my-2 cursor-pointer"
      onClick={onClick}
    >
      <img src={img} className="w-8 h-8 mx-4 my-1" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
export default TypeButton;
