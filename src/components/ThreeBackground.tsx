// @ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

function Particles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null);
  const count = 90;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.12;
    ref.current.rotation.y = t * 0.08 + mouse.current.x * 0.08;
    ref.current.rotation.x = -0.15 + mouse.current.y * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#8B5CF6" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function MeshGrid({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z = mouse.current.x * 0.03;
  });
  return (
    <mesh ref={ref} rotation={[-0.35, 0.2, 0]} position={[0, -0.6, -1.2]}>
      <planeGeometry args={[14, 14, 18, 18]} />
      <meshBasicMaterial wireframe color="#1E293B" transparent opacity={0.35} />
    </mesh>
  );
}

export default function ThreeBackground() {
  const reduced = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });

  if (reduced) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#080C18] via-[#0F172A] to-[#080C18]" aria-hidden />;
  }

  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden
      onMouseMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 58 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#080C18", 5, 12]} />
        <Particles mouse={mouse} />
        <MeshGrid mouse={mouse} />
        <ambientLight intensity={0.6} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080C18] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.12),transparent_60%)] pointer-events-none" />
    </div>
  );
}
