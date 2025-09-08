import type { Comparator, TargetItem, Unit } from '../types';
import { formatDimension } from '../utils/units';

interface InfoPanelProps {
  comparator: Comparator;
  targetItem: TargetItem;
  unit: Unit;
}

export function InfoPanel({ comparator, targetItem, unit }: InfoPanelProps) {
  const { dimensions: compDims, name, color } = comparator;
  const { shape, dimensions: targetDims } = targetItem;

  const w = compDims.w || 0;
  const h = compDims.h || 0;
  const d = compDims.d || 0;
  const r = compDims.r || 0;

  const targetW = targetDims.w || 0;
  const targetH = targetDims.h || 0;
  const targetD = targetDims.d || 0;
  const targetR = targetDims.r || 0;

  // Don't show target info if no dimensions are set
  const hasTargetDimensions = (shape === 'box' && targetW && targetH && targetD) || (shape === 'sphere' && targetR);

  return (
    <div className="hidden lg:block fixed top-4 right-4 z-10 space-y-3">
      {/* Comparator Info */}
      <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: color }}
          ></div>
          <div className="font-semibold text-gray-800">{name}</div>
        </div>
        <div className="text-gray-600 text-sm">
          {formatDimension(w, unit)} × {formatDimension(h, unit)} × {formatDimension(d, unit)}
        </div>
      </div>

      {/* Target Item Info */}
      {hasTargetDimensions && (
        <div className="bg-blue-50/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-blue-200 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <div className="font-semibold text-blue-800">Target Item</div>
          </div>
          <div className="text-blue-700 text-sm">
            {shape === 'box' ? (
              `${formatDimension(targetW, unit)} × ${formatDimension(targetH, unit)} × ${formatDimension(targetD, unit)}`
            ) : (
              `⌀ ${formatDimension(targetR * 2, unit)}`
            )}
          </div>
          <div className="text-blue-600 text-xs mt-1 capitalize">
            {shape}
          </div>
        </div>
      )}
    </div>
  );
}