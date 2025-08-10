"use client";
import React from "react";
import { ChromePicker, CirclePicker, ColorResult } from "react-color";
import { colors } from "../type";
import { rabaObjectToString } from "../utils";

interface ColorPickerProps {
  onChange: (value: string) => void;
  value?: string;
}

export default function ColorPicker({ onChange, value }: ColorPickerProps) {
  const handleChromeChange = (color: ColorResult) => {
    const rgbaString = rabaObjectToString(color.rgb);
    onChange(rgbaString);
  };

  const handleCircleChange = (color: ColorResult) => {
    const rgbaString = rabaObjectToString(color.rgb);
    onChange(rgbaString);
  };

  return (
    <div>
      <ChromePicker color={value} onChangeComplete={handleChromeChange} />
      <CirclePicker
        color={value}
        colors={colors}
        onChange={handleCircleChange}
      />
    </div>
  );
}
