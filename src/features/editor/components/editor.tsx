"use client";

import { fabric } from "fabric";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { useLayoutEffect, useRef } from "react";

export default function Editor() {
  const editorCanvasRef = useRef<HTMLCanvasElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const { init } = useEditor();

  useLayoutEffect(() => {
    if (!editorCanvasRef.current) return;
    const fabricCanvas = new fabric.Canvas(editorCanvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: fabricCanvas,
      initialContainer: workspaceRef,
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-full bg-muted" ref={workspaceRef}>
        <canvas ref={editorCanvasRef}></canvas>
      </div>
    </div>
  );
}
