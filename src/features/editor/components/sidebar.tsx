import React from "react";
import SidebarItem from "./sidebar-item";
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import type { ActiveTool } from "../type";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function sidebar({
  activeTool,
  onChangeActiveTool,
}: SidebarProps) {
  return (
    <aside className="h-full bg-white flex-col w-[100px] border-r overflow-y-auto ">
      <ul className="flex flex-col ">
        <SidebarItem
          Icon={LayoutTemplate}
          label="模板"
          isActive={activeTool === "templates"}
          onClick={() => onChangeActiveTool("templates")}
        ></SidebarItem>
        <SidebarItem
          Icon={ImageIcon}
          label="图片"
          isActive={activeTool === "ImageIcon"}
          onClick={() => onChangeActiveTool("ImageIcon")}
        ></SidebarItem>
        {/* <SidebarItem
          Icon={Pencil}
          label="钢笔"
          isActive={activeTool === "Pencil"}
          onClick={() => onChangeActiveTool("Pencil")}
        ></SidebarItem> */}

        <SidebarItem
          Icon={Settings}
          label="设置"
          isActive={activeTool === "settings"}
          onClick={() => onChangeActiveTool("settings")}
        ></SidebarItem>
        <SidebarItem
          Icon={Shapes}
          label="形状"
          isActive={activeTool == "shapes"}
          onClick={() => onChangeActiveTool("shapes")}
        ></SidebarItem>
        <SidebarItem
          Icon={Sparkles}
          label="AI"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        ></SidebarItem>
        <SidebarItem
          Icon={Type}
          label="字形"
          isActive={activeTool === "text"}
          onClick={() => onChangeActiveTool("text")}
        ></SidebarItem>
      </ul>
    </aside>
  );
}
