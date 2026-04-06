import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 100 }) {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const dummy = new THREE.Object3D();
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      
      dummy.position.set(
        (xFactor + Math.cos(t / 10) * factor + (state.mouse.x * 2)),
        (yFactor + Math.sin(t / 10) * factor + (state.mouse.y * 2)),
        (zFactor + Math.cos(t / 10) * factor)
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color="#6366f1" 
        emissive="#818cf8" 
        emissiveIntensity={2} 
        transparent 
        opacity={0.6} 
      />
    </instancedMesh>
  );
}

export default function Scene3D() {
  return (
    <div 
      className="fixed inset-0 -z-30 select-none touch-none opacity-30 overflow-hidden"
      style={{ pointerEvents: 'none' }} 
    >
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={1} />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} color="#6366f1" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
           <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
           <Particles />
        </Float>
      </Canvas>
    </div>
  );
}