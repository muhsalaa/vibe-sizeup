import { useState } from 'react';
import { Scene3D } from './components/Scene3D';
import { Sidebar } from './components/Sidebar';
import { defaultComparator } from './data/comparators';
import type { Comparator, TargetItem, Unit, TargetPosition } from './types';

function App() {
  const [selectedComparator, setSelectedComparator] = useState<Comparator>(defaultComparator);
  const [targetItem, setTargetItem] = useState<TargetItem>({
    shape: 'box',
    dimensions: { w: 30, h: 20, d: 15 } // Default box: 30x20x15 cm
  });
  const [unit, setUnit] = useState<Unit>('cm');
  const [targetPosition, setTargetPosition] = useState<TargetPosition>('right');
  const [distance, setDistance] = useState(30); // 30cm default distance
  const [comparatorDimensions, setComparatorDimensions] = useState(defaultComparator.dimensions);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDimensionLines, setShowDimensionLines] = useState(true);

  const handleComparatorChange = (newComparator: Comparator) => {
    setSelectedComparator(newComparator);
    setComparatorDimensions(newComparator.dimensions); // Reset to default dimensions
    
    // If current position is not allowed for new comparator, switch to first allowed position
    if (newComparator.allowedPositions && !newComparator.allowedPositions.includes(targetPosition)) {
      setTargetPosition(newComparator.allowedPositions[0]);
    }
  };

  // Create comparator with adjusted dimensions
  const adjustedComparator: Comparator = {
    ...selectedComparator,
    dimensions: comparatorDimensions
  };

  const handleExport = () => {
    // Get the canvas element
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    // Wait for next frame to ensure rendering is complete
    requestAnimationFrame(() => {
      try {
        // Create download link
        const link = document.createElement('a');
        link.download = 'sizeup-comparison.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      }
    });
  };

  return (
    <div className="h-screen bg-gray-100 relative">
      {/* Toggle button - visible on all screen sizes */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-2 border hover:bg-gray-50 transition-colors"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 bg-gray-600 transition-transform ${isSidebarOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
          <div className={`h-0.5 bg-gray-600 transition-opacity ${isSidebarOpen ? 'opacity-0' : ''}`}></div>
          <div className={`h-0.5 bg-gray-600 transition-transform ${isSidebarOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
        </div>
      </button>

      {/* Floating Sidebar with spacing */}
      <div className={`
        fixed top-5 left-5 h-[calc(100vh-2.5rem)]
        transform transition-transform duration-300 ease-in-out
        z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[340px]'}
      `}>
        <Sidebar
          selectedComparator={selectedComparator}
          targetItem={targetItem}
          unit={unit}
          targetPosition={targetPosition}
          distance={distance}
          comparatorDimensions={comparatorDimensions}
          showDimensionLines={showDimensionLines}
          onComparatorChange={handleComparatorChange}
          onTargetItemChange={setTargetItem}
          onUnitChange={setUnit}
          onPositionChange={setTargetPosition}
          onDistanceChange={setDistance}
          onComparatorDimensionChange={setComparatorDimensions}
          onShowDimensionLinesChange={setShowDimensionLines}
          onExport={handleExport}
        />
      </div>

      {/* Full-width 3D Scene */}
      <div className="w-full h-full">
        <Scene3D
          comparator={adjustedComparator}
          targetItem={targetItem}
          unit={unit}
          targetPosition={targetPosition}
          distance={distance}
          showDimensionLines={showDimensionLines}
        />
      </div>
    </div>
  );
}

export default App;
