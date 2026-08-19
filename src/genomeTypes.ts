export interface DNAResult {
  code: string; // e.g. "E · I · D · C · N"
  name: string;
  description: string;
  advantages: string[];
  blindSpots: string[];
  aiAreas: string[];
}

export interface AxisResult {
  name: string;
  dominantCode: string;
  dominantLabel: string;
  description: string;
}
