import React from "react";
import { ChromePicker } from "react-color";

interface ColorPickerProps {
  onChange: (value: string) => void;
}

export default function colorPicker({ onChange }: ColorPickerProps) {
  return (
    <div>
      <ChromePicker></ChromePicker>
    </div>
  );
}
