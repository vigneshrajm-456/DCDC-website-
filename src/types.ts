export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  collageImage?: string;
  category: 'Leadership' | 'Engineering' | 'Marketing' | 'Customer Success';
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  email: string;
  location: string;
  experience: string;
  skills: string[];
}
