import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { RealisticComparator } from './RealisticComparator';
import { TargetMesh } from './TargetMesh';
import { InfoPanel } from './InfoPanel';
import type { Comparator, TargetItem, Unit, TargetPosition } from '../types';

interface Scene3DProps {
  comparator: Comparator;
  targetItem: TargetItem;
  unit: Unit;
  targetPosition: TargetPosition;
  distance: number;
  showDimensionLines: boolean;
}

export function Scene3D({ comparator, targetItem, unit, targetPosition, distance, showDimensionLines }: Scene3DProps) {
  // Calculate optimal camera distance based on comparator height - increased for more zoom out
  const cameraDistance = Math.max(comparator.dimensions.h || 180, 180) * 2.5;
  const cameraY = (comparator.dimensions.h || 180) * 0.8;
  
  return (
    <div className="w-full h-full bg-gray-50 relative">
      <InfoPanel 
        comparator={comparator}
        targetItem={targetItem}
        unit={unit}
      />
      
      <Canvas
        camera={{ 
          position: [cameraDistance, cameraY, cameraDistance], 
          fov: 50 
        }}
        className="w-full h-full"
        gl={{ preserveDrawingBuffer: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />

        {/* Grid */}
        <Grid
          args={[500, 500]}
          cellSize={10}
          cellThickness={0.5}
          cellColor="#aaa"
          sectionSize={100}
          sectionThickness={1}
          sectionColor="#666"
          fadeDistance={800}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />

        {/* 3D Objects */}
        <RealisticComparator comparator={comparator} unit={unit} showDimensionLines={showDimensionLines} />
        <TargetMesh 
          targetItem={targetItem} 
          comparator={comparator} 
          unit={unit}
          position={targetPosition}
          distance={distance}
          showDimensionLines={showDimensionLines}
        />

        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={20}
          maxDistance={cameraDistance * 4}
          zoomSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}