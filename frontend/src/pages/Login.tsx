import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, ArrowRight, Github } from 'lucide-react';
import { authService } from '../services/auth.service';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await authService.login({ email, password });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.googleLogin();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex overflow-hidden">
      {/* Left side visual panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#020617] overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-transparent z-0"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] z-0"></div>
        
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New: AI Outreach v2.0 is live
          </div>
          
          <h1 className="text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            AI-powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">B2B Lead Generation</span> & Sales Automation
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Find high-quality leads in seconds and generate personalized outreach that actually gets replies. Built for modern sales teams.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-12">
            {[
              { title: "Lead Discovery", desc: "Access 200M+ prospects" },
              { title: "AI SDR", desc: "Automated personalization" },
              { title: "Sales Insights", desc: "Deep company analysis" },
              { title: "Integrations", desc: "Sync with your CRM" }
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex gap-4 items-center mb-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800"></div>
                ))}
              </div>
              <p className="text-sm text-slate-400"><span className="text-white font-bold">500+</span> teams joined this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side authentication card */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 bg-[#020617] lg:bg-transparent">
        <div className="w-full max-w-[440px]">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-6 p-4">
              <img src="/logos/small-Screenshot_2026-03-11_230821.png" alt="LeadGen AI" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Enter your details to access your dashboard</p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-[32px] p-8 lg:p-10 shadow-2xl border border-white/5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 text-sm flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder:text-slate-600 shadow-inner"
                    placeholder="alex@company.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-300">Password</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder:text-slate-600 shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 bg-slate-950 border border-white/10 rounded group-hover:border-indigo-500/50 transition-colors peer-checked:bg-indigo-600 peer-checked:border-indigo-600"></div>
                    <CheckCircle2 className="absolute inset-0 w-5 h-5 text-white scale-0 peer-checked:scale-75 transition-transform" />
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                </label>
                
                <Link to="/forgot-password" title="Forgot password link" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In to Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#0f172a] px-3 text-slate-500 font-bold">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                className="bg-slate-950/50 hover:bg-slate-900 border border-white/10 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-sm font-medium group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button
                className="bg-slate-950/50 hover:bg-slate-900 border border-white/10 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-sm font-medium group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                GitHub
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
              Get Started for Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

