import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { leadService } from '../services/lead.service';
import { Lead } from '../types';
import { Globe, Linkedin, Mail, Loader2, Info } from 'lucide-react';
import Layout from '../components/Layout';

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [summarizingId, setSummarizingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      const filters = {
        industry: searchParams.get('industry') || '',
        location: searchParams.get('location') || '',
        companySize: searchParams.get('companySize') || '',
        targetRole: searchParams.get('targetRole') || ''
      };
      const results = await leadService.findLeads(filters);
      setLeads(results);
      setLoading(false);
    };

    fetchLeads();
  }, [searchParams]);

  const handleGenerateEmail = async (lead: Lead) => {
    // Save lead to dashboard first
    await leadService.saveLead({ ...lead, status: 'New' });
    const query = new URLSearchParams({
      companyName: lead.companyName,
      industry: lead.industry,
      targetRole: lead.targetRole || ''
    }).toString();
    navigate(`/email-generator?${query}`);
  };

  const handleSummarize = async (lead: Lead) => {
    if (summaries[lead.id]) return;
    setSummarizingId(lead.id);
    const summary = await leadService.summarizeCompany(lead.description || '');
    setSummaries(prev => ({ ...prev, [lead.id]: summary }));
    setSummarizingId(null);
  };

  if (loading) {
    return (
      <Layout title="Searching...">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
          <p className="text-xl font-medium text-slate-400">AI is scouting for leads...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Search Results">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-white">Search Results</h2>
            <p className="text-slate-400">Found {leads.length} companies matching your criteria</p>
          </div>
          <button 
            onClick={() => navigate('/find-leads')}
            className="text-purple-400 hover:underline font-medium"
          >
            New Search
          </button>
        </div>

        <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 font-semibold text-sm text-slate-400">Company</th>
                  <th className="px-6 py-4 font-semibold text-sm text-slate-400">Description</th>
                  <th className="px-6 py-4 font-semibold text-sm text-slate-400">Links</th>
                  <th className="px-6 py-4 font-semibold text-sm text-right text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-6 align-top">
                      <div className="font-bold text-lg text-white">{lead.companyName}</div>
                      <div className="text-sm text-slate-400">{lead.industry} • {lead.location}</div>
                      <div className="text-xs text-purple-400 mt-1 font-bold">{lead.companySize} employees</div>
                    </td>
                    <td className="px-6 py-6 align-top max-w-md">
                      <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                        {lead.description}
                      </p>
                      {summaries[lead.id] ? (
                        <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-xs text-purple-300 animate-in fade-in slide-in-from-top-1">
                          <span className="font-bold flex items-center gap-1 mb-1">
                            <Info className="w-3 h-3" /> AI Summary
                          </span>
                          {summaries[lead.id]}
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleSummarize(lead)}
                          disabled={summarizingId === lead.id}
                          className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 transition-colors"
                        >
                          {summarizingId === lead.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Info className="w-3 h-3" />
                          )}
                          Summarize with AI
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-6 align-top">
                      <div className="flex items-center gap-3">
                        <a href={lead.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#0f172a] hover:bg-white/5 transition-colors text-slate-400 hover:text-white border border-white/5">
                          <Globe className="w-4 h-4" />
                        </a>
                        <a href={lead.linkedIn} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#0f172a] hover:bg-white/5 transition-colors text-slate-400 hover:text-white border border-white/5">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top text-right">
                      <button
                        onClick={() => handleGenerateEmail(lead)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ml-auto shadow-sm shadow-purple-500/20 transition-all active:scale-95"
                      >
                        <Mail className="w-4 h-4" /> Generate Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
