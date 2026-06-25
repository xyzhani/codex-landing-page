'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Color Palette ───────────────────────────────────────────────
const TEAL_BRIGHT = new THREE.Color('#14f0c8');
const TEAL_MID = new THREE.Color('#14b8a6');
const TEAL_DIM = new THREE.Color('#0d9488');
const GOLD = new THREE.Color('#fbbf24');
const WHITE = new THREE.Color('#ffffff');

// ─── Shared Geometry ─────────────────────────────────────────────
const _dummy = new THREE.Object3D();

// ─── Central Glow ────────────────────────────────────────────────
function CentralGlow() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#14f0c8') },
        uColor2: { value: new THREE.Color('#0d9488') },
      },
      vertexShader: `
        varying vec3 vWorldNormal;
        varying vec3 vViewDir;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vWorldNormal;
        varying vec3 vViewDir;
        void main() {
          float rim = 1.0 - max(0.0, dot(vWorldNormal, vViewDir));
          rim = pow(rim, 2.0);
          float pulse = 0.85 + 0.15 * sin(uTime * 0.4);
          vec3 col = mix(uColor2, uColor1, rim);
          float alpha = rim * 0.18 * pulse;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
  }, []);

  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) {
      const s = 2.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}

// ─── Network Nodes (Instanced) ──────────────────────────────────
function NetworkNodes({ nodePositions }: { nodePositions: Float32Array }) {
  const count = nodePositions.length / 3;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.018, 6, 6), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#14f0c8',
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  useMemo(() => {
    for (let i = 0; i < count; i++) {
      _dummy.position.set(
        nodePositions[i * 3],
        nodePositions[i * 3 + 1],
        nodePositions[i * 3 + 2]
      );
      _dummy.scale.setScalar(0.6 + Math.random() * 0.8);
      _dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, _dummy.matrix);
    }
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [nodePositions, count]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}

// ─── Network Lines ───────────────────────────────────────────────
function NetworkLines({ nodePositions }: { nodePositions: Float32Array }) {
  const lineGeometry = useMemo(() => {
    const count = nodePositions.length / 3;
    const maxDist = 1.3;
    const maxLines = 3000;
    const positions: number[] = [];
    const colors: number[] = [];
    let lineCount = 0;

    for (let i = 0; i < count && lineCount < maxLines; i++) {
      const x1 = nodePositions[i * 3];
      const y1 = nodePositions[i * 3 + 1];
      const z1 = nodePositions[i * 3 + 2];

      for (let j = i + 1; j < count && lineCount < maxLines; j++) {
        const dx = nodePositions[j * 3] - x1;
        const dy = nodePositions[j * 3 + 1] - y1;
        const dz = nodePositions[j * 3 + 2] - z1;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          const alpha = 1.0 - dist / maxDist;
          const fade = alpha * alpha * 0.35;

          positions.push(x1, y1, z1, x1 + dx, y1 + dy, z1 + dz);

          // Teal color with distance-based fade
          colors.push(0.078 * fade, 0.94 * fade, 0.784 * fade);
          colors.push(0.078 * fade, 0.94 * fade, 0.784 * fade);

          lineCount++;
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [nodePositions]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <lineSegments geometry={lineGeometry} material={material} frustumCulled={false} />
  );
}

// ─── Highlight Nodes (Glowing Key Touchpoints) ──────────────────
function HighlightNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const items = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.2 + Math.random() * 1.8;
      const isGold = i % 4 === 0;

      items.push({
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ),
        color: isGold ? GOLD.clone() : TEAL_BRIGHT.clone(),
        baseScale: 0.06 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        glowColor: isGold ? '#fbbf24' : '#14f0c8',
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const node = nodes[i];
      if (!node) return;
      const pulse = 1.0 + 0.35 * Math.sin(t * node.speed + node.phase);
      const s = node.baseScale * pulse;
      child.scale.setScalar(s);

      // Subtle floating
      child.position.y =
        node.position.y + Math.sin(t * 0.2 + node.phase) * 0.08;
      child.position.x =
        node.position.x + Math.cos(t * 0.15 + node.phase) * 0.04;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={i} position={node.position.toArray()}>
          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.9} />
          </mesh>
          {/* Glow shell */}
          <mesh>
            <sphereGeometry args={[1.6, 16, 16]} />
            <meshBasicMaterial
              color={node.glowColor}
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[2.8, 12, 12]} />
            <meshBasicMaterial
              color={node.glowColor}
              transparent
              opacity={0.03}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Floating Review Cards ──────────────────────────────────────
function FloatingReviewCards() {
  const groupRef = useRef<THREE.Group>(null);

  const cards = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.5;
      const r = 1.8 + Math.random() * 1.5;
      return {
        position: [
          Math.cos(angle) * r,
          (Math.random() - 0.5) * 2.5,
          Math.sin(angle) * r - 0.5,
        ] as [number, number, number],
        rotation: [
          Math.random() * 0.4 - 0.2,
          Math.random() * Math.PI * 2,
          Math.random() * 0.3 - 0.15,
        ] as [number, number, number],
        scale: 0.25 + Math.random() * 0.2,
        rotSpeed: 0.08 + Math.random() * 0.12,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.15 + Math.random() * 0.15,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const card = cards[i];
      if (!card) return;
      child.rotation.y = card.rotation[1] + t * card.rotSpeed;
      child.position.y =
        card.position[1] + Math.sin(t * card.floatSpeed + card.floatPhase) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => (
        <group key={i} position={card.position} rotation={card.rotation} scale={card.scale}>
          <mesh>
            <boxGeometry args={[2.4, 1.5, 0.04]} />
            <meshBasicMaterial
              color="#14b8a6"
              transparent
              opacity={0.06}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Card border glow */}
          <mesh>
            <boxGeometry args={[2.5, 1.6, 0.02]} />
            <meshBasicMaterial
              color="#14f0c8"
              transparent
              opacity={0.04}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Star Particles (5-star shapes via Octahedron) ──────────────
function StarParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 22);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.5 + Math.random() * 2.5;
      const isGold = i % 5 === 0;

      return {
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ] as [number, number, number],
        scale: 0.04 + Math.random() * 0.05,
        color: isGold ? '#fbbf24' : '#14f0c8',
        rotSpeed: 0.3 + Math.random() * 0.6,
        floatPhase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const star = stars[i];
      if (!star) return;
      child.rotation.x = t * star.rotSpeed;
      child.rotation.z = t * star.rotSpeed * 0.7;
      child.position.y =
        star.position[1] + Math.sin(t * 0.25 + star.floatPhase) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position} scale={star.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={star.color}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Scene Rotator (slow global rotation) ───────────────────────
function SceneRotator({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.15;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Ambient Dust Particles ─────────────────────────────────────
function AmbientDust() {
  const count = 200;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#14b8a6"
        size={0.015}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Generate Network Node Positions ─────────────────────────────
function generateNetworkPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Gaussian-ish distribution for a denser core
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    // Cube root for uniform sphere volume distribution
    const r = radius * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  return positions;
}

// ─── Inner Scene (all 3D content) ────────────────────────────────
function Scene() {
  const nodePositions = useMemo(() => generateNetworkPositions(500, 3.2), []);

  return (
    <>
      <SceneRotator>
        <CentralGlow />
        <NetworkNodes nodePositions={nodePositions} />
        <NetworkLines nodePositions={nodePositions} />
        <HighlightNodes />
        <FloatingReviewCards />
        <StarParticles />
      </SceneRotator>
      <AmbientDust />
    </>
  );
}

// ─── Main Export ─────────────────────────────────────────────────
export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}