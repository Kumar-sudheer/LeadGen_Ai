import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadService } from '../services/lead.service';
import { Lead } from '../types';
import { Mail, ExternalLink, MoreVertical, Search, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import Layout from '../components/Layout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const saved = await leadService.getSavedLeads();
      setLeads(saved);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: Lead['status']) => {
    try {
      await leadService.updateLeadStatus(id, status);
      await fetchLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Contacted': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Replied': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Sales Pipeline</h2>
            <p className="text-slate-400">Track and manage your B2B outreach progress</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search companies..." 
                className="bg-[#0f172a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-white/10 rounded-lg bg-[#0f172a] hover:bg-white/5 transition-colors text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Leads', value: leads.length, color: 'text-purple-400' },
            { label: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length, color: 'text-yellow-500' },
            { label: 'Replied', value: leads.filter(l => l.status === 'Replied').length, color: 'text-green-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 shadow-lg">
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
              <p className={clsx("text-3xl font-bold", stat.color)}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1e293b] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Company</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Industry</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Email Status</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8 h-20 bg-white/5 my-1 rounded"></td>
                    </tr>
                  ))
                ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-white">{lead.companyName}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        {lead.website?.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300">
                        {lead.industry}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {lead.emailGenerated ? (
                        <span className="text-xs font-medium text-purple-400 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                          Generated
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-500">Not Generated</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                        className={clsx(
                          "text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer focus:outline-none bg-transparent",
                          getStatusColor(lead.status)
                        )}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Replied">Replied</option>
                      </select>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/email-generator?companyName=${lead.companyName}&industry=${lead.industry}&targetRole=${lead.targetRole || ''}`)}
                          className="p-2 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 rounded-lg transition-colors"
                          title="Re-generate Email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/5 text-slate-400 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-slate-500 mb-4">No leads found in your pipeline yet.</div>
                      <button 
                        onClick={() => navigate('/find-leads')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-purple-500/20"
                      >
                        Start Finding Leads
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
