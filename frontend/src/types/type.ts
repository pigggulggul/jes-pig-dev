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
