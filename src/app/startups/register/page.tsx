'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
    { title: 'Company Basics', emoji: '🏢' },
    { title: 'Product & Stage', emoji: '📦' },
    { title: 'Team & Funding', emoji: '👥' },
    { title: 'Submit', emoji: '🎯' },
];

type FormData = {
    company_name: string;
    website: string;
    category: string;
    location: string;
    founding_year: string;
    tagline: string;
    description: string;
    stage: string;
    mrr: string;
    traction: string;
    founders: string;
    team_size: string;
    raised: string;
    looking_for: string;
    contact_email: string;
};

const INITIAL: FormData = {
    company_name: '', website: '', category: '', location: '',
    founding_year: '', tagline: '', description: '',
    stage: '', mrr: '', traction: '',
    founders: '', team_size: '', raised: '', looking_for: '',
    contact_email: '',
};

const categories = ['AI / ML', 'Fintech', 'Healthtech', 'Edtech', 'Cleantech / Climate', 'Agtech', 'SaaS / B2B', 'E-commerce', 'Logistics', 'Other'];
const stages = ['Idea Stage', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];
const lookingFor = ['Funding', 'Mentorship', 'Corporate Partners', 'Co-founders', 'Customers', 'Market Expansion'];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
            {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
            {children}
        </div>
    );
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
    return (
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-plug-accent transition-colors"
        />
    );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
    return (
        <textarea
            rows={rows}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-plug-accent transition-colors resize-none"
        />
    );
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-plug-accent transition-colors bg-white appearance-none"
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    );
}

function CheckboxGroup({ options, values, onChange }: { options: string[]; values: string[]; onChange: (v: string[]) => void }) {
    const toggle = (o: string) => onChange(values.includes(o) ? values.filter(v => v !== o) : [...values, o]);
    return (
        <div className="flex flex-wrap gap-2">
            {options.map(o => (
                <button
                    key={o}
                    type="button"
                    onClick={() => toggle(o)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all duration-150 ${values.includes(o) ? 'border-plug-accent bg-plug-accent/10 text-nic-blue' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                >
                    {o}
                </button>
            ))}
        </div>
    );
}

export default function StartupRegister() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormData>(INITIAL);
    const [lookingForValues, setLookingForValues] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const set = (key: keyof FormData) => (val: string) => setForm(f => ({ ...f, [key]: val }));
    const progress = ((step + 1) / STEPS.length) * 100;

    const handleSubmit = async () => {
        // TODO: insert to Supabase
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-plug-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle className="w-12 h-12 text-plug-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-nic-blue mb-3">Application Received!</h2>
                    <p className="text-gray-500 mb-8">Our team will review your submission and reach out within 5–7 business days.</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-nic-blue text-white font-bold rounded-2xl hover-lift">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top bar */}
            <div className="bg-nic-blue text-white py-6">
                <div className="max-w-2xl mx-auto px-4 flex items-center gap-4">
                    <Link href="/" className="text-blue-300 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Rocket size={20} className="text-plug-accent" />
                        <span className="font-bold text-lg">Startup Application</span>
                    </div>
                    <div className="ml-auto text-sm text-blue-300">Step {step + 1} of {STEPS.length}</div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="bg-nic-blue pb-0">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="step-line">
                        <div className="step-line-fill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

            {/* Step indicators */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-2xl mx-auto px-4 py-4 flex gap-2">
                    {STEPS.map((s, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs font-semibold transition-colors ${i === step ? 'text-nic-blue' : i < step ? 'text-plug-accent' : 'text-gray-300'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-colors ${i === step ? 'border-nic-blue text-nic-blue' : i < step ? 'border-plug-accent bg-plug-accent text-white' : 'border-gray-200 text-gray-300'}`}>
                                {i < step ? '✓' : i + 1}
                            </span>
                            <span className="hidden sm:block">{s.title}</span>
                            {i < STEPS.length - 1 && <div className="hidden sm:block w-6 h-px bg-gray-200 mx-1" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Form body */}
            <div className="flex-grow max-w-2xl mx-auto px-4 py-10 w-full">
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 animate-slide-up">
                    <div className="mb-8">
                        <div className="text-4xl mb-3">{STEPS[step].emoji}</div>
                        <h2 className="text-2xl font-black text-nic-blue">{STEPS[step].title}</h2>
                    </div>

                    {step === 0 && (
                        <div className="space-y-5">
                            <Field label="Company Name *">
                                <Input value={form.company_name} onChange={set('company_name')} placeholder="e.g. EcoTech Solutions" />
                            </Field>
                            <Field label="Website" hint="Include https://">
                                <Input value={form.website} onChange={set('website')} placeholder="https://yourcompany.com" type="url" />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Industry">
                                    <Select value={form.category} onChange={set('category')} options={categories} placeholder="Select industry" />
                                </Field>
                                <Field label="Founding Year">
                                    <Input value={form.founding_year} onChange={set('founding_year')} placeholder="2021" />
                                </Field>
                            </div>
                            <Field label="Location">
                                <Input value={form.location} onChange={set('location')} placeholder="Hanoi, Vietnam" />
                            </Field>
                            <Field label="One-line Tagline" hint="Max 100 characters — make it sharp">
                                <Input value={form.tagline} onChange={set('tagline')} placeholder="AI-powered crop monitoring for smallholder farmers" />
                            </Field>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-5">
                            <Field label="What does your product do?" hint="Tell us about the problem you solve and your solution">
                                <Textarea value={form.description} onChange={set('description')} rows={4} placeholder="We help farmers detect crop disease 3x earlier using computer vision on a $20 IoT device..." />
                            </Field>
                            <Field label="Current Stage">
                                <Select value={form.stage} onChange={set('stage')} options={stages} placeholder="Select stage" />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Monthly Revenue (MRR)" hint="Leave blank if pre-revenue">
                                    <Input value={form.mrr} onChange={set('mrr')} placeholder="$0 / pre-revenue" />
                                </Field>
                                <Field label="Key Traction Metrics">
                                    <Input value={form.traction} onChange={set('traction')} placeholder="e.g. 2,000 farmers, 12 pilots" />
                                </Field>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <Field label="Founding Team" hint="Names and roles of co-founders">
                                <Textarea value={form.founders} onChange={set('founders')} placeholder="Jane Nguyen – CEO (10y agritech, ex-Grab)\nMike Tran – CTO (PhD Computer Vision, HUST)" />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Full-time Team Size">
                                    <Input value={form.team_size} onChange={set('team_size')} placeholder="8" />
                                </Field>
                                <Field label="Total Raised to Date">
                                    <Input value={form.raised} onChange={set('raised')} placeholder="$250,000" />
                                </Field>
                            </div>
                            <Field label="What are you looking for from NIC?">
                                <CheckboxGroup options={lookingFor} values={lookingForValues} onChange={setLookingForValues} />
                            </Field>
                            <Field label="Contact Email *">
                                <Input value={form.contact_email} onChange={set('contact_email')} placeholder="founder@startup.com" type="email" />
                            </Field>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <p className="text-gray-500 text-sm leading-relaxed">Please review your application before submitting. Our team will evaluate your submission carefully.</p>
                            <div className="space-y-3">
                                {[
                                    ['Company', form.company_name],
                                    ['Industry', form.category],
                                    ['Location', form.location],
                                    ['Stage', form.stage],
                                    ['Team Size', form.team_size],
                                    ['Contact', form.contact_email],
                                ].filter(([, v]) => v).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{k}</span>
                                        <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%]">{v}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">By submitting you agree to our Terms of Service and Privacy Policy.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-2xl text-sm font-bold text-gray-600 disabled:opacity-30 hover:border-gray-400 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                        <button
                            onClick={() => setStep(s => s + 1)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-nic-blue text-white font-bold rounded-2xl text-sm hover-lift transition-colors"
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-plug-accent text-nic-blue font-bold rounded-2xl text-sm hover-lift transition-colors"
                        >
                            Submit Application ✓
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
