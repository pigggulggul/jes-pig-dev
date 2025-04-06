import { ImagePosType } from "../types/conceptmaker/comceptMakerUi";
import { StoryStatusType } from "../types/type";
import ImageFrame from "./conceptmaker/ImageFrame";

interface listProps {
  width: number;
  host?: boolean;
  nickname: string;
  imgSrc?: string;
  status?: StoryStatusType;
  imageSize: ImagePosType;
}
export default function InstaStoryThumb({
  width,
  host = false,
  nickname,
  imgSrc = "/src/assets/images/insta_profile_default.webp",
  status,
  imageSize,
}: listProps) {
  return (
    <li
      className={`w-[${width}%] max-w-[20%] h-full flex-col items-center p-1`}
    >
      <div className="relative h-[80%] flex flex-col items-center justify-center ">
        <div
          className={`relative flex items-center justify-center w-full bg-white rounded-full object-cover overflow-hidden border-2 ${
            status === "friend" ? " border-green-400" : ""
          } ${status === "unread" ? " border-red-500" : ""} ${
            status === "read" ? " border-gray-400" : ""
          }`}
          style={{
            aspectRatio: 1 / 1,
          }}
        >
          <ImageFrame image={imgSrc} resize={imageSize} />
        </div>
        {host ? (
          <p className="absolute w-[18px] h-[18px] right-[1px] bottom-[2px] text-white bg-black flex items-center justify-center rounded-full border-2 border-white">
            +
          </p>
        ) : null}
      </div>
      <div className="text-[6px] h-[20%]">
        {host ? (
          <p className="text-center">내 스토리</p>
        ) : (
          <p className="text-center">{nickname}</p>
        )}
      </div>
    </li>
  );
}
