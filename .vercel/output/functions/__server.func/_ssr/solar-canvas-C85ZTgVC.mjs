import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as useThree, d as Color, f as Object3D, g as Vector3, h as ShaderMaterial, i as Html, l as CanvasTexture, m as SRGBColorSpace, n as OrbitControls, o as Canvas, p as RepeatWrapping, r as Line, s as useFrame, t as Stars, u as ClampToEdgeWrapping, y as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as DAY_SECONDS, i as BODY_BY_ID, n as useSolarStore, r as BODIES } from "./routes-BQjgq83m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solar-canvas-C85ZTgVC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function hash2(x, y) {
	const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
	return s - Math.floor(s);
}
function noise2(x, y) {
	const ix = Math.floor(x);
	const iy = Math.floor(y);
	const fx = x - ix;
	const fy = y - iy;
	const ux = fx * fx * (3 - 2 * fx);
	const uy = fy * fy * (3 - 2 * fy);
	const a = hash2(ix, iy);
	const b = hash2(ix + 1, iy);
	const c = hash2(ix, iy + 1);
	const d = hash2(ix + 1, iy + 1);
	return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
function fbm(x, y, octaves = 5) {
	let value = 0;
	let amp = .5;
	let freq = 1;
	for (let i = 0; i < octaves; i++) {
		value += amp * noise2(x * freq, y * freq);
		freq *= 2;
		amp *= .5;
	}
	return value;
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function mix3(a, b, t) {
	return [
		lerp(a[0], b[0], t),
		lerp(a[1], b[1], t),
		lerp(a[2], b[2], t)
	];
}
function canvasTexture(width, height, paint) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("2d context unavailable");
	const image = ctx.createImageData(width, height);
	paint(image.data, width, height);
	ctx.putImageData(image, 0, 0);
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 8;
	tex.wrapS = RepeatWrapping;
	tex.wrapT = ClampToEdgeWrapping;
	tex.needsUpdate = true;
	return tex;
}
function write(data, i, r, g, b, a = 255) {
	data[i] = r;
	data[i + 1] = g;
	data[i + 2] = b;
	data[i + 3] = a;
}
function paintSun(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const n = fbm(u * 6, v * 3, 5);
		const n2 = fbm(u * 14 + 4, v * 7, 4);
		const col = mix3([
			255,
			138,
			32
		], [
			255,
			236,
			170
		], Math.min(1, Math.max(0, n * .75 + n2 * .25)));
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintMercury(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const n = fbm(u * 10, v * 5, 5);
		const crater = fbm(u * 22, v * 11, 3);
		let col = mix3([
			92,
			86,
			80
		], [
			168,
			160,
			148
		], n);
		if (crater > .62) col = mix3(col, [
			58,
			54,
			50
		], (crater - .62) * 2.4);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintVenus(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const col = mix3([
			214,
			176,
			96
		], [
			245,
			226,
			176
		], fbm(u * 3 + v * 1.4, v * 4, 5));
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintEarth(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const lat = Math.abs(v - .5);
		const n = fbm(u * 5 + 1.7, v * 2.6, 5);
		const n2 = fbm(u * 9 - 3, v * 5 + 2, 4);
		const ice = lat > .42 || lat > .34 && n2 > .58;
		const land = n > .52 && lat < .44;
		let col;
		if (ice) col = mix3([
			210,
			224,
			236
		], [
			246,
			250,
			255
		], n2);
		else if (land) {
			col = n2 * (1 - lat * 1.4) > .55 ? mix3([
				122,
				110,
				58
			], [
				78,
				108,
				52
			], n) : mix3([
				42,
				96,
				48
			], [
				86,
				130,
				64
			], n2);
			if (n2 > .7) col = mix3(col, [
				92,
				90,
				78
			], .45);
		} else col = mix3([
			8,
			42,
			86
		], [
			28,
			110,
			158
		], n * .5 + (1 - lat) * .2);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintClouds(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const n = fbm(u * 7 + 2, v * 3.2, 5);
		const a = Math.max(0, (n - .5) * 420);
		write(data, (y * w + x) * 4, 245, 248, 252, Math.min(200, a));
	}
}
function paintMoon(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const n = fbm(u * 8, v * 4, 5);
		const mare = fbm(u * 3.2, v * 2.2, 3);
		let col = mix3([
			120,
			118,
			112
		], [
			200,
			198,
			190
		], n);
		if (mare > .58) col = mix3(col, [
			72,
			70,
			68
		], (mare - .58) * 2);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintMars(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const lat = Math.abs(v - .5);
		const n = fbm(u * 6, v * 3, 5);
		let col = mix3([
			138,
			62,
			36
		], [
			196,
			118,
			72
		], n);
		if (n > .62) col = mix3(col, [
			86,
			44,
			28
		], .4);
		if (lat > .42) col = mix3(col, [
			236,
			240,
			244
		], (lat - .42) * 8);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintJupiter(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const warp = fbm(u * 3, v * 10, 4) * .08;
		const band = Math.sin((v + warp) * Math.PI * 14);
		const n = fbm(u * 4, v * 8, 4);
		let col = mix3([
			214,
			176,
			124
		], [
			148,
			104,
			68
		], (band + 1) * .5);
		col = mix3(col, [
			236,
			214,
			176
		], n * .35);
		const dx = u - .3;
		const dy = (v - .6) * 2.1;
		const spot = Math.sqrt(dx * dx + dy * dy);
		if (spot < .05) col = mix3(col, [
			176,
			64,
			40
		], 1 - spot / .05);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintSaturn(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const warp = fbm(u * 2, v * 8, 3) * .04;
		const col = mix3([
			214,
			190,
			140
		], [
			186,
			160,
			108
		], (Math.sin((v + warp) * Math.PI * 10) + 1) * .45);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintUranus(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const col = mix3([
			110,
			196,
			188
		], [
			168,
			228,
			220
		], fbm(u * 2.4, v * 3, 4));
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function paintNeptune(data, w, h) {
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const u = x / w;
		const v = y / h;
		const n = fbm(u * 3, v * 4, 4);
		const band = Math.sin(v * Math.PI * 6 + n);
		let col = mix3([
			32,
			70,
			168
		], [
			74,
			126,
			214
		], n);
		col = mix3(col, [
			24,
			48,
			120
		], (band + 1) * .2);
		const dx = u - .62;
		const dy = (v - .48) * 1.6;
		if (Math.sqrt(dx * dx + dy * dy) < .04) col = mix3(col, [
			18,
			32,
			86
		], .7);
		write(data, (y * w + x) * 4, col[0], col[1], col[2]);
	}
}
function glowTexture() {
	const canvas = document.createElement("canvas");
	canvas.width = 256;
	canvas.height = 256;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("2d context unavailable");
	const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
	g.addColorStop(0, "rgba(255, 236, 180, 1)");
	g.addColorStop(.18, "rgba(255, 186, 70, 0.55)");
	g.addColorStop(.42, "rgba(255, 120, 24, 0.14)");
	g.addColorStop(1, "rgba(255, 80, 0, 0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 256, 256);
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function createTextures() {
	return {
		maps: {
			sun: canvasTexture(512, 256, paintSun),
			mercury: canvasTexture(512, 256, paintMercury),
			venus: canvasTexture(512, 256, paintVenus),
			earth: canvasTexture(1024, 512, paintEarth),
			moon: canvasTexture(512, 256, paintMoon),
			mars: canvasTexture(512, 256, paintMars),
			jupiter: canvasTexture(1024, 512, paintJupiter),
			saturn: canvasTexture(512, 256, paintSaturn),
			uranus: canvasTexture(512, 256, paintUranus),
			neptune: canvasTexture(512, 256, paintNeptune)
		},
		clouds: canvasTexture(1024, 512, paintClouds),
		glow: glowTexture()
	};
}
function disposeTextures(atlas) {
	for (const tex of Object.values(atlas.maps)) tex?.dispose();
	atlas.clouds.dispose();
	atlas.glow.dispose();
}
var sim = {
	time: 0,
	positions: Object.fromEntries(BODIES.map((body) => [body.id, new Vector3()]))
};
function stepSim(dt, speed, paused) {
	if (!paused) sim.time += dt * speed;
	for (const body of BODIES) {
		const angle = sim.time / Math.max(body.periodYears, 1e-4) / 28 * Math.PI * 2 + body.phase;
		const pos = sim.positions[body.id];
		pos.set(Math.cos(angle) * body.orbit, 0, Math.sin(angle) * body.orbit);
		if (body.parent) pos.add(sim.positions[body.parent]);
	}
}
function spinAngle(id) {
	const body = BODY_BY_ID[id];
	const days = Math.abs(body.dayLength) || 1;
	const sign = body.dayLength < 0 ? -1 : 1;
	return sim.time / (days * DAY_SECONDS) * Math.PI * 2 * sign;
}
var _delta = new Vector3();
var _off = new Vector3();
var _desired = new Vector3();
function orbitPoints(radius, segments = 160) {
	const pts = [];
	for (let i = 0; i <= segments; i++) {
		const a = i / segments * Math.PI * 2;
		pts.push([
			Math.cos(a) * radius,
			0,
			Math.sin(a) * radius
		]);
	}
	return pts;
}
function Atmosphere({ radius, color }) {
	const material = (0, import_react.useMemo)(() => {
		return new ShaderMaterial({
			uniforms: {
				uColor: { value: new Color(color) },
				uPower: { value: 2.8 },
				uIntensity: { value: .85 }
			},
			vertexShader: `
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vPosW = world.xyz;
          vNormalW = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
			fragmentShader: `
        uniform vec3 uColor;
        uniform float uPower;
        uniform float uIntensity;
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosW);
          float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormalW))), uPower);
          gl_FragColor = vec4(uColor, clamp(fresnel * uIntensity, 0.0, 1.0));
        }
      `,
			transparent: true,
			depthWrite: false,
			side: 1,
			blending: 2,
			toneMapped: false
		});
	}, [color]);
	(0, import_react.useEffect)(() => () => material.dispose(), [material]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		scale: 1.18,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			radius,
			32,
			24
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
			object: material,
			attach: "material"
		})]
	});
}
function Rings({ body }) {
	if (body.hasRings === "saturn") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		rotation: [
			Math.PI / 2,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			body.radius * 1.28,
			body.radius * 1.58,
			96
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#d9c7a0",
			transparent: true,
			opacity: .72,
			side: 2,
			roughness: .55,
			metalness: .12,
			depthWrite: false
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			body.radius * 1.68,
			body.radius * 2.18,
			96
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#cbb892",
			transparent: true,
			opacity: .58,
			side: 2,
			roughness: .6,
			metalness: .1,
			depthWrite: false
		})] })]
	});
	if (body.hasRings === "uranus") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		rotation: [
			Math.PI / 2,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			body.radius * 1.55,
			body.radius * 1.72,
			80
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#c5d0d4",
			transparent: true,
			opacity: .35,
			side: 2,
			roughness: .7,
			depthWrite: false
		})]
	});
	return null;
}
function BodyMesh({ body, atlas }) {
	const group = (0, import_react.useRef)(null);
	const spin = (0, import_react.useRef)(null);
	const cloud = (0, import_react.useRef)(null);
	const setFocusedId = useSolarStore((s) => s.setFocusedId);
	const setHoveredId = useSolarStore((s) => s.setHoveredId);
	const map = atlas.maps[body.id];
	useFrame(() => {
		const g = group.current;
		if (!g) return;
		g.position.copy(sim.positions[body.id]);
		if (spin.current) spin.current.rotation.y = spinAngle(body.id);
		if (cloud.current) cloud.current.rotation.y = spinAngle(body.id) * 1.18 + .4;
	});
	const isStar = body.kind === "star";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: spin,
				rotation: [
					body.tilt,
					0,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						onClick: (e) => {
							e.stopPropagation();
							setFocusedId(body.id);
						},
						onPointerOver: (e) => {
							e.stopPropagation();
							setHoveredId(body.id);
							document.body.style.cursor = "pointer";
						},
						onPointerOut: () => {
							setHoveredId(null);
							document.body.style.cursor = "auto";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							body.radius,
							isStar ? 48 : 40,
							isStar ? 32 : 28
						] }), isStar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map,
							color: "#ffd7a0",
							toneMapped: false
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map,
							color: map ? "#ffffff" : body.color,
							roughness: body.kind === "planet" && body.radius > .7 ? .52 : .72,
							metalness: .04
						})]
					}),
					body.hasClouds && !isStar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						ref: cloud,
						scale: 1.015,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							body.radius,
							40,
							28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: atlas.clouds,
							transparent: true,
							depthWrite: false,
							opacity: body.id === "venus" ? .55 : .42,
							roughness: 1,
							metalness: 0
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rings, { body })
				]
			}),
			body.atmosphere ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {
				radius: body.radius,
				color: body.atmosphere
			}) : null,
			isStar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunGlow, {
				atlas,
				radius: body.radius
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyLabel, { body })
		]
	});
}
function SunGlow({ atlas, radius }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
			scale: [
				radius * 7.4,
				radius * 7.4,
				1
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
				map: atlas.glow,
				blending: 2,
				depthWrite: false,
				transparent: true,
				opacity: .9,
				toneMapped: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
			scale: [
				radius * 3.2,
				radius * 3.2,
				1
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
				map: atlas.glow,
				blending: 2,
				depthWrite: false,
				transparent: true,
				opacity: .55,
				toneMapped: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			color: "#ffe2a8",
			intensity: 42,
			distance: 90,
			decay: 1.05
		})
	] });
}
function BodyLabel({ body }) {
	const showLabels = useSolarStore((s) => s.showLabels);
	const focusedId = useSolarStore((s) => s.focusedId);
	const hoveredId = useSolarStore((s) => s.hoveredId);
	const visible = showLabels && (body.kind !== "moon" || focusedId === "earth" || focusedId === "moon");
	const active = focusedId === body.id || hoveredId === body.id;
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		center: true,
		sprite: true,
		position: [
			0,
			body.radius + .28,
			0
		],
		distanceFactor: 18,
		occlude: false,
		style: {
			pointerEvents: "none",
			userSelect: "none"
		},
		zIndexRange: [10, 0],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: active ? "rounded-sm bg-surface/90 px-2 py-1 text-xs font-medium tracking-wide text-fg shadow-[var(--shadow-border)]" : "rounded-sm bg-bg/70 px-2 py-1 text-xs font-medium tracking-wide text-fg/80",
			children: body.name
		})
	});
}
function Orbits() {
	const showOrbits = useSolarStore((s) => s.showOrbits);
	const focusedId = useSolarStore((s) => s.focusedId);
	const hoveredId = useSolarStore((s) => s.hoveredId);
	const planetOrbits = (0, import_react.useMemo)(() => BODIES.filter((b) => !b.parent && b.orbit > 0).map((body) => ({
		id: body.id,
		color: body.color,
		points: orbitPoints(body.orbit)
	})), []);
	const moonPts = (0, import_react.useMemo)(() => orbitPoints(BODY_BY_ID.moon.orbit, 80), []);
	const moonGroup = (0, import_react.useRef)(null);
	useFrame(() => {
		if (moonGroup.current) moonGroup.current.position.copy(sim.positions.earth);
	});
	if (!showOrbits) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [planetOrbits.map((orbit) => {
		const active = focusedId === orbit.id || hoveredId === orbit.id;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: orbit.points,
			color: orbit.color,
			transparent: true,
			opacity: active ? .7 : .22,
			lineWidth: active ? 1.6 : 1
		}, orbit.id);
	}), (focusedId === "earth" || focusedId === "moon" || hoveredId === "moon") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: moonGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: moonPts,
			color: BODY_BY_ID.moon.color,
			transparent: true,
			opacity: .45,
			lineWidth: 1
		})
	})] });
}
function AsteroidBelt() {
	const mesh = (0, import_react.useRef)(null);
	const count = 380;
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	(0, import_react.useEffect)(() => {
		const inst = mesh.current;
		if (!inst) return;
		for (let i = 0; i < count; i++) {
			const a = hash(i, 1) * Math.PI * 2;
			const r = 14.15 + hash(i, 2) * 1.7;
			const y = (hash(i, 3) - .5) * .28;
			dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
			dummy.rotation.set(hash(i, 4) * 6, hash(i, 5) * 6, hash(i, 6) * 6);
			dummy.scale.setScalar(.018 + hash(i, 7) * .03);
			dummy.updateMatrix();
			inst.setMatrixAt(i, dummy.matrix);
		}
		inst.instanceMatrix.needsUpdate = true;
	}, [count, dummy]);
	useFrame((_, delta) => {
		const { paused, speed } = useSolarStore.getState();
		if (paused || !mesh.current) return;
		mesh.current.rotation.y += Math.min(delta, .1) * speed * .012;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: mesh,
		args: [
			void 0,
			void 0,
			count
		],
		raycast: () => {},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#6d675f",
			roughness: .92,
			metalness: .08
		})]
	});
}
function hash(i, salt) {
	const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
	return s - Math.floor(s);
}
function CameraRig() {
	const { camera } = useThree();
	const controls = useThree((s) => s.controls);
	const focusedId = useSolarStore((s) => s.focusedId);
	const lastPos = (0, import_react.useRef)(new Vector3());
	const blend = (0, import_react.useRef)(1);
	const skipFollow = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		blend.current = 0;
		skipFollow.current = true;
	}, [focusedId]);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const ctrl = controls;
		if (!ctrl) return;
		const focus = useSolarStore.getState().focusedId;
		const body = BODY_BY_ID[focus];
		const pos = sim.positions[focus];
		if (skipFollow.current) {
			lastPos.current.copy(pos);
			skipFollow.current = false;
		}
		if (blend.current < 1) {
			const dist = focus === "sun" ? 30 : body.radius * 6.8 + 2.2;
			_off.copy(camera.position).sub(pos);
			if (_off.lengthSq() < 1e-5) _off.set(.7, .36, 1);
			_off.normalize();
			if (_off.y < .12) _off.y = .2;
			_off.normalize().multiplyScalar(dist);
			_desired.copy(pos).add(_off);
			const k = 1 - Math.exp(-4.4 * d);
			ctrl.target.lerp(pos, k);
			camera.position.lerp(_desired, k);
			blend.current = Math.min(1, blend.current + d * 1.2);
			lastPos.current.copy(pos);
		} else {
			_delta.copy(pos).sub(lastPos.current);
			camera.position.add(_delta);
			ctrl.target.add(_delta);
			lastPos.current.copy(pos);
		}
		ctrl.update();
	});
	return null;
}
function SimClock() {
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const { paused, speed } = useSolarStore.getState();
		stepSim(d, speed, paused);
	});
	return null;
}
function SolarScene({ atlas }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#08090d"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#08090d",
				70,
				160
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .055 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#1b2436",
			"#050506",
			.16
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
			radius: 180,
			depth: 70,
			count: 3600,
			factor: 2.6,
			saturation: 0,
			fade: true,
			speed: .35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
			radius: 120,
			depth: 40,
			count: 280,
			factor: 5.4,
			saturation: .15,
			fade: true,
			speed: .12
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimClock, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbits, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsteroidBelt, {}),
		BODIES.map((body) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyMesh, {
			body,
			atlas
		}, body.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			makeDefault: true,
			enablePan: false,
			enableDamping: true,
			dampingFactor: .08,
			minDistance: 1.4,
			maxDistance: 78,
			rotateSpeed: .55,
			zoomSpeed: .85
		})
	] });
}
function SolarCanvas() {
	const atlas = (0, import_react.useMemo)(() => createTextures(), []);
	(0, import_react.useEffect)(() => {
		return () => disposeTextures(atlas);
	}, [atlas]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "h-full w-full touch-none",
		camera: {
			position: [
				16,
				9,
				24
			],
			fov: 42,
			near: .12,
			far: 500
		},
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			powerPreference: "high-performance",
			toneMapping: 4,
			toneMappingExposure: 1.08
		},
		onCreated: ({ gl }) => {
			gl.setClearColor("#08090d");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolarScene, { atlas })
	});
}
//#endregion
export { SolarCanvas };
