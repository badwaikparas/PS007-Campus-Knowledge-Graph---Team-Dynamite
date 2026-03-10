import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Sparkles, ShieldCheck, Globe, Zap } from 'lucide-react';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSuccess = (credentialResponse) => {
        login(credentialResponse);
        navigate(from, { replace: true });
    };

    const handleError = () => {
        console.log('Login Failed');
        alert('Login failed. Please try again.');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center space-y-4">
                    <div className="bg-blue-600 w-20 h-20 rounded-[2rem] p-5 text-white mx-auto shadow-2xl shadow-blue-500/30 mb-6 flex items-center justify-center animate-in zoom-in duration-700">
                        <Cpu size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">IK E<span className="text-blue-600">NGINE</span></h1>
                    <p className="text-slate-500 font-medium">Institutional Knowledge Intelligence Hub</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-8">
                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                        <p className="text-slate-400 text-sm font-medium">Please sign in to access the institution's knowledge network.</p>
                    </div>

                    <div className="flex justify-center py-4">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                            useOneTap
                            theme="outline"
                            size="large"
                            shape="pill"
                            width="100%"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-green-500" />
                            <span>Secure OAuth 2.0</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest justify-end">
                            <Globe size={14} className="text-blue-500" />
                            <span>Academic Network</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 flex flex-col items-center text-center space-y-1">
                        <Sparkles size={18} className="text-blue-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">AI Search</span>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 flex flex-col items-center text-center space-y-1">
                        <Zap size={18} className="text-indigo-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Insights</span>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 flex flex-col items-center text-center space-y-1">
                        <Globe size={18} className="text-purple-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Graph</span>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400 font-medium pt-8">
                    By signing in, you agree to the Institutional Data Policy and Researcher Code of Conduct.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
