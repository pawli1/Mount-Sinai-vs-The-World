
export interface ComparisonCategory {
  id: string;
  name: string;
  description: string;
  mtSinaiAdvantage: string;
  otherTownMetric: string;
  icon: string;
}

export interface ComparisonResult {
  headline: string;
  summary: string;
  targetTown: string;
  categories: ComparisonCategory[];
  verdict: string;
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
