import { RefObject, useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { useRuler } from "../hooks/use-ruler";
import {
  CreateShapesMember,
  SHAPE_CIRCLE,
  SHAPE_SQUARE,
  SHAPE_SQUARE_FULL,
  SHAPE_TRIANGLE,
  SHAPE_TRIANGLE_ROTATE,
} from "../shapes-types";

type InitProps = {
  initialContainer: RefObject<HTMLDivElement | null>;
  initialCanvas: fabric.Canvas | null;
};

const buildShapes = (canvas: fabric.Canvas): CreateShapesMember => {
  //设置新添加的元素在工作空间中居中
  const centerFabricObject = (objes: fabric.Object) => {
    const workspaceInstance = canvas
      .getObjects()
      .find((object) => object.name === "workspace") as fabric.Rect;

    if (!workspaceInstance) return;
    const center = workspaceInstance.getCenterPoint();

    //@ts-ignore
    canvas._centerObject(objes, center);
  };

  //添加元素到画布中
  const addToCanvas = (object: fabric.Object) => {
    //居中元素到工作空间
    if (!object) return;
    centerFabricObject(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    addCircle() {
      const circle = new fabric.Circle({
        ...SHAPE_CIRCLE,
      });
      addToCanvas(circle);
    },
    //添加正方形
    addSquare() {
      const square = new fabric.Rect({
        ...SHAPE_SQUARE,
      });
      addToCanvas(square);
    },
    //添加全屏正方形
    addSquareFull() {
      const squareFull = new fabric.Rect({
        ...SHAPE_SQUARE_FULL,
      });
      addToCanvas(squareFull);
    },
    addTriangle() {
      const triangle = new fabric.Triangle({
        ...SHAPE_TRIANGLE,
      });
      addToCanvas(triangle);
    },
    addTriangleRotate() {
      const triangle = new fabric.Triangle({
        ...SHAPE_TRIANGLE_ROTATE,
      });
      addToCanvas(triangle);
    },
  };
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

  //创建一个useMemo钩子来创建工作空间的成员
  //这里可以根据需要添加更多的成员或逻辑
  const createShapesMember = useMemo(() => {
    if (canvas) {
      return buildShapes(canvas);
    }
    return;
  }, [canvas]);

  //监听元素大小变化，自适应并居中工作空间元素
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
    createShapesMember,
  };
};

export { useEditor };
