import { Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { BODIES, BODY_BY_ID, type BodyDef, type BodyId } from "@/lib/solar/data";
import { sim, spinAngle, stepSim } from "@/lib/solar/sim";
import { useSolarStore } from "@/lib/solar/store";
import type { TextureAtlas } from "@/lib/solar/textures";

const _delta = new THREE.Vector3();
const _off = new THREE.Vector3();
const _desired = new THREE.Vector3();

function orbitPoints(radius: number, segments = 160) {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
  }
  return pts;
}

function Atmosphere({
  radius,
  color,
}: {
  radius: number;
  color: string;
}) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uPower: { value: 2.8 },
        uIntensity: { value: 0.85 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vPosW = world.xyz;
          vNormalW = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: /* glsl */ `
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
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
  }, [color]);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[radius, 32, 24]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Rings({ body }: { body: BodyDef }) {
  if (body.hasRings === "saturn") {
    return (
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[body.radius * 1.28, body.radius * 1.58, 96]} />
          <meshStandardMaterial
            color="#d9c7a0"
            transparent
            opacity={0.72}
            side={THREE.DoubleSide}
            roughness={0.55}
            metalness={0.12}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[body.radius * 1.68, body.radius * 2.18, 96]} />
          <meshStandardMaterial
            color="#cbb892"
            transparent
            opacity={0.58}
            side={THREE.DoubleSide}
            roughness={0.6}
            metalness={0.1}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  }
  if (body.hasRings === "uranus") {
    return (
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[body.radius * 1.55, body.radius * 1.72, 80]} />
        <meshStandardMaterial
          color="#c5d0d4"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          roughness={0.7}
          depthWrite={false}
        />
      </mesh>
    );
  }
  return null;
}

function BodyMesh({
  body,
  atlas,
}: {
  body: BodyDef;
  atlas: TextureAtlas;
}) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const cloud = useRef<THREE.Mesh>(null);
  const setFocusedId = useSolarStore((s) => s.setFocusedId);
  const setHoveredId = useSolarStore((s) => s.setHoveredId);
  const map = atlas.maps[body.id];

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    g.position.copy(sim.positions[body.id]);
    if (spin.current) spin.current.rotation.y = spinAngle(body.id);
    if (cloud.current) {
      cloud.current.rotation.y = spinAngle(body.id) * 1.18 + 0.4;
    }
  });

  const isStar = body.kind === "star";

  return (
    <group ref={group}>
      <group ref={spin} rotation={[body.tilt, 0, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setFocusedId(body.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredId(body.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHoveredId(null);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[body.radius, isStar ? 48 : 40, isStar ? 32 : 28]} />
          {isStar ? (
            <meshBasicMaterial map={map} color="#ffd7a0" toneMapped={false} />
          ) : (
            <meshStandardMaterial
              map={map}
              color={map ? "#ffffff" : body.color}
              roughness={body.kind === "planet" && body.radius > 0.7 ? 0.52 : 0.72}
              metalness={0.04}
            />
          )}
        </mesh>
        {body.hasClouds && !isStar ? (
          <mesh ref={cloud} scale={1.015}>
            <sphereGeometry args={[body.radius, 40, 28]} />
            <meshStandardMaterial
              map={atlas.clouds}
              transparent
              depthWrite={false}
              opacity={body.id === "venus" ? 0.55 : 0.42}
              roughness={1}
              metalness={0}
            />
          </mesh>
        ) : null}
        <Rings body={body} />
      </group>
      {body.atmosphere ? (
        <Atmosphere radius={body.radius} color={body.atmosphere} />
      ) : null}
      {isStar ? <SunGlow atlas={atlas} radius={body.radius} /> : null}
      <BodyLabel body={body} />
    </group>
  );
}

function SunGlow({ atlas, radius }: { atlas: TextureAtlas; radius: number }) {
  return (
    <group>
      <sprite scale={[radius * 7.4, radius * 7.4, 1]}>
        <spriteMaterial
          map={atlas.glow}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </sprite>
      <sprite scale={[radius * 3.2, radius * 3.2, 1]}>
        <spriteMaterial
          map={atlas.glow}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </sprite>
      <pointLight color="#ffe2a8" intensity={42} distance={90} decay={1.05} />
    </group>
  );
}

function BodyLabel({ body }: { body: BodyDef }) {
  const showLabels = useSolarStore((s) => s.showLabels);
  const focusedId = useSolarStore((s) => s.focusedId);
  const hoveredId = useSolarStore((s) => s.hoveredId);
  const visible =
    showLabels &&
    (body.kind !== "moon" || focusedId === "earth" || focusedId === "moon");
  const active = focusedId === body.id || hoveredId === body.id;

  if (!visible) return null;

  return (
    <Html
      center
      sprite
      position={[0, body.radius + 0.28, 0]}
      distanceFactor={18}
      occlude={false}
      style={{ pointerEvents: "none", userSelect: "none" }}
      zIndexRange={[10, 0]}
    >
      <div
        className={
          active
            ? "rounded-sm bg-surface/90 px-2 py-1 text-xs font-medium tracking-wide text-fg shadow-[var(--shadow-border)]"
            : "rounded-sm bg-bg/70 px-2 py-1 text-xs font-medium tracking-wide text-fg/80"
        }
      >
        {body.name}
      </div>
    </Html>
  );
}

function Orbits() {
  const showOrbits = useSolarStore((s) => s.showOrbits);
  const focusedId = useSolarStore((s) => s.focusedId);
  const hoveredId = useSolarStore((s) => s.hoveredId);
  const planetOrbits = useMemo(
    () =>
      BODIES.filter((b) => !b.parent && b.orbit > 0).map((body) => ({
        id: body.id,
        color: body.color,
        points: orbitPoints(body.orbit),
      })),
    [],
  );
  const moonPts = useMemo(() => orbitPoints(BODY_BY_ID.moon.orbit, 80), []);
  const moonGroup = useRef<THREE.Group>(null);

  useFrame(() => {
    if (moonGroup.current) {
      moonGroup.current.position.copy(sim.positions.earth);
    }
  });

  if (!showOrbits) return null;

  return (
    <>
      {planetOrbits.map((orbit) => {
        const active = focusedId === orbit.id || hoveredId === orbit.id;
        return (
          <Line
            key={orbit.id}
            points={orbit.points}
            color={orbit.color}
            transparent
            opacity={active ? 0.7 : 0.22}
            lineWidth={active ? 1.6 : 1}
          />
        );
      })}
      {(focusedId === "earth" || focusedId === "moon" || hoveredId === "moon") && (
        <group ref={moonGroup}>
          <Line
            points={moonPts}
            color={BODY_BY_ID.moon.color}
            transparent
            opacity={0.45}
            lineWidth={1}
          />
        </group>
      )}
    </>
  );
}

function AsteroidBelt() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = 380;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    for (let i = 0; i < count; i++) {
      const a = hash(i, 1) * Math.PI * 2;
      const r = 14.15 + hash(i, 2) * 1.7;
      const y = (hash(i, 3) - 0.5) * 0.28;
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.rotation.set(hash(i, 4) * 6, hash(i, 5) * 6, hash(i, 6) * 6);
      dummy.scale.setScalar(0.018 + hash(i, 7) * 0.03);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  useFrame((_, delta) => {
    const { paused, speed } = useSolarStore.getState();
    if (paused || !mesh.current) return;
    mesh.current.rotation.y += Math.min(delta, 0.1) * speed * 0.012;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} raycast={() => {}}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#6d675f" roughness={0.92} metalness={0.08} />
    </instancedMesh>
  );
}

function hash(i: number, salt: number) {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function CameraRig() {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls);
  const focusedId = useSolarStore((s) => s.focusedId);
  const lastPos = useRef(new THREE.Vector3());
  const blend = useRef(1);
  const skipFollow = useRef(true);

  useEffect(() => {
    blend.current = 0;
    skipFollow.current = true;
  }, [focusedId]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    const ctrl = controls as {
      target: THREE.Vector3;
      update: () => void;
    } | null;
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
      if (_off.lengthSq() < 1e-5) _off.set(0.7, 0.36, 1);
      _off.normalize();
      if (_off.y < 0.12) _off.y = 0.2;
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
    const d = Math.min(delta, 0.1);
    const { paused, speed } = useSolarStore.getState();
    stepSim(d, speed, paused);
  });
  return null;
}

export function SolarScene({ atlas }: { atlas: TextureAtlas }) {
  return (
    <>
      <color attach="background" args={["#08090d"]} />
      <fog attach="fog" args={["#08090d", 70, 160]} />
      <ambientLight intensity={0.055} />
      <hemisphereLight args={["#1b2436", "#050506", 0.16]} />
      <Stars radius={180} depth={70} count={3600} factor={2.6} saturation={0} fade speed={0.35} />
      <Stars radius={120} depth={40} count={280} factor={5.4} saturation={0.15} fade speed={0.12} />
      <SimClock />
      <Orbits />
      <AsteroidBelt />
      {BODIES.map((body) => (
        <BodyMesh key={body.id} body={body} atlas={atlas} />
      ))}
      <CameraRig />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.4}
        maxDistance={78}
        rotateSpeed={0.55}
        zoomSpeed={0.85}
      />
    </>
  );
}
