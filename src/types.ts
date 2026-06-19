export interface MessageSubmission {
  id: string;
  fullName: string;
  deptYear: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  type: 'enquiry' | 'join';
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
  iconName: string;
}
