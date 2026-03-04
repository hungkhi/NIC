'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

function isValidUrl(str: string | null | undefined): boolean {
    if (!str) return false;
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

export default function StartupsDirectory() {
    const [startups, setStartups] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStartups = async () => {
            const { data, error } = await supabase.from('startups').select('*').order('created_at', { ascending: false });
            if (error) console.error('Error fetching startups:', error);
            else setStartups(data || []);
            setIsLoading(false);
        };
        fetchStartups();
    }, []);

    return (
        <div style={{ backgroundColor: '#f2f1ed', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid #deddd8', padding: '80px 0 60px' }}>
                <div className="klyro-container">
                    <p className="klyro-label mb-4" style={{ color: '#888' }}>Directory</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                        <h1 className="klyro-h2" style={{ color: '#161616' }}>Startup<br />Directory</h1>
                        <p className="klyro-body max-w-sm" style={{ color: '#555' }}>
                            Discover 500+ innovative startups across Vietnam and Southeast Asia.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search bar */}
            <div style={{ borderBottom: '1px solid #deddd8', padding: '20px 0' }}>
                <div className="klyro-container">
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Search by name, category, or location..."
                            style={{
                                flex: 1, minWidth: '200px', padding: '12px 20px',
                                borderRadius: '9999px', border: '1px solid #deddd8', background: '#fff',
                                fontSize: '15px', fontFamily: '"Geist"', color: '#161616', outline: 'none',
                            }}
                        />
                        {['All', 'AI / ML', 'Fintech', 'Healthtech', 'Agtech', 'Edtech'].map(f => (
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1px', border: '1px solid #deddd8', borderRadius: '24px', overflow: 'hidden', background: '#deddd8' }}>
                        {startups && startups.map((startup) => {
                            const logoSrc = isValidUrl(startup.logo_url) ? startup.logo_url : null;
                            const initials = startup.logo && !isValidUrl(startup.logo) ? startup.logo : startup.name.substring(0, 2).toUpperCase();

                            return (
                                <Link
                                    key={startup.id}
                                    href={`/startups/${startup.id}`}
                                    style={{
                                        display: 'block', background: '#f2f1ed', padding: '32px',
                                        textDecoration: 'none', transition: 'background 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.background = '#f2f1ed')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                        {/* Logo */}
                                        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#161616', color: '#f2f1ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', overflow: 'hidden', flexShrink: 0 }}>
                                            {logoSrc ? <img src={logoSrc} alt={startup.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} /> : initials}
                                        </div>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #deddd8', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s' }}>
                                            <ArrowRight size={14} color="#888" />
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#161616', marginBottom: '6px' }}>{startup.name}</h3>
                                    <div style={{ marginBottom: '12px' }}>
                                        <span className="klyro-tag" style={{ fontSize: '12px', padding: '3px 10px' }}>{startup.category}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {startup.description || 'Innovative startup in our network.'}
                                    </p>
                                    {startup.location && (
                                        <p style={{ fontSize: '13px', color: '#aaa', marginTop: '12px' }}>📍 {startup.location}</p>
                                    )}
                                </Link>
                            );
                        })}
                        {(!startups || startups.length === 0) && (
                            <div style={{ gridColumn: '1/-1', padding: '80px', textAlign: 'center', background: '#f2f1ed' }}>
                                <p style={{ fontSize: '18px', color: '#888' }}>No startups found yet. Check back soon.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
