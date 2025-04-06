import { ImagePosType } from "../../types/conceptmaker/comceptMakerUi";

export default function ImageResizeUI(props: {
  reSize: ImagePosType;
  setImageState: React.Dispatch<React.SetStateAction<ImagePosType>>;
}) {
  const onChangeSize = (dimension: "x" | "y" | "zoom", value: number) => {
    props.setImageState({
      ...props.reSize,
      [dimension]: value,
    });
  };
  return (
    <div className="w-full p-3 bg-white border border-gray-200 rounded-md my-2">
      <div className="flex items-center mb-2">
        <p className="w-[30%] text-sm">너비:</p>
        <input
          type="range"
          min="-300"
          max="300"
          value={props.reSize.x}
          onChange={(e) => onChangeSize("x", parseInt(e.target.value))}
          className="w-[50%] mr-2"
        />
        <span className="w-[20%] text-sm">{props.reSize.x}%</span>
      </div>
      <div className="flex items-center">
        <p className="w-[30%] text-sm mb-2">높이:</p>
        <input
          type="range"
          min="-300"
          max="300"
          value={props.reSize.y}
          onChange={(e) => onChangeSize("y", parseInt(e.target.value))}
          className="w-[50%] mr-2"
        />
        <span className="w-[20%] text-sm">{props.reSize.y}%</span>
      </div>
      <div className="flex items-center">
        <p className="w-[30%] text-sm">비율:</p>
        <input
          type="range"
          min="-100"
          max="500"
          step={5}
          value={props.reSize.zoom}
          onChange={(e) => onChangeSize("zoom", Number(e.target.value))}
          className="w-[50%] mr-2"
        />
        <span className="w-[20%] text-sm">{props.reSize.zoom}%</span>
      </div>
    </div>
  );
}
