import { useState } from "react";
import TypeButton from "../components/TypeButton";
import CanvasBoard from "../components/CanvasBoard";
import PenPalette from "../components/PenPalette";
import { brushType, canvasType } from "../types/type";

export default function HeaderMakerPage() {
  const [makerType, setMakerType] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(true);
  const [customSticker, setCustomSticker] = useState<string>("");
  const [stickerImgURL, setStickerImgURL] = useState<string>("");
  const [brushType, setBrushType] = useState<brushType>({
    type: "highlight",
    color: "#342500",
    width: 10,
  });
  const [canvasType, setCanvasType] = useState<canvasType>({
    type: "x",
    backgroundColor: "#ffffff",
    width: 800,
    height: 600,
  });
  return (
    <section className="h-[100%] flex">
      <div className="w-[25%] flex bg-gray-50">
        <div className="w-[15%] bg-gray-200 flex flex-col">
          <TypeButton label="타입" onClick={() => changeType(0)} />
          <TypeButton label="헤더" onClick={() => changeType(1)} />
          <TypeButton label="프로필" onClick={() => changeType(2)} />
        </div>
        {headerMakerComponent()}
      </div>
      <div className="w-[75%] h-[60%] flex items-center justify-center">
        <CanvasBoard
          isDrawing={isDrawing}
          stickerImgURL={stickerImgURL}
          clearStickerImgURL={() => setStickerImgURL("")} // URL 초기화 함수
          brushType={brushType}
          canvasType={canvasType}
        />
      </div>
    </section>
  );
  function headerMakerComponent() {
    if (makerType == 0)
      return (
        <div className="h-[90%] w-full p-4 overflow-y-scroll">
          <div className="flex justify-between">
            <p>유형</p>
            <p>{"<<"}</p>
          </div>
          <div className="my-4">
            <p className="text-start">크기</p>
            <div className="flex items-center justify-center my-4">
              <input
                className="w-[40%] text-center rounded-md border-2 py-1 color-border-gray2"
                type="number"
                value={canvasType.width}
                onChange={changeCanvasWidth}
              />
              <p className="mx-4">x</p>
              <input
                className="w-[40%] text-center rounded-md border-2 py-1 color-border-gray2"
                type="number"
                value={canvasType.height}
                onChange={changeCanvasHeight}
              />
            </div>
          </div>
          <div className="my-4">
            <p className="text-start">배경색</p>
            <ul className="border-4 rounded-md color-border-purple1 flex flex-wrap">
              <PenPalette
                backgroundColor="#08f7fe"
                onClick={() => changeBgColor("#08f7fe")}
              />
              <PenPalette
                backgroundColor="#09fbd3"
                onClick={() => changeBgColor("#09fbd3")}
              />
              <PenPalette
                backgroundColor="#fe53bb"
                onClick={() => changeBgColor("#fe53bb")}
              />
              <PenPalette
                backgroundColor="#f5d300"
                onClick={() => changeBgColor("#f5d300")}
              />
              <PenPalette
                backgroundColor="#7898fb"
                onClick={() => changeBgColor("#7898fb")}
              />
              <PenPalette
                backgroundColor="#001437"
                onClick={() => changeBgColor("#001437")}
              />
              <PenPalette
                backgroundColor="#b76cfd"
                onClick={() => changeBgColor("#b76cfd")}
              />
              <PenPalette
                backgroundColor="#ff2281"
                onClick={() => changeBgColor("#ff2281")}
              />
              <PenPalette
                backgroundColor="#011ffd"
                onClick={() => changeBgColor("#011ffd")}
              />
            </ul>
          </div>
          <p className="mt-4 text-start">모드 선택</p>
          <div className="flex justify-between my-1">
            <p
              className={`flex items-center text-md px-4 py-2 rounded-xl cursor-pointer border-4 color-border-purple1  ${
                isDrawing
                  ? "color-bg-purple1 color-text-lightgray1"
                  : "color-text-purple1 hover:color-bg-purple1 hover:color-text-lightgray1"
              }`}
              onClick={() => setIsDrawing(true)} // 그리기 모드 활성화
            >
              그리기 모드
            </p>
            <p
              className={`flex items-center text-md px-4 py-2 rounded-xl cursor-pointer border-4 color-border-purple1  ${
                isDrawing
                  ? "color-text-purple1 hover:color-bg-purple1 hover:color-text-lightgray1"
                  : "color-bg-purple1 color-text-lightgray1"
              }`}
              onClick={() => setIsDrawing(false)} // 편집 모드 활성화
            >
              편집 모드
            </p>
          </div>
          <p className="text-xl mt-4 text-start">펜 설정</p>
          <div className="flex justify-between my-2">
            <p>종류</p>
            <div className="flex items-center">
              <div className="flex items-center justify-center mx-2">
                <p
                  className="mx-1 cursor-pointer"
                  onClick={() => {
                    setBrushType({ ...brushType, type: "highlight" });
                  }}
                >
                  형광펜
                </p>
                <p
                  className="mx-1 cursor-pointer"
                  onClick={() => {
                    setBrushType({ ...brushType, type: "pencil" });
                  }}
                >
                  연필
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <p>크기</p>
            <div className="flex w-[40%] items-center">
              <input
                className="w-[75%]"
                type="range"
                min="1"
                max="48"
                value={brushType.width}
                onChange={changeBrushWidth}
              />
              <div className="w-[25%] flex items-center justify-center mx-2">
                <div
                  className="rounded-full w-4 h-4"
                  style={{
                    backgroundColor: brushType.color,
                    width: brushType.width / 2 + "px",
                    height: brushType.width / 2 + "px",
                  }}
                />
              </div>
            </div>
          </div>
          <ul className="border-4 rounded-md color-border-purple1 flex flex-wrap">
            <PenPalette
              backgroundColor="#08f7fe"
              onClick={() => changeBrushColor("#08f7fe")}
            />
            <PenPalette
              backgroundColor="#09fbd3"
              onClick={() => changeBrushColor("#09fbd3")}
            />
            <PenPalette
              backgroundColor="#fe53bb"
              onClick={() => changeBrushColor("#fe53bb")}
            />
            <PenPalette
              backgroundColor="#f5d300"
              onClick={() => changeBrushColor("#f5d300")}
            />
            <PenPalette
              backgroundColor="#7898fb"
              onClick={() => changeBrushColor("#7898fb")}
            />
            <PenPalette
              backgroundColor="#001437"
              onClick={() => changeBrushColor("#001437")}
            />
            <PenPalette
              backgroundColor="#b76cfd"
              onClick={() => changeBrushColor("#b76cfd")}
            />
            <PenPalette
              backgroundColor="#ff2281"
              onClick={() => changeBrushColor("#ff2281")}
            />
            <PenPalette
              backgroundColor="#011ffd"
              onClick={() => changeBrushColor("#011ffd")}
            />
          </ul>
          <div className="my-4">
            <p className="text-start">스티커</p>
            <ul className="py-2 flex flex-wrap">
              <li className="w-[30%] h-auto my-2 flex flex-col items-center">
                <img
                  className="w-18 h-20"
                  src="/src/assets/images/age_15.png"
                  alt=""
                  onClick={onClickHandleSticker}
                />
                <p>15세 이용가</p>
              </li>
              <li className="w-[30%] h-auto my-2 flex flex-col items-center">
                <img
                  className="w-18 h-20"
                  src="/src/assets/images/age_15.png"
                  alt=""
                  onClick={onClickHandleSticker}
                />
                <p>15세 이용가</p>
              </li>
              <li className="w-[30%] h-auto my-2 flex flex-col items-center">
                <img
                  className="w-18 h-20"
                  src="/src/assets/images/age_15.png"
                  alt=""
                  onClick={onClickHandleSticker}
                />
                <p>15세 이용가</p>
              </li>
              <li className="w-[30%] h-auto my-2 flex flex-col items-center">
                <img
                  className="w-18 h-20"
                  src="/src/assets/images/age_15.png"
                  alt=""
                  onClick={onClickHandleSticker}
                />
                <p>15세 이용가</p>
              </li>
            </ul>
            <p className="text-start">커스텀 스티커</p>
            <input
              className="w-full "
              type="file"
              onChange={handleFileUpload}
            />
            {customSticker !== "" ? (
              <img
                className="w-18 h-20 my-2 cursor-pointer"
                src={customSticker}
                alt=""
                onClick={onClickHandleSticker}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    else if (makerType == 1)
      return (
        <div className="h-full w-full p-4 overflow-y-scroll">page 2입니다</div>
      );
    else if (makerType == 2)
      return (
        <div className="h-full w-full p-4 overflow-y-scroll">page 3입니다</div>
      );
  }
  function changeType(num: number) {
    setMakerType(num);
  }

  // 스티커 이미지 선택 핸들러
  function onClickHandleSticker(e: React.MouseEvent<HTMLImageElement>) {
    const src = e.currentTarget.src; // 클릭한 이미지의 src 속성
    setStickerImgURL(src); // URL을 상태로 등록
  }

  // 캔버스 설정
  // 배경 설정
  function changeBgColor(backgroundColor: string) {
    setCanvasType({ ...canvasType, backgroundColor });
  }
  // 크기 설정
  function changeCanvasWidth(event: React.ChangeEvent<HTMLInputElement>) {
    if (canvasType.type === "x") {
      setCanvasType({
        ...canvasType,
        width: Number(event.target.value),
        height: Number(event.target.value) / 3,
      });
    }
  }
  function changeCanvasHeight(event: React.ChangeEvent<HTMLInputElement>) {
    setCanvasType({
      ...canvasType,
      width: Number(event.target.value) * 3,
      height: Number(event.target.value),
    });
  }

  // 브러쉬 설정
  function changeBrushColor(color: string) {
    setBrushType({ ...brushType, color: color });
  }
  function changeBrushWidth(event: React.ChangeEvent<HTMLInputElement>) {
    setBrushType({ ...brushType, width: Number(event.target.value) });
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setCustomSticker(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
