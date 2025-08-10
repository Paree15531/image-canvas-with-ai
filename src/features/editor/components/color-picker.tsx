"use client";
import React, { use, useEffect } from "react";
import { ChromePicker, CirclePicker, ColorResult } from "react-color";
import { colors, Editor } from "../type";
import { rabaObjectToString } from "../utils";

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
    editor && (editor?.canvas.getActiveObject()?.get(colorType) as string);

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
