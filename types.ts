
export type Disability = 
  | 'Mobility Impairment' 
  | 'Visual Impairment' 
  | 'Hearing Impairment' 
  | 'Neurodiversity' 
  | 'Chronic Illness' 
  | 'Intellectual Disability' 
  | 'Mental Health' 
  | 'Other';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  profilePic?: string;
  disabilities: Disability[];
  hobbies: string[];
  favoriteMedia: string[];
  location: 'local' | 'global';
  matchPreference: 'same' | 'different' | 'both';
  bio: string;
}

export interface CallHistory {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerPic?: string;
  timestamp: number;
  status: 'liked' | 'blocked' | 'none';
}

export interface AppState {
  user: UserProfile | null;
  history: CallHistory[];
  isLoggedIn: boolean;
}
