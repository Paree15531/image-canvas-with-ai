"use client";
import { fabric } from "fabric";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import { ActiveTool } from "../type";
import ShapesSidebar from "./shapes-sidebar";

export default function Editor() {
  //声明工具选中的类型
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  //选择工具处理事件
  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        setActiveTool("select");
        return;
      }
      if (tool == "draw") {
      }
      if (activeTool == "draw") {
      }
      setActiveTool(tool);
    },
    [activeTool]
  );

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

    return () => {
      fabricCanvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className=" absolute h-[calc(100%-68px)] top-[68px] w-full flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapesSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
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
