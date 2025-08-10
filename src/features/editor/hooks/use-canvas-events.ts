import { Dispatch, SetStateAction, useEffect } from "react";
import { fabric } from "fabric";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: React.Dispatch<React.SetStateAction<fabric.Object[]>>;
}

//判断是否为工作空间元素
const isWorkArea = (
  object: unknown
): object is fabric.Rect & { isWorkArea: boolean } => {
  //需要确定object是fabric.Rect类型，并且有isWorkArea属性
  if (object instanceof fabric.Rect && "isWorkArea" in object) {
    return true;
  }
  return false;
};

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;
    canvas.on("selection:created", (e) => {
      setSelectedObjects(e.selected || []);
    });
    canvas.on("selection:updated", (e) => {
      setSelectedObjects(e.selected || []);
    });
    canvas.on("canvas:cleared", () => {
      setSelectedObjects([]);
    });
    canvas.on("mouse:down", (e) => {
      if (e.target && isWorkArea(e.target)) {
        // 如果点击的是工作区，则清除选中状态
        setSelectedObjects([]);
      }
    });
    return () => {
      if (canvas) {
        canvas.off("selection:cleared");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
        canvas.off("mouse:down");
      }
    };
  }, [canvas]);
};
