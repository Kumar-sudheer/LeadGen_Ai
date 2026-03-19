import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, Users } from 'lucide-react';
import Layout from '../components/Layout';

const Home = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    companySize: '',
    targetRole: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(filters).toString();
    navigate(`/results?${query}`);
  };

  return (
    <Layout title="Search Leads">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Find Your Next <span className="gradient-text">Big Client</span> with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered lead discovery and personalized outreach. Search thousands of B2B companies and generate high-converting cold emails in seconds.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-white">
                <Building2 className="w-4 h-4 text-purple-400" /> Industry
              </label>
              <input
                type="text"
                placeholder="e.g. Fintech, SaaS, Healthcare"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-purple-400" /> Location
              </label>
              <input
                type="text"
                placeholder="e.g. San Francisco, New York"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-white">
                <Users className="w-4 h-4 text-purple-400" /> Company Size
              </label>
              <select
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none text-white"
                value={filters.companySize}
                onChange={(e) => setFilters({ ...filters, companySize: e.target.value })}
                required
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-white">
                <Search className="w-4 h-4 text-purple-400" /> Target Role
              </label>
              <input
                type="text"
                placeholder="e.g. CEO, Marketing Head, CTO"
                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white"
                value={filters.targetRole}
                onChange={(e) => setFilters({ ...filters, targetRole: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 text-lg active:scale-95"
              >
                <Search className="w-5 h-5" /> Find Leads
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'AI Discovery', desc: 'Find 5+ high-quality leads based on your specific criteria.' },
            { title: 'Smart Summaries', desc: 'Get AI-generated summaries for every company you find.' },
            { title: 'Outreach AI', desc: 'Generate personalized cold emails that actually convert.' }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
