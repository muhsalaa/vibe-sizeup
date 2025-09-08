import type { Comparator } from "../types";

export const comparators: Comparator[] = [
  {
    id: "standing_person",
    name: "Standing Person",
    type: "box",
    dimensions: { w: 60, h: 180, d: 25 }, // 60cm x 180cm x 25cm
    color: "#8B7355", // Gray-brown
    positioning: "beside",
    allowedPositions: ["right", "left", "top"], // No bottom - doesn't make sense
  },
  {
    id: "cupboard",
    name: "Cupboard",
    type: "box",
    dimensions: { w: 100, h: 180, d: 50 }, // 100cm x 180cm x 50cm
    color: "#8B4513", // Brown wood
    positioning: "on_top",
    allowedPositions: ["right", "left", "top"], // No bottom - doesn't make sense
  },
  {
    id: "desk",
    name: "Desk",
    type: "box",
    dimensions: { w: 120, h: 75, d: 60 }, // 120cm x 75cm x 60cm
    color: "#654321", // Dark brown
    positioning: "on_top",
    allowedPositions: ["top", "right", "left", "bottom"], // All positions including under desk
  },
];

// Default comparator
export const defaultComparator = comparators.find((c) => c.id === "desk")!;
