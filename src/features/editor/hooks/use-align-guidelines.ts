import { AlignGuidelines } from "fabric-guideline-plugin";
import { fabric } from "fabric";

//添加绘制辅助线
export function useAlignGuidelines(fabricCanvas: fabric.Canvas) {
  const guideline = new AlignGuidelines({
    canvas: fabricCanvas,
    aligningOptions: {
      lineColor: "#47c7fa",
      lineWidth: 1,
      lineMargin: 6,
    },
  });
  guideline.init();
  return guideline;
}
