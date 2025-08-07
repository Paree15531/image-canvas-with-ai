declare global {
  interface Window {
    ruler: any;
  }
}

interface UseRulerApi {
  initRuler: () => void;
  updateRuler: () => void;
  clearGuides: () => void;
  showRuler: () => void;
  hiddenRuler: () => void;
}

function useRuler(container: HTMLDivElement | null) {
  const buildRuler = (): UseRulerApi => {
    let myRuler: any;
    return {
      initRuler() {
        if (!container) return;

        myRuler = new window.ruler({
          container: container, // reference to DOM element to apply rulers on
          rulerHeight: 20, // thickness of ruler
          fontFamily: "arial", // font for points
          fontSize: "7px",
          strokeStyle: "black",
          lineWidth: 1,
          enableMouseTracking: true,
          enableToolTip: true,
        });
      },
      updateRuler() {
        if (myRuler) {
          myRuler.api.destory();
          myRuler = new window.ruler({
            container: container, // reference to DOM element to apply rulers on
            rulerHeight: 30, // thickness of ruler
            fontFamily: "arial", // font for points
            fontSize: "14px",
            strokeStyle: "black",
            lineWidth: 1,
            enableMouseTracking: true,
            enableToolTip: true,
          });
        }
      },
      //清除辅助线
      clearGuides() {},
      //展示标尺
      showRuler() {},
      //隐藏标尺
      hiddenRuler() {},
    };
  };

  const rulerSettings = buildRuler();

  const loadRuler = async () => {
    // 动态加载 CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/ruler.min.css";
    document.head.appendChild(link);

    // 动态加载 JS
    const script = document.createElement("script");
    script.src = "/ruler.min.js";
    script.onload = () => {
      rulerSettings.initRuler();
    };
    document.head.appendChild(script);
  };

  loadRuler();
  return {
    rulerSettings,
  };
}

export { useRuler };
