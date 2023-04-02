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
  totalCost: number;
  image?: string; // Optional property for unit image
}

export interface Group {
  id: string;
  name: string;
  units: Unit[];
  totalCost: number;
}
