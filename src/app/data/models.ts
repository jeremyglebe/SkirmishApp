export interface SpecialRule {
  name: string;
  description: string;
  cost: number;
}

export interface Unit {
  id: string;
  name: string;
  quality: number;
  specialRules: SpecialRule[];
  image?: string; // Optional property for unit image
}

export interface Warband {
  id: string;
  name: string;
  description: string;
  units: Unit[];
}
