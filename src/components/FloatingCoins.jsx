import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";


function Coin({ position, scale, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      ref.current.rotation.y += 0.008 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
        <meshStandardMaterial
          color="#10b981" 
          metalness={0.8}
          roughness={0.15}
          emissive="#059669"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}


function CubeBlock({ position, scale, color }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={ref} position={position} scale={scale}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={color}
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={0.7}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

function Scene() {
  const coins = useMemo(
    () => [
      { position: [-2.5, 1.2, -1], scale: 0.8, speed: 1.2 },
      { position: [2.8, -0.8, -2], scale: 0.6, speed: 0.9 },
      { position: [0.5, 1.8, -1.5], scale: 0.5, speed: 1.5 },
      { position: [-1.5, -1.5, -0.5], scale: 0.4, speed: 1.1 },
      { position: [3.2, 1.5, -2.5], scale: 0.7, speed: 0.7 },
    ],
    []
  );

  const cubes = useMemo(
    () => [
      { position: [1.8, 0.5, -1], scale: 0.45, color: "#6366f1" },
      { position: [-3, -0.5, -2], scale: 0.35, color: "#0ea5e9" },
      { position: [-0.8, 2, -2], scale: 0.3, color: "#f59e0b" },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#10b981" />
      
      {coins.map((c, i) => (
        <Coin key={`coin-${i}`} {...c} />
      ))}
      {cubes.map((c, i) => (
        <CubeBlock key={`cube-${i}`} {...c} />
      ))}
    </>
  );
}

export function FloatingCoins() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}