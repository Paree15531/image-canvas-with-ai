import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronsLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolSiderbarCloseProps {
  onClose?: () => void;
  isHidden: boolean;
}

export default function toolSiderbarClose({
  onClose,
  isHidden,
}: ToolSiderbarCloseProps) {
  return (
    <Button
      onClick={onClose}
      variant="ghost"
      className={cn(
        "absolute -right-[1.80rem] h-[60px] bg-white z-[50] top-1/2 transform -translate-y-1/2  flex items-center justify-center rounded-r-xl px-1 pr-2 border-r gruop",
        !isHidden ? "pointer-events-none" : "pointer-events-auto"
      )}
    >
      <ChevronsLeft className="size-5 text-gray-500 group-hover:opacity-75 transition"></ChevronsLeft>
    </Button>
  );
}
