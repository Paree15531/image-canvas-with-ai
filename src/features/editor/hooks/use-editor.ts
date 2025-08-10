import { RefObject, useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";
import {
  Editor,
  BuildEditorProps,
  SHAPE_CIRCLE,
  SHAPE_SQUARE,
  SHAPE_SQUARE_FULL,
  SHAPE_TRIANGLE,
  SHAPE_TRIANGLE_ROTATE,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  STROKE_DASH_ARRAY,
} from "../type";

import { isText } from "../utils";

type InitProps = {
  initialContainer: RefObject<HTMLDivElement | null>;
  initialCanvas: fabric.Canvas | null;
};

const buildEditor = ({
  canvas,
  filColor,
  strokeColor,
  strokeWidth,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
}: BuildEditorProps): Editor => {
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
    //添加大号正方形
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
    changeFillColor(val: string) {
      setFillColor(val);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: val });
      });
      canvas.requestRenderAll();
    },
    changeStrokeColor(val: string) {
      setStrokeColor(val);
      canvas.getActiveObjects().forEach((object) => {
        if (isText(object.type)) {
          object.set({ fill: val });
          return;
        }
        object.set({ stroke: val });
      });
      canvas.requestRenderAll();
    },
    changeStrokeWidth(val: number) {
      setStrokeWidth(val);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: val });
      });
      canvas.requestRenderAll();
    },
    changeStrokeDashArray(val: number[]) {
      setStrokeDashArray(val);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: val });
      });
      canvas.requestRenderAll();
    },
    filColor,
    strokeColor,
    strokeWidth,
    canvas,
    selectedObjects,
    strokeDashArray,
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
    evented: true,
    shadow: new fabric.Shadow({
      color: "rgb(0,0,0,0.8)",
      blur: 10,
    }),
  }) as fabric.Rect & {
    isWorkArea: boolean;
  };
  workspace.isWorkArea = true;
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
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [filColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  //创建工作空间中形状的成员，可以编辑样式
  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        filColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
      });
    }
    return;
  }, [
    canvas,
    filColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
  ]);

  //监听元素大小变化，自适应并居中工作空间元素
  useAutoResize({
    canvas,
    containter,
  });

  //设置canvas事件,获取当前在canvas画布中的活跃元素
  useCanvasEvents({
    canvas,
    setSelectedObjects,
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
    }
  }, []);

  return {
    init,
    editor,
  };
};

export { useEditor };
