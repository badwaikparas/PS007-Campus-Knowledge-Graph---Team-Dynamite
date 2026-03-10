import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap,
    Link as LinkIcon, Code, Globe, BookOpen, FileText,
    Upload, CheckCircle, ChevronRight, ChevronLeft, Sparkles
} from 'lucide-react';

const OnboardingPage = () => {
    const { user, completeOnboarding } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        age: '',
        address: '',
        secondaryEmail: '',
        role: 'student', // student or faculty
        profileLinks: ['', ''],
        skills: '',
        domains: '',
        projects: [{ title: '', description: '' }],
        publications: '',
        documents: null
    });

    const totalSteps = 4;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...formData.projects];
        newProjects[index][field] = value;
        setFormData(prev => ({ ...prev, projects: newProjects }));
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, { title: '', description: '' }]
        }));
    };

    const handleProfileLinkChange = (index, value) => {
        const newLinks = [...formData.profileLinks];
        newLinks[index] = value;
        setFormData(prev => ({ ...prev, profileLinks: newLinks }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        completeOnboarding(formData);
        navigate('/');
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-slate-50 flex py-12 px-6">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col md:flex-row">

                {/* Sidebar Index */}
                <div className="w-full md:w-80 bg-slate-900 p-12 text-white flex flex-col justify-between">
                    <div className="space-y-8">
                        <div>
                            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">Complete Your Profile</h2>
                            <p className="text-slate-400 text-sm mt-2">Personalize your experience in the knowledge engine.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { n: 1, label: 'Personal Info', icon: <User size={18} /> },
                                { n: 2, label: 'Role & Links', icon: <Briefcase size={18} /> },
                                { n: 3, label: 'Expertise', icon: <Code size={18} /> },
                                { n: 4, label: 'Projects & Docs', icon: <FileText size={18} /> },
                            ].map((s) => (
                                <div key={s.n} className={`flex items-center gap-4 transition-all ${step >= s.n ? 'text-white' : 'text-slate-600'}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${step === s.n ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20' : step > s.n ? 'bg-green-500 border-green-500' : 'border-slate-800'}`}>
                                        {step > s.n ? <CheckCircle size={18} /> : s.icon}
                                    </div>
                                    <span className={`text-sm font-bold uppercase tracking-widest ${step === s.n ? 'opacity-100' : 'opacity-60'}`}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-800">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Institutional Verification</p>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 p-12 overflow-y-auto max-h-[90vh]">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                                <h3 className="text-2xl font-bold text-slate-900">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Age</label>
                                        <input type="number" name="age" required value={formData.age} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Residential Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                                            <textarea name="address" required value={formData.address} onChange={handleInputChange} rows="3" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium resize-none"></textarea>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secondary Email (Optional)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input type="email" name="secondaryEmail" value={formData.secondaryEmail} onChange={handleInputChange} placeholder="For backup notifications" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                                <h3 className="text-2xl font-bold text-slate-900">Institutional Role</h3>
                                <div className="flex gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                                    <button type="button" onClick={() => setFormData(f => ({ ...f, role: 'student' }))} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${formData.role === 'student' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>
                                        <GraduationCap size={20} />
                                        <span>Student</span>
                                    </button>
                                    <button type="button" onClick={() => setFormData(f => ({ ...f, role: 'faculty' }))} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${formData.role === 'faculty' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>
                                        <Briefcase size={20} />
                                        <span>Faculty</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Links (LinkedIn, GitHub, Portfolio)</label>
                                    {formData.profileLinks.map((link, idx) => (
                                        <div key={idx} className="relative">
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input type="url" required value={link} onChange={(e) => handleProfileLinkChange(idx, e.target.value)} placeholder={`https://link-${idx + 1}.com`} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                                <h3 className="text-2xl font-bold text-slate-900">Expertise & Domains</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Skills</label>
                                        <input type="text" name="skills" required value={formData.skills} onChange={handleInputChange} placeholder="e.g. React, Python, ML, UI Design" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Research Domains</label>
                                        <input type="text" name="domains" required value={formData.domains} onChange={handleInputChange} placeholder="e.g. Quantum Computing, Bio-informatics" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Publications Overview</label>
                                        <textarea name="publications" required value={formData.publications} onChange={handleInputChange} placeholder="Describe your recent publications or research interests..." rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                                <h3 className="text-2xl font-bold text-slate-900">Projects & Documents</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Major Projects</label>
                                        <button type="button" onClick={addProject} className="text-blue-600 text-xs font-bold hover:underline">+ Add Another</button>
                                    </div>

                                    {formData.projects.map((proj, idx) => (
                                        <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                                            <input type="text" required placeholder="Project Title" value={proj.title} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-600 transition-all font-bold" />
                                            <textarea required placeholder="Project Description" value={proj.description} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} rows="2" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-600 transition-all text-sm font-medium resize-none"></textarea>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Supporting Documents (PDF / PNG)</label>
                                    <div className="border-4 border-dashed border-slate-100 rounded-3xl p-12 text-center group hover:border-blue-100 transition-all cursor-pointer bg-slate-50/50">
                                        <div className="bg-white w-16 h-16 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:text-blue-600 transition-all">
                                            <Upload size={24} />
                                        </div>
                                        <p className="font-bold text-slate-900">Drop files here or click to browse</p>
                                        <p className="text-xs text-slate-400 font-medium mt-1">Upload ID card, degree certificates, or portfolio PDFs</p>
                                        <input type="file" className="hidden" multiple accept=".pdf,.png" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                    <ChevronLeft size={18} />
                                    <span>Back</span>
                                </button>
                            ) : <div></div>}

                            {step < totalSteps ? (
                                <button type="button" onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                                    <span>Continue</span>
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                                    <CheckCircle size={18} />
                                    <span>Complete Enrollment</span>
                                </button>
                            )}
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default OnboardingPage;
