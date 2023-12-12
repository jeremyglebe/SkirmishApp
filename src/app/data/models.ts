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

export const DEFAULT_UNIT_IMAGE =
  'data:image/png;base64,your_base64_image_string_here';
