import React from "react";
import { ActiveTool, fontsMap } from "../type";
import { Editor } from "../type";
import HintTooltip from "../components/hintTooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isText } from "../utils";
import { fontFamilyType } from "../type";

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

  const strokeColor = getActiveProperty("stroke");

  const fontFamily = Object.keys(fontsMap).find(
    (key) => fontsMap[key as fontFamilyType] === getActiveProperty("fontFamily")
  );

  //判断是否是文本类型，如果不是隐藏一些工具栏
  const isTextType = isText(selectedActive?.type);

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 w-full h-[56px] overflow-x-auto border-b bg-white flex items-center p-2 z-[49] gap-x-2"></div>
    );
  }

  return (
    <div className="shrink-0 w-full h-[56px] overflow-x-auto border-b bg-white flex items-center p-2 z-[49] gap-x-2">
      <div className="flex items-center h-full justify-center">
        <HintTooltip label="填充色" side="bottom" sideOffset={5}>
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
      {!isTextType && (
        <div className="flex items-center h-full justify-center">
          <HintTooltip label="边框色" side="bottom" sideOffset={5}>
            <Button
              variant={"ghost"}
              size="icon"
              onClick={() => onChangeActiveTool("stroke-color")}
              className={cn(activeTool === "stroke-color" && "bg-gray-200")}
            >
              <div
                className="rounded-[3px] size-4"
                style={{
                  background: "transparent",
                  borderWidth: "2px",
                  borderColor: strokeColor || "black",
                }}
              ></div>
            </Button>
          </HintTooltip>
        </div>
      )}
      {!isTextType && (
        <div className="flex items-center h-full justify-center">
          <HintTooltip label="边框风格" side="bottom" sideOffset={5}>
            <Button
              variant={"ghost"}
              size="icon"
              onClick={() => onChangeActiveTool("stroke-width")}
              className={cn(activeTool === "stroke-width" && "bg-gray-200")}
            >
              <BsBorderWidth></BsBorderWidth>
            </Button>
          </HintTooltip>
        </div>
      )}
      {isTextType && (
        <div className="flex items-center h-full justify-center">
          <HintTooltip label="字体" side="bottom" sideOffset={5}>
            <Button
              variant={"ghost"}
              size="icon"
              onClick={() => onChangeActiveTool("font")}
              className={cn(
                activeTool === "font" && "bg-gray-200",
                "w-auto px-2 text-sm"
              )}
            >
              <div className=" max-w-[100px] truncate font-semibold">
                {fontFamily}
              </div>
              <ChevronDown></ChevronDown>
            </Button>
          </HintTooltip>
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <HintTooltip label="层叠提升" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.objectBringToFront()}
            variant={"ghost"}
            size="icon"
          >
            <ArrowUp></ArrowUp>
          </Button>
        </HintTooltip>
      </div>
      <div className="flex items-center h-full justify-center">
        <HintTooltip label="层叠回退" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.objectSendToBack()}
            variant={"ghost"}
            size="icon"
          >
            <ArrowDown></ArrowDown>
          </Button>
        </HintTooltip>
      </div>
      <div className="flex items-center h-full justify-center">
        <HintTooltip label="透明度" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            variant={"ghost"}
            size="icon"
            className={cn(activeTool === "opacity" && "bg-gray-200")}
          >
            <RxTransparencyGrid className="size-4"></RxTransparencyGrid>
          </Button>
        </HintTooltip>
      </div>
    </div>
  );
}
