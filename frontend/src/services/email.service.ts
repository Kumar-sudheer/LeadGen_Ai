import { api } from '../lib/api';
import { GeneratedEmail } from '../types';

export const emailService = {
  generateEmail: async (companyName: string, industry: string, targetRole: string): Promise<GeneratedEmail> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        subjectLines: [
          `Boosting ${companyName}'s ${industry} operations`,
          `Question for the ${targetRole} at ${companyName}`,
          `Quick idea for ${companyName}`
        ],
        emailBody: `Hi team at ${companyName},

I've been following your work in the ${industry} space and was impressed by your recent growth. As the ${targetRole}, I thought you might be interested in how we're helping similar companies streamline their outreach.

Our platform could specifically help you with lead generation and SDR automation.

Would you be open to a 10-minute chat next week?

Best regards,
[Your Name]`,
        shortMessage: `Hi! Love what ${companyName} is doing in ${industry}. Would love to connect and share some insights on how we can help your team scale. Cheers!`
      };
    }
    const response = await api.post('/ai/email', { companyName, industry, targetRole });
    return response.data;
  }
};