export interface Edge {
  name: string;
  description: string;
  cost: number;
}

export interface Unit {
  id: string;
  name: string;
  rank: number;
  edges: Edge[];
  image?: string; // Optional property for unit image
}

export interface Warband {
  id: string;
  name: string;
  description: string;
  units: { unit: Unit; count: number }[];
}

// ---------- Nothing below this line is in use yet ---------------------------

export const DEFAULT_UNIT_IMAGE =
  'data:image/png;base64,your_base64_image_string_here';

export enum UnitSize {
  Small,
  Standard,
  Large,
  Huge,
}

export enum UnitSpeed {
  Slow,
  Standard,
  Fast,
}

export interface UnitV2 {
  id: string;
  name: string;
  rank: number;
  attack: number;
  defense: number;
  size: UnitSize;
  speed: UnitSpeed;
  edges: Edge[];
  image?: string; // Optional property for unit image
}

export interface DataStorage {
  units: Unit[];
  warbands: Warband[];
  enhancedUnitCostRule: boolean;
}
