import { useRef } from 'react';
import { Group } from 'three';
import { DimensionLines } from './DimensionLines';
import type { Comparator, Unit } from '../types';

interface RealisticComparatorProps {
  comparator: Comparator;
  unit: Unit;
  showDimensionLines: boolean;
}

export function RealisticComparator({ comparator, unit, showDimensionLines }: RealisticComparatorProps) {
  const groupRef = useRef<Group>(null);

  const { dimensions, color, id } = comparator;
  const w = dimensions.w || 0;
  const h = dimensions.h || 0;
  const d = dimensions.d || 0;

  const renderShape = () => {
    switch (id) {
      case 'standing_person': {
        // Calculate scaling factors to make the model span the full input width
        // The original model spans about 30cm (arms at -15 to +15), so scale to full width
        const scaleX = w / 30; // 30cm is the actual visual span of the original model
        const scaleY = h / 118; // 118 is the actual model height (head center 110 + head radius 8)
        
        return (
          <group>
            {/* Legs */}
            <mesh position={[-5 * scaleX, 25 * scaleY, 0]}>
              <cylinderGeometry args={[4 * scaleX, 4 * scaleX, 50 * scaleY, 8]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            <mesh position={[5 * scaleX, 25 * scaleY, 0]}>
              <cylinderGeometry args={[4 * scaleX, 4 * scaleX, 50 * scaleY, 8]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 75 * scaleY, 0]}>
              <cylinderGeometry args={[12 * scaleX, 8 * scaleX, 50 * scaleY, 8]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            {/* Arms */}
            <mesh position={[-15 * scaleX, 80 * scaleY, 0]}>
              <cylinderGeometry args={[3 * scaleX, 3 * scaleX, 40 * scaleY, 8]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            <mesh position={[15 * scaleX, 80 * scaleY, 0]}>
              <cylinderGeometry args={[3 * scaleX, 3 * scaleX, 40 * scaleY, 8]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 110 * scaleY, 0]}>
              <sphereGeometry args={[8 * Math.min(scaleX, scaleY), 16, 16]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
          </group>
        );
      }

      case 'desk':
        return (
          <group>
            {/* Desktop */}
            <mesh position={[0, h - 2.5, 0]}>
              <boxGeometry args={[w, 5, d]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            {/* Legs - 4 corners */}
            {[
              [-w / 2 + 5, (h - 5) / 2, -d / 2 + 5],
              [w / 2 - 5, (h - 5) / 2, -d / 2 + 5],
              [-w / 2 + 5, (h - 5) / 2, d / 2 - 5],
              [w / 2 - 5, (h - 5) / 2, d / 2 - 5]
            ].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]}>
                <cylinderGeometry args={[2, 2, h - 5, 8]} />
                <meshStandardMaterial color={color} transparent opacity={0.8} />
              </mesh>
            ))}
          </group>
        );

      case 'cupboard':
        return (
          <group>
            {/* Main cabinet body */}
            <mesh position={[0, h / 2, 0]}>
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial color={color} transparent opacity={0.8} />
            </mesh>
            {/* Door handles */}
            <mesh position={[w / 4, h / 2, d / 2 + Math.max(1, d * 0.02)]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[Math.max(0.5, w * 0.01), Math.max(0.5, w * 0.01), Math.max(2, d * 0.06), 8]} />
              <meshStandardMaterial color="#444" transparent opacity={0.9} />
            </mesh>
            <mesh position={[-w / 4, h / 2, d / 2 + Math.max(1, d * 0.02)]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[Math.max(0.5, w * 0.01), Math.max(0.5, w * 0.01), Math.max(2, d * 0.06), 8]} />
              <meshStandardMaterial color="#444" transparent opacity={0.9} />
            </mesh>
            {/* Door frame lines */}
            <mesh position={[0, h / 2, d / 2 + Math.max(0.3, d * 0.01)]}>
              <boxGeometry args={[Math.max(0.5, w * 0.01), Math.max(h - 10, h * 0.9), Math.max(0.5, d * 0.02)]} />
              <meshStandardMaterial color="#333" transparent opacity={0.9} />
            </mesh>
          </group>
        );

      default:
        // Fallback to simple box
        return (
          <mesh position={[0, h / 2, 0]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={color} transparent opacity={0.8} />
          </mesh>
        );
    }
  };

  // Use the input dimensions directly - the model now stretches to match
  const actualDimensions = dimensions;
  const centerY = h / 2;

  return (
    <group ref={groupRef}>
      {renderShape()}
      
      {/* Dimension Lines */}
      {showDimensionLines && (
        <DimensionLines
          position={[0, centerY, 0]}
          dimensions={actualDimensions}
          shape="box"
          unit={unit}
          color={color}
        />
      )}
    </group>
  );
}