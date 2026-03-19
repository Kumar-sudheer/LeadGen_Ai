import React, { useState, useEffect } from 'react';
import { Search, Filter, Globe, BarChart3, Mail, Target, Info, Bookmark, ExternalLink, ChevronRight, Zap, Trophy, TrendingUp, Sparkles, Building2, Users, MapPin, Briefcase } from 'lucide-react';
import { leadService } from '../services/lead.service';
import { Lead, SearchFilters } from '../types';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const FindLeads: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    industry: '',
    location: '',
    companySize: '',
    targetRole: ''
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setIsLoading(true);
    setSelectedLead(null);
    try {
      const results = await leadService.findLeads(filters);
      setLeads(results);
      if (results.length > 0) {
        setSelectedLead(results[0]);
      }
    } catch (error) {
      console.error('Error finding leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLead) {
      fetchInsights(selectedLead);
    }
  }, [selectedLead?.id]);

  const fetchInsights = async (lead: Lead) => {
    setIsSummarizing(true);
    try {
      const summary = await leadService.summarizeCompany(lead.description || '');
      setAiInsights({
        summary,
        outreachAngle: `Leverage ${lead.companyName}'s current focus on ${lead.industry} to position our solution as a key driver for their ${lead.companySize} scale operations.`,
        subjectLines: [
          `Question about ${lead.companyName}'s ${lead.industry} strategy`,
          `Ideas for your role as ${lead.targetRole || 'lead'} at ${lead.companyName}`,
          `${lead.companyName} + LeadGen AI: A match for ${lead.location}`
        ],
        qualityScore: Math.floor(Math.random() * 30) + 70 // 70-100
      });
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const saveLead = async (lead: Lead) => {
    try {
      await leadService.saveLead(lead);
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleGenerateEmail = (lead: Lead) => {
    navigate('/email-generator', { state: { lead } });
  };

  return (
    <Layout title="Find Leads">
      <div className="flex flex-col h-full bg-[#020617]">
        {/* Top Section: Search Bar */}
        <div className="mb-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
              Discover High Quality <span className="text-indigo-500">B2B Leads</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Use our AI-powered search tool to find your ideal customer profile across millions of companies.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-2 shadow-2xl flex flex-wrap lg:flex-nowrap items-center gap-2 max-w-6xl mx-auto">
            <div className="flex-1 flex items-center min-w-[200px] group">
              <div className="pl-4">
                <Building2 className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <select
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                className="w-full bg-transparent border-none py-4 px-3 text-slate-200 focus:ring-0 text-sm appearance-none cursor-pointer font-medium"
              >
                <option value="" className="bg-slate-900">All Industries</option>
                <option value="SaaS" className="bg-slate-900">SaaS</option>
                <option value="Fintech" className="bg-slate-900">Fintech</option>
                <option value="Healthcare" className="bg-slate-900">Healthcare Tech</option>
                <option value="E-commerce" className="bg-slate-900">E-commerce</option>
                <option value="Logistics" className="bg-slate-900">Logistics</option>
              </select>
            </div>

            <div className="w-px h-8 bg-white/10 hidden lg:block"></div>

            <div className="flex-1 flex items-center min-w-[200px] group">
              <div className="pl-4">
                <MapPin className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full bg-transparent border-none py-4 px-3 text-slate-200 focus:ring-0 text-sm appearance-none cursor-pointer font-medium"
              >
                <option value="" className="bg-slate-900">All Locations</option>
                <option value="USA" className="bg-slate-900">United States</option>
                <option value="UK" className="bg-slate-900">United Kingdom</option>
                <option value="Europe" className="bg-slate-900">Europe</option>
                <option value="Remote" className="bg-slate-900">Remote</option>
              </select>
            </div>

            <div className="w-px h-8 bg-white/10 hidden lg:block"></div>

            <div className="flex-1 flex items-center min-w-[200px] group">
              <div className="pl-4">
                <Users className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <select
                value={filters.companySize}
                onChange={(e) => setFilters({ ...filters, companySize: e.target.value })}
                className="w-full bg-transparent border-none py-4 px-3 text-slate-200 focus:ring-0 text-sm appearance-none cursor-pointer font-medium"
              >
                <option value="" className="bg-slate-900">Company Size</option>
                <option value="1-10" className="bg-slate-900">1-10 Employees</option>
                <option value="11-50" className="bg-slate-900">11-50 Employees</option>
                <option value="51-200" className="bg-slate-900">51-200 Employees</option>
                <option value="201-500" className="bg-slate-900">201-500 Employees</option>
                <option value="500+" className="bg-slate-900">500+ Employees</option>
              </select>
            </div>

            <div className="w-px h-8 bg-white/10 hidden lg:block"></div>

            <div className="flex-1 flex items-center min-w-[200px] group">
              <div className="pl-4">
                <Briefcase className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <select
                value={filters.targetRole}
                onChange={(e) => setFilters({ ...filters, targetRole: e.target.value })}
                className="w-full bg-transparent border-none py-4 px-3 text-slate-200 focus:ring-0 text-sm appearance-none cursor-pointer font-medium"
              >
                <option value="" className="bg-slate-900">Target Role</option>
                <option value="CEO" className="bg-slate-900">CEO / Founder</option>
                <option value="Marketing Head" className="bg-slate-900">Marketing Head</option>
                <option value="Sales Director" className="bg-slate-900">Sales Director</option>
                <option value="CTO" className="bg-slate-900">CTO</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Find Leads
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Middle section: Results and Insights */}
        <div className="flex-1 flex gap-8 overflow-hidden min-h-0">
          {/* Lead Cards List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {leads.length === 0 && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border border-white/5">
                  <Search className="w-12 h-12 text-slate-700" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-slate-300">Ready to find prospects?</p>
                  <p className="text-slate-500 mt-2">Apply filters above to start discovering high-quality B2B leads.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`group p-6 rounded-[24px] border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      selectedLead?.id === lead.id
                        ? 'bg-indigo-600/10 border-indigo-500/50 ring-1 ring-indigo-500/20'
                        : 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 text-indigo-400 font-bold group-hover:scale-110 transition-transform">
                          {lead.companyName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {lead.companyName}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span className="hover:text-indigo-400 transition-colors">{lead.website}</span>
                            <span>•</span>
                            <span className="text-slate-400 font-medium">{lead.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                        {lead.industry}
                      </div>
                    </div>
                    
                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 relative z-10 leading-relaxed">
                      {lead.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg text-xs font-bold border border-emerald-500/20">
                          <Trophy className="w-3 h-3" />
                          AI Score: {Math.floor(Math.random() * 20) + 80}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleGenerateEmail(lead); }}
                          title="Generate Email"
                          className="w-10 h-10 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 transition-all flex items-center justify-center"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                          title="View Insights"
                          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all flex items-center justify-center"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); saveLead(lead); }}
                          title="Save Lead"
                          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all flex items-center justify-center"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: AI Insights */}
          <div className="w-[420px] bg-slate-900/50 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/10 flex flex-col shadow-2xl relative">
            {/* Gradient Background Pattern */}
            <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none"></div>
            
            <div className="p-8 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-indigo-600/20">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">AI Insights</h3>
              </div>
              <p className="text-sm text-slate-500">Smart outreach strategy and research</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar relative z-10">
              {selectedLead ? (
                <>
                  {/* Lead Quality Score */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Lead Quality Score</span>
                        <div className="text-2xl font-bold text-white">{aiInsights?.qualityScore || '--'}%</div>
                      </div>
                      <div className="text-emerald-500 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">High Potential</div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                        style={{ width: `${aiInsights?.qualityScore || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Company Summary */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-3 h-3" />
                      Company Summary
                    </h4>
                    {isSummarizing ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-800 rounded w-4/6"></div>
                      </div>
                    ) : (
                      <p className="text-slate-300 text-[15px] leading-relaxed">
                        {aiInsights?.summary}
                      </p>
                    )}
                  </div>

                  {/* Outreach Angle */}
                  <div className="space-y-4 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <Target className="w-3 h-3" />
                      Outreach Angle
                    </h4>
                    {isSummarizing ? (
                      <div className="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
                    ) : (
                      <p className="text-slate-300 text-sm italic leading-relaxed">
                        "{aiInsights?.outreachAngle}"
                      </p>
                    )}
                  </div>

                  {/* Suggested Subject Lines */}
                  <div className="space-y-5">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      Suggested Subjects
                    </h4>
                    <div className="space-y-3">
                      {isSummarizing ? (
                        [1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-800 rounded-xl animate-pulse"></div>)
                      ) : (
                        aiInsights?.subjectLines.map((line: string, i: number) => (
                          <div key={i} className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 text-sm text-slate-300 hover:border-indigo-500/30 hover:bg-slate-950 transition-all cursor-pointer group flex items-center justify-between shadow-sm">
                            <span className="line-clamp-1 font-medium">{line}</span>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleGenerateEmail(selectedLead)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-5 rounded-[20px] shadow-2xl shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group mt-4"
                  >
                    Generate Cold Email
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-20">
                  <div className="w-20 h-20 bg-slate-800 rounded-[24px] flex items-center justify-center border border-white/5">
                    <Zap className="w-10 h-10 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">No Selection</p>
                    <p className="text-sm text-slate-500 mt-1">Select a lead to unlock AI insights</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </Layout>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default FindLeads;

