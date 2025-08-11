"use client";
import React from "react";
import { ColorResult } from "react-color";
import { colors, Editor, FILL_COLOR } from "../type";
import { rabaObjectToString } from "../utils";
import dynamic from "next/dynamic";

//由于react-color包在服务端渲染会存在水和错误，所以强制客服端渲染，禁用ssr
const ChromePicker = dynamic(
  () => import("react-color").then((mod) => mod.ChromePicker),
  { ssr: false }
);

const CirclePicker = dynamic(
  () => import("react-color").then((mod) => mod.CirclePicker),
  { ssr: false }
);

interface ColorPickerProps {
  onChange: (value: string) => void;
  editor?: Editor;
  colorType: keyof fabric.Object; // 'fill' or 'stroke'
}

export default function ColorPicker({
  onChange,
  editor,
  colorType,
}: ColorPickerProps) {
  const handleChromeChange = (color: ColorResult) => {
    const rgbaString = rabaObjectToString(color.rgb);
    onChange(rgbaString);
  };

  const handleCircleChange = (color: ColorResult) => {
    const rgbaString = rabaObjectToString(color.rgb);
    onChange(rgbaString);
  };

  //获取选中元素的fill颜色并在调色板正确回显
  const fillColor =
    (editor && (editor?.canvas.getActiveObject()?.get(colorType) as string)) ||
    FILL_COLOR;

  return (
    <div>
      <ChromePicker color={fillColor} onChangeComplete={handleChromeChange} />
      <CirclePicker
        color={fillColor}
        colors={colors}
        onChange={handleCircleChange}
      />
    </div>
  );
}
