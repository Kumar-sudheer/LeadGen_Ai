import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { emailService } from '../services/email.service';
import { GeneratedEmail } from '../types';
import { Loader2, Copy, RefreshCcw, Check, ArrowLeft, Mail, MessageSquare, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';

const EmailGenerator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [generated, setGenerated] = useState<GeneratedEmail | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const companyName = searchParams.get('companyName') || '';
  const industry = searchParams.get('industry') || '';
  const targetRole = searchParams.get('targetRole') || '';

  const generate = async () => {
    setLoading(true);
    try {
      const result = await emailService.generateEmail(companyName, industry, targetRole);
      setGenerated(result);
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyName) {
      generate();
    }
  }, [companyName]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <Layout title="Generating...">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />
            <Mail className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">Personalizing Outreach...</p>
            <p className="text-slate-400">AI is crafting a unique message for {companyName}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Email Generator">
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-white/5 transition-colors border border-white/10 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-white">AI Email Generator</h2>
            <p className="text-slate-400">Targeting {targetRole} at {companyName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Options */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 shadow-xl space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Suggested Subject Lines
              </h3>
              <div className="space-y-3">
                {generated?.subjectLines.map((subject, i) => (
                  <div key={i} className="group relative">
                    <div className="p-3 bg-[#0f172a] rounded-lg text-sm border border-white/5 text-slate-300 group-hover:border-purple-500/50 transition-colors pr-10 leading-relaxed">
                      {subject}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(subject, `subject-${i}`)}
                      className="absolute right-2 top-2 p-1.5 rounded-md hover:bg-purple-500/20 text-slate-500 hover:text-purple-400 transition-all opacity-0 group-hover:opacity-100"
                    >
                      {copiedField === `subject-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3 text-blue-400" />
                  Short Message
                </h3>
                <button 
                  onClick={() => copyToClipboard(generated?.shortMessage || '', 'short')}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copiedField === 'short' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 bg-[#0f172a] rounded-lg text-sm border border-white/5 italic text-slate-400 leading-relaxed">
                "{generated?.shortMessage}"
              </div>
              <p className="text-[10px] text-slate-600 text-center uppercase tracking-tighter">Perfect for LinkedIn connections or Twitter DMs</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-white">Personalized Cold Email</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={generate}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white flex items-center gap-2 text-sm border border-white/5"
                  >
                    <RefreshCcw className="w-4 h-4" /> Regenerate
                  </button>
                  <button 
                    onClick={() => copyToClipboard(generated?.emailBody || '', 'email')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    Copy Email
                  </button>
                </div>
              </div>

              <div className="bg-[#0f172a] p-6 rounded-xl border border-white/5 min-h-[350px] whitespace-pre-wrap leading-relaxed text-slate-300 font-mono text-sm">
                {generated?.emailBody}
              </div>
              
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span>Approx. {generated?.emailBody.split(' ').length} words</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Personalized for {companyName}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400 font-bold">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailGenerator;
