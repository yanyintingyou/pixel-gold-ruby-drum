import { BODIES, BODY_BY_ID, DAY_SECONDS, YEAR_SECONDS, type BodyId } from "./data";
import * as THREE from "three";

export const sim = {
  time: 0,
  positions: Object.fromEntries(
    BODIES.map((body) => [body.id, new THREE.Vector3()]),
  ) as Record<BodyId, THREE.Vector3>,
};

export function stepSim(dt: number, speed: number, paused: boolean) {
  if (!paused) sim.time += dt * speed;
  for (const body of BODIES) {
    const angle =
      (sim.time / Math.max(body.periodYears, 0.0001) / YEAR_SECONDS) *
        Math.PI *
        2 +
      body.phase;
    const pos = sim.positions[body.id];
    pos.set(Math.cos(angle) * body.orbit, 0, Math.sin(angle) * body.orbit);
    if (body.parent) pos.add(sim.positions[body.parent]);
  }
}

export function spinAngle(id: BodyId) {
  const body = BODY_BY_ID[id];
  const days = Math.abs(body.dayLength) || 1;
  const sign = body.dayLength < 0 ? -1 : 1;
  return (sim.time / (days * DAY_SECONDS)) * Math.PI * 2 * sign;
}
