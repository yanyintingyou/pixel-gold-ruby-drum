export type BodyId =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "moon"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export type BodyKind = "star" | "planet" | "moon";

export type BodyDef = {
  id: BodyId;
  name: string;
  latin: string;
  kind: BodyKind;
  parent?: BodyId;
  color: string;
  atmosphere?: string;
  radius: number;
  orbit: number;
  periodYears: number;
  dayLength: number;
  tilt: number;
  phase: number;
  hasRings?: "saturn" | "uranus";
  hasClouds?: boolean;
  info: {
    distance: string;
    period: string;
    day: string;
    diameter: string;
    moons: string;
    summary: string;
  };
};

export const YEAR_SECONDS = 28;
export const DAY_SECONDS = 3.2;

export const BODIES: BodyDef[] = [
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
    tilt: 0.126,
    phase: 0,
    info: {
      distance: "—",
      period: "—",
      day: "25.4 日",
      diameter: "1,392,700 km",
      moons: "行星 8",
      summary:
        "一颗 G2V 黄矮星，占据太阳系质量的 99.86%。核心持续进行氢聚变，把光与热送往每一条轨道。",
    },
  },
  {
    id: "mercury",
    name: "水星",
    latin: "Mercury",
    kind: "planet",
    color: "#8a8378",
    radius: 0.17,
    orbit: 5.6,
    periodYears: 0.241,
    dayLength: 58.6,
    tilt: 0.0006,
    phase: 0.4,
    info: {
      distance: "0.39 AU",
      period: "88 日",
      day: "59 日",
      diameter: "4,879 km",
      moons: "无",
      summary:
        "最靠近太阳的岩石行星。几乎没有大气，表面布满撞击坑，昼夜温差可超过 600°C。",
    },
  },
  {
    id: "venus",
    name: "金星",
    latin: "Venus",
    kind: "planet",
    color: "#c9b07a",
    atmosphere: "#e8d9a8",
    radius: 0.28,
    orbit: 7.6,
    periodYears: 0.615,
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
      summary:
        "被厚重的二氧化碳大气包裹，表面气压约为地球的 90 倍，温度足以熔化铅。自转缓慢且逆向。",
    },
  },
  {
    id: "earth",
    name: "地球",
    latin: "Earth",
    kind: "planet",
    color: "#3f8fbf",
    atmosphere: "#7ec8ff",
    radius: 0.3,
    orbit: 9.7,
    periodYears: 1,
    dayLength: 1,
    tilt: 0.409,
    phase: 0.15,
    hasClouds: true,
    info: {
      distance: "1.00 AU",
      period: "365.25 日",
      day: "23.9 时",
      diameter: "12,756 km",
      moons: "1",
      summary:
        "目前已知唯一存在生命的世界。液态水、氧气大气与磁场共同守护着这颗蓝色行星。",
    },
  },
  {
    id: "moon",
    name: "月球",
    latin: "Moon",
    kind: "moon",
    parent: "earth",
    color: "#9a9790",
    radius: 0.082,
    orbit: 0.86,
    periodYears: 0.0748,
    dayLength: 27.3,
    tilt: 0.117,
    phase: 0.6,
    info: {
      distance: "0.0026 AU",
      period: "27.3 日",
      day: "27.3 日 · 潮汐锁定",
      diameter: "3,475 km",
      moons: "—",
      summary:
        "地球的唯一天然卫星，潮汐锁定后永远以同一面朝向地球，表面是古老的高地与暗色月海。",
    },
  },
  {
    id: "mars",
    name: "火星",
    latin: "Mars",
    kind: "planet",
    color: "#c0714a",
    atmosphere: "#d9895c",
    radius: 0.21,
    orbit: 12.1,
    periodYears: 1.881,
    dayLength: 1.03,
    tilt: 0.439,
    phase: 2.1,
    info: {
      distance: "1.52 AU",
      period: "687 日",
      day: "24.6 时",
      diameter: "6,792 km",
      moons: "2",
      summary:
        "寒冷的沙漠世界。奥林帕斯山是太阳系最高火山，两极覆盖干冰与水冰，天空呈淡淡的锈红色。",
    },
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
    dayLength: 0.41,
    tilt: 0.0546,
    phase: 0.9,
    info: {
      distance: "5.20 AU",
      period: "11.9 年",
      day: "9.9 时",
      diameter: "142,984 km",
      moons: "95+",
      summary:
        "太阳系最大的行星。快速自转拉出平行云带，大红斑是一座持续数百年的反气旋风暴。",
    },
  },
  {
    id: "saturn",
    name: "土星",
    latin: "Saturn",
    kind: "planet",
    color: "#d7c39a",
    atmosphere: "#efe0bc",
    radius: 0.88,
    orbit: 21.8,
    periodYears: 29.46,
    dayLength: 0.45,
    tilt: 0.466,
    phase: 1.7,
    hasRings: "saturn",
    info: {
      distance: "9.58 AU",
      period: "29.5 年",
      day: "10.7 时",
      diameter: "120,536 km",
      moons: "146+",
      summary:
        "以光环闻名的气态巨行星。光环由无数冰粒与岩石碎片组成，在阳光下呈现出淡金色。",
    },
  },
  {
    id: "uranus",
    name: "天王星",
    latin: "Uranus",
    kind: "planet",
    color: "#7ecfc9",
    atmosphere: "#a6ebe4",
    radius: 0.48,
    orbit: 26.6,
    periodYears: 84.01,
    dayLength: -0.72,
    tilt: 1.706,
    phase: 0.3,
    hasRings: "uranus",
    info: {
      distance: "19.2 AU",
      period: "84 年",
      day: "17.2 时 · 逆向",
      diameter: "51,118 km",
      moons: "28",
      summary:
        "一颗冰巨星，自转轴几乎躺平，像侧着滚过轨道。甲烷吸收红光，使它呈现苍青的冷色。",
    },
  },
  {
    id: "neptune",
    name: "海王星",
    latin: "Neptune",
    kind: "planet",
    color: "#3d6fd0",
    atmosphere: "#6ea2ff",
    radius: 0.46,
    orbit: 31.4,
    periodYears: 164.8,
    dayLength: 0.67,
    tilt: 0.494,
    phase: 2.6,
    info: {
      distance: "30.1 AU",
      period: "165 年",
      day: "16.1 时",
      diameter: "49,528 km",
      moons: "16",
      summary:
        "太阳系最远的行星。深海蓝的氢氦大气中，风暴风速可达超音速，海卫一沿逆向轨道运行。",
    },
  },
];

export const BODY_BY_ID = Object.fromEntries(
  BODIES.map((body) => [body.id, body]),
) as Record<BodyId, BodyDef>;

export const PICKER_BODIES = BODIES;
