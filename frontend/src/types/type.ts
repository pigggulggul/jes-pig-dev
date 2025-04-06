import { ImagePosType } from "./conceptmaker/comceptMakerUi";

export interface loginUser {
  userId: string;
  userPassword: string;
}
export interface registUser {
  userId: string;
  userPassword: string;
  nickname: string;
}
export interface brushType {
  type: string;
  color: string;
  width: number;
}
export interface canvasType {
  type: string;
  width: number;
  height: number;
  backgroundColor: string;
}
export type SideBarItemType = "type" | "setting" | "profile";

//필요한 것 : 프사, 이름, 스토리상태(읽음, 안읽음, 친한친구)
export interface StoryPeopleProps {
  imgSrc?: string;
  nickname: string;
  storyStatus: StoryStatusType;
  showSizeSettings: boolean;
  imageSize: ImagePosType;
}
export type StoryStatusType = "read" | "unread" | "friend";

export interface InstaPostReactionType {
  heart: number;
  comment: number;
  dm: number;
}
