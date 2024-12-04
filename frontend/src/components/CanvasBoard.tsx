import * as fabric from "fabric";
import { useEffect, useRef } from "react";
import { brushType, canvasType } from "../types/type";
import { changeRGBA } from "../util/changeRGBA";

interface CanvasBoardProps {
  isDrawing: boolean;
  stickerImgURL: string;
  brushType: brushType;
  canvasType: canvasType;
  clearStickerImgURL: () => void;
}

export default function CanvasBoard({
  isDrawing,
  stickerImgURL,
  brushType,
  canvasType,
  clearStickerImgURL,
}: CanvasBoardProps) {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const fixedWidth = 800; // 고정된 가로 크기

  useEffect(() => {
    // Fabric.js Canvas 초기화
    const newCanvas = new fabric.Canvas("canvas", {
      width: fixedWidth,
      height: 300,
      isDrawingMode: true,
    });
    canvasRef.current = newCanvas;

    //기본 화면 설정

    //기본 드로잉 설정
    const rgbaColor = changeRGBA(brushType.color);
    const highlighterBrush = new fabric.PencilBrush(newCanvas);
    highlighterBrush.color = "rgba(255, 255, 255, 0.9)"; // 형광펜 내부 색상
    highlighterBrush.width = 10; // 선 굵기
    highlighterBrush.shadow = new fabric.Shadow({
      color: rgbaColor, // 형광 테두리 색상
      blur: 10, // 테두리 흐림 효과
    });
    newCanvas.freeDrawingBrush = highlighterBrush;

    // 키보드 이벤트 등록
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (canvasRef.current && e.key === "Delete") {
        console.log("작동");
        const activeObjects = canvasRef.current.getActiveObjects();
        if (activeObjects.length) {
          activeObjects.forEach((obj) => {
            if (canvasRef.current) canvasRef.current.remove(obj);
          });
          canvasRef.current.discardActiveObject();
          canvasRef.current.renderAll();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      newCanvas.dispose();
      canvasRef.current = null;
    };
  }, []);

  // 캔버스 크기 변경
  useEffect(() => {
    if (canvasRef.current) {
      const aspectHeight = 1;
      const aspectWidth = 3;
      //비율에 딷른 새로운 크기
      const newHeight = canvasType.width * (aspectHeight / aspectWidth);

      // Canvas 크기 업데이트
      const previousHeight = canvasRef.current.height || 0;
      const scaleY = newHeight / previousHeight;
      canvasRef.current.setHeight(newHeight);

      console.log(newHeight);

      // 객체 스케일 조정
      canvasRef.current.getObjects().forEach((obj) => {
        obj.scaleY = (obj.scaleY || 1) * scaleY;
        obj.top = (obj.top || 0) * scaleY;
        obj.setCoords();
      });

      // Canvas 내용을 다시 렌더링
      canvasRef.current.renderAll();
    }
  }, [canvasType.width, canvasType.height]);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.backgroundColor = canvasType.backgroundColor;

      // Canvas 내용을 다시 렌더링
      canvasRef.current.renderAll();
    }
  }, [canvasType.backgroundColor]);

  // 모드 변경
  useEffect(() => {
    // isDrawingMode 변경 시 Canvas 업데이트
    if (canvasRef.current) {
      canvasRef.current.isDrawingMode = isDrawing;
      canvasRef.current.selection = !isDrawing;
      canvasRef.current.renderAll();
    }
  }, [isDrawing]);

  //펜 변경
  useEffect(() => {
    //기본 드로잉
    if (canvasRef.current) {
      const rgbaColor = changeRGBA(brushType.color);
      if (brushType.type === "highlight") {
        const highlighterBrush = new fabric.PencilBrush(canvasRef.current);
        highlighterBrush.color = "rgba(255, 255, 255, 1)"; // 형광펜 내부 색상
        highlighterBrush.width = brushType.width; // 선 굵기
        highlighterBrush.shadow = new fabric.Shadow({
          color: rgbaColor, // 형광 테두리 색상
          blur: 10, // 테두리 흐림 효과
        });
        canvasRef.current.freeDrawingBrush = highlighterBrush;
      } else if (brushType.type === "pencil") {
        const pencilBrush = new fabric.PencilBrush(canvasRef.current);
        pencilBrush.color = rgbaColor; // 형광펜 내부 색상
        pencilBrush.width = brushType.width; // 선 굵기
        canvasRef.current.freeDrawingBrush = pencilBrush;
      }
    }
  }, [brushType]);

  // 스티커 URL이 변경되면 이미지 추가
  useEffect(() => {
    if (stickerImgURL && canvasRef.current) {
      const canvas = canvasRef.current;
      fabric.FabricImage.fromURL(stickerImgURL, {
        crossOrigin: "anonymous",
      })
        .then((img) => {
          img.set({
            left: 0,
            top: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            hasControls: true,
            hasBorders: true,
            selectable: true,
          });
          canvas.add(img);
          canvas.setActiveObject(img);
        })
        .catch((error) => {
          console.error("이미지를 로드하는 중 오류 발생:", error);
        });
      clearStickerImgURL();
    }
  }, [stickerImgURL, clearStickerImgURL]);

  return (
    <div className="flex justify-center items-center">
      <canvas id="canvas" />
    </div>
  );
}
