"use client";

import React from "react";
import {
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  type ActiveTool,
  type Editor,
} from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StrokeWidthSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function StrokeWidthSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: StrokeWidthSidebarProps) {
  const onChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeActiveType = (type: number[]) => {
    editor?.changeStrokeDashArray(type);
  };

  const strokeActiveWidth =
    (editor && editor?.canvas.getActiveObject()?.get("strokeWidth")) ||
    STROKE_WIDTH;

  const strokeActiveDashArray =
    (editor && editor?.canvas.getActiveObject()?.get("strokeDashArray")) ||
    STROKE_DASH_ARRAY;

  return (
    <aside
      className={cn(
        "bg-white relative h-full flex flex-col  transition-all duration-200",
        activeTool === "stroke-width" ? "w-[360px] border-r" : "w-[0px] "
      )}
    >
      <div
        className={cn(
          " transition-opacity duration-200",
          activeTool === "stroke-width"
            ? "opacity-100 delay-150"
            : "opacity-0 duration-100"
        )}
      >
        <ToolSiderHeader
          title="边框风格"
          desc="选择一个元素来修改他的边框风格"
        />

        {/* 滚动区域，放置内容相关的东西 */}
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4 border-b">
            <Label className="text-sm">边框宽度</Label>
            <Slider
              value={[strokeActiveWidth || 1]}
              onValueChange={(value) => onChange(value[0])}
            ></Slider>
          </div>
          <div className="p-4 space-y-4 border-b">
            <Label className="text-sm">边框类型</Label>
            <Button
              onClick={() => onChangeActiveType([])}
              variant="secondary"
              size="sm"
              className={cn(
                "w-full h-16 justify-start text-left",
                strokeActiveDashArray?.toString() === "" ? "bg-gray-200" : ""
              )}
              style={{
                padding: "8px 16px",
              }}
            >
              <div className="w-full border-black rounded-full border-4"></div>
            </Button>
            <Button
              onClick={() => onChangeActiveType([5, 5])}
              variant="secondary"
              size="sm"
              className={cn(
                "w-full h-16 justify-start text-left",
                strokeActiveDashArray?.toString() === "5,5" ? "bg-gray-200" : ""
              )}
              style={{
                padding: "8px 16px",
              }}
            >
              <div className="w-full border-black rounded-full border-4 border-dashed"></div>
            </Button>
          </div>
        </ScrollArea>
        <ToolSiderbarClose
          isHidden={activeTool === "stroke-width"}
          onClose={() => onChangeActiveTool("select")}
        />
      </div>
    </aside>
  );
}
