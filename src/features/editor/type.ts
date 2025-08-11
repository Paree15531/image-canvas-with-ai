import { ITextOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

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

export const fontsMap = {
  微软雅黑: "微软雅黑", // Microsoft YaHei
  宋体: "SimSun", // 宋体
  黑体: "SimHei", // 黑体
  楷体: "KaiTi", // 楷体
  仿宋: "FangSong", // 仿宋
  隶书: "LiSu", // 隶书
  幼圆: "YouYuan", // 幼圆
  华文宋体: "STSong", // 华文宋体
  华文楷体: "STKaiti", // 华文楷体
  华文黑体: "STHeiti", // 华文黑体
  华文仿宋: "STFangsong", // 华文仿宋
  "Arial black": "Arial black",
  Verdana: "Verdana",
  Helvetica: "Helvetica",
  "Times New Roman": "Times New Roman",
  "Courier New": "Courier New",
  Georgia: "Georgia",
  Tahoma: "Tahoma",
  Impact: "Impact",
  "Comic Sans MS": "Comic Sans MS",
  "Trebuchet MS": "Trebuchet MS",
  "Palatino Linotype": "Palatino Linotype",
  "Lucida Console": "Lucida Console",
  Consolas: "Consolas",
  "Franklin Gothic Medium": "Franklin Gothic Medium",
  "Gill Sans": "Gill Sans",
  "Bookman Old Style": "Bookman Old Style",
  Candara: "Candara",
  "Edwardian Script ITC": "Edwardian Script ITC",
};

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],

  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];
export type fontFamilyType = keyof typeof fontsMap;

//build参数类型定义
export interface BuildEditorProps {
  canvas: fabric.Canvas;
  filColor: string;
  strokeColor: string;
  strokeWidth: number;
  setFillColor: (filColor: string) => void;
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  setStrokeDashArray: (strokeDashArray: number[]) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
}

//build返回类型定义
export interface Editor {
  addCircle: () => void;
  addSquare: () => void;
  addSquareFull: () => void;
  addTriangle: () => void;
  addTriangleRotate: () => void;
  changeFillColor: (val: string) => void;
  changeStrokeColor: (val: string) => void;
  changeStrokeWidth: (val: number) => void;
  changeStrokeDashArray: (val: number[]) => void;
  filColor: string;
  strokeColor: string;
  strokeWidth: number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  objectBringToFront: () => void;
  objectSendToBack: () => void;
  changeOpacity: (val: number) => void;
  addText: (text: string, options?: ITextOptions) => void;
  changeTextFontFamily: (key: fontFamilyType, value: string) => void;
  fontFamily: string;
}

export const FILL_COLOR = "rgba(0,0,0)";
export const STROKE_COLOR = "rgba(0,0,0)";
export const STROKE_WIDTH = 1;
export const STROKE_DASH_ARRAY = [];
export const OPACTIY = 1;
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Arial";
export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

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
