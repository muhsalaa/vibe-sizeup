import { useRef, useState } from 'react';
import type { Mesh } from 'three';
import { DimensionLines } from './DimensionLines';
import type { TargetItem, Comparator, Unit, TargetPosition } from '../types';

interface TargetMeshProps {
  targetItem: TargetItem;
  comparator: Comparator;
  unit: Unit;
  position: TargetPosition;
  distance: number;
  showDimensionLines: boolean;
}

export function TargetMesh({ targetItem, comparator, unit, position, distance, showDimensionLines }: TargetMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { shape, dimensions } = targetItem;
  const w = dimensions.w || 10;
  const h = dimensions.h || 10;
  const d = dimensions.d || 10;
  const r = dimensions.r || 5;

  // Calculate position based on user-selected position and distance
  const getTargetPosition = (): [number, number, number] => {
    const compDims = comparator.dimensions;
    const compW = compDims.w || 0;
    const compH = compDims.h || 0;
    const compD = compDims.d || 0;
    
    // Calculate target item's center offset for proper positioning
    const targetW = shape === 'sphere' ? r : w / 2;
    const targetH = shape === 'sphere' ? r : h / 2;
    const targetD = shape === 'sphere' ? r : d / 2;

    switch (position) {
      case 'right':
        return [
          compW / 2 + distance + targetW,
          shape === 'sphere' ? r : h / 2, // Ground level positioning
          0
        ];
      
      case 'left':
        return [
          -(compW / 2 + distance + targetW),
          shape === 'sphere' ? r : h / 2,
          0
        ];
      
      case 'top':
        return [
          0,
          compH + distance + targetH,
          0
        ];
      
      case 'bottom':
        // For desk: place under desk surface, for others: below ground
        if (comparator.id === 'desk') {
          // Place under desk surface (desk height - distance - target height)
          const underDeskY = Math.max(compH - distance - targetH, targetH);
          return [0, underDeskY, 0];
        } else {
          // Default: below ground (for other comparators if they allow bottom)
          return [0, -(distance + targetH), 0];
        }
      
      default:
        return [0, shape === 'sphere' ? r : h / 2, 0];
    }
  };

  const targetPosition = getTargetPosition();

  // Don't render if no dimensions are set
  if ((shape === 'box' && (!w || !h || !d)) || (shape === 'sphere' && !r)) {
    return null;
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        position={targetPosition}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {shape === 'box' ? (
          <boxGeometry args={[w, h, d]} />
        ) : (
          <sphereGeometry args={[r, 32, 16]} />
        )}
        <meshStandardMaterial 
          color="#3B82F6" // Blue highlight color
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Dimension Lines */}
      {showDimensionLines && (
        <DimensionLines
          position={targetPosition}
          dimensions={dimensions}
          shape={shape}
          unit={unit}
          color="#3B82F6"
        />
      )}
    </group>
  );
}