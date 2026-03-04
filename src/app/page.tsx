'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import AuthModal from '@/components/AuthModal';

const stats = [
    { value: 500, suffix: '+', label: 'Active Startups' },
    { value: 120, suffix: '+', label: 'Global Ventures' },
    { value: 2, prefix: '$', suffix: 'B+', label: 'Total Investment' },
    { value: 35, suffix: '+', label: 'Countries' },
];

const services = [
    {
        num: '01', title: 'Branding & Identity', desc: `We build strategic brands that communicate your startup's vision and resonate with your audience.`
    },
    { num: '02', title: 'Venture Matching', desc: 'Our data-driven algorithm connects you with the right corporate partners, investors, and co-founders.' },
    {
        num: '03', title: 'Acceleration Programs', desc: `Tailored 12-week cohorts with mentors who've built unicorns — designed to compress years into months.`
    },
    { num: '04', title: 'Market Expansion', desc: `Navigate Southeast Asia's most complex markets with our on-the-ground expertise and network.` },
];

const projects = [
    {
        tag: 'Fintech · Seed', name: 'FinFlow', desc: `Real-time payments infrastructure for Vietnam's gig economy`, color: '#1a1a2e'
    },
    { tag: 'Healthtech · Series A', name: 'MedAI', desc: 'Computer vision diagnostics deployed in 40+ hospitals nationwide', color: '#2d1b1b' },
    { tag: 'Agtech · Pre-seed', name: 'AgriSmart', desc: 'IoT crop monitoring helping 12,000 smallholder farmers across the Mekong', color: '#1b2d1b' },
    { tag: 'Edtech · Seed', name: 'EduVerse', desc: 'Adaptive learning platform with 200,000 daily active learners', color: '#1a1a1a' },
];

const testimonials = [
    { quote: '"NIC Ventures truly grasped our vision — surpassing our own understanding. They partner deeply and move fast."', name: 'An Nguyen', role: 'Founder, FinFlow' },
    { quote: '"Working with the NIC network was a game-changer. Introductions that took us 18 months happened in 3 weeks."', name: 'Sophie Tran', role: 'CEO, MedAI' },
    { quote: '"They understood what we needed before we even articulated it. The acceleration program is world-class."', name: 'Minh Le', role: 'Co-founder, AgriSmart' },
];

const partners = ['Google for Startups', 'Samsung Next', 'Temasek', 'Vingroup', 'FPT', 'VNPT', 'MoMo', 'Lazada', 'Sea Group', 'Grab'];

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                let cur = 0;
                const steps = 50;
                const interval = setInterval(() => {
                    cur += target / steps;
                    if (cur >= target) { setCount(target); clearInterval(interval); }
                    else setCount(Math.floor(cur));
                }, 1400 / steps);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Home() {
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
    const openAuth = (m: 'signin' | 'signup') => { setAuthMode(m); setAuthOpen(true); };

    return (
        <div style={{ backgroundColor: '#f2f1ed' }}>

            {/* ─── HERO ─── */}
            <section style={{ paddingTop: '120px', paddingBottom: '0' }}>
                <div className="klyro-container">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 pb-16" style={{ borderBottom: '1px solid #deddd8' }}>
                        {/* Left: big heading */}
                        <div className="flex-1">
                            <div className="klyro-tag mb-8 k-fade-up" style={{ display: 'inline-flex' }}>
                                <span className="w-2 h-2 rounded-full bg-current" />
                                2026 Cohort — Applications Open
                            </div>
                            <h1 className="klyro-h1 k-fade-up delay-1" style={{ color: '#161616' }}>
                                We Drive<br />Innovation<br />Forward<span style={{ color: '#710014' }}>.</span>
                            </h1>
                        </div>

                        {/* Right: description + buttons */}
                        <div className="lg:max-w-sm k-fade-up delay-2">
                            <p className="klyro-body mb-8" style={{ color: '#333' }}>
                                Vietnam's official startup–venture ecosystem — built by NIC to connect the next generation of founders with capital, mentorship, and market access.
                            </p>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                                <div className="flex" style={{ marginRight: '8px' }}>
                                    {['🟠', '🟢', '🔵', '🟣', '🔴'].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2" style={{ borderColor: '#f2f1ed', background: ['#ffb347', '#50c878', '#6495ed', '#a78bfa', '#f87171'][i], marginLeft: i > 0 ? '-8px' : 0 }} />
                                    ))}
                                </div>
                                <span className="klyro-sm font-semibold" style={{ color: '#161616' }}>10k+</span>
                                <span className="klyro-sm" style={{ color: '#888' }}>innovators in the network</span>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => openAuth('signup')} className="btn-primary">
                                    Get started <span className="btn-dot" style={{ background: '#fff' }} />
                                </button>
                                <Link href="/startups" className="btn-dark">
                                    Explore <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div className="k-fade-in delay-3" style={{ marginTop: '-1px' }}>
                        <div
                            className="w-full rounded-none overflow-hidden"
                            style={{
                                height: 'clamp(320px, 45vw, 560px)',
                                background: 'linear-gradient(135deg, #0f1c3f 0%, #1a3a6e 50%, #0a1628 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Dot grid overlay */}
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                            {/* Floating startup cards */}
                            {[
                                { emoji: '🚀', name: 'EcoTech', sub: 'Cleantech · Hanoi', pos: { top: '15%', left: '8%' } },
                                { emoji: '💊', name: 'MedAI', sub: 'Healthtech · HCMC', pos: { top: '20%', right: '10%' } },
                                { emoji: '💳', name: 'FinFlow', sub: 'Fintech · Da Nang', pos: { bottom: '25%', left: '12%' } },
                                { emoji: '🌾', name: 'AgriSmart', sub: 'Agtech · Cần Thơ', pos: { bottom: '20%', right: '8%' } },
                            ].map((card, i) => (
                                <div key={i} style={{
                                    position: 'absolute', ...card.pos,
                                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '16px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    <span style={{ fontSize: '22px' }}>{card.emoji}</span>
                                    <div>
                                        <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, fontFamily: '"Cabinet Grotesk"' }}>{card.name}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{card.sub}</div>
                                    </div>
                                </div>
                            ))}

                            {/* Center hub */}
                            <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                                <img src="/nic_logo.png" alt="NIC" style={{ width: '140px', objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.9)' }} />
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px', fontFamily: '"Geist"' }}>National Innovation Center</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PARTNER MARQUEE ─── */}
            <section style={{ borderBottom: '1px solid #deddd8', padding: '20px 0', overflow: 'hidden' }}>
                <div style={{ display: 'flex', width: 'max-content' }}>
                    {[...partners, ...partners].map((p, i) => (
                        <span key={i} style={{ color: '#888', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 48px', whiteSpace: 'nowrap', animation: 'marqueeScroll 32s linear infinite' }}>{p}</span>
                    ))}
                </div>
            </section>

            {/* ─── DESIGN EXPERTISE / STATS ─── */}
            <section className="section-md" style={{ borderBottom: '1px solid #deddd8' }}>
                <div className="klyro-container">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-16">
                        <div className="lg:w-1/2">
                            <p className="klyro-label mb-4" style={{ color: '#888' }}>What We Do</p>
                            <h2 className="klyro-h2 mb-6 k-fade-up" style={{ color: '#161616' }}>We help startups<br />grow with strategy,<br />capital &amp; network.</h2>
                        </div>
                        <div className="lg:w-1/2">
                            <p className="klyro-body mb-10" style={{ color: '#555' }}>
                                NIC Go Ventures is Vietnam's most comprehensive startup–venture platform. From first funding to global markets, we're the backbone of the nation's most ambitious founders.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                {stats.map((s, i) => (
                                    <div key={i}>
                                        <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, lineHeight: 1, fontFamily: '"Cabinet Grotesk"', color: '#161616' }}>
                                            <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} />
                                        </div>
                                        <div className="klyro-sm mt-1" style={{ color: '#888' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SERVICES LIST ─── */}
            <section className="section-md" style={{ borderBottom: '1px solid #deddd8' }}>
                <div className="klyro-container">
                    <p className="klyro-label mb-16" style={{ color: '#888' }}>Our Services</p>
                    <div className="space-y-0">
                        {services.map((s, i) => (
                            <div key={i} className="group cursor-default" style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', padding: '32px 0', borderTop: '1px solid #deddd8', transition: 'padding 0.25s ease' }}>
                                <span className="klyro-step-num" style={{ fontSize: '18px', fontWeight: 600, color: '#deddd8', fontFamily: '"Cabinet Grotesk"', minWidth: '36px', paddingTop: '4px' }}>{s.num}</span>
                                <div className="flex-1">
                                    <h3 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 500, fontFamily: '"Cabinet Grotesk"', color: '#161616', lineHeight: 1.1, marginBottom: '10px', transition: 'transform 0.25s ease' }}
                                        className="group-hover:-translate-x-2">
                                        {s.title}
                                    </h3>
                                    <p className="klyro-body max-w-lg" style={{ color: '#555' }}>{s.desc}</p>
                                </div>
                                <div style={{ paddingTop: '6px', opacity: 0, transform: 'translateX(-10px)', transition: 'all 0.25s ease' }} className="group-hover:opacity-100 group-hover:translate-x-0">
                                    <ArrowRight size={24} color="#161616" />
                                </div>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px solid #deddd8' }} />
                    </div>
                </div>
            </section>

            {/* ─── PROJECTS ─── */}
            <section className="section-md" style={{ borderBottom: '1px solid #deddd8' }}>
                <div className="klyro-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
                        <div>
                            <p className="klyro-label mb-3" style={{ color: '#888' }}>Portfolio Highlights</p>
                            <h2 className="klyro-h2 k-fade-up" style={{ color: '#161616' }}>Startups we<br />believe in.</h2>
                        </div>
                        <Link href="/startups" className="btn-outline hidden md:inline-flex">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((p, i) => (
                            <div key={i} className="klyro-card-dark group cursor-pointer" style={{ padding: '48px', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: p.color }}>
                                <div>
                                    <span className="klyro-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px', display: 'block' }}>{p.tag}</span>
                                    <h3 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#fff', lineHeight: 1.1, marginBottom: '12px' }}>{p.name}</h3>
                                    <p className="klyro-body" style={{ color: 'rgba(255,255,255,0.55)' }}>{p.desc}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
                                    <span className="klyro-tag" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>View case →</span>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s' }}
                                        className="group-hover:rotate-45">
                                        <ArrowRight size={20} color="rgba(255,255,255,0.6)" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHY CHOOSE / TESTIMONIALS ─── */}
            <section className="section-md" style={{ borderBottom: '1px solid #deddd8' }}>
                <div className="klyro-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '60px', flexWrap: 'wrap' }}>
                        <div style={{ maxWidth: '400px' }}>
                            <p className="klyro-label mb-3" style={{ color: '#888' }}>Why Choose NIC</p>
                            <h2 className="klyro-h2 k-fade-up" style={{ color: '#161616' }}>We sift through<br />the clutter.</h2>
                            <p className="klyro-body mt-6" style={{ color: '#555' }}>
                                Our streamlined process ensures efficiency. We design adaptive systems that evolve alongside your business for lasting success.
                            </p>
                            <ul style={{ marginTop: '32px', gap: '12px', display: 'flex', flexDirection: 'column' }}>
                                {['Pre-vetted deal flow from 500+ startups', 'Dedicated matchmaking & intro calls', 'Ongoing support post-investment'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#710014', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>
                                        </div>
                                        <span className="klyro-body" style={{ color: '#333' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {testimonials.map((t, i) => (
                                <div key={i} className="klyro-card" style={{ padding: '32px', border: '1px solid #deddd8', background: '#fff' }}>
                                    <p className="klyro-body mb-6" style={{ color: '#333', fontStyle: 'italic', lineHeight: 1.5 }}>{t.quote}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `hsl(${i * 80},50%,65%)` }} />
                                        <div>
                                            <div className="klyro-sm" style={{ fontWeight: 600, color: '#161616' }}>{t.name}</div>
                                            <div className="klyro-sm" style={{ color: '#888' }}>{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="section-md" style={{ backgroundColor: '#161616', borderBottom: '1px solid #222' }}>
                <div className="klyro-container">
                    <p className="klyro-label mb-4" style={{ color: '#555' }}>How It Works</p>
                    <h2 className="klyro-h2 mb-16 k-fade-up" style={{ color: '#f2f1ed' }}>Whether you`re starting<br />out or scaling up.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'Apply', desc: 'Fill out a short application about your team, product, and goals. Takes under 10 minutes.' },
                            { step: '2', title: 'Match', desc: 'Our team reviews your profile and makes curated introductions to the right partners.' },
                            { step: '3', title: 'Accelerate', desc: 'Join the cohort, meet your mentors, and start building. Ongoing support included.' },
                        ].map((s, i) => (
                            <div key={i} style={{ padding: '40px', border: '1px solid #2a2a2a', borderRadius: '24px' }}>
                                <div style={{ fontSize: '72px', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#2a2a2a', lineHeight: 1, marginBottom: '32px' }}>{s.step}</div>
                                <h3 style={{ fontSize: '28px', fontWeight: 600, fontFamily: '"Cabinet Grotesk"', color: '#f2f1ed', marginBottom: '12px' }}>{s.title}</h3>
                                <p className="klyro-body" style={{ color: '#666' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="section-md">
                <div className="klyro-container text-center">
                    <p className="klyro-label mb-4" style={{ color: '#888' }}>Ready to Join?</p>
                    <h2 className="klyro-h2 mb-8 k-fade-up" style={{ color: '#161616' }}>Recruit unique talent.<br />Build the future.</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <button onClick={() => openAuth('signup')} className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                            Get started <span className="btn-dot" style={{ background: '#fff' }} />
                        </button>
                        <Link href="/startups" className="btn-outline" style={{ fontSize: '16px', padding: '14px 32px' }}>
                            See startups <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
        </div>
    );
}
