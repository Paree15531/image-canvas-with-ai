import React from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface ShapeToolProps {
  onClick?: () => void;
  Icon: LucideIcon | IconType;
  iconClassName?: string;
}

export default function shapeTool({
  onClick,
  Icon,
  iconClassName = "",
}: ShapeToolProps) {
  return (
    <button
      className=" aspect-square border rounded-md p-5  cursor-pointer hover:bg-gray-100 transition-colors duration-100"
      onClick={onClick}
    >
      <Icon className={cn("size-full", iconClassName)}></Icon>
    </button>
  );
}
