import { Lead } from '../types';

export const MOCK_COMPANIES: Partial<Lead>[] = [
  {
    companyName: 'TechFlow Solutions',
    industry: 'SaaS',
    location: 'San Francisco, CA',
    companySize: '51-200',
    description: 'TechFlow provides automated workflow solutions for modern enterprises, helping them streamline operations and reduce overhead.',
    website: 'https://techflow.io',
    linkedIn: 'https://linkedin.com/company/techflow',
  },
  {
    companyName: 'GreenGrid Energy',
    industry: 'Renewables',
    location: 'Austin, TX',
    companySize: '201-500',
    description: 'Leading provider of smart grid technology and sustainable energy management systems for urban environments.',
    website: 'https://greengrid.energy',
    linkedIn: 'https://linkedin.com/company/greengrid',
  },
  {
    companyName: 'NexGen Health',
    industry: 'Healthcare Tech',
    location: 'Boston, MA',
    companySize: '11-50',
    description: 'NexGen Health leverages AI to provide predictive analytics for patient care in specialized clinics.',
    website: 'https://nexgenhealth.ai',
    linkedIn: 'https://linkedin.com/company/nexgenhealth',
  },
  {
    companyName: 'Urban Logistics',
    industry: 'Logistics',
    location: 'Chicago, IL',
    companySize: '501-1000',
    description: 'Specializing in last-mile delivery optimization using a fleet of electric vehicles and autonomous drones.',
    website: 'https://urbanlogistics.com',
    linkedIn: 'https://linkedin.com/company/urbanlogistics',
  },
  {
    companyName: 'FinSecure',
    industry: 'Fintech',
    location: 'New York, NY',
    companySize: '201-500',
    description: 'Next-generation cybersecurity platform designed specifically for high-frequency trading and retail banking.',
    website: 'https://finsecure.com',
    linkedIn: 'https://linkedin.com/company/finsecure',
  }
];

export const INITIAL_DASHBOARD_LEADS: Lead[] = [
  {
    id: '1',
    companyName: 'BlueSky AI',
    industry: 'Artificial Intelligence',
    location: 'Seattle, WA',
    companySize: '11-50',
    description: 'Cloud-native AI infrastructure provider.',
    website: 'https://bluesky.ai',
    linkedIn: 'https://linkedin.com/company/bluesky',
    emailGenerated: true,
    status: 'Replied',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    companyName: 'Quantum Dev',
    industry: 'Software Development',
    location: 'London, UK',
    companySize: '51-200',
    description: 'Developing tools for quantum computing developers.',
    website: 'https://quantumdev.io',
    linkedIn: 'https://linkedin.com/company/quantumdev',
    emailGenerated: true,
    status: 'Contacted',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    companyName: 'Swift Retail',
    industry: 'E-commerce',
    location: 'Berlin, Germany',
    companySize: '201-500',
    description: 'High-speed logistics for local retail shops.',
    website: 'https://swiftretail.com',
    linkedIn: 'https://linkedin.com/company/swiftretail',
    emailGenerated: false,
    status: 'New',
    createdAt: new Date().toISOString()
  }
];
