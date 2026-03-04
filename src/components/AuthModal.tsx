'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: AuthMode;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const { t } = useLanguage();

    if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/auth/callback` },
            });
            if (error) throw error;
        } catch (error) { console.error('Error signing in:', error); }
    };

    const handleGoogleSignUp = async (role: 'startup' | 'venture') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/auth/callback?role=${role}` },
            });
            if (error) throw error;
        } catch (error) { console.error('Error signing up:', error); }
    };

    return (
        /* Overlay */
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
            style={{ backgroundColor: 'rgba(22,22,22,0.7)' }}
            onClick={onClose}
        >
            {/* Panel */}
            <div
                className="relative w-full max-w-lg my-auto k-scale-in"
                style={{ backgroundColor: '#f2f1ed', borderRadius: '24px', overflow: 'hidden' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#161616')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                >
                    <X size={20} />
                </button>

                <div style={{ padding: '48px 40px 40px' }}>
                    {mode === 'signin' ? (
                        <div>
                            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#161616', lineHeight: 1.1, marginBottom: '8px' }}>
                                {t('auth_welcome_back')}
                            </h2>
                            <p className="klyro-sm mb-8" style={{ color: '#888' }}>{t('auth_signin_subtitle')}</p>

                            <button
                                onClick={handleGoogleSignIn}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    padding: '14px 24px', borderRadius: '9999px', border: '1px solid #deddd8', background: '#fff',
                                    fontSize: '15px', fontWeight: 600, fontFamily: '"Geist"', color: '#161616',
                                    cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s',
                                    marginBottom: '24px',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#161616'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#deddd8'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.1 3.2l6.8-6.8C35.9 2.4 30.3 0 24 0 14.6 0 6.6 5.5 2.7 13.6l7.9 6.1C12.4 13.4 17.8 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.3l7.4 5.7c4.3-4 6.8-9.9 7.2-17z" /><path fill="#FBBC05" d="M10.6 28.7A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.9-6z" /><path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.4-5.7l-7.4-5.7c-2.1 1.4-4.8 2.3-8 2.3-6.2 0-11.5-4.2-13.4-9.8l-7.9 6C6.5 42.5 14.6 48 24 48z" /></svg>
                                {t('auth_google')}
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ flex: 1, height: '1px', background: '#deddd8' }} />
                                <span className="klyro-label" style={{ color: '#aaa' }}>{t('auth_or')}</span>
                                <div style={{ flex: 1, height: '1px', background: '#deddd8' }} />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <input
                                    type="email"
                                    placeholder={t('auth_email')}
                                    style={{
                                        width: '100%', padding: '14px 20px', borderRadius: '9999px',
                                        border: '1px solid #deddd8', background: '#fff', fontSize: '15px',
                                        fontFamily: '"Geist"', color: '#161616', outline: 'none', boxSizing: 'border-box',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = '#161616'}
                                    onBlur={e => e.currentTarget.style.borderColor = '#deddd8'}
                                />
                            </div>

                            <button className="btn-dark" style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', marginBottom: '24px' }}>
                                {t('auth_email_btn')}
                            </button>

                            <p className="klyro-sm text-center" style={{ color: '#888' }}>
                                {t('auth_no_account')}{' '}
                                <button onClick={() => setMode('signup')} style={{ color: '#710014', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {t('auth_signup')}
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, fontFamily: '"Cabinet Grotesk"', color: '#161616', lineHeight: 1.1, marginBottom: '8px' }}>
                                {t('auth_join_title')}
                            </h2>
                            <p className="klyro-sm mb-10" style={{ color: '#888' }}>{t('auth_join_subtitle')}</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                                {[
                                    { role: 'startup' as const, emoji: '🚀', label: t('auth_startup'), desc: t('auth_startup_desc') },
                                    { role: 'venture' as const, emoji: '💼', label: t('auth_venture'), desc: t('auth_venture_desc') },
                                ].map(card => (
                                    <button
                                        key={card.role}
                                        onClick={() => handleGoogleSignUp(card.role)}
                                        style={{
                                            padding: '24px 20px', borderRadius: '16px', border: '1px solid #deddd8',
                                            background: '#fff', textAlign: 'left', cursor: 'pointer',
                                            transition: 'border-color 0.2s, transform 0.2s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#710014'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#deddd8'; e.currentTarget.style.transform = 'none'; }}
                                    >
                                        <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.emoji}</div>
                                        <div style={{ fontFamily: '"Cabinet Grotesk"', fontSize: '18px', fontWeight: 700, color: '#161616', marginBottom: '6px' }}>{card.label}</div>
                                        <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.4 }}>{card.desc}</div>
                                        <div className="btn-primary" style={{ marginTop: '16px', fontSize: '12px', padding: '8px 16px', display: 'inline-flex' }}>
                                            Continue with Google <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <p className="klyro-sm text-center" style={{ color: '#888' }}>
                                {t('auth_already')}{' '}
                                <button onClick={() => setMode('signin')} style={{ color: '#710014', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {t('nav_signin')}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
