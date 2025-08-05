import React from "react";
import type { ActiveTool } from "../type";
import { cn } from "@/lib/utils";

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
        "bg-white relative  h-full flex flex-col z-[40] border-r transition-all duration-200",
        activeTool === "shapes" ? "w-[360px]" : "w-[0px]"
      )}
    ></aside>
  );
}
