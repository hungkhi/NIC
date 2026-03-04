'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-nic-blue text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="mb-4">
                            <img src="/nic_logo.png" alt="NIC Logo" className="h-10 object-contain brightness-0 invert opacity-90" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed text-balance">
                            {t('footer_tagline')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">{t('footer_network')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/startups" className="hover:text-white transition-colors">{t('nav_startups')}</a></li>
                            <li><a href="/ventures" className="hover:text-white transition-colors">{t('nav_ventures')}</a></li>
                            <li><a href="/events" className="hover:text-white transition-colors">{t('footer_events')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">{t('footer_resources')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/about" className="hover:text-white transition-colors">{t('footer_about')}</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">{t('footer_contact')}</a></li>
                            <li><a href="/faq" className="hover:text-white transition-colors">{t('footer_faq')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">{t('footer_connect')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">{t('footer_privacy')}</a>
                        <a href="#" className="hover:text-white">{t('footer_terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
