import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  containter: HTMLDivElement | null;
}

const useAutoResize = ({ canvas, containter }: UseAutoResizeProps) => {
  //获取containter元素的宽高，并设置到canvas上
  const autoZoom = useCallback(() => {
    if (!canvas || !containter) {
      return;
    }
    canvas.renderOnAddRemove = false;
    const width = containter.offsetWidth;
    const height = containter.offsetHeight;
    canvas.setDimensions({
      width,
      height,
    });
    canvas.renderOnAddRemove = true;
    canvas.renderAll();

    const center = canvas.getCenter();
    console.log(center);
  }, [canvas, containter]);

  useEffect(() => {
    if (!canvas || !containter) {
      return;
    }

    let containerObserver: ResizeObserver | null;
    containerObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        autoZoom();
      }
    });
    containerObserver.observe(containter);

    return () => {
      if (containerObserver) {
        containerObserver.disconnect();
      }
    };
  }, [canvas, containter]);
};

export { useAutoResize };
