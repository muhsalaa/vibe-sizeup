// Unit type
export type Unit = "cm" | "inches";

// Position options for target item
export type TargetPosition = "right" | "left" | "top" | "bottom";

// Comparator definition
export type Comparator = {
  id: string;
  name: string;
  type: "box" | "sphere"; // Basic shape approximation
  dimensions: { w?: number; h?: number; d?: number; r?: number }; // cm
  color: string;
  positioning: "beside" | "on_top"; // How target item should be positioned
  allowedPositions?: TargetPosition[]; // Optional: restrict available positions
};

// Target item definition
export type TargetItem = {
  shape: "box" | "sphere"; // 3D only for MVP
  dimensions: { w?: number; h?: number; d?: number; r?: number }; // cm
};

// App state
export type AppState = {
  selectedComparator: Comparator;
  targetItem: TargetItem;
  unit: Unit;
  targetPosition: TargetPosition;
  distance: number; // cm
  comparatorDimensions: { w?: number; h?: number; d?: number; r?: number }; // Override comparator dimensions
};