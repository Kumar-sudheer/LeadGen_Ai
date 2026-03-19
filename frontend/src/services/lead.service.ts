import { api } from '../lib/api';
import { Lead, SearchFilters } from '../types';
import { MOCK_COMPANIES, INITIAL_DASHBOARD_LEADS } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

export const leadService = {
  findLeads: async (filters: SearchFilters): Promise<Lead[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return MOCK_COMPANIES.map(company => ({
        ...company,
        id: uuidv4(),
        industry: filters.industry || company.industry,
        location: filters.location || company.location,
        companySize: filters.companySize || company.companySize,
        targetRole: filters.targetRole,
        status: 'New',
        createdAt: new Date().toISOString()
      })) as Lead[];
    }
    const response = await api.post('/leads/find', filters);
    return response.data;
  },

  saveLead: async (lead: Lead) => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const stored = localStorage.getItem('b2b_lead_finder_leads');
      const leads = stored ? JSON.parse(stored) : INITIAL_DASHBOARD_LEADS;
      const existingIndex = leads.findIndex((l: Lead) => l.companyName === lead.companyName);
      
      if (existingIndex > -1) {
        leads[existingIndex] = { ...leads[existingIndex], ...lead };
      } else {
        leads.push(lead);
      }
      localStorage.setItem('b2b_lead_finder_leads', JSON.stringify(leads));
      return lead;
    }
    const response = await api.post('/leads', lead);
    return response.data;
  },

  getSavedLeads: async (): Promise<Lead[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const stored = localStorage.getItem('b2b_lead_finder_leads');
      if (!stored) {
        localStorage.setItem('b2b_lead_finder_leads', JSON.stringify(INITIAL_DASHBOARD_LEADS));
        return INITIAL_DASHBOARD_LEADS;
      }
      return JSON.parse(stored);
    }
    const response = await api.get('/leads');
    return response.data;
  },

  updateLeadStatus: async (id: string, status: Lead['status']) => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const stored = localStorage.getItem('b2b_lead_finder_leads');
      const leads = stored ? JSON.parse(stored) : INITIAL_DASHBOARD_LEADS;
      const index = leads.findIndex((l: Lead) => l.id === id);
      if (index > -1) {
        leads[index].status = status;
        localStorage.setItem('b2b_lead_finder_leads', JSON.stringify(leads));
      }
      return;
    }
    await api.patch(`/leads/${id}`, { status });
  },

  summarizeCompany: async (description: string): Promise<string> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      await new Promise(resolve => setTimeout(resolve, 800));
      return `AI Summary: ${description.split('.').slice(0, 2).join('. ')}. Focuses on efficiency and modern workflow optimization.`;
    }
    const response = await api.post('/ai/insights', { description });
    return response.data.summary;
  }
};