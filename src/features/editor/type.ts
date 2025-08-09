export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "ImageIcon"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates"
  | "draw";

//build参数类型定义
export interface BuildEditorProps {
  canvas: fabric.Canvas;
  filColor: string;
  strokeColor: string;
  strokeWidth: number;
  setFillColor: (filColor: string) => void;
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number) => void;
}

//build返回类型定义
export interface Editor {
  addCircle: () => void;
  addSquare: () => void;
  addSquareFull: () => void;
  addTriangle: () => void;
  addTriangleRotate: () => void;
  // setFillColor: (filColor: string) => void;
  // setStrokeColor: (strokeColor: string) => void;
  // setStrokeWidth: (strokeWidth: number) => void;
  changeFillColor: (val: string) => void;
  changeStrokeColor: (val: string) => void;
  changeStrokeWidth: (val: number) => void;
  filColor: string;
  strokeColor: string;
  strokeWidth: number;
  canvas: fabric.Canvas;
}

export const FILL_COLOR = "rgba(0,0,0)";
export const STROKE_COLOR = "rgba(0,0,0)";
export const STROKE_WIDTH = 1;

export const SHAPE_CIRCLE = {
  radius: 150,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
};

export const SHAPE_SQUARE = {
  width: 100,
  height: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
};

export const SHAPE_SQUARE_FULL = {
  width: 200,
  height: 200,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
};

export const SHAPE_TRIANGLE = {
  width: 100,
  height: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
};

export const SHAPE_TRIANGLE_ROTATE = {
  width: 100,
  height: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  angle: 180,
};
