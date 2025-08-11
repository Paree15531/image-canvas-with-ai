"use client";

import React, { useEffect } from "react";
import { type ActiveTool, type Editor } from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function OpacitySidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: TextSidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white relative h-full flex flex-col  transition-all duration-200",
        activeTool === "text" ? "w-[360px] border-r" : "w-[0px] "
      )}
    >
      <div
        className={cn(
          " transition-opacity duration-200",
          activeTool === "text"
            ? "opacity-100 delay-150"
            : "opacity-0 duration-100"
        )}
      >
        <ToolSiderHeader title="文本" desc="添加一个文本到工作空间" />

        {/* 滚动区域，放置内容相关的东西 */}
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-y-3 w-full p-4 border">
            <Button
              onClick={() =>
                editor?.addText("Hello", {
                  fontSize: 50,
                })
              }
            >
              添加文本框
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-16"
              onClick={() =>
                editor?.addText("标题", {
                  fontSize: 80,
                  fontWeight: 700,
                })
              }
            >
              <span className=" text-2xl font-bold">添加标题</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-16"
              onClick={() =>
                editor?.addText("二级标题", {
                  fontSize: 55,
                  fontWeight: 500,
                })
              }
            >
              <span className=" text-xl font-semibold">二级标题</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-16"
              onClick={() =>
                editor?.addText("文本", {
                  fontSize: 32,
                })
              }
            >
              <span>正文文本</span>
            </Button>
          </div>
        </ScrollArea>
        <ToolSiderbarClose
          isHidden={activeTool === "text"}
          onClose={() => onChangeActiveTool("select")}
        />
      </div>
    </aside>
  );
}
