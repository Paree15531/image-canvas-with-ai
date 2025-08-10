import { Dispatch, SetStateAction, useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: React.Dispatch<React.SetStateAction<fabric.Object[]>>;
}

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
      console.log("Canvas cleared, selected objects reset.");
    });
    return () => {
      if (canvas) {
        canvas.off("selection:cleared");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas]);
};
