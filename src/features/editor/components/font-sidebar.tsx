"use client";

import React, { useEffect } from "react";
import { fontsMap, type ActiveTool, type Editor } from "../type";
import { cn } from "@/lib/utils";
import ToolSiderHeader from "./tool-sidebar-header";
import ToolSiderbarClose from "./tool-siderbar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { fontFamilyType } from "../type";

interface FontSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export default function FontSidebar({
  activeTool,
  onChangeActiveTool,
  editor,
}: FontSidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white relative h-full flex flex-col  transition-all duration-200",
        activeTool === "font" ? "w-[360px] border-r" : "w-[0px] "
      )}
    >
      <div
        className={cn(
          "h-full",
          " transition-opacity duration-200",
          activeTool === "font"
            ? "opacity-100 delay-150"
            : "opacity-0 duration-100"
        )}
      >
        <ToolSiderHeader title="字体" desc="应用一种字体到画布中" />

        {/* 滚动区域，放置内容相关的东西 */}
        <ScrollArea className="h-[calc(100%-68px)]">
          <div className="p-4 space-y-2 border-b">
            {Object.entries(fontsMap).map(([key, value]) => {
              return (
                <Button
                  onClick={() =>
                    editor?.changeTextFontFamily(key as fontFamilyType, value)
                  }
                  key={key}
                  variant={"secondary"}
                  size={"lg"}
                  className="w-full h-16 justify-start text-left "
                  style={{
                    fontFamily: value,
                    fontSize: "16px",
                    padding: "8px 16px",
                  }}
                >
                  {key}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
        <ToolSiderbarClose
          isHidden={activeTool === "font"}
          onClose={() => onChangeActiveTool("select")}
        />
      </div>
    </aside>
  );
}
