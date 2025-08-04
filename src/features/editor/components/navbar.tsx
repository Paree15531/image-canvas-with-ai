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
import { ChevronDown } from "lucide-react";
import { CiFileOn } from "react-icons/ci";

export default function navbar() {
  return (
    <div className="w-full h-[68px] border-b flex items-center p-4 gap-x-8 lg:pl-[34px]">
      <Logo></Logo>
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-bold" size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-0"></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-60" align="start">
            <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
              <CiFileOn className="size-8"></CiFileOn>
              <span className="font-bold text-xs text-muted-foreground">
                Open in JSON file
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
