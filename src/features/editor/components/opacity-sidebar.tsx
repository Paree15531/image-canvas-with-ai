"use client";

import React, { useEffect } from "react";
import { OPACTIY, type ActiveTool, type Editor } from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Slider } from "@/components/ui/slider";

interface OpacitySidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function OpacitySidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: OpacitySidebarProps) {
  const onChange = (value: number) => {
    editor?.changeOpacity(value);
  };

  const activeOpacity =
    editor?.canvas.getActiveObject()?.get("opacity") || OPACTIY;

  return (
    <aside
      className={cn(
        "bg-white relative h-full flex flex-col  transition-all duration-200",
        activeTool === "opacity" ? "w-[360px] border-r" : "w-[0px] "
      )}
    >
      <div
        className={cn(
          " transition-opacity duration-200",
          activeTool === "opacity"
            ? "opacity-100 delay-150"
            : "opacity-0 duration-100"
        )}
      >
        <ToolSiderHeader title="透明度" desc="选择一个元素来更新它的透明度" />

        {/* 滚动区域，放置内容相关的东西 */}
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4 border-b">
            <Label className="text-sm">透明度</Label>
            <Slider
              value={[activeOpacity]}
              onValueChange={(value) => onChange(value[0])}
              max={1}
              min={0}
              step={0.01}
            ></Slider>
          </div>
        </ScrollArea>
        <ToolSiderbarClose
          isHidden={activeTool === "opacity"}
          onClose={() => onChangeActiveTool("select")}
        />
      </div>
    </aside>
  );
}
