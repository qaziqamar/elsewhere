// Live cartoon hero - reliable Three.js - blue mascot + phone + clock - live animation
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Sphere } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

function Mascot({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const clockHand = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.1;
      group.current.rotation.y = mouse.current.x * 0.16;
      group.current.rotation.x = mouse.current.y * -0.07;
    }
    if (clockHand.current) clockHand.current.rotation.z = -t * 0.7;
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 2.4) * 0.22;
    }
  });

  return (
    <group ref={group}>
      {/* body - rounded blob with spikes as cones */}
      <Sphere args={[0.72, 32, 32]}>
        <meshStandardMaterial color="#2EB8FF" roughness={0.5} />
      </Sphere>
      {/* spikes */}
      {[
        [0, 0.95, 0],
        [0.7, 0.6, 0.3],
        [-0.7, 0.6, 0.3],
        [0.9, -0.1, 0],
        [-0.9, -0.1, 0],
        [0, -0.75, 0.2],
        [0.45, 0.85, -0.3],
        [-0.45, 0.85, -0.3],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.atan2(p[0], p[1])]}>
          <coneGeometry args={[0.18, 0.42, 12]} />
          <meshStandardMaterial color="#2EB8FF" roughness={0.5} />
        </mesh>
      ))}

      {/* eyes */}
      <Sphere args={[0.18, 20, 20]} position={[-0.22, 0.18, 0.68]}>
        <meshStandardMaterial color="#fff" />
      </Sphere>
      <Sphere args={[0.09, 16, 16]} position={[-0.22, 0.15, 0.82]}>
        <meshStandardMaterial color="#0A1A2F" />
      </Sphere>
      <Sphere args={[0.18, 20, 20]} position={[0.22, 0.18, 0.68]}>
        <meshStandardMaterial color="#fff" />
      </Sphere>
      <Sphere args={[0.09, 16, 16]} position={[0.22, 0.15, 0.82]}>
        <meshStandardMaterial color="#0A1A2F" />
      </Sphere>

      {/* smile */}
      <mesh position={[0, -0.02, 0.72]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.12, 0.022, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#0A1A2F" />
      </mesh>

      {/* phone */}
      <group position={[0.62, -0.12, 0.55]} rotation={[0, -0.22, 0.06]}>
        <RoundedBox args={[0.38, 0.6, 0.05]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0F1B2E" />
        </RoundedBox>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.31, 0.5]} />
          <meshStandardMaterial color="#E6F2FF" emissive="#7FB8FF" emissiveIntensity={0.18} />
        </mesh>
        {/* tiny chat bars */}
        <mesh position={[-0.05, 0.1, 0.04]}>
          <planeGeometry args={[0.18, 0.07]} />
          <meshStandardMaterial color="#C9B6FF" />
        </mesh>
        <mesh position={[0.02, -0.04, 0.04]}>
          <planeGeometry args={[0.14, 0.06]} />
          <meshStandardMaterial color="#A6D8F0" />
        </mesh>
        <mesh ref={glowRef} position={[0, 0, -0.015]}>
          <planeGeometry args={[0.52, 0.74]} />
          <meshStandardMaterial color="#7FB8FF" transparent opacity={0.16} emissive="#3B82F6" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* clock */}
      <group position={[-0.78, 0.62, -0.32]}>
        <mesh>
          <ringGeometry args={[0.42, 0.5, 28]} />
          <meshStandardMaterial color="#E9DEF8" side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.42, 28]} />
          <meshStandardMaterial color="#FFFBEB" />
        </mesh>
        <group ref={clockHand}>
          <mesh position={[0, 0.12, 0.03]}>
            <boxGeometry args={[0.035, 0.28, 0.015]} />
            <meshStandardMaterial color="#1A1E2E" />
          </mesh>
          <Sphere args={[0.04, 12, 12]} position={[0, 0, 0.04]}>
            <meshStandardMaterial color="#1A1E2E" />
          </Sphere>
        </group>
      </group>
    </group>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="h-[380px] w-full max-w-[460px] rounded-[24px] border border-[#E9DEF8] bg-white shadow-cute grid place-items-center p-6 text-center">
        <div>
          <div className="mx-auto h-20 w-20 rounded-2xl bg-[#2EB8FF] grid place-items-center text-3xl">★</div>
          <div className="mt-3 text-sm font-extrabold">Live animation paused</div>
          <div className="text-xs font-semibold text-[#8A8EA6]">Reduced motion enabled</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="relative h-[380px] w-full max-w-[460px] rounded-[24px] border border-[#E9DEF8] bg-gradient-to-br from-white via-[#F2F3F8] to-[#D9CFFD]/20 shadow-cute overflow-hidden"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
    >
      {/* HTML label - not 3D Text, always visible */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-[#E9DEF8] bg-white px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-[#1A1E2E] shadow">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B] animate-pulse" /> RUNNING TIME
      </div>

      <Canvas
        camera={{ position: [0, 0.35, 3], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[2, 3, 2]} intensity={0.85} />
        <directionalLight position={[-2, 1, -1]} intensity={0.35} />
        <pointLight position={[0.7, -0.2, 1.2]} intensity={0.55} color="#7FB8FF" />
        <Suspense fallback={null}>
          <Mascot mouse={mouse} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/60 to-transparent" />
    </div>
  );
}
