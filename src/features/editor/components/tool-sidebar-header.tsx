import React from "react";
import type { ActiveTool } from "../type";
import { cn } from "@/lib/utils";

interface ToolSidebarHeaderProps {
  title: string;
  desc?: string;
}

export default function toolSidebarHeader({
  title,
  desc,
}: ToolSidebarHeaderProps) {
  return (
    <div
      className={cn(
        "w-full border-b h-[68px] space-y-1 flex flex-col pl-3 py-2"
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {desc && <p className="text-muted-foreground text-xs">{desc}</p>}
    </div>
  );
}
