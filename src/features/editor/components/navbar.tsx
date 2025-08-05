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
import { ChevronDown, Redo2, Undo2 } from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { MousePointerClick } from "lucide-react";
import HintTooltip from "./hintTooltip";

export default function navbar() {
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
              className="text-muted-foreground px-5"
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
        <div className="flex gap-x-3 items-center">
          <Button variant="ghost" size="sm" className="text-black">
            <BsCloudCheck className="size-[24px] "></BsCloudCheck>
            <span className="text-xs">保存</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
