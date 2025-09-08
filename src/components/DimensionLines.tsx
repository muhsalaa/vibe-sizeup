import { Html } from '@react-three/drei';
import type { Unit } from '../types';
import { formatDimension } from '../utils/units';

interface DimensionLinesProps {
  position: [number, number, number];
  dimensions: { w?: number; h?: number; d?: number; r?: number };
  shape: 'box' | 'sphere';
  unit: Unit;
  color: string;
}

export function DimensionLines({ position, dimensions, shape, unit, color }: DimensionLinesProps) {
  const [x, y, z] = position;
  const w = dimensions.w || 0;
  const h = dimensions.h || 0;
  const d = dimensions.d || 0;
  const r = dimensions.r || 0;

  if (shape === 'sphere') {
    // For sphere, show diameter line
    const lineOffset = r + 8; // 8cm away from sphere
    
    return (
      <group>
        {/* Horizontal diameter line */}
        <mesh position={[x, y + r, z + lineOffset]}>
          <boxGeometry args={[r * 2, 0.2, 0.2]} />
          <meshBasicMaterial color={color} opacity={0.6} transparent />
        </mesh>
        
        {/* Left end cap */}
        <mesh position={[x - r, y + r, z + lineOffset]}>
          <boxGeometry args={[0.2, 4, 0.2]} />
          <meshBasicMaterial color={color} opacity={0.8} transparent />
        </mesh>
        
        {/* Right end cap */}
        <mesh position={[x + r, y + r, z + lineOffset]}>
          <boxGeometry args={[0.2, 4, 0.2]} />
          <meshBasicMaterial color={color} opacity={0.8} transparent />
        </mesh>
        
        {/* Dimension label */}
        <Html position={[x, y + r, z + lineOffset]} center style={{ zIndex: 10 }}>
          <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium shadow border">
            ⌀ {formatDimension(r * 2, unit)}
          </div>
        </Html>
      </group>
    );
  }

  // For box, show width and height lines
  const lineOffset = Math.max(w, d) / 2 + 8; // 8cm away from object
  
  return (
    <group>
      {/* Width line (horizontal) */}
      <mesh position={[x, y - h / 2 - 6, z + lineOffset]}>
        <boxGeometry args={[w, 0.2, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.6} transparent />
      </mesh>
      
      {/* Width end caps */}
      <mesh position={[x - w / 2, y - h / 2 - 6, z + lineOffset]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      <mesh position={[x + w / 2, y - h / 2 - 6, z + lineOffset]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      
      {/* Width label */}
      <Html position={[x, y - h / 2 - 6, z + lineOffset]} center style={{ zIndex: 10 }}>
        <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium shadow border">
          {formatDimension(w, unit)}
        </div>
      </Html>
      
      {/* Height line (vertical) */}
      <mesh position={[x - w / 2 - 6, y, z + lineOffset]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.6} transparent />
      </mesh>
      
      {/* Height end caps */}
      <mesh position={[x - w / 2 - 6, y - h / 2, z + lineOffset]}>
        <boxGeometry args={[3, 0.2, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      <mesh position={[x - w / 2 - 6, y + h / 2, z + lineOffset]}>
        <boxGeometry args={[3, 0.2, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      
      {/* Height label */}
      <Html position={[x - w / 2 - 6, y, z + lineOffset]} center style={{ zIndex: 10 }}>
        <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium shadow border">
          {formatDimension(h, unit)}
        </div>
      </Html>
      
      {/* Depth line (going into the screen) */}
      <mesh position={[x + w / 2 + 6, y - h / 2 - 6, z]}>
        <boxGeometry args={[0.2, 0.2, d]} />
        <meshBasicMaterial color={color} opacity={0.6} transparent />
      </mesh>
      
      {/* Depth end caps */}
      <mesh position={[x + w / 2 + 6, y - h / 2 - 6, z - d / 2]}>
        <boxGeometry args={[3, 0.2, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      <mesh position={[x + w / 2 + 6, y - h / 2 - 6, z + d / 2]}>
        <boxGeometry args={[3, 0.2, 0.2]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      
      {/* Depth label */}
      <Html position={[x + w / 2 + 6, y - h / 2 - 6, z]} center style={{ zIndex: 10 }}>
        <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium shadow border">
          {formatDimension(d, unit)}
        </div>
      </Html>
    </group>
  );
}