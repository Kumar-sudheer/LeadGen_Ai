export interface Lead {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  companySize: string;
  description: string;
  website: string;
  linkedIn: string;
  targetRole?: string;
  emailGenerated?: boolean;
  status: 'New' | 'Contacted' | 'Replied';
  createdAt: string;
}

export interface SearchFilters {
  industry: string;
  location: string;
  companySize: string;
  targetRole: string;
}

export interface GeneratedEmail {
  subjectLines: string[];
  emailBody: string;
  shortMessage: string;
}
