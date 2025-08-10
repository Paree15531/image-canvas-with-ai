import React from "react";
import { ActiveTool } from "../type";
import { Editor } from "../type";
import HintTooltip from "../components/hintTooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function toolbar({
  activeTool,
  onChangeActiveTool,
  editor,
}: ToolbarProps) {
  const selectedActive = editor?.canvas.getActiveObject();

  const getActiveProperty = (property: any) => {
    if (selectedActive) {
      return selectedActive.get(property);
    }
  };
  const fillColor = getActiveProperty("fill");

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 w-full h-[56px] overflow-x-auto border-b bg-white flex items-center p-2 z-[49] gap-x-2"></div>
    );
  }

  return (
    <div className="shrink-0 w-full h-[56px] overflow-x-auto border-b bg-white flex items-center p-2 z-[49] gap-x-2">
      <div className="flex items-center h-full justify-center">
        <HintTooltip label="颜色" side="bottom" sideOffset={5}>
          <Button
            variant={"ghost"}
            size="icon"
            onClick={() => onChangeActiveTool("fill")}
            className={cn(activeTool === "fill" && "bg-gray-200")}
          >
            <div
              className=" rounded-[3px] size-4"
              style={{
                backgroundColor: fillColor || "black",
              }}
            ></div>
          </Button>
        </HintTooltip>
      </div>
    </div>
  );
}
