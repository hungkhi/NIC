import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { MapPin, Tag, Globe, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

function isValidUrl(str: string | null | undefined): boolean {
    if (!str) return false;
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

export default async function StartupDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: startup, error } = await supabase
        .from('startups')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !startup) {
        notFound();
    }

    const logoSrc = isValidUrl(startup.logo_url) ? startup.logo_url : null;
    const initials = startup.logo && !isValidUrl(startup.logo)
        ? startup.logo
        : startup.name.substring(0, 2).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Banner */}
            <div className="h-64 md:h-80 bg-gradient-hero relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-end pb-8">
                    <Link href="/startups" className="text-blue-100 hover:text-white flex items-center gap-2 mb-8 w-fit transition-colors">
                        <ArrowLeft size={20} /> Back to Directory
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-24 relative z-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Profile Card) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-28">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-nic-blue to-blue-600 text-white flex items-center justify-center text-4xl font-bold font-mono shadow-inner mx-auto mb-6 relative overflow-hidden">
                                {logoSrc ? (
                                    <Image src={logoSrc} alt={startup.name} fill className="object-contain bg-white p-2" />
                                ) : (
                                    initials
                                )}
                            </div>
                            <h1 className="text-3xl font-black text-center text-gray-900 mb-2">{startup.name}</h1>
                            <div className="flex justify-center items-center gap-1 text-gray-500 mb-6 font-medium">
                                <MapPin size={16} /> {startup.location || 'Global'}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Tag size={16} /> Category</span>
                                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">{startup.category || 'Tech'}</span>
                                </div>
                                {startup.website && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><Globe size={16} /> Website</span>
                                        <Link href={startup.website} target="_blank" className="font-semibold text-plug-blue hover:underline">
                                            Visit Site
                                        </Link>
                                    </div>
                                )}
                                {startup.founded_year && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><Users size={16} /> Founded</span>
                                        <span className="font-semibold text-gray-900">{startup.founded_year}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button className="w-full bg-nic-blue text-white font-bold py-3 rounded-xl hover:bg-plug-blue transition-colors shadow-md">
                                    Request Intro
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Details) */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Company Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                {startup.description || 'No description provided.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-plug-accent" /> Traction
                                </h3>
                                <p className="text-gray-600">Scaling rapidly and expanding operations across Southeast Asia.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <Users size={18} className="text-plug-accent" /> Team Size
                                </h3>
                                <p className="text-gray-600">Dynamic team of over 20+ operators and engineers.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
