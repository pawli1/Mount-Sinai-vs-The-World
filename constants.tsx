
import React from 'react';
import { 
  Home, 
  GraduationCap, 
  ShieldCheck, 
  Trees, 
  Waves, 
  Mountain, 
  Music, 
  Users, 
  Baby, 
  Car, 
  Landmark, 
  Wallet, 
  Coffee,
  History,
  Lightbulb,
  Star,
  Compass,
  Utensils
} from 'lucide-react';

export const SHORTCUT_TOWNS = [
  'Port Jefferson',
  'Miller Place',
  'Rocky Point',
  'Setauket',
  'Stony Brook',
  'Sound Beach',
  'Coram',
  'Selden'
];

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Real estate value': <Home className="w-5 h-5" />,
  'School quality': <GraduationCap className="w-5 h-5" />,
  'Local government': <Landmark className="w-5 h-5" />,
  'Crime & safety': <ShieldCheck className="w-5 h-5" />,
  'Environment & air quality': <Trees className="w-5 h-5" />,
  'Beaches': <Waves className="w-5 h-5" />,
  'Parks, hiking, biking': <Mountain className="w-5 h-5" />,
  'Arts & entertainment': <Music className="w-5 h-5" />,
  'Community life': <Users className="w-5 h-5" />,
  'Family-friendliness': <Baby className="w-5 h-5" />,
  'Commute & transportation': <Car className="w-5 h-5" />,
  'Property taxes': <Wallet className="w-5 h-5" />,
  'Lifestyle amenities': <Coffee className="w-5 h-5" />,
  'Historical events': <History className="w-5 h-5" />,
  'Interesting facts': <Lightbulb className="w-5 h-5" />,
  'Famous people': <Star className="w-5 h-5" />,
  'Famous places': <Compass className="w-5 h-5" />,
  'Food & Dining': <Utensils className="w-5 h-5" />,
};
