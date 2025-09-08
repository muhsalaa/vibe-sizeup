import type { Unit } from '../types';

// Conversion factor: 1 inch = 2.54 cm
const CM_TO_INCHES = 0.393701;
const INCHES_TO_CM = 2.54;

export const convertValue = (value: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === 'cm' && toUnit === 'inches') {
    return value * CM_TO_INCHES;
  }
  
  if (fromUnit === 'inches' && toUnit === 'cm') {
    return value * INCHES_TO_CM;
  }
  
  return value;
};

export const formatDimension = (value: number | undefined, unit: Unit): string => {
  if (value === undefined) return '';
  return `${value.toFixed(1)}${unit === 'cm' ? 'cm' : '"'}`;
};