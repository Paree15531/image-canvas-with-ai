import React from "react";
import { ActiveTool } from "../type";
import { BuildObjectsStyleMember } from "../type";

interface ToolbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editorObjectsStyle: BuildObjectsStyleMember | undefined;
  canvas: fabric.Canvas | null;
}

export default function toolbar({
  activeTool,
  onChangeActiveTool,
  canvas,
}: ToolbarProps) {
  const selectedActive = canvas?.getActiveObject();

  const getActiveProperty = (property: any) => {
    if (selectedActive) {
      return selectedActive?.get(property);
    }
  };

  return (
    <div className="shrink-0 w-full h-[56px] overflow-x-auto border-b bg-white flex items-center z-[49] gap-x-2">
      toolbar
    </div>
  );
}
