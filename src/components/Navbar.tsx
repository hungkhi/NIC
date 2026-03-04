'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const { locale, setLocale, t } = useLanguage();

    const openAuthModal = (mode: 'signin' | 'signup') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/nic_logo.png" alt="NIC Logo" width={80} height={40} className="object-contain" />
                        </Link>
                    </div>
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        <Link href="/startups" className="text-gray-700 hover:text-plug-blue font-medium transition-colors">{t('nav_startups')}</Link>
                        <Link href="/ventures" className="text-gray-700 hover:text-plug-blue font-medium transition-colors">{t('nav_ventures')}</Link>
                        <Link href="/about" className="text-gray-700 hover:text-plug-blue font-medium transition-colors">{t('nav_about')}</Link>

                        <div className="flex items-center gap-4 ml-4">
                            {/* Language Switcher */}
                            <button
                                onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
                                className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-nic-blue transition-colors border border-gray-200 px-3 py-1.5 rounded-full hover:border-nic-blue"
                                title="Switch language"
                            >
                                <span>{locale === 'en' ? '🇬🇧 EN' : '🇻🇳 VI'}</span>
                            </button>

                            <button
                                onClick={() => openAuthModal('signin')}
                                className="text-sm font-semibold text-gray-900 hover:opacity-80 transition-opacity"
                            >
                                {t('nav_signin')}
                            </button>
                            <button
                                onClick={() => openAuthModal('signup')}
                                className="text-sm font-semibold text-white bg-nic-blue px-5 py-2.5 rounded-full hover:bg-plug-blue transition-colors shadow-sm"
                            >
                                {t('nav_join')}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
                            className="text-sm font-semibold text-gray-600 border border-gray-200 px-2 py-1 rounded-full"
                        >
                            {locale === 'en' ? '🇬🇧' : '🇻🇳'}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/startups" className="block px-3 py-2 text-base font-medium text-gray-700">{t('nav_startups')}</Link>
                        <Link href="/ventures" className="block px-3 py-2 text-base font-medium text-gray-700">{t('nav_ventures')}</Link>
                        <button
                            onClick={() => openAuthModal('signin')}
                            className="block w-full text-left px-3 py-2 text-base font-medium text-plug-blue"
                        >
                            {t('nav_signin')}
                        </button>
                    </div>
                </div>
            )}

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialMode={authMode}
            />
        </nav>
    );
}
