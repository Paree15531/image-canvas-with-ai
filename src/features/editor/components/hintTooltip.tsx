import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
}

export default function HintTooltip({
  children,
  label,
  side,
  align,
  alignOffset,
  sideOffset,
}: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className=" text-white bg-slate-800 border-slate-800"
          side={side}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
