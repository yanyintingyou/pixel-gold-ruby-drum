import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as Pause, i as Play, n as Tags, o as Orbit, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BQjgq83m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var DAY_SECONDS = 3.2;
var BODIES = [
	{
		id: "sun",
		name: "太阳",
		latin: "Sol",
		kind: "star",
		color: "#ffb45a",
		radius: 2.7,
		orbit: 0,
		periodYears: 1,
		dayLength: 25.4,
		tilt: .126,
		phase: 0,
		info: {
			distance: "—",
			period: "—",
			day: "25.4 日",
			diameter: "1,392,700 km",
			moons: "行星 8",
			summary: "一颗 G2V 黄矮星，占据太阳系质量的 99.86%。核心持续进行氢聚变，把光与热送往每一条轨道。"
		}
	},
	{
		id: "mercury",
		name: "水星",
		latin: "Mercury",
		kind: "planet",
		color: "#8a8378",
		radius: .17,
		orbit: 5.6,
		periodYears: .241,
		dayLength: 58.6,
		tilt: 6e-4,
		phase: .4,
		info: {
			distance: "0.39 AU",
			period: "88 日",
			day: "59 日",
			diameter: "4,879 km",
			moons: "无",
			summary: "最靠近太阳的岩石行星。几乎没有大气，表面布满撞击坑，昼夜温差可超过 600°C。"
		}
	},
	{
		id: "venus",
		name: "金星",
		latin: "Venus",
		kind: "planet",
		color: "#c9b07a",
		atmosphere: "#e8d9a8",
		radius: .28,
		orbit: 7.6,
		periodYears: .615,
		dayLength: -243,
		tilt: 3.096,
		phase: 1.2,
		hasClouds: true,
		info: {
			distance: "0.72 AU",
			period: "225 日",
			day: "243 日 · 逆向",
			diameter: "12,104 km",
			moons: "无",
			summary: "被厚重的二氧化碳大气包裹，表面气压约为地球的 90 倍，温度足以熔化铅。自转缓慢且逆向。"
		}
	},
	{
		id: "earth",
		name: "地球",
		latin: "Earth",
		kind: "planet",
		color: "#3f8fbf",
		atmosphere: "#7ec8ff",
		radius: .3,
		orbit: 9.7,
		periodYears: 1,
		dayLength: 1,
		tilt: .409,
		phase: .15,
		hasClouds: true,
		info: {
			distance: "1.00 AU",
			period: "365.25 日",
			day: "23.9 时",
			diameter: "12,756 km",
			moons: "1",
			summary: "目前已知唯一存在生命的世界。液态水、氧气大气与磁场共同守护着这颗蓝色行星。"
		}
	},
	{
		id: "moon",
		name: "月球",
		latin: "Moon",
		kind: "moon",
		parent: "earth",
		color: "#9a9790",
		radius: .082,
		orbit: .86,
		periodYears: .0748,
		dayLength: 27.3,
		tilt: .117,
		phase: .6,
		info: {
			distance: "0.0026 AU",
			period: "27.3 日",
			day: "27.3 日 · 潮汐锁定",
			diameter: "3,475 km",
			moons: "—",
			summary: "地球的唯一天然卫星，潮汐锁定后永远以同一面朝向地球，表面是古老的高地与暗色月海。"
		}
	},
	{
		id: "mars",
		name: "火星",
		latin: "Mars",
		kind: "planet",
		color: "#c0714a",
		atmosphere: "#d9895c",
		radius: .21,
		orbit: 12.1,
		periodYears: 1.881,
		dayLength: 1.03,
		tilt: .439,
		phase: 2.1,
		info: {
			distance: "1.52 AU",
			period: "687 日",
			day: "24.6 时",
			diameter: "6,792 km",
			moons: "2",
			summary: "寒冷的沙漠世界。奥林帕斯山是太阳系最高火山，两极覆盖干冰与水冰，天空呈淡淡的锈红色。"
		}
	},
	{
		id: "jupiter",
		name: "木星",
		latin: "Jupiter",
		kind: "planet",
		color: "#c4a07a",
		atmosphere: "#d9c09a",
		radius: 1.02,
		orbit: 16.8,
		periodYears: 11.86,
		dayLength: .41,
		tilt: .0546,
		phase: .9,
		info: {
			distance: "5.20 AU",
			period: "11.9 年",
			day: "9.9 时",
			diameter: "142,984 km",
			moons: "95+",
			summary: "太阳系最大的行星。快速自转拉出平行云带，大红斑是一座持续数百年的反气旋风暴。"
		}
	},
	{
		id: "saturn",
		name: "土星",
		latin: "Saturn",
		kind: "planet",
		color: "#d7c39a",
		atmosphere: "#efe0bc",
		radius: .88,
		orbit: 21.8,
		periodYears: 29.46,
		dayLength: .45,
		tilt: .466,
		phase: 1.7,
		hasRings: "saturn",
		info: {
			distance: "9.58 AU",
			period: "29.5 年",
			day: "10.7 时",
			diameter: "120,536 km",
			moons: "146+",
			summary: "以光环闻名的气态巨行星。光环由无数冰粒与岩石碎片组成，在阳光下呈现出淡金色。"
		}
	},
	{
		id: "uranus",
		name: "天王星",
		latin: "Uranus",
		kind: "planet",
		color: "#7ecfc9",
		atmosphere: "#a6ebe4",
		radius: .48,
		orbit: 26.6,
		periodYears: 84.01,
		dayLength: -.72,
		tilt: 1.706,
		phase: .3,
		hasRings: "uranus",
		info: {
			distance: "19.2 AU",
			period: "84 年",
			day: "17.2 时 · 逆向",
			diameter: "51,118 km",
			moons: "28",
			summary: "一颗冰巨星，自转轴几乎躺平，像侧着滚过轨道。甲烷吸收红光，使它呈现苍青的冷色。"
		}
	},
	{
		id: "neptune",
		name: "海王星",
		latin: "Neptune",
		kind: "planet",
		color: "#3d6fd0",
		atmosphere: "#6ea2ff",
		radius: .46,
		orbit: 31.4,
		periodYears: 164.8,
		dayLength: .67,
		tilt: .494,
		phase: 2.6,
		info: {
			distance: "30.1 AU",
			period: "165 年",
			day: "16.1 时",
			diameter: "49,528 km",
			moons: "16",
			summary: "太阳系最远的行星。深海蓝的氢氦大气中，风暴风速可达超音速，海卫一沿逆向轨道运行。"
		}
	}
];
var BODY_BY_ID = Object.fromEntries(BODIES.map((body) => [body.id, body]));
var useSolarStore = create()(persist((set) => ({
	paused: false,
	speed: 1,
	showLabels: true,
	showOrbits: true,
	focusedId: "sun",
	hoveredId: null,
	setPaused: (paused) => set({ paused }),
	togglePaused: () => set((s) => ({ paused: !s.paused })),
	setSpeed: (speed) => set({ speed }),
	setShowLabels: (showLabels) => set({ showLabels }),
	setShowOrbits: (showOrbits) => set({ showOrbits }),
	setFocusedId: (focusedId) => set({ focusedId }),
	setHoveredId: (hoveredId) => set({ hoveredId })
}), {
	name: "helios-prefs",
	partialize: (s) => ({
		speed: s.speed,
		showLabels: s.showLabels,
		showOrbits: s.showOrbits
	})
}));
function speedToSlider(speed) {
	const t = (Math.log(speed) - Math.log(.125)) / (Math.log(16) - Math.log(.125));
	return Math.min(1, Math.max(0, t));
}
function sliderToSpeed(t) {
	return .125 * Math.pow(128, t);
}
function formatSpeed(speed) {
	if (speed >= 9.5) return `${Math.round(speed)}×`;
	if (speed >= 1) return `${speed.toFixed(1)}×`;
	return `${speed.toFixed(2)}×`;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-(--motion-quick) ease-(--ease-out) disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:bg-accent/90 shadow-[var(--shadow-border)]",
			secondary: "bg-surface-2 text-fg hover:bg-fg/8 shadow-[var(--shadow-border)]",
			ghost: "text-muted hover:text-fg hover:bg-fg/6",
			toggle: "bg-surface-2 text-muted hover:text-fg shadow-[var(--shadow-border)] data-[on=true]:text-fg data-[on=true]:bg-fg/10"
		},
		size: {
			md: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-xs",
			icon: "size-11 rounded-md",
			iconSm: "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "secondary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Hud() {
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
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const target = e.target;
			if (target && [
				"INPUT",
				"TEXTAREA",
				"SELECT"
			].includes(target.tagName)) return;
			if (e.code === "Space") {
				e.preventDefault();
				togglePaused();
			} else if (e.code === "Escape") setFocusedId("sun");
			else if (e.key === "l" || e.key === "L") setShowLabels(!useSolarStore.getState().showLabels);
			else if (e.key === "o" || e.key === "O") setShowOrbits(!useSolarStore.getState().showOrbits);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		setFocusedId,
		setShowLabels,
		setShowOrbits,
		togglePaused
	]);
	const focused = BODY_BY_ID[focusedId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "absolute top-3 right-3 left-3 flex items-start justify-between gap-4 md:top-6 md:right-6 md:left-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-xs font-medium uppercase tracking-kicker text-muted",
							children: "Helios"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold leading-tight tracking-tight text-fg text-balance md:text-4xl",
							children: "日心"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xs text-sm leading-snug text-muted text-pretty",
							children: "太阳系三维轨道模拟"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pointer-events-none hidden max-w-52 text-right text-xs leading-relaxed text-subtle md:block",
					children: [
						"拖动旋转 · 滚轮缩放",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"点击行星聚焦 · 空格暂停"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "天体",
				className: "pointer-events-auto absolute top-28 bottom-28 left-6 hidden w-44 flex-col gap-0.5 overflow-y-auto md:flex",
				children: BODIES.map((body) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyButton, {
					id: body.id,
					active: focusedId === body.id,
					indent: Boolean(body.parent),
					onSelect: setFocusedId
				}, body.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-28 right-6 bottom-28 hidden w-80 overflow-y-auto md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetPanel, {
					id: focusedId,
					onClose: () => setFocusedId("sun")
				}, focusedId)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "absolute right-3 bottom-3 left-3 flex flex-col gap-2 md:right-6 md:bottom-6 md:left-6 md:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetPanel, {
							id: focusedId,
							compact: true,
							onClose: () => setFocusedId("sun")
						}, `m-${focusedId}`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "快速选择",
						className: "pointer-events-auto flex gap-1 overflow-x-auto md:hidden",
						children: BODIES.map((body) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setFocusedId(body.id),
							className: cn("flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-(--motion-quick)", focusedId === body.id ? "bg-surface-2 text-fg shadow-[var(--shadow-border)]" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2 rounded-full",
								style: { backgroundColor: body.color }
							}), body.name]
						}, body.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto flex items-center gap-2 rounded-lg bg-surface/92 p-2 shadow-[var(--shadow-border)] md:gap-4 md:rounded-xl md:px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										size: "icon",
										"aria-label": paused ? "继续" : "暂停",
										onClick: togglePaused,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative size-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: cn("absolute inset-0 transition-[opacity,transform,filter] duration-(--motion-fast) ease-(--ease-in-out)", paused ? "scale-[0.25] opacity-0 blur-xs" : "scale-100 opacity-100 blur-none") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: cn("absolute inset-0 ml-px transition-[opacity,transform,filter] duration-(--motion-fast) ease-(--ease-in-out)", paused ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-xs") })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										size: "icon",
										"aria-label": "复位视角",
										onClick: () => setFocusedId("sun"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "hidden text-xs text-subtle md:block",
										children: [paused ? "已暂停" : "运行中", focused.id !== "sun" ? ` · ${focused.name}` : ""]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-w-0 flex-1 items-center gap-3 px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs font-medium text-muted",
										children: "速度"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 0,
										max: 1,
										step: .01,
										value: speedToSlider(speed),
										onChange: (e) => setSpeed(sliderToSpeed(Number(e.target.value))),
										className: "speed-slider h-11 w-full",
										"aria-label": "模拟速度"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-12 shrink-0 text-right font-medium tabular-nums text-fg",
										children: formatSpeed(speed)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "toggle",
									size: "icon",
									"aria-label": "名称标签",
									"data-on": showLabels,
									onClick: () => setShowLabels(!showLabels),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "toggle",
									size: "icon",
									"aria-label": "轨道轨迹",
									"data-on": showOrbits,
									onClick: () => setShowOrbits(!showOrbits),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, {})
								})]
							})
						]
					})
				]
			})
		]
	});
}
function BodyButton({ id, active, indent, onSelect }) {
	const body = BODY_BY_ID[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(id),
		className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-left transition-colors duration-(--motion-quick)", indent && "ml-4", active ? "bg-surface-2 text-fg shadow-[var(--shadow-border)]" : "text-muted hover:bg-fg/5 hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-2 shrink-0 rounded-full",
			style: { backgroundColor: body.color }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-medium",
				children: body.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs text-subtle",
				children: body.latin
			})]
		})]
	});
}
function PlanetPanel({ id, onClose, compact = false }) {
	const body = BODY_BY_ID[id];
	const kindLabel = body.kind === "star" ? "恒星" : body.kind === "moon" ? "卫星" : "行星";
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "panel-enter pointer-events-auto rounded-lg bg-surface/92 px-3 py-2.5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold leading-tight tracking-tight text-fg",
				children: body.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					kindLabel,
					" · ",
					body.latin
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 line-clamp-2 text-sm leading-relaxed text-muted text-pretty",
			children: body.info.summary
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "panel-enter pointer-events-auto flex w-80 flex-col rounded-xl bg-surface/92 p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium uppercase tracking-kicker text-muted",
						children: [kindLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 normal-case tracking-normal",
							children: body.latin
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-fg",
						children: body.name
					})]
				}), id !== "sun" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "iconSm",
					"aria-label": "回到太阳",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-x-4 gap-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "距日",
						value: body.info.distance
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "公转",
						value: body.info.period
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "自转",
						value: body.info.day
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "直径",
						value: body.info.diameter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "卫星",
						value: body.info.moons
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-0.5 size-2.5 rounded-full",
							style: { backgroundColor: body.color }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle",
							children: "光谱色"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted text-pretty",
				children: body.info.summary
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5 text-sm font-medium tabular-nums text-fg",
		children: value
	})] });
}
var canvasPromise = typeof window !== "undefined" ? import("./solar-canvas-C85ZTgVC.mjs") : null;
function SolarApp() {
	const [CanvasApp, setCanvasApp] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		(canvasPromise ?? import("./solar-canvas-C85ZTgVC.mjs")).then((mod) => {
			if (mounted) setCanvasApp(() => mod.SolarCanvas);
		});
		return () => {
			mounted = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh overflow-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0",
			children: CanvasApp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasApp, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				className: "h-full w-full bg-bg",
				"aria-hidden": "true"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolarApp, {});
}
//#endregion
export { DAY_SECONDS as a, BODY_BY_ID as i, useSolarStore as n, BODIES as r, routes_exports as t };
