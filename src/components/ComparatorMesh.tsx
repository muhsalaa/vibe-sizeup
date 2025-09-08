import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';
import type { Comparator, Unit } from '../types';
import { formatDimension } from '../utils/units';

interface ComparatorMeshProps {
  comparator: Comparator;
  unit: Unit;
}

export function ComparatorMesh({ comparator, unit }: ComparatorMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { dimensions, color, type } = comparator;

  // Convert dimensions to display units (cm is base unit)
  const w = dimensions.w || 0;
  const h = dimensions.h || 0;
  const d = dimensions.d || 0;
  const r = dimensions.r || 0;

  // Position at origin - sphere from bottom, box from center
  const position: [number, number, number] = type === 'sphere' ? [0, r, 0] : [0, h / 2, 0];

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {type === 'box' ? (
          <boxGeometry args={[w, h, d]} />
        ) : (
          <sphereGeometry args={[r, 32, 16]} />
        )}
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Dimension Labels */}
      <Html position={[0, h + 20, 0]} center>
        <div 
          className={`bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow text-sm font-medium transition-opacity ${
            hovered ? 'opacity-100' : 'opacity-60'
          }`}
        >
          <div className="text-gray-800 font-semibold">{comparator.name}</div>
          {type === 'box' ? (
            <div className="text-gray-600 text-xs">
              {formatDimension(w, unit)} × {formatDimension(h, unit)} × {formatDimension(d, unit)}
            </div>
          ) : (
            <div className="text-gray-600 text-xs">
              ⌀ {formatDimension(r * 2, unit)}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}