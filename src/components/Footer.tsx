'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Locale } from '@/lib/translations';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'vi', label: 'VI', flag: '🇻🇳' },
    { code: 'ja', label: 'JA', flag: '🇯🇵' },
    { code: 'ko', label: 'KO', flag: '🇰🇷' },
];

export default function Footer() {
    const { t, locale, setLocale } = useLanguage();

    return (
        <footer style={{ backgroundColor: '#161616', color: '#e5e5e5', paddingTop: '80px', paddingBottom: '40px' }}>
            <div className="klyro-container">
                {/* Top section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', paddingBottom: '60px', borderBottom: '1px solid #2a2a2a' }}>
                    {/* Big CTA text */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
                        <div>
                            <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#f2f1ed', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                                Recruit unique<br />talent with us.
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                            <a href="/startups/register" className="btn-primary" style={{ fontSize: '15px' }}>
                                Apply as Startup <span className="btn-dot" style={{ background: '#fff' }} />
                            </a>
                            <a href="/ventures/register" className="btn-outline" style={{ borderColor: '#444', color: '#e5e5e5', fontSize: '15px' }}>
                                Join as Partner <ArrowRight size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Logo */}
                    <div>
                        <img src="/nic_logo.png" alt="NIC" style={{ height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.8)' }} />
                    </div>
                </div>

                {/* Middle nav grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', padding: '60px 0', borderBottom: '1px solid #2a2a2a' }}>
                    <div>
                        <p className="klyro-label" style={{ color: '#555', marginBottom: '20px' }}>{t('footer_network')}</p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { label: t('nav_startups'), href: '/startups' },
                                { label: t('nav_ventures'), href: '/ventures' },
                                { label: t('footer_events'), href: '/events' },
                            ].map(link => (
                                <li key={link.href} style={{ marginBottom: '10px' }}>
                                    <a href={link.href} className="link-underline klyro-sm" style={{ color: '#888', textDecoration: 'none', display: 'inline-block' }}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="klyro-label" style={{ color: '#555', marginBottom: '20px' }}>{t('footer_resources')}</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { label: t('footer_about'), href: '/about' },
                                { label: t('footer_contact'), href: '/contact' },
                                { label: t('footer_faq'), href: '/faq' },
                            ].map(link => (
                                <li key={link.href} style={{ marginBottom: '10px' }}>
                                    <a href={link.href} className="link-underline klyro-sm" style={{ color: '#888', textDecoration: 'none', display: 'inline-block' }}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="klyro-label" style={{ color: '#555', marginBottom: '20px' }}>{t('footer_connect')}</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['LinkedIn', 'Twitter / X', 'Facebook'].map(s => (
                                <li key={s} style={{ marginBottom: '10px' }}>
                                    <a href="#" className="link-underline klyro-sm" style={{ color: '#888', textDecoration: 'none', display: 'inline-block' }}>{s}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="klyro-label" style={{ color: '#555', marginBottom: '20px' }}>{t('footer_lang')}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLocale(lang.code)}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        padding: '5px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600,
                                        fontFamily: '"Geist"', cursor: 'pointer', transition: 'all 0.15s ease',
                                        background: locale === lang.code ? '#710014' : 'transparent',
                                        color: locale === lang.code ? '#fff' : '#555',
                                        border: `1px solid ${locale === lang.code ? '#710014' : '#333'}`,
                                    }}
                                >
                                    {lang.flag} {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: copyright + legal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', paddingTop: '32px', flexWrap: 'wrap' }}>
                    <p className="klyro-sm" style={{ color: '#444' }}>
                        &copy; {new Date().getFullYear()} {t('footer_copyright')}
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="#" className="klyro-sm link-underline" style={{ color: '#444', textDecoration: 'none' }}>{t('footer_privacy')}</a>
                        <a href="#" className="klyro-sm link-underline" style={{ color: '#444', textDecoration: 'none' }}>{t('footer_terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
