import { RefObject, useCallback, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";

type InitProps = {
  initialContainer: RefObject<HTMLDivElement | null>;
  initialCanvas: fabric.Canvas | null;
};

//创建工作空间
const createWorkSpace = (initialCanvas: fabric.Canvas) => {
  const workspace = new fabric.Rect({
    width: 900,
    height: 1200,
    name: "workspace",
    fill: "white",
    selectable: false,
    hasControls: false,
    shadow: new fabric.Shadow({
      color: "rgb(0,0,0,0.8)",
      blur: 10,
    }),
  });

  //将工作空间元素矩形添加至画布中，并且在画布中居中，并且设置为裁剪路径，canvas上的元素只在Rect中显示
  initialCanvas.add(workspace);
  initialCanvas.centerObject(workspace);
  initialCanvas.clipPath = workspace;

  return { workspaceInstance: workspace };
};

//设置fabric控件样式
const settingFabricControlsStyle = () => {
  //设置画布的所有元素控件的样式
  fabric.Object.prototype.set({
    cornerColor: "#fff",
    cornerStyle: "circle",
    borderColor: "#3b82f6",
    borderScaleFactor: 1.5,
    transparentCorners: false,
    borderOpacityWhenMoving: 1,
    cornerStrokeColor: "#3b82f6",
  });
};

const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [containter, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    containter,
  });

  const init = useCallback(({ initialContainer, initialCanvas }: InitProps) => {
    if (initialCanvas && initialContainer?.current) {
      //设置画布宽高
      initialCanvas?.setWidth(initialContainer.current.offsetWidth);
      initialCanvas?.setHeight(initialContainer.current.offsetHeight);
      createWorkSpace(initialCanvas);
      settingFabricControlsStyle();
      setCanvas(initialCanvas);
      setContainer(initialContainer.current);

      const testRect = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "black",
      });
      initialCanvas.add(testRect);
      initialCanvas.centerObject(testRect);
    }
  }, []);

  return {
    init,
  };
};

export { useEditor };
