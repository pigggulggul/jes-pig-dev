import { RefObject } from "react";
import { StoryPeopleProps } from "../types/type";

/** 파일 업로드 (1개) */
export const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setStateSrc: React.Dispatch<React.SetStateAction<string>>
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setStateSrc(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }
};
/** 파일 업로드 (여러개) */
export const handleStoryFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  stateSrc: StoryPeopleProps[],
  setStateSrc: React.Dispatch<React.SetStateAction<StoryPeopleProps[]>>
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const copyState = [...stateSrc];
        copyState[idx].imgSrc = reader.result as string;
        setStateSrc(copyState);
      }
    };
    reader.readAsDataURL(file);
  }
};

/** 프로필 사진 선택 핸들러 매개변수: useRef */
export const onClickHandleProfile = (ref: RefObject<HTMLInputElement>) => {
  if (ref.current) {
    ref.current.click();
  }
};

/** 프로필 사진 선택 핸들러 (여러개) */
export const onClickHandleMultiProfile = (
  ref: React.MutableRefObject<RefObject<HTMLInputElement>[]>,
  idx: number
) => {
  if (ref.current[idx]) {
    ref.current[idx].current?.click();
  }
};
