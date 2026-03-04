'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Chrome, Building2, Rocket, X } from 'lucide-react';
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
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleGoogleSignUp = async (role: 'startup' | 'venture') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/auth/callback?role=${role}` },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        /* Overlay — covers full screen, flex-centered */
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
            style={{ backgroundColor: 'rgba(15,28,63,0.6)' }}
            onClick={onClose}
        >
            {/* Modal panel — stops click propagation, uses max-h + my-auto to stay centred and scrollable */}
            <div
                className="relative bg-white rounded-3xl w-full max-w-xl my-auto animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-gray-400 hover:text-nic-blue hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 sm:p-10">
                    {mode === 'signin' ? (
                        <div className="space-y-7">
                            <div className="text-center">
                                <div className="text-4xl mb-3">👋</div>
                                <h2 className="text-3xl font-black text-nic-blue tracking-tight">{t('auth_welcome_back')}</h2>
                                <p className="mt-2 text-sm text-gray-500">{t('auth_signin_subtitle')}</p>
                            </div>

                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex justify-center items-center gap-3 py-3.5 px-4 border-2 border-gray-200 rounded-2xl text-base font-bold text-gray-700 hover:border-nic-blue hover:text-nic-blue transition-all duration-200 hover-lift"
                            >
                                <Chrome className="w-5 h-5 text-red-500" />
                                {t('auth_google')}
                            </button>

                            <div className="relative flex items-center gap-4">
                                <div className="flex-grow border-t border-gray-200" />
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{t('auth_or')}</span>
                                <div className="flex-grow border-t border-gray-200" />
                            </div>

                            <div>
                                <label htmlFor="auth-email" className="block text-sm font-semibold text-gray-700 mb-2">{t('auth_email')}</label>
                                <input id="auth-email" name="email" type="email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl placeholder-gray-400 text-gray-900 focus:outline-none focus:border-nic-blue transition-colors" placeholder="hello@company.com" />
                            </div>

                            <button className="w-full py-3.5 px-4 text-sm font-bold rounded-2xl text-white bg-nic-blue hover:bg-plug-blue transition-colors">
                                {t('auth_email_btn')}
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                {t('auth_no_account')}{' '}
                                <button onClick={() => setMode('signup')} className="font-bold text-plug-accent hover:underline">{t('auth_signup')}</button>
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-7">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🚀</div>
                                <h2 className="text-3xl font-black text-nic-blue tracking-tight">{t('auth_join_title')}</h2>
                                <p className="mt-2 text-sm text-gray-500">{t('auth_join_subtitle')}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleGoogleSignUp('startup')}
                                    className="group border-2 border-gray-200 hover:border-plug-accent rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-200 hover-lift cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-plug-accent/10 transition-colors">
                                        <Rocket className="w-6 h-6 text-plug-accent" />
                                    </div>
                                    <h3 className="text-base font-bold text-nic-blue mb-1">{t('auth_startup')}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{t('auth_startup_desc')}</p>
                                </button>

                                <button
                                    onClick={() => handleGoogleSignUp('venture')}
                                    className="group border-2 border-gray-200 hover:border-plug-accent rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-200 hover-lift cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-plug-accent/10 transition-colors">
                                        <Building2 className="w-6 h-6 text-plug-accent" />
                                    </div>
                                    <h3 className="text-base font-bold text-nic-blue mb-1">{t('auth_venture')}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{t('auth_venture_desc')}</p>
                                </button>
                            </div>

                            <button
                                onClick={() => handleGoogleSignUp('startup')}
                                className="w-full flex justify-center items-center gap-3 py-3.5 px-4 border-2 border-gray-200 rounded-2xl text-base font-bold text-gray-700 hover:border-nic-blue hover:text-nic-blue transition-all duration-200"
                            >
                                <Chrome className="w-5 h-5 text-red-500" />
                                {t('auth_signup_google')}
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                {t('auth_already')}{' '}
                                <button onClick={() => setMode('signin')} className="font-bold text-plug-accent hover:underline">{t('nav_signin')}</button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
