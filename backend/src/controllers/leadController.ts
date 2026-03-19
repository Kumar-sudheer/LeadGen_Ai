import { Context } from 'hono';
import * as leadService from '../services/leadService.ts';

export const findLeads = async (c: Context) => {
  const userId = c.get('userId');
  const filters = await c.req.json();
  const leads = await leadService.findLeads(userId, filters);
  return c.json(leads);
};

export const saveLead = async (c: Context) => {
  const userId = c.get('userId');
  const leadData = await c.req.json();
  const lead = await leadService.saveLead(userId, leadData);
  return c.json(lead, 201);
};

export const getSavedLeads = async (c: Context) => {
  const userId = c.get('userId');
  const leads = await leadService.getSavedLeads(userId);
  return c.json(leads);
};

export const updateLead = async (c: Context) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const data = await c.req.json();
  const lead = await leadService.updateLead(id, userId, data);
  return c.json(lead);
};

export const deleteLead = async (c: Context) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  await leadService.deleteLead(id, userId);
  return c.json({ message: 'Lead deleted successfully' });
};

export const getAiInsights = async (c: Context) => {
  const { description } = await c.req.json();
  const insights = await leadService.getAiInsights(description);
  return c.json(insights);
};

export const generateEmail = async (c: Context) => {
  const { companyName, industry, targetRole } = await c.req.json();
  const emailData = await leadService.generateEmail(companyName, industry, targetRole);
  return c.json(emailData);
};
