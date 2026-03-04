'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const [scrolled, setScrolled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const openAuthModal = (mode: 'signin' | 'signup') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className="sticky top-0 z-50 w-full transition-all duration-300"
                style={{
                    backgroundColor: scrolled ? '#f2f1ed' : '#f2f1ed',
                    borderBottom: scrolled ? '1px solid #deddd8' : '1px solid transparent',
                }}
            >
                <div className="klyro-container">
                    <div className="flex justify-between items-center py-5">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image src="/nic_logo.png" alt="NIC Logo" width={72} height={30} className="object-contain" />
                        </Link>

                        {/* Center nav links */}
                        <div className="hidden md:flex items-center gap-10">
                            <Link href="/startups" className="klyro-sm link-underline" style={{ color: '#161616', fontWeight: 500 }}>{t('nav_startups')}</Link>
                            <Link href="/ventures" className="klyro-sm link-underline" style={{ color: '#161616', fontWeight: 500 }}>{t('nav_ventures')}</Link>
                            <Link href="/about" className="klyro-sm link-underline" style={{ color: '#161616', fontWeight: 500 }}>{t('nav_about')}</Link>
                        </div>

                        {/* Right CTA + hamburger */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={() => openAuthModal('signin')}
                                className="klyro-sm link-underline"
                                style={{ color: '#161616', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {t('nav_signin')}
                            </button>
                            <button onClick={() => openAuthModal('signup')} className="btn-primary">
                                {t('nav_join')}
                                <span className="btn-dot" style={{ background: '#fff' }} />
                            </button>
                        </div>

                        {/* Mobile hamburger */}
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" style={{ color: '#161616' }}>
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden border-t" style={{ borderColor: '#deddd8', backgroundColor: '#f2f1ed' }}>
                        <div className="klyro-container py-5 space-y-4">
                            <Link href="/startups" onClick={() => setIsOpen(false)} className="block klyro-body font-medium" style={{ color: '#161616' }}>{t('nav_startups')}</Link>
                            <Link href="/ventures" onClick={() => setIsOpen(false)} className="block klyro-body font-medium" style={{ color: '#161616' }}>{t('nav_ventures')}</Link>
                            <div className="flex items-center gap-3 pt-2">
                                <button onClick={() => openAuthModal('signin')} className="btn-outline text-sm">{t('nav_signin')}</button>
                                <button onClick={() => openAuthModal('signup')} className="btn-primary text-sm">{t('nav_join')} <span className="btn-dot" style={{ background: '#fff' }} /></button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
        </>
    );
}
