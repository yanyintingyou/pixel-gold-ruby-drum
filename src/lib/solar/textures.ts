import * as THREE from "three";
import type { BodyId } from "./data";

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise2(x: number, y: number) {
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

function fbm(x: number, y: number, octaves = 5) {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    value += amp * noise2(x * freq, y * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return value;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mix3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function canvasTexture(
  width: number,
  height: number,
  paint: (data: Uint8ClampedArray, w: number, h: number) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context unavailable");
  const image = ctx.createImageData(width, height);
  paint(image.data, width, height);
  ctx.putImageData(image, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function write(
  data: Uint8ClampedArray,
  i: number,
  r: number,
  g: number,
  b: number,
  a = 255,
) {
  data[i] = r;
  data[i + 1] = g;
  data[i + 2] = b;
  data[i + 3] = a;
}

function paintSun(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n = fbm(u * 6, v * 3, 5);
      const n2 = fbm(u * 14 + 4, v * 7, 4);
      const t = Math.min(1, Math.max(0, n * 0.75 + n2 * 0.25));
      const col = mix3([255, 138, 32], [255, 236, 170], t);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintMercury(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n = fbm(u * 10, v * 5, 5);
      const crater = fbm(u * 22, v * 11, 3);
      let col = mix3([92, 86, 80], [168, 160, 148], n);
      if (crater > 0.62) col = mix3(col, [58, 54, 50], (crater - 0.62) * 2.4);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintVenus(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const swirl = fbm(u * 3 + v * 1.4, v * 4, 5);
      const col = mix3([214, 176, 96], [245, 226, 176], swirl);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintEarth(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const lat = Math.abs(v - 0.5);
      const n = fbm(u * 5 + 1.7, v * 2.6, 5);
      const n2 = fbm(u * 9 - 3, v * 5 + 2, 4);
      const ice = lat > 0.42 || (lat > 0.34 && n2 > 0.58);
      const land = n > 0.52 && lat < 0.44;
      let col: [number, number, number];
      if (ice) {
        col = mix3([210, 224, 236], [246, 250, 255], n2);
      } else if (land) {
        const arid = n2 * (1 - lat * 1.4);
        col =
          arid > 0.55
            ? mix3([122, 110, 58], [78, 108, 52], n)
            : mix3([42, 96, 48], [86, 130, 64], n2);
        if (n2 > 0.7) col = mix3(col, [92, 90, 78], 0.45);
      } else {
        col = mix3([8, 42, 86], [28, 110, 158], n * 0.5 + (1 - lat) * 0.2);
      }
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintClouds(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n = fbm(u * 7 + 2, v * 3.2, 5);
      const a = Math.max(0, (n - 0.5) * 420);
      const i = (y * w + x) * 4;
      write(data, i, 245, 248, 252, Math.min(200, a));
    }
  }
}

function paintMoon(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n = fbm(u * 8, v * 4, 5);
      const mare = fbm(u * 3.2, v * 2.2, 3);
      let col = mix3([120, 118, 112], [200, 198, 190], n);
      if (mare > 0.58) col = mix3(col, [72, 70, 68], (mare - 0.58) * 2);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintMars(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const lat = Math.abs(v - 0.5);
      const n = fbm(u * 6, v * 3, 5);
      let col = mix3([138, 62, 36], [196, 118, 72], n);
      if (n > 0.62) col = mix3(col, [86, 44, 28], 0.4);
      if (lat > 0.42) col = mix3(col, [236, 240, 244], (lat - 0.42) * 8);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintJupiter(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const warp = fbm(u * 3, v * 10, 4) * 0.08;
      const band = Math.sin((v + warp) * Math.PI * 14);
      const n = fbm(u * 4, v * 8, 4);
      let col = mix3([214, 176, 124], [148, 104, 68], (band + 1) * 0.5);
      col = mix3(col, [236, 214, 176], n * 0.35);
      const dx = u - 0.3;
      const dy = (v - 0.6) * 2.1;
      const spot = Math.sqrt(dx * dx + dy * dy);
      if (spot < 0.05) {
        col = mix3(col, [176, 64, 40], 1 - spot / 0.05);
      }
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintSaturn(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const warp = fbm(u * 2, v * 8, 3) * 0.04;
      const band = Math.sin((v + warp) * Math.PI * 10);
      const col = mix3([214, 190, 140], [186, 160, 108], (band + 1) * 0.45);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintUranus(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n = fbm(u * 2.4, v * 3, 4);
      const col = mix3([110, 196, 188], [168, 228, 220], n);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
  }
}

function paintNeptune(data: Uint8ClampedArray, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n = fbm(u * 3, v * 4, 4);
      const band = Math.sin(v * Math.PI * 6 + n);
      let col = mix3([32, 70, 168], [74, 126, 214], n);
      col = mix3(col, [24, 48, 120], (band + 1) * 0.2);
      const dx = u - 0.62;
      const dy = (v - 0.48) * 1.6;
      const spot = Math.sqrt(dx * dx + dy * dy);
      if (spot < 0.04) col = mix3(col, [18, 32, 86], 0.7);
      const i = (y * w + x) * 4;
      write(data, i, col[0], col[1], col[2]);
    }
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
  g.addColorStop(0.18, "rgba(255, 186, 70, 0.55)");
  g.addColorStop(0.42, "rgba(255, 120, 24, 0.14)");
  g.addColorStop(1, "rgba(255, 80, 0, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export type TextureAtlas = {
  maps: Partial<Record<BodyId, THREE.CanvasTexture>>;
  clouds: THREE.CanvasTexture;
  glow: THREE.CanvasTexture;
};

export function createTextures(): TextureAtlas {
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
      neptune: canvasTexture(512, 256, paintNeptune),
    },
    clouds: canvasTexture(1024, 512, paintClouds),
    glow: glowTexture(),
  };
}

export function disposeTextures(atlas: TextureAtlas) {
  for (const tex of Object.values(atlas.maps)) tex?.dispose();
  atlas.clouds.dispose();
  atlas.glow.dispose();
}
