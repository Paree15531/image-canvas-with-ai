import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  Icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function sidebarItem({
  Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) {
  return (
    <div>
      <Button
        className={cn(
          "w-full h-full aspect-video px-3 py-10 flex flex-col rounded-none",
          isActive && "bg-muted text-primary"
        )}
        variant="ghost"
        onClick={onClick}
      >
        <Icon className="size-5 stroke-2 shrink-0"></Icon>
        <span className=" text-xs">{label}</span>
      </Button>
    </div>
  );
}
