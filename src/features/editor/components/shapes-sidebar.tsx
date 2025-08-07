import React from "react";
import type { ActiveTool } from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import type { CreateShapesMember } from "../shapes-types";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  createShapesMember: CreateShapesMember | undefined;
}

export default function shapesSidebar({
  activeTool,
  onChangeActiveTool,
  createShapesMember,
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
        <ToolSiderHeader title="元素形状" desc="选择一个元素应用到画布上" />

        {/* 滚动区域，放置内容相关的东西 */}
        <ScrollArea>
          <div className=" grid grid-cols-3 gap-4 p-4">
            <ShapeTool
              onClick={() => createShapesMember?.addCircle()}
              Icon={FaCircle}
            ></ShapeTool>
            <ShapeTool
              onClick={() => createShapesMember?.addSquare()}
              Icon={FaSquare}
            ></ShapeTool>
            <ShapeTool
              onClick={() => createShapesMember?.addSquareFull()}
              Icon={FaSquareFull}
            ></ShapeTool>
            <ShapeTool
              onClick={() => createShapesMember?.addTriangle()}
              Icon={IoTriangle}
            ></ShapeTool>
            <ShapeTool
              onClick={() => createShapesMember?.addTriangleRotate()}
              Icon={IoTriangle}
              iconClassName="rotate-180"
            ></ShapeTool>

            <ShapeTool onClick={() => {}} Icon={FaDiamond}></ShapeTool>
          </div>
        </ScrollArea>
        <ToolSiderbarClose
          isHidden={activeTool === "shapes"}
          onClose={() => onChangeActiveTool("select")}
        />
      </div>
    </aside>
  );
}
