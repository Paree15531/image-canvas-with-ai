import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  Redo2,
  Undo2,
  MousePointerClick,
  ArrowRightFromLine,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import HintTooltip from "./hintTooltip";
import type { ActiveTool } from "../type";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function navbar({
  activeTool,
  onChangeActiveTool,
}: SidebarProps) {
  return (
    <div className="w-full h-[68px] border-b flex items-center p-4 gap-x-8 lg:pl-[24px]">
      <Logo></Logo>
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-bold text-xs " size="sm" variant="ghost">
              文件
              <ChevronDown className="size-4 ml-0"></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-60" align="start">
            <DropdownMenuItem onClick={() => {}}>
              <CiFileOn className="size-8"></CiFileOn>
              <span className="font-bold text-xs text-muted-foreground">
                打开一个JSON文件
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2"></Separator>

        <div className="flex gap-x-4 items-center">
          <HintTooltip label="选择元素" side="bottom" sideOffset={10}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-muted-foreground px-5",
                activeTool === "select" && "bg-gray-100"
              )}
              onClick={() => onChangeActiveTool("select")}
            >
              <MousePointerClick className="size-5 text-black "></MousePointerClick>
            </Button>
          </HintTooltip>
          <HintTooltip label="撤销" side="bottom" sideOffset={10}>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground px-5"
            >
              <Undo2 className="size-5 text-black"></Undo2>
            </Button>
          </HintTooltip>
          <HintTooltip label="重做" side="bottom" sideOffset={10}>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground px-5"
            >
              <Redo2 className="size-5 text-black"></Redo2>
            </Button>
          </HintTooltip>
        </div>
        <Separator orientation="vertical" className="mx-2"></Separator>
        <div className="flex gap-x-4 items-center">
          <Button variant="ghost" size="sm" className="text-black font-bold">
            <BsCloudCheck className="size-[24px] "></BsCloudCheck>
            <span className="text-xs">保存</span>
          </Button>
        </div>
        <div className="ml-auto flex items-center">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="font-bold flex items-center"
                variant="ghost"
              >
                <span>导出</span>
                <Download className="size-4 ml-1"></Download>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex gap-x-3 items-start cursor-pointer">
                  <CiFileOn className="size-9"></CiFileOn>
                  <div className="flex flex-col gap-y-0.5 items-start">
                    <p className="font-semibold">JSON</p>
                    <p className="text-xs text-muted-foreground">
                      导出JSON格式
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex gap-x-3 items-start ">
                  <CiFileOn className="size-9"></CiFileOn>
                  <div className="flex flex-col gap-y-0.5 items-start">
                    <p className="font-semibold">PNG/JPG</p>
                    <p className="text-xs text-muted-foreground">
                      导出PNG/JPG格式
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex gap-x-3 items-start ">
                  <CiFileOn className="size-9"></CiFileOn>
                  <div className="flex flex-col gap-y-0.5 items-start">
                    <p className="font-semibold">SVG</p>
                    <p className="text-xs text-muted-foreground">导出SVG格式</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
