"use client";

import { fabric } from "fabric";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { useLayoutEffect, useRef } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import Footer from "./footer";

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
    console.log("asdsd");

    return () => {
      fabricCanvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className=" absolute h-[calc(100%-68px)] top-[68px] w-full flex">
        <Sidebar />
        <main className=" bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="flex-1 h-[cacl(100%-124px)] bg-muted"
            ref={workspaceRef}
          >
            <canvas ref={editorCanvasRef}></canvas>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
