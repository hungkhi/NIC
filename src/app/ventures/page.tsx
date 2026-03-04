'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

function isValidUrl(str: string | null | undefined): boolean {
    if (!str) return false;
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

export default function VenturesDirectory() {
    const [ventures, setVentures] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVentures = async () => {
            const { data, error } = await supabase.from('ventures').select('*').order('created_at', { ascending: false });
            if (error) console.error('Error fetching ventures:', error);
            else setVentures(data || []);
            setIsLoading(false);
        };
        fetchVentures();
    }, []);

    return (
        <div style={{ backgroundColor: '#f2f1ed', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid #deddd8', padding: '80px 0 60px' }}>
                <div className="klyro-container">
                    <p className="klyro-label mb-4" style={{ color: '#888' }}>Partners & Investors</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                        <h1 className="klyro-h2" style={{ color: '#161616' }}>Ventures<br />&amp; Partners</h1>
                        <div style={{ maxWidth: '320px' }}>
                            <p className="klyro-body" style={{ color: '#555', marginBottom: '20px' }}>
                                Connect with 120+ leading VCs, corporate innovators, and institutional investors across Southeast Asia.
                            </p>
                            <Link href="/ventures/register" className="btn-primary">
                                Join as Partner <span className="btn-dot" style={{ background: '#fff' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div style={{ borderBottom: '1px solid #deddd8', padding: '20px 0' }}>
                <div className="klyro-container">
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Search by name, type, or focus area..."
                            style={{
                                flex: 1, minWidth: '200px', padding: '12px 20px',
                                borderRadius: '9999px', border: '1px solid #deddd8', background: '#fff',
                                fontSize: '15px', fontFamily: '"Geist"', color: '#161616', outline: 'none',
                            }}
                        />
                        {['All', 'Venture Capital', 'Corporate VC', 'Accelerator', 'Angel'].map(f => (
                            <button key={f} className="klyro-tag" style={{ cursor: 'pointer', background: f === 'All' ? '#161616' : 'transparent', color: f === 'All' ? '#f2f1ed' : '#161616' }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="klyro-container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                {isLoading ? (
                    <div style={{ padding: '80px', textAlign: 'center' }}>
                        <p style={{ color: '#888' }}>Loading directory...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1px', border: '1px solid #deddd8', borderRadius: '24px', overflow: 'hidden', background: '#deddd8' }}>
                        {ventures && ventures.map((venture) => {
                            const logoSrc = isValidUrl(venture.logo_url) ? venture.logo_url : null;
                            const initials = venture.logo && !isValidUrl(venture.logo) ? venture.logo : venture.name.substring(0, 2).toUpperCase();

                            return (
                                <Link
                                    key={venture.id}
                                    href={`/ventures/${venture.id}`}
                                    style={{
                                        display: 'block', background: '#f2f1ed', padding: '36px',
                                        textDecoration: 'none', transition: 'background 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.background = '#f2f1ed')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#161616', color: '#f2f1ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', overflow: 'hidden', flexShrink: 0 }}>
                                            {logoSrc ? <img src={logoSrc} alt={venture.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} /> : initials}
                                        </div>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #deddd8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ArrowRight size={14} color="#888" />
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#161616', marginBottom: '8px' }}>{venture.name}</h3>

                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                                        {venture.type && <span className="klyro-tag" style={{ fontSize: '12px', padding: '3px 10px' }}>{venture.type}</span>}
                                        {venture.focus && <span className="klyro-tag" style={{ fontSize: '12px', padding: '3px 10px', borderColor: 'transparent', color: '#888' }}>{venture.focus}</span>}
                                    </div>

                                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                                        {venture.description || `${venture.type || 'Venture partner'} focused on ${venture.focus || 'innovation'} in ${venture.region || 'Southeast Asia'}.`}
                                    </p>

                                    {venture.region && (
                                        <p style={{ fontSize: '13px', color: '#aaa', marginTop: '12px' }}>🌏 {venture.region}</p>
                                    )}
                                </Link>
                            );
                        })}
                        {(!ventures || ventures.length === 0) && (
                            <div style={{ gridColumn: '1/-1', padding: '80px', textAlign: 'center', background: '#f2f1ed' }}>
                                <p style={{ fontSize: '18px', color: '#888' }}>No ventures found yet. Check back soon.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
