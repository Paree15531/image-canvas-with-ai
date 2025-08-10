"use client";

import React from "react";
import type { ActiveTool, Editor } from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";

interface FillColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function shapesSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: FillColorSidebarProps) {
  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative h-full flex flex-col  transition-all duration-200",
        activeTool === "fill" ? "w-[360px] border-r" : "w-[0px] "
      )}
    >
      <div
        className={cn(
          " transition-opacity duration-200",
          activeTool === "fill"
            ? "opacity-100 delay-150"
            : "opacity-0 duration-100"
        )}
      >
        <ToolSiderHeader title="填充颜色" desc="选择一个元素来修改他的填充色" />

        {/* 滚动区域，放置内容相关的东西 */}
        <ScrollArea className="h-full">
          <div className="p-2">
            <ColorPicker
              value={editor?.filColor}
              onChange={onChange}
            ></ColorPicker>
          </div>
        </ScrollArea>
        <ToolSiderbarClose
          isHidden={activeTool === "fill"}
          onClose={() => onChangeActiveTool("select")}
        />
      </div>
    </aside>
  );
}
