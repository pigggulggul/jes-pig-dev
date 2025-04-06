import { ImagePosType } from "../../types/conceptmaker/comceptMakerUi";

export default function ImageFrame(props: {
  image: string;
  resize: ImagePosType;
}) {
  const { image, resize } = props;

  return (
    <div className="frame-image w-full h-full absolute">
      <img
        src={image}
        alt=""
        style={{
          position: "absolute",
          left: `${resize.x}%`,
          top: `${resize.y}%`,
          transform: `scale(${resize.zoom / 100})`,
        }}
      />
    </div>
  );
}
