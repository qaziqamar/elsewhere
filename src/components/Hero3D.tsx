// Live cartoon hero - Three.js - blue spiky mascot with phone, clock, RUNNING TIME
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox, Sphere, Ring } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

function Mascot({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const clockHand = useRef<THREE.Group>(null);
  const phoneGlow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.12;
      group.current.rotation.y = mouse.current.x * 0.18;
      group.current.rotation.x = mouse.current.y * -0.08;
    }
    if (clockHand.current) {
      clockHand.current.rotation.z = -t * 0.6; // ticking
    }
    if (phoneGlow.current) {
      const mat = phoneGlow.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + Math.sin(t * 2.2) * 0.25;
    }
  });

  // spiky star shape extruded
  const starShape = useMemo(() => {
    const s = new THREE.Shape();
    const spikes = 8;
    const outer = 1.05;
    const inner = 0.62;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  const extrude = useMemo(() => ({ depth: 0.22, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 3 }), []);

  return (
    <group ref={group}>
      {/* body */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[starShape, extrude]} />
        <meshStandardMaterial color="#2EB8FF" roughness={0.55} metalness={0.08} />
      </mesh>
      {/* eyes */}
      <group position={[0, 0.22, 0.26]}>
        {/* left eye white */}
        <Sphere args={[0.2, 24, 24]} position={[-0.28, 0.05, 0]}>
          <meshStandardMaterial color="#fff" roughness={0.3} />
        </Sphere>
        <Sphere args={[0.11, 16, 16]} position={[-0.28, 0.02, 0.12]}>
          <meshStandardMaterial color="#0A1A2F" />
        </Sphere>
        {/* right eye */}
        <Sphere args={[0.2, 24, 24]} position={[0.28, 0.05, 0]}>
          <meshStandardMaterial color="#fff" roughness={0.3} />
        </Sphere>
        <Sphere args={[0.11, 16, 16]} position={[0.28, 0.02, 0.12]}>
          <meshStandardMaterial color="#0A1A2F" />
        </Sphere>
        {/* smile */}
        <mesh position={[0, -0.12, 0.12]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.14, 0.025, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#0A1A2F" />
        </mesh>
      </group>

      {/* phone in hand */}
      <group position={[0.78, -0.18, 0.32]} rotation={[0, -0.28, 0.06]}>
        <RoundedBox args={[0.42, 0.66, 0.06]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#0F1B2E" roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[0.34, 0.54]} />
          <meshStandardMaterial color="#E6F2FF" emissive="#7FB8FF" emissiveIntensity={0.22} />
        </mesh>
        {/* chat bubbles */}
        <RoundedBox args={[0.2, 0.1, 0.01]} radius={0.02} position={[-0.06, 0.12, 0.05]}><meshStandardMaterial color="#C9B6FF" /></RoundedBox>
        <RoundedBox args={[0.16, 0.08, 0.01]} radius={0.02} position={[0.04, -0.02, 0.05]}><meshStandardMaterial color="#A6D8F0" /></RoundedBox>
        <RoundedBox args={[0.12, 0.06, 0.01]} radius={0.02} position={[-0.04, -0.14, 0.05]}><meshStandardMaterial color="#E9DEF8" /></RoundedBox>
        {/* glow */}
        <mesh ref={phoneGlow} position={[0, 0, -0.02]}>
          <planeGeometry args={[0.58, 0.82]} />
          <meshStandardMaterial color="#7FB8FF" transparent opacity={0.18} emissive="#3B82F6" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* clock behind */}
      <group position={[-0.85, 0.58, -0.5]} rotation={[0, 0, -0.12]}>
        <Ring args={[0.52, 0.62, 32]}><meshStandardMaterial color="#E9DEF8" side={THREE.DoubleSide} /></Ring>
        <mesh><circleGeometry args={[0.52, 32]} /><meshStandardMaterial color="#FFFBEB" /></mesh>
        {/* roman ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.sin(a) * 0.42, Math.cos(a) * 0.42, 0.02]} rotation={[0, 0, -a]}>
              <boxGeometry args={[0.04, 0.09, 0.01]} />
              <meshStandardMaterial color="#8A8EA6" />
            </mesh>
          );
        })}
        <group ref={clockHand}>
          <mesh position={[0, 0.18, 0.04]}><boxGeometry args={[0.04, 0.36, 0.02]} /><meshStandardMaterial color="#1A1E2E" /></mesh>
          <Sphere args={[0.05, 12, 12]} position={[0, 0, 0.05]}><meshStandardMaterial color="#1A1E2E" /></Sphere>
        </group>
        <mesh position={[0, -0.08, 0.04]}><boxGeometry args={[0.28, 0.04, 0.02]} /><meshStandardMaterial color="#FF6B6B" /></mesh>
      </group>

      {/* RUNNING TIME label */}
      <group position={[0.95, 0.42, -0.18]}>
        <RoundedBox args={[0.62, 0.16, 0.02]} radius={0.04} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FFFFFF" />
        </RoundedBox>
        <Text position={[0, 0.02, 0.02]} fontSize={0.07} color="#1A1E2E" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.woff2">
          RUNNING TIME
        </Text>
        {/* running figure icon */}
        <mesh position={[0.22, 0, 0.03]}><circleGeometry args={[0.045, 16]} /><meshStandardMaterial color="#1A1E2E" /></mesh>
      </group>

      {/* arm waving */}
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <group position={[-0.95, 0.55, 0.12]} rotation={[0, 0, 0.9]}>
          <mesh><capsuleGeometry args={[0.08, 0.55, 8, 16]} /><meshStandardMaterial color="#2EB8FF" /></mesh>
          <Sphere args={[0.1, 16, 16]} position={[0, 0.32, 0]}><meshStandardMaterial color="#2EB8FF" /></Sphere>
        </group>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="h-[340px] w-full max-w-[420px] rounded-[24px] border border-[#E9DEF8] bg-white shadow-cute grid place-items-center text-sm font-bold text-[#8A8EA6]">
        Live animation paused (reduced motion)
      </div>
    );
  }
  return (
    <div
      className="h-[380px] w-full max-w-[460px] rounded-[24px] border border-[#E9DEF8] bg-gradient-to-br from-white via-[#F2F3F8] to-[#D9CFFD]/20 shadow-cute overflow-hidden"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 3.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 2]} intensity={0.9} />
        <directionalLight position={[-2, 1, -1]} intensity={0.4} />
        <pointLight position={[0.8, -0.2, 1]} intensity={0.6} color="#7FB8FF" />
        <Mascot mouse={mouse} />
      </Canvas>
    </div>
  );
}
