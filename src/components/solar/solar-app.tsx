import { useEffect, useState, type ComponentType } from "react";
import { Hud } from "./hud";

const canvasPromise =
  typeof window !== "undefined" ? import("./solar-canvas") : null;

export function SolarApp() {
  const [CanvasApp, setCanvasApp] = useState<ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    void (canvasPromise ?? import("./solar-canvas")).then((mod) => {
      if (mounted) setCanvasApp(() => mod.SolarCanvas);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="relative h-dvh overflow-hidden bg-bg text-fg">
      <div className="absolute inset-0">
        {CanvasApp ? (
          <CanvasApp />
        ) : (
          <canvas className="h-full w-full bg-bg" aria-hidden="true" />
        )}
      </div>
      <Hud />
    </main>
  );
}
