export type EventCategory = 'Technical' | 'Projects' | 'Outreach' | 'Innovation' | 'Technical Workshop' | 'Club Bonding';

export interface EventItem {
  id: string;
  title: string;
  month: string;
  week: string;
  description: string;
  details: string;
  category: EventCategory;
  tags: string[];
  registrationStatus: 'open' | 'closed' | 'soon';
  registeredCount: number;
  maxCapacity: number;
  location: string;
  time: string;
  speaker?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  role: string;
  registeredAt: string;
}

export interface Comment {
  id: string;
  eventId: string;
  author: string;
  text: string;
  timestamp: string;
}
