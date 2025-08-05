import React from "react";
import type { ActiveTool } from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function shapesSidebar({
  activeTool,
  onChangeActiveTool,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white relative h-full flex flex-col z-[40] border-r transition-all duration-200",
        activeTool === "shapes" ? "w-[360px]" : "w-[0px]"
      )}
    >
      <div
        className={cn(
          " transition-opacity duration-200",
          activeTool === "shapes"
            ? "opacity-100 delay-150"
            : "opacity-0 duration-100"
        )}
      >
        <ToolSiderHeader
          title="元素形状"
          desc="选择一个元素应用到画布上"
        ></ToolSiderHeader>
        <ToolSiderbarClose
          onClose={() => onChangeActiveTool("select")}
        ></ToolSiderbarClose>
      </div>
    </aside>
  );
}
