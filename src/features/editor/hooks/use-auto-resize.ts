import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  containter: HTMLDivElement | null;
}

const useAutoResize = ({ canvas, containter }: UseAutoResizeProps) => {
  //获取containter元素的宽高，并设置到canvas上
  const autoZoom = useCallback(() => {
    if (!canvas || !containter) {
      return;
    }

    //先禁用渲染逻辑，以便提升渲染性能
    canvas.renderOnAddRemove = false;
    const width = containter.offsetWidth;
    const height = containter.offsetHeight;
    //使用这个api是为了防止setWidth再setHeight的时候，画布的宽高会先被设置为0，然后才会被设置为新的宽高，提高性能
    canvas.setDimensions({
      width,
      height,
    });

    const center = canvas.getCenter();
    const zoomRatio = 0.85;
    //获取工作空间的元素
    const localWorkspace = canvas
      .getObjects()
      .find((item) => item.name == "workspace") as fabric.Rect;
    //@ts-ignore
    const scale = fabric.util.findScaleToFit(
      {
        width: localWorkspace.width,
        height: localWorkspace.height,
      },
      {
        width,
        height,
      }
    );
    const zoom = zoomRatio * scale;

    /**
     * 由于容器每次变化都会带来画布的大小的重新计算，在每次计算缩放平移矩阵之前，都需要
     * 重置画布的矩阵，回到画布初始的状态，不然的话，每次转换都是在上一次的矩阵转换的基础上转化，
     * 确保每次变换都从已知的基准状态开始，避免额外的累加效果
     */
    canvas.setViewportTransform([...fabric.iMatrix]);
    //根据画布的坐标点进行缩放，api会读取对象的x和y坐标来进行缩放点聚焦
    canvas.zoomToPoint(
      {
        x: center.left,
        y: center.top,
      },
      zoom
    );

    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }
    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];
    //设置计算后的矩阵参数
    canvas.setViewportTransform(viewportTransform);

    //恢复渲染
    canvas.renderOnAddRemove = true;
    canvas.renderAll();
  }, [canvas, containter]);

  useEffect(() => {
    if (!canvas || !containter) {
      return;
    }

    let containerObserver: ResizeObserver | null;
    containerObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        autoZoom();
      }
    });
    containerObserver.observe(containter);

    return () => {
      if (containerObserver) {
        containerObserver.disconnect();
      }
    };
  }, [canvas, containter]);
};

export { useAutoResize };
