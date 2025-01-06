import { StoryStatusType } from "../types/type";

interface listProps {
  width: number;
  host?: boolean;
  nickname: string;
  imgSrc?: string;
  status?: StoryStatusType;
}
export default function InstaStoryThumb({
  width,
  host = false,
  nickname,
  imgSrc = "/src/assets/images/insta_profile_default.webp",
  status,
}: listProps) {
  return (
    <li
      className={`w-[${width}%] max-w-[20%] h-full flex-col items-center p-1`}
    >
      <div className="relative h-[80%] flex flex-col items-center justify-center">
        <img
          src={imgSrc}
          className={`w-[90%] bg-white rounded-full object-cover border-2 ${
            status === "friend" ? " border-green-400" : ""
          } ${status === "unread" ? " border-red-500" : ""} ${
            status === "read" ? " border-gray-400" : ""
          }`}
          style={{ aspectRatio: 1 / 1 }}
        />
        {host ? (
          <p className="absolute right-0 bottom-0 text-blue-600">+</p>
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
