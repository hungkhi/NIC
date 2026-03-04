'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Building2 } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
    { title: 'Organization Overview', emoji: '🏛️' },
    { title: 'Investment Focus', emoji: '🎯' },
    { title: 'Partnership Preferences', emoji: '🤝' },
    { title: 'Submit', emoji: '🚀' },
];

type FormData = {
    org_name: string;
    website: string;
    org_type: string;
    location: string;
    founded_year: string;
    description: string;
    focus_areas: string;
    investment_stages: string;
    check_size: string;
    geography: string;
    portfolio_notable: string;
    looking_for: string;
    partnership_model: string;
    contact_name: string;
    contact_email: string;
    contact_role: string;
};

const INITIAL: FormData = {
    org_name: '', website: '', org_type: '', location: '',
    founded_year: '', description: '',
    focus_areas: '', investment_stages: '', check_size: '', geography: '',
    portfolio_notable: '', looking_for: '', partnership_model: '',
    contact_name: '', contact_email: '', contact_role: '',
};

const orgTypes = ['Venture Capital', 'Corporate VC', 'Angel Syndicate', 'Family Office', 'Accelerator', 'Corporate Partner', 'Government / Policy', 'Other'];
const focusAreaOptions = ['AI / ML', 'Fintech', 'Healthtech', 'Edtech', 'Cleantech', 'Agtech', 'SaaS', 'DeepTech', 'Web3 / Blockchain', 'Consumer Tech', 'Industrial', 'Other'];
const stageOptions = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth / Late Stage', 'All Stages'];
const geoOptions = ['Vietnam', 'Southeast Asia', 'APAC', 'Global'];
const partnershipOptions = ['Deal Flow Access', 'Co-investment', 'Corporate Pilot Programs', 'Mentorship / Advisory', 'Market Entry Support', 'Talent Pipeline'];

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
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-plug-accent transition-colors" />
    );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
    return (
        <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-plug-accent transition-colors resize-none" />
    );
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
    return (
        <select value={value} onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-plug-accent transition-colors bg-white appearance-none">
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
                <button key={o} type="button" onClick={() => toggle(o)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all duration-150 ${values.includes(o) ? 'border-plug-accent bg-plug-accent/10 text-nic-blue' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                    {o}
                </button>
            ))}
        </div>
    );
}

export default function VentureRegister() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormData>(INITIAL);
    const [focusValues, setFocusValues] = useState<string[]>([]);
    const [stageValues, setStageValues] = useState<string[]>([]);
    const [partnerValues, setPartnerValues] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const set = (key: keyof FormData) => (val: string) => setForm(f => ({ ...f, [key]: val }));
    const progress = ((step + 1) / STEPS.length) * 100;

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-plug-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle className="w-12 h-12 text-plug-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-nic-blue mb-3">Application Received!</h2>
                    <p className="text-gray-500 mb-8">Our partnerships team will review your profile and be in touch within 3–5 business days.</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-nic-blue text-white font-bold rounded-2xl hover-lift">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-nic-blue text-white py-6">
                <div className="max-w-2xl mx-auto px-4 flex items-center gap-4">
                    <Link href="/" className="text-blue-300 hover:text-white transition-colors"><ArrowLeft size={20} /></Link>
                    <div className="flex items-center gap-3">
                        <Building2 size={20} className="text-plug-accent" />
                        <span className="font-bold text-lg">Venture / Partner Application</span>
                    </div>
                    <div className="ml-auto text-sm text-blue-300">Step {step + 1} of {STEPS.length}</div>
                </div>
            </div>

            <div className="bg-nic-blue pb-0">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="step-line">
                        <div className="step-line-fill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

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

            <div className="flex-grow max-w-2xl mx-auto px-4 py-10 w-full">
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 animate-slide-up">
                    <div className="mb-8">
                        <div className="text-4xl mb-3">{STEPS[step].emoji}</div>
                        <h2 className="text-2xl font-black text-nic-blue">{STEPS[step].title}</h2>
                    </div>

                    {step === 0 && (
                        <div className="space-y-5">
                            <Field label="Organization Name *">
                                <Input value={form.org_name} onChange={set('org_name')} placeholder="e.g. Alpha Capital" />
                            </Field>
                            <Field label="Website">
                                <Input value={form.website} onChange={set('website')} placeholder="https://alphacapital.vc" type="url" />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Organization Type">
                                    <Select value={form.org_type} onChange={set('org_type')} options={orgTypes} placeholder="Select type" />
                                </Field>
                                <Field label="Year Established">
                                    <Input value={form.founded_year} onChange={set('founded_year')} placeholder="2018" />
                                </Field>
                            </div>
                            <Field label="Headquarters">
                                <Input value={form.location} onChange={set('location')} placeholder="Singapore / APAC" />
                            </Field>
                            <Field label="About Your Organization" hint="Mission, thesis, or why you're joining NIC Ventures">
                                <Textarea value={form.description} onChange={set('description')} rows={4} placeholder="Alpha Capital is a $150M early-stage fund focused on deep tech founders across Vietnam & SEA..." />
                            </Field>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-5">
                            <Field label="Investment / Focus Areas">
                                <CheckboxGroup options={focusAreaOptions} values={focusValues} onChange={setFocusValues} />
                            </Field>
                            <Field label="Target Investment Stages">
                                <CheckboxGroup options={stageOptions} values={stageValues} onChange={setStageValues} />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Typical Check Size">
                                    <Input value={form.check_size} onChange={set('check_size')} placeholder="$100K – $500K" />
                                </Field>
                                <Field label="Primary Geography">
                                    <Select value={form.geography} onChange={set('geography')} options={geoOptions} placeholder="Select region" />
                                </Field>
                            </div>
                            <Field label="Notable Portfolio Companies" hint="Optional — 3–5 names is fine">
                                <Input value={form.portfolio_notable} onChange={set('portfolio_notable')} placeholder="e.g. FinFlow, MedAI, EduVerse" />
                            </Field>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <Field label="What are you looking for from NIC?" hint="Select all that apply">
                                <CheckboxGroup options={partnershipOptions} values={partnerValues} onChange={setPartnerValues} />
                            </Field>
                            <Field label="Preferred Partnership Model" hint="How would you like to work with founding teams?">
                                <Textarea value={form.partnership_model} onChange={set('partnership_model')} rows={3} placeholder="We prefer co-investing alongside founders at seed stage and offering 3 months of hands-on mentorship..." />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Your Name *">
                                    <Input value={form.contact_name} onChange={set('contact_name')} placeholder="Sarah Chen" />
                                </Field>
                                <Field label="Your Role">
                                    <Input value={form.contact_role} onChange={set('contact_role')} placeholder="Partner / Investment Director" />
                                </Field>
                            </div>
                            <Field label="Contact Email *">
                                <Input value={form.contact_email} onChange={set('contact_email')} placeholder="sarah@alphacapital.vc" type="email" />
                            </Field>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <p className="text-gray-500 text-sm leading-relaxed">Review your information before submitting. Our partnerships team will be in touch shortly.</p>
                            <div className="space-y-3">
                                {[
                                    ['Organization', form.org_name],
                                    ['Type', form.org_type],
                                    ['Location', form.location],
                                    ['Check Size', form.check_size],
                                    ['Contact', form.contact_name],
                                    ['Email', form.contact_email],
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
                    <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-2xl text-sm font-bold text-gray-600 disabled:opacity-30 hover:border-gray-400 transition-colors">
                        <ArrowLeft size={16} /> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                        <button onClick={() => setStep(s => s + 1)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-nic-blue text-white font-bold rounded-2xl text-sm hover-lift transition-colors">
                            Continue <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button onClick={() => setSubmitted(true)}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-plug-accent text-nic-blue font-bold rounded-2xl text-sm hover-lift transition-colors">
                            Submit Application ✓
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
