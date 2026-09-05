// Live 3D hero - complete character sitting on bean bag using phone - no box, integrated
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Sphere } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

function SittingSparky({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.85) * 0.06;
      group.current.rotation.y = mouse.current.x * 0.14;
      group.current.rotation.x = mouse.current.y * -0.05;
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 1.1) * 0.08;
      head.current.rotation.x = Math.sin(t * 0.9) * 0.04;
    }
    if (phone.current) {
      phone.current.rotation.z = Math.sin(t * 1.4) * 0.04;
    }
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* bean bag */}
      <mesh position={[0, -0.62, -0.08]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.05, 32, 24]} />
        <meshStandardMaterial color="#D9CFFD" roughness={0.9} metalness={0.02} />
      </mesh>
      {/* bean bag seam */}
      <mesh position={[0, -0.62, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.02, 8, 32]} />
        <meshStandardMaterial color="#C9B6FF" />
      </mesh>

      {/* legs - sitting */}
      {/* left thigh */}
      <group position={[-0.22, -0.32, 0.28]}>
        <mesh rotation={[Math.PI / 2.6, 0, -0.18]}>
          <capsuleGeometry args={[0.11, 0.42, 8, 14]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        {/* shin */}
        <mesh position={[0.04, -0.22, 0.08]} rotation={[Math.PI / 2.2, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.34, 8, 14]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        {/* foot */}
        <Sphere args={[0.11, 16, 16]} position={[0.08, -0.42, 0.12]}>
          <meshStandardMaterial color="#8B6A2B" roughness={0.7} />
        </Sphere>
      </group>
      {/* right thigh */}
      <group position={[0.22, -0.32, 0.28]}>
        <mesh rotation={[Math.PI / 2.6, 0, 0.18]}>
          <capsuleGeometry args={[0.11, 0.42, 8, 14]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        <mesh position={[-0.04, -0.22, 0.08]} rotation={[Math.PI / 2.2, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.34, 8, 14]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        <Sphere args={[0.11, 16, 16]} position={[-0.08, -0.42, 0.12]}>
          <meshStandardMaterial color="#8B6A2B" roughness={0.7} />
        </Sphere>
      </group>

      {/* torso */}
      <RoundedBox args={[0.62, 0.72, 0.48]} radius={0.14} smoothness={3} position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#FFD93D" roughness={0.45} />
      </RoundedBox>
      {/* belly white */}
      <Sphere args={[0.32, 20, 20]} position={[0, -0.04, 0.22]} scale={[1, 1.15, 0.45]}>
        <meshStandardMaterial color="#FFF7C2" roughness={0.6} />
      </Sphere>

      {/* arms */}
      {/* left arm */}
      <group position={[-0.38, 0.22, 0.12]}>
        <mesh position={[-0.08, -0.08, 0.1]} rotation={[0.6, 0, -0.55]}>
          <capsuleGeometry args={[0.07, 0.3, 8, 12]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        {/* hand */}
        <Sphere args={[0.075, 14, 14]} position={[-0.12, -0.24, 0.22]}>
          <meshStandardMaterial color="#FFD93D" />
        </Sphere>
      </group>
      {/* right arm */}
      <group position={[0.38, 0.22, 0.12]}>
        <mesh position={[0.08, -0.08, 0.1]} rotation={[0.6, 0, 0.55]}>
          <capsuleGeometry args={[0.07, 0.3, 8, 12]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        <Sphere args={[0.075, 14, 14]} position={[0.12, -0.24, 0.22]}>
          <meshStandardMaterial color="#FFD93D" />
        </Sphere>
      </group>

      {/* head */}
      <group ref={head} position={[0, 0.62, 0.12]}>
        <Sphere args={[0.42, 32, 24]}>
          <meshStandardMaterial color="#FFD93D" roughness={0.45} />
        </Sphere>
        {/* ears */}
        <group position={[-0.28, 0.48, -0.04]} rotation={[0, 0, -0.22]}>
          <mesh>
            <coneGeometry args={[0.13, 0.46, 14]} />
            <meshStandardMaterial color="#FFD93D" />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <coneGeometry args={[0.055, 0.14, 14]} />
            <meshStandardMaterial color="#1A1E2E" />
          </mesh>
        </group>
        <group position={[0.28, 0.48, -0.04]} rotation={[0, 0, 0.22]}>
          <mesh>
            <coneGeometry args={[0.13, 0.46, 14]} />
            <meshStandardMaterial color="#FFD93D" />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <coneGeometry args={[0.055, 0.14, 14]} />
            <meshStandardMaterial color="#1A1E2E" />
          </mesh>
        </group>
        {/* cheeks */}
        <Sphere args={[0.07, 14, 14]} position={[-0.27, -0.06, 0.32]}>
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.1} />
        </Sphere>
        <Sphere args={[0.07, 14, 14]} position={[0.27, -0.06, 0.32]}>
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.1} />
        </Sphere>
        {/* eyes */}
        <Sphere args={[0.11, 18, 18]} position={[-0.15, 0.08, 0.34]}>
          <meshStandardMaterial color="#fff" />
        </Sphere>
        <Sphere args={[0.068, 14, 14]} position={[-0.145, 0.055, 0.41]}>
          <meshStandardMaterial color="#1A1E2E" />
        </Sphere>
        <Sphere args={[0.028, 10, 10]} position={[-0.12, 0.09, 0.45]}>
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.9} />
        </Sphere>
        <Sphere args={[0.11, 18, 18]} position={[0.15, 0.08, 0.34]}>
          <meshStandardMaterial color="#fff" />
        </Sphere>
        <Sphere args={[0.068, 14, 14]} position={[0.15, 0.055, 0.41]}>
          <meshStandardMaterial color="#1A1E2E" />
        </Sphere>
        <Sphere args={[0.028, 10, 10]} position={[0.18, 0.09, 0.45]}>
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.9} />
        </Sphere>
        {/* nose */}
        <Sphere args={[0.018, 10, 10]} position={[0, 0.01, 0.39]}>
          <meshStandardMaterial color="#1A1E2E" />
        </Sphere>
        {/* mouth */}
        <mesh position={[0, -0.08, 0.38]}>
          <torusGeometry args={[0.07, 0.014, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1A1E2E" />
        </mesh>
      </group>

      {/* phone in hands */}
      <group ref={phone} position={[0, -0.06, 0.48]} rotation={[0.18, 0, 0]}>
        <RoundedBox args={[0.32, 0.52, 0.04]} radius={0.025} smoothness={3}>
          <meshStandardMaterial color="#0F1B2E" roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.26, 0.44]} />
          <meshStandardMaterial color="#E6F2FF" emissive="#7FB8FF" emissiveIntensity={0.14} />
        </mesh>
        <mesh position={[-0.04, 0.08, 0.03]}>
          <planeGeometry args={[0.15, 0.06]} />
          <meshStandardMaterial color="#C9B6FF" />
        </mesh>
        <mesh position={[0.03, -0.03, 0.03]}>
          <planeGeometry args={[0.12, 0.05]} />
          <meshStandardMaterial color="#A6D8F0" />
        </mesh>
        {/* thumb */}
        <Sphere args={[0.045, 12, 12]} position={[0.12, -0.04, 0.04]}>
          <meshStandardMaterial color="#FFD93D" />
        </Sphere>
        <Sphere args={[0.045, 12, 12]} position={[-0.12, -0.04, 0.04]}>
          <meshStandardMaterial color="#FFD93D" />
        </Sphere>
      </group>

      {/* tail behind bean bag */}
      <group position={[0, -0.38, -0.72]} rotation={[0, 0.85, 0]}>
        <mesh position={[0.18, 0.12, 0]}>
          <boxGeometry args={[0.12, 0.38, 0.04]} />
          <meshStandardMaterial color="#FFD93D" />
        </mesh>
        <mesh position={[-0.06, -0.1, 0]} rotation={[0, 0, 0.55]}>
          <boxGeometry args={[0.1, 0.3, 0.04]} />
          <meshStandardMaterial color="#FFD93D" />
        </mesh>
        <mesh position={[0.02, 0.02, 0]} rotation={[0, 0, -0.7]}>
          <boxGeometry args={[0.14, 0.05, 0.04]} />
          <meshStandardMaterial color="#FFD93D" />
        </mesh>
      </group>
    </group>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="h-[460px] w-full max-w-[480px] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 rounded-3xl bg-[#FFD93D] grid place-items-center text-4xl shadow-cute">⚡</div>
          <div className="mt-3 text-sm font-extrabold">Sparky on bean bag</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="relative h-[480px] w-full max-w-[520px] overflow-visible"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
    >
      <Canvas
        camera={{ position: [0, 0.55, 3.6], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[2, 3, 2]} intensity={0.9} />
        <directionalLight position={[-2, 1, -1]} intensity={0.35} />
        <pointLight position={[0.6, 0.3, 1.2]} intensity={0.45} color="#FFD93D" />
        <Suspense fallback={null}>
          <SittingSparky mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
