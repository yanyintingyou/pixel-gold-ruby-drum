import { Orbit, Pause, Play, RotateCcw, Tags } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BODIES, BODY_BY_ID, type BodyId } from "@/lib/solar/data";
import {
  formatSpeed,
  sliderToSpeed,
  speedToSlider,
  useSolarStore,
} from "@/lib/solar/store";
import { cn } from "@/lib/utils";

export function Hud() {
  const paused = useSolarStore((s) => s.paused);
  const speed = useSolarStore((s) => s.speed);
  const showLabels = useSolarStore((s) => s.showLabels);
  const showOrbits = useSolarStore((s) => s.showOrbits);
  const focusedId = useSolarStore((s) => s.focusedId);
  const togglePaused = useSolarStore((s) => s.togglePaused);
  const setSpeed = useSolarStore((s) => s.setSpeed);
  const setShowLabels = useSolarStore((s) => s.setShowLabels);
  const setShowOrbits = useSolarStore((s) => s.setShowOrbits);
  const setFocusedId = useSolarStore((s) => s.setFocusedId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePaused();
      } else if (e.code === "Escape") {
        setFocusedId("sun");
      } else if (e.key === "l" || e.key === "L") {
        setShowLabels(!useSolarStore.getState().showLabels);
      } else if (e.key === "o" || e.key === "O") {
        setShowOrbits(!useSolarStore.getState().showOrbits);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setFocusedId, setShowLabels, setShowOrbits, togglePaused]);

  const focused = BODY_BY_ID[focusedId];

  return (
    <div className="pointer-events-none absolute inset-0">
      <header className="absolute top-3 right-3 left-3 flex items-start justify-between gap-4 md:top-6 md:right-6 md:left-6">
        <div className="pointer-events-auto stagger-in">
          <p className="font-sans text-xs font-medium uppercase tracking-kicker text-muted">
            Helios
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg text-balance md:text-4xl">
            日心
          </h1>
          <p className="mt-1 max-w-xs text-sm leading-snug text-muted text-pretty">
            太阳系三维轨道模拟
          </p>
        </div>
        <p className="pointer-events-none hidden max-w-52 text-right text-xs leading-relaxed text-subtle md:block">
          拖动旋转 · 滚轮缩放
          <br />
          点击行星聚焦 · 空格暂停
        </p>
      </header>

      <nav
        aria-label="天体"
        className="pointer-events-auto absolute top-28 bottom-28 left-6 hidden w-44 flex-col gap-0.5 overflow-y-auto md:flex"
      >
        {BODIES.map((body) => (
          <BodyButton
            key={body.id}
            id={body.id}
            active={focusedId === body.id}
            indent={Boolean(body.parent)}
            onSelect={setFocusedId}
          />
        ))}
      </nav>

      <div className="absolute top-28 right-6 bottom-28 hidden w-80 overflow-y-auto md:block">
        <PlanetPanel
          key={focusedId}
          id={focusedId}
          onClose={() => setFocusedId("sun")}
        />
      </div>

      <footer className="absolute right-3 bottom-3 left-3 flex flex-col gap-2 md:right-6 md:bottom-6 md:left-6 md:gap-3">
        <div className="md:hidden">
          <PlanetPanel
            key={`m-${focusedId}`}
            id={focusedId}
            compact
            onClose={() => setFocusedId("sun")}
          />
        </div>
        <nav
          aria-label="快速选择"
          className="pointer-events-auto flex gap-1 overflow-x-auto md:hidden"
        >
          {BODIES.map((body) => (
            <button
              key={body.id}
              type="button"
              onClick={() => setFocusedId(body.id)}
              className={cn(
                "flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-(--motion-quick)",
                focusedId === body.id
                  ? "bg-surface-2 text-fg shadow-[var(--shadow-border)]"
                  : "text-muted hover:text-fg",
              )}
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: body.color }}
              />
              {body.name}
            </button>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2 rounded-lg bg-surface/92 p-2 shadow-[var(--shadow-border)] md:gap-4 md:rounded-xl md:px-3">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              aria-label={paused ? "继续" : "暂停"}
              onClick={togglePaused}
            >
              <span className="relative size-4">
                <Pause
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform,filter] duration-(--motion-fast) ease-(--ease-in-out)",
                    paused
                      ? "scale-[0.25] opacity-0 blur-xs"
                      : "scale-100 opacity-100 blur-none",
                  )}
                />
                <Play
                  className={cn(
                    "absolute inset-0 ml-px transition-[opacity,transform,filter] duration-(--motion-fast) ease-(--ease-in-out)",
                    paused
                      ? "scale-100 opacity-100 blur-none"
                      : "scale-[0.25] opacity-0 blur-xs",
                  )}
                />
              </span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="复位视角"
              onClick={() => setFocusedId("sun")}
            >
              <RotateCcw />
            </Button>
            <p className="hidden text-xs text-subtle md:block">
              {paused ? "已暂停" : "运行中"}
              {focused.id !== "sun" ? ` · ${focused.name}` : ""}
            </p>
          </div>

          <label className="flex min-w-0 flex-1 items-center gap-3 px-1">
            <span className="shrink-0 text-xs font-medium text-muted">速度</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={speedToSlider(speed)}
              onChange={(e) => setSpeed(sliderToSpeed(Number(e.target.value)))}
              className="speed-slider h-11 w-full"
              aria-label="模拟速度"
            />
            <span className="w-12 shrink-0 text-right font-medium tabular-nums text-fg">
              {formatSpeed(speed)}
            </span>
          </label>

          <div className="flex items-center gap-1">
            <Button
              variant="toggle"
              size="icon"
              aria-label="名称标签"
              data-on={showLabels}
              onClick={() => setShowLabels(!showLabels)}
            >
              <Tags />
            </Button>
            <Button
              variant="toggle"
              size="icon"
              aria-label="轨道轨迹"
              data-on={showOrbits}
              onClick={() => setShowOrbits(!showOrbits)}
            >
              <Orbit />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BodyButton({
  id,
  active,
  indent,
  onSelect,
}: {
  id: BodyId;
  active: boolean;
  indent: boolean;
  onSelect: (id: BodyId) => void;
}) {
  const body = BODY_BY_ID[id];
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "flex h-11 items-center gap-3 rounded-md px-3 text-left transition-colors duration-(--motion-quick)",
        indent && "ml-4",
        active
          ? "bg-surface-2 text-fg shadow-[var(--shadow-border)]"
          : "text-muted hover:bg-fg/5 hover:text-fg",
      )}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: body.color }}
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">{body.name}</span>
        <span className="block truncate text-xs text-subtle">{body.latin}</span>
      </span>
    </button>
  );
}

function PlanetPanel({
  id,
  onClose,
  compact = false,
}: {
  id: BodyId;
  onClose: () => void;
  compact?: boolean;
}) {
  const body = BODY_BY_ID[id];
  const kindLabel =
    body.kind === "star" ? "恒星" : body.kind === "moon" ? "卫星" : "行星";

  if (compact) {
    return (
      <aside className="panel-enter pointer-events-auto rounded-lg bg-surface/92 px-3 py-2.5 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg font-semibold leading-tight tracking-tight text-fg">
            {body.name}
          </h2>
          <p className="text-xs text-muted">
            {kindLabel} · {body.latin}
          </p>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted text-pretty">
          {body.info.summary}
        </p>
      </aside>
    );
  }

  return (
    <aside className="panel-enter pointer-events-auto flex w-80 flex-col rounded-xl bg-surface/92 p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-kicker text-muted">
            {kindLabel}
            <span className="ml-2 normal-case tracking-normal">{body.latin}</span>
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-fg">
            {body.name}
          </h2>
        </div>
        {id !== "sun" ? (
          <Button variant="ghost" size="iconSm" aria-label="回到太阳" onClick={onClose}>
            <RotateCcw />
          </Button>
        ) : null}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <Stat label="距日" value={body.info.distance} />
        <Stat label="公转" value={body.info.period} />
        <Stat label="自转" value={body.info.day} />
        <Stat label="直径" value={body.info.diameter} />
        <Stat label="卫星" value={body.info.moons} />
        <div className="flex items-end gap-2">
          <span
            className="mb-0.5 size-2.5 rounded-full"
            style={{ backgroundColor: body.color }}
          />
          <span className="text-xs text-subtle">光谱色</span>
        </div>
      </dl>

      <p className="mt-4 text-sm leading-relaxed text-muted text-pretty">
        {body.info.summary}
      </p>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium tabular-nums text-fg">{value}</dd>
    </div>
  );
}
