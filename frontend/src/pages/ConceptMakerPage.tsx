import { createRef, RefObject, useEffect, useRef, useState } from "react";
import TypeButton from "../components/TypeButton";
import {
  InstaPostReactionType,
  SideBarItemType,
  StoryPeopleProps,
  StoryStatusType,
} from "../types/type";
import InstaStoryThumb from "../components/InstaStoryThumb";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import NewButton from "../components/NewButton";
import React from "react";
import {
  handleFileUpload,
  handleStoryFileUpload,
  onClickHandleMultiProfile,
  onClickHandleProfile,
} from "../util/fileUpload";
import { formatNumberInsta } from "../util/format";

export default function ConceptMakerPage() {
  const profileImgDefault = "/src/assets/images/insta_profile_default.webp";
  const [makerType, setMakerType] = useState<SideBarItemType>("type");
  const [profileImg, setProfileImg] = useState<string>(profileImgDefault);
  const [profileNickname, setProfileNickname] = useState<string>("");
  const profileImgRef = useRef<HTMLInputElement>(null);

  const [storyPeople, setStoryPeople] = useState<StoryPeopleProps[]>([
    { imgSrc: profileImgDefault, nickname: "게스트", storyStatus: "unread" },
  ]);
  const storyPeopleFileRef = useRef<RefObject<HTMLInputElement>[]>([]);

  const [instaPostProfile, setInstaPostProfile] =
    useState<string>(profileImgDefault);
  const [instaPostNick, setInstaPostNick] = useState<string>("");
  const [instaPost, setInstaPost] = useState<string>("");
  const [instaPostContent, setInstaPostContent] = useState<string>("");
  const instaProfileRef = useRef<HTMLInputElement>(null);
  const instaPostRef = useRef<HTMLInputElement>(null);

  const [instaPostReaction, setInstaPostReaction] =
    useState<InstaPostReactionType>({ heart: 0, comment: 0, dm: 0 });

  // storyPeople이 변경될 때마다 ref 배열 업데이트
  useEffect(() => {
    storyPeopleFileRef.current = Array(storyPeople.length)
      .fill(null)
      .map(
        (_, i) => storyPeopleFileRef.current[i] || createRef<HTMLInputElement>()
      );
  }, [storyPeople]);

  const onChangeProfileNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileNickname(e.target.value);
  };
  const onChangePostNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstaPostNick(e.target.value);
  };
  const onChangePostContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstaPostContent(e.target.value);
  };
  const onChangePostReaction = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "heart" | "comment" | "dm"
  ) => {
    setInstaPostReaction((prevState) => ({
      ...prevState,
      [type]: Number(e.target.value),
    }));
  };

  useEffect(() => {
    console.log(instaPostReaction);
  }, [instaPostReaction]);

  // 닉네임 변경
  const onChangeStoryNick = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const copyState = [...storyPeople];
    copyState[idx].nickname = e.target.value;
    setStoryPeople(copyState);
  };
  // 상태 변경
  const onChangeStoryStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    const copyState = [...storyPeople];
    copyState[idx].storyStatus = e.target.value as StoryStatusType;
    setStoryPeople(copyState);
  };

  // 스토리 인원 늘리기
  const addStoryPeople = () => {
    //필요한 것 : 프사, 이름, 스토리상태(읽음, 안읽음, 친한친구)
    setStoryPeople((prev) => [
      ...prev,
      {
        imgSrc: profileImgDefault,
        nickname: "게스트",
        storyStatus: "unread",
      },
    ]);
  };
  const deleteStoryPeople = (idx: number) => {
    // storyPeople 배열에서 해당 인덱스 제거
    setStoryPeople((prev) => prev.filter((_, index) => index !== idx));

    // ref 배열에서도 해당 인덱스 제거
    storyPeopleFileRef.current = storyPeopleFileRef.current.filter(
      (_, index) => index !== idx
    );
  };

  //사이드바 컴포넌트
  const sidebarComponent = () => {
    return (
      <>
        {makerType === "type" ? (
          <div className="w-full p-2 ">
            <ul>
              <li
                className="w-[30%] h-auto my-2 flex flex-col items-center cursor-pointer"
                onClick={() => {}}
              >
                <img
                  className="w-20 h-32"
                  src="/src/assets/images/concept_type_insta.png"
                  alt=""
                />
                <p className="my-1">인스타그램</p>
              </li>
            </ul>
          </div>
        ) : null}
        {makerType === "setting" ? (
          <div className="w-full p-2 overflow-scroll">
            <div>
              <p className="w-full text-start">내 프로필 설정</p>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[25%]">
                  <div className="w-full">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      ref={profileImgRef}
                      onChange={(e) => {
                        handleFileUpload(e, setProfileImg);
                      }}
                    />
                  </div>
                  <img
                    className="w-full my-2 cursor-pointer rounded-full"
                    src={
                      profileImg
                        ? profileImg
                        : "/src/assets/images/insta_profile_default.webp"
                    }
                    style={{ aspectRatio: 1 / 1 }}
                    alt=""
                    onClick={() => {
                      onClickHandleProfile(profileImgRef);
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="text-[14px] me-1 text-center"
                    placeholder="닉네임을 입력해주세요"
                    onChange={onChangeProfileNickname}
                  />
                </div>
              </div>
              <p className="w-full text-start mt-4">스토리 인원 설정</p>
              <div className="w-full flex flex-col items-center justify-center">
                <ul className="w-full">
                  {storyPeople.map((item, index) => {
                    return (
                      <li className="relative w-full h-28 bg-white rounded-md border flex py-4 px-2 my-4">
                        <div className="w-[30%]">
                          <input
                            type="file"
                            accept="image/*"
                            ref={storyPeopleFileRef.current[index]}
                            onChange={(e) =>
                              handleStoryFileUpload(
                                e,
                                index,
                                storyPeople,
                                setStoryPeople
                              )
                            }
                            className="hidden"
                          />
                          <img
                            className="rounded-full h-full object-cover cursor-pointer"
                            src={item.imgSrc}
                            style={{ aspectRatio: 1 / 1 }}
                            alt=""
                            onClick={() => {
                              onClickHandleMultiProfile(
                                storyPeopleFileRef,
                                index
                              );
                            }}
                          />
                        </div>
                        <div className="w-[70%] flex flex-col justify-center items-start ps-4">
                          <p
                            className="absolute top-0 right-1 cursor-pointer"
                            onClick={() => deleteStoryPeople(index)}
                          >
                            x
                          </p>
                          <div className="flex my-2 items-center">
                            <p className="w-[30%]">닉네임:</p>
                            <input
                              className="w-[70%] border border-gray-200 rounded-md py-1"
                              type="text"
                              value={item.nickname}
                              onChange={(e) => {
                                onChangeStoryNick(e, index);
                              }}
                            />
                          </div>
                          <div className="flex items-center">
                            <p className="w-[25%]">상태:</p>
                            <select
                              value={item.storyStatus}
                              onChange={(e) => onChangeStoryStatus(e, index)}
                              className="block w-[80%] mx-1 px-1 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="unread">안읽음</option>
                              <option value="read">읽음</option>
                              <option value="friend">친한 친구 공개</option>
                            </select>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {storyPeople.length < 4 ? (
                  <NewButton
                    label="추가하기"
                    width={120}
                    backgroundColor="#ffacae"
                    onClick={() => {
                      addStoryPeople();
                    }}
                  />
                ) : null}
              </div>
              <div className="w-full">
                <p className="w-full text-start mt-4">게시글 설정</p>
                <div className="relative w-full bg-white rounded-md border py-4 px-2 my-4">
                  <div className="flex">
                    <div className="relative w-[30%] h-full flex items-center justify-center">
                      <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        ref={instaProfileRef}
                        onChange={(e) => {
                          handleFileUpload(e, setInstaPostProfile);
                        }}
                      />

                      <img
                        className="h-full my-2 cursor-pointer rounded-full border border-gray-300 object-cover"
                        src={
                          instaPostProfile
                            ? instaPostProfile
                            : "/src/assets/images/insta_profile_default.webp"
                        }
                        style={{ aspectRatio: 1 / 1 }}
                        alt=""
                        onClick={() => {
                          onClickHandleProfile(instaProfileRef);
                        }}
                      />
                    </div>
                    <div className="w-[70%] flex flex-col justify-center items-start ps-4">
                      <div className="flex my-2 items-center">
                        <p className="w-[30%]">닉네임:</p>
                        <input
                          className="w-[70%] border border-gray-200 rounded-md py-1"
                          type="text"
                          value={instaPostNick}
                          onChange={onChangePostNickname}
                          placeholder="닉네임을 입력해주세요."
                        />
                      </div>
                      <div className="flex my-2 items-center">
                        <p className="">게시글 선택:</p>
                        <input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          ref={instaPostRef}
                          onChange={(e) => {
                            handleFileUpload(e, setInstaPost);
                          }}
                        />
                        <div
                          className="border border-gray-300 bg-gray-100 px-2 py-1 ms-1 rounded-md cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            onClickHandleProfile(instaPostRef);
                          }}
                        >
                          등록하기
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mt-2">
                      <div className="flex items-center me-1">
                        <IoMdHeartEmpty />
                        <input
                          className="w-16 text-[10px] border mx-1 rounded-sm"
                          type="number"
                          placeholder="숫자 입력"
                          onChange={(e) => {
                            onChangePostReaction(e, "heart");
                          }}
                        />
                      </div>
                      <div className="flex items-center me-1">
                        <FaRegComment className="me-[2px]" />
                        <input
                          className="w-16 text-[10px] border mx-1 rounded-sm"
                          type="number"
                          placeholder="숫자 입력"
                          onChange={(e) => {
                            onChangePostReaction(e, "comment");
                          }}
                        />
                      </div>
                      <div className="flex items-center me-1">
                        <IoPaperPlaneOutline />
                        <input
                          className="w-16 text-[10px] border mx-1 rounded-sm"
                          type="number"
                          placeholder="숫자 입력"
                          onChange={(e) => {
                            onChangePostReaction(e, "dm");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="w-full text-start mt-2">내용 입력</p>
                    <input
                      className="w-full mt-1 border border-gray-200"
                      type="text"
                      onChange={(e) => {
                        onChangePostContent(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };
  return (
    <section className="h-[93%] flex">
      <div className="w-[25%] flex bg-gray-50">
        <div className="w-[15%] bg-gray-200 flex flex-col">
          <TypeButton
            label="타입"
            onClick={() => {
              setMakerType("type");
            }}
          />
          <TypeButton
            label="설정"
            onClick={() => {
              setMakerType("setting");
            }}
          />
          <TypeButton
            label="프로필"
            onClick={() => {
              setMakerType("profile");
            }}
          />
        </div>
        {sidebarComponent()}
      </div>
      <div className="relative w-[75%] h-full flex-col items-center justify-center font-insta">
        <div className="relative w-full h-[90%] py-4 flex items-center justify-center">
          <div
            className="relative h-full bg-white border"
            style={{ aspectRatio: 9 / 16 }}
          >
            <ul className="relative w-full h-[15%] bg-white flex justify-start items-center">
              <InstaStoryThumb
                width={20}
                host
                nickname="내 스토리"
                imgSrc={profileImg}
              />
              {/* 컴포넌트 추가를 하면 나오는 창 */}
              {storyPeople.map((item) => {
                return (
                  <InstaStoryThumb
                    width={20}
                    nickname={item.nickname}
                    imgSrc={item.imgSrc}
                    status={item.storyStatus}
                  />
                );
              })}
            </ul>
            <div className="w-full h-[10%] bg-white border-y border-gray-100">
              <div className="flex h-full items-center px-2">
                <img
                  className="h-[70%] bg-gray-300 rounded-full"
                  style={{ aspectRatio: 1 / 1 }}
                  src={instaPostProfile}
                />
                <div className="flex flex-col justify-center px-2">
                  <p className="w-full text-start text-[7px] font-bold">
                    {instaPostNick ? instaPostNick : "게시글 설정을 해주세요"}
                  </p>
                  <p className="w-full text-start text-[6px]">위치</p>
                </div>
              </div>
            </div>
            <img
              className="w-full bg-red-50 object-cover"
              src={instaPost}
              style={{ aspectRatio: 1 / 1 }}
            />
            <div className="w-full h-[5%] flex justify-between py-[1px] px-2 bg-white">
              <div className="flex items-center">
                <div className="flex items-center me-2">
                  <IoMdHeart className="color-text-red1" />
                  <p className="text-[8px] mx-[2px]">
                    {formatNumberInsta(instaPostReaction.heart)}
                  </p>
                </div>
                <div className="flex items-center me-2">
                  <FaRegComment className="me-[2px]" />
                  <p className="text-[8px] mx-[2px]">
                    {formatNumberInsta(instaPostReaction.comment)}
                  </p>
                </div>
                <div className="flex items-center me-2">
                  <IoPaperPlaneOutline />
                  <p className="text-[8px] mx-[2px]">
                    {formatNumberInsta(instaPostReaction.dm)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <GoBookmark />
              </div>
            </div>
            <div className="max-h-[10%] text-[6px] text-start px-2">
              <p className="font-bold">{instaPostNick}</p>
              <div className="flex">
                <p>{instaPostContent}</p>
                <p className="text-gray-500 mx-1">더 보기</p>
              </div>
              <p className="py-[2px] text-gray-500">5일 전</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
