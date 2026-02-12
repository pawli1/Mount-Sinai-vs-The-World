
export interface ComparisonCategory {
  id: string;
  name: string;
  description: string;
  mtSinaiFactual: string;
  otherTownFactual: string;
  icon: string;
}

export interface ComparisonResult {
  headline: string;
  summary: string;
  targetTown: string;
  categories: ComparisonCategory[];
  verdict: string;
  heroImagePrompt: string;
}

export type TownName = 
  | 'Port Jefferson' 
  | 'Miller Place' 
  | 'Rocky Point' 
  | 'Setauket' 
  | 'Stony Brook' 
  | 'Sound Beach' 
  | 'Coram' 
  | 'Selden' 
  | 'Mount Sinai';
