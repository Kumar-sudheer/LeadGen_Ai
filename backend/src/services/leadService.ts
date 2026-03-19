import prisma from '../client.ts';
import { Llm, LlmProvider } from '@uptiqai/integrations-sdk';

const llm = new Llm({ provider: process.env.LLM_PROVIDER as LlmProvider });

export const findLeads = async (userId: string, filters: any) => {
  const prompt = `Find 5 potential B2B companies based on these criteria:
  Industry: ${filters.industry}
  Location: ${filters.location}
  Company Size: ${filters.companySize}
  Target Role: ${filters.targetRole}
  
  Return the results as a JSON array of objects with the following fields:
  companyName, website, industry, description, leadScore (0-100).
  Ensure it's a valid JSON array.`;

  const result = await llm.generateText({
    messages: [{ role: 'user', content: prompt }],
    model: process.env.LLM_MODEL
  });

  try {
    const text = result.text;
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      const leads = JSON.parse(jsonMatch[0]);
      return leads.map((lead: any) => ({
        ...lead,
        userId,
        targetRole: filters.targetRole
      }));
    }
  } catch (error) {
    console.error('Error parsing AI response:', error);
  }

  // Fallback if AI fails or returns invalid JSON
  return [];
};

export const saveLead = async (userId: string, leadData: any) => {
  return await prisma.lead.create({
    data: {
      userId,
      companyName: leadData.companyName,
      website: leadData.website,
      industry: leadData.industry,
      description: leadData.description,
      leadScore: leadData.leadScore,
      status: 'New',
      isDeleted: false
    }
  });
};

export const getSavedLeads = async (userId: string) => {
  return await prisma.lead.findMany({
    where: {
      userId,
      isDeleted: false
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const updateLead = async (id: string, userId: string, data: any) => {
  return await prisma.lead.update({
    where: {
      id,
      userId
    },
    data
  });
};

export const deleteLead = async (id: string, userId: string) => {
  return await prisma.lead.update({
    where: {
      id,
      userId
    },
    data: {
      isDeleted: true
    }
  });
};

export const getAiInsights = async (description: string) => {
  const prompt = `Analyze this company description and provide a brief summary and an outreach strategy for a cold email.
  Description: ${description}
  
  Return as JSON with fields: summary, outreachAngle.`;

  const result = await llm.generateText({
    messages: [{ role: 'user', content: prompt }],
    model: process.env.LLM_MODEL
  });

  try {
    const text = result.text;
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error parsing AI insights:', error);
  }
  
  return { summary: description, outreachAngle: 'Focus on mutual growth.' };
};

export const generateEmail = async (companyName: string, industry: string, targetRole: string) => {
  const prompt = `Generate a personalized cold email for a lead.
  Company: ${companyName}
  Industry: ${industry}
  Target Role: ${targetRole}
  
  Requirements:
  - Under 120 words
  - Professional but engaging tone
  - Include 3 subject line options
  - Include a short outreach message for LinkedIn
  
  Return as JSON with fields: subjectLines (array), emailBody (string), shortMessage (string).`;

  const result = await llm.generateText({
    messages: [{ role: 'user', content: prompt }],
    model: process.env.LLM_MODEL
  });

  try {
    const text = result.text;
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error parsing AI email response:', error);
  }

  return {
    subjectLines: [
      `Quick question for ${companyName}`
    ],
    emailBody: `Hi team at ${companyName},\n\nI was impressed by your work in ${industry}. I'd love to chat about how we can help.`,    shortMessage: `Hi! Love what ${companyName} is doing.`
  };
};
