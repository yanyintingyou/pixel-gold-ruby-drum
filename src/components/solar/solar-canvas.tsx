import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { createTextures, disposeTextures } from "@/lib/solar/textures";
import { SolarScene } from "./scene";

export function SolarCanvas() {
  const atlas = useMemo(() => createTextures(), []);

  useEffect(() => {
    return () => disposeTextures(atlas);
  }, [atlas]);

  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [16, 9, 24], fov: 42, near: 0.12, far: 500 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#08090d");
      }}
    >
      <SolarScene atlas={atlas} />
    </Canvas>
  );
}
