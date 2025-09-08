import type { Comparator, TargetItem, Unit, TargetPosition } from "../types";
import { comparators } from "../data/comparators";
import { convertValue } from "../utils/units";

interface SidebarProps {
  selectedComparator: Comparator;
  targetItem: TargetItem;
  unit: Unit;
  targetPosition: TargetPosition;
  distance: number;
  comparatorDimensions: { w?: number; h?: number; d?: number; r?: number };
  showDimensionLines: boolean;
  onComparatorChange: (comparator: Comparator) => void;
  onTargetItemChange: (targetItem: TargetItem) => void;
  onUnitChange: (unit: Unit) => void;
  onPositionChange: (position: TargetPosition) => void;
  onDistanceChange: (distance: number) => void;
  onComparatorDimensionChange: (dimensions: {
    w?: number;
    h?: number;
    d?: number;
    r?: number;
  }) => void;
  onShowDimensionLinesChange: (show: boolean) => void;
  onExport: () => void;
}

export function Sidebar({
  selectedComparator,
  targetItem,
  unit,
  targetPosition,
  distance,
  comparatorDimensions,
  showDimensionLines,
  onComparatorChange,
  onTargetItemChange,
  onUnitChange,
  onPositionChange,
  onDistanceChange,
  onComparatorDimensionChange,
  onShowDimensionLinesChange,
  onExport,
}: SidebarProps) {
  const handleDimensionChange = (
    dimension: "w" | "h" | "d" | "r",
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    const cmValue =
      unit === "inches" ? convertValue(numValue, "inches", "cm") : numValue;

    onTargetItemChange({
      ...targetItem,
      dimensions: {
        ...targetItem.dimensions,
        [dimension]: cmValue,
      },
    });
  };

  const getDimensionValue = (dimension: "w" | "h" | "d" | "r"): number => {
    const cmValue = targetItem.dimensions[dimension] || 0;
    return unit === "inches" ? convertValue(cmValue, "cm", "inches") : cmValue;
  };

  return (
    <div className="w-80 h-full bg-white shadow-lg p-6 space-y-6 overflow-y-auto">
      <div>
        <div className="text-2xl font-bold text-gray-800 mb-2">SizeUp</div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Compare objects in 3D by placing them next to familiar reference
          items. Adjust sizes, change positions, and get accurate measurements
          to visualize real-world scale.
        </p>
      </div>

      {/* Comparator Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Comparator
        </label>
        <select
          value={selectedComparator.id}
          onChange={(e) => {
            const comparator = comparators.find((c) => c.id === e.target.value);
            if (comparator) onComparatorChange(comparator);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {comparators.map((comparator) => (
            <option key={comparator.id} value={comparator.id}>
              {comparator.name}
            </option>
          ))}
        </select>
      </div>

      {/* Comparator Size Adjustments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adjust {selectedComparator.name} Size
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Width ({unit})
            </label>
            <input
              type="number"
              value={
                unit === "inches"
                  ? convertValue(
                      comparatorDimensions.w || 0,
                      "cm",
                      "inches"
                    ).toFixed(1)
                  : (comparatorDimensions.w || 0).toFixed(1)
              }
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const cmValue =
                  unit === "inches"
                    ? convertValue(value, "inches", "cm")
                    : value;
                onComparatorDimensionChange({
                  ...comparatorDimensions,
                  w: cmValue,
                });
              }}
              min="0"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Height ({unit})
            </label>
            <input
              type="number"
              value={
                unit === "inches"
                  ? convertValue(
                      comparatorDimensions.h || 0,
                      "cm",
                      "inches"
                    ).toFixed(1)
                  : (comparatorDimensions.h || 0).toFixed(1)
              }
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const cmValue =
                  unit === "inches"
                    ? convertValue(value, "inches", "cm")
                    : value;
                onComparatorDimensionChange({
                  ...comparatorDimensions,
                  h: cmValue,
                });
              }}
              min="0"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Depth ({unit})
            </label>
            <input
              type="number"
              value={
                unit === "inches"
                  ? convertValue(
                      comparatorDimensions.d || 0,
                      "cm",
                      "inches"
                    ).toFixed(1)
                  : (comparatorDimensions.d || 0).toFixed(1)
              }
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const cmValue =
                  unit === "inches"
                    ? convertValue(value, "inches", "cm")
                    : value;
                onComparatorDimensionChange({
                  ...comparatorDimensions,
                  d: cmValue,
                });
              }}
              min="0"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Target Item Shape */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Item Shape
        </label>
        <select
          value={targetItem.shape}
          onChange={(e) =>
            onTargetItemChange({
              ...targetItem,
              shape: e.target.value as "box" | "sphere",
              dimensions:
                e.target.value === "sphere"
                  ? { r: 30 }
                  : { w: 10, h: 10, d: 10 },
            })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="box">Box</option>
          <option value="sphere">Sphere</option>
        </select>
      </div>

      {/* Unit Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Measurement Unit
        </label>
        <div className="flex bg-gray-100 rounded-md p-1">
          <button
            onClick={() => onUnitChange("cm")}
            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
              unit === "cm"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Centimeters
          </button>
          <button
            onClick={() => onUnitChange("inches")}
            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
              unit === "inches"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Inches
          </button>
        </div>
      </div>

      {/* Target Item Dimensions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dimensions
        </label>

        {targetItem.shape === "box" ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Width ({unit})
              </label>
              <input
                type="number"
                value={getDimensionValue("w").toFixed(1)}
                onChange={(e) => handleDimensionChange("w", e.target.value)}
                min="0"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Height ({unit})
              </label>
              <input
                type="number"
                value={getDimensionValue("h").toFixed(1)}
                onChange={(e) => handleDimensionChange("h", e.target.value)}
                min="0"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Depth ({unit})
              </label>
              <input
                type="number"
                value={getDimensionValue("d").toFixed(1)}
                onChange={(e) => handleDimensionChange("d", e.target.value)}
                min="0"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Radius ({unit})
            </label>
            <input
              type="number"
              value={getDimensionValue("r").toFixed(1)}
              onChange={(e) => handleDimensionChange("r", e.target.value)}
              min="0"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Target Position Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "top", label: "Top", icon: "↑" },
              { value: "right", label: "Right", icon: "→" },
              { value: "bottom", label: "Bottom", icon: "↓" },
              { value: "left", label: "Left", icon: "←" },
            ] as const
          )
            .filter(
              (pos) =>
                selectedComparator.allowedPositions?.includes(pos.value) ?? true
            )
            .map((pos) => (
              <button
                key={pos.value}
                onClick={() => onPositionChange(pos.value)}
                className={`p-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  targetPosition === pos.value
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-lg">{pos.icon}</span>
                {pos.label}
              </button>
            ))}
        </div>
      </div>

      {/* Distance Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Distance ({unit})
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="5"
            max={unit === "cm" ? "100" : "40"}
            step={unit === "cm" ? "5" : "1"}
            value={
              unit === "inches"
                ? convertValue(distance, "cm", "inches").toFixed(0)
                : distance.toFixed(0)
            }
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              const cmValue =
                unit === "inches" ? convertValue(value, "inches", "cm") : value;
              onDistanceChange(cmValue);
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{unit === "cm" ? "5cm" : '2"'}</span>
            <span className="font-medium">
              {unit === "inches"
                ? `${convertValue(distance, "cm", "inches").toFixed(1)}"`
                : `${distance.toFixed(0)}cm`}
            </span>
            <span>{unit === "cm" ? "100cm" : '40"'}</span>
          </div>
        </div>
      </div>

      {/* Dimension Lines Toggle */}
      <div>
        <label className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Show Dimension Lines
          </span>
          <button
            onClick={() => onShowDimensionLinesChange(!showDimensionLines)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showDimensionLines ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showDimensionLines ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </label>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Export View
      </button>
    </div>
  );
}
