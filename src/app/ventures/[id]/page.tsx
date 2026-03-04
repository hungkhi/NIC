import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { MapPin, Tag, Globe, Users, Target, ArrowLeft, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

function isValidUrl(str: string | null | undefined): boolean {
    if (!str) return false;
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

export default async function VentureDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: venture, error } = await supabase
        .from('ventures')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !venture) {
        notFound();
    }

    const logoSrc = isValidUrl(venture.logo_url) ? venture.logo_url : null;
    const initials = venture.logo && !isValidUrl(venture.logo)
        ? venture.logo
        : venture.name.substring(0, 2).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Banner */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-gray-900 to-nic-blue relative w-full overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-end pb-8">
                    <Link href="/ventures" className="text-gray-300 hover:text-white flex items-center gap-2 mb-8 w-fit transition-colors relative z-20">
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
                            <div className="w-32 h-32 rounded-2xl bg-white text-nic-blue flex items-center justify-center text-4xl font-bold font-mono shadow border border-gray-100 mx-auto mb-6 relative overflow-hidden">
                                {logoSrc ? (
                                    <Image src={logoSrc} alt={venture.name} fill className="object-contain p-2" />
                                ) : (
                                    initials
                                )}
                            </div>
                            <h1 className="text-3xl font-black text-center text-gray-900 mb-2">{venture.name}</h1>
                            <div className="flex justify-center items-center gap-1 text-gray-500 mb-6 font-medium">
                                <MapPin size={16} /> {venture.location || 'Global'}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Briefcase size={16} /> Type</span>
                                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">{venture.type || 'VC'}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Tag size={16} /> Focus</span>
                                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-right max-w-[160px] truncate">{venture.focus || venture.focus_area || 'Various'}</span>
                                </div>
                                {venture.website && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><Globe size={16} /> Website</span>
                                        <Link href={venture.website} target="_blank" className="font-semibold text-plug-blue hover:underline">
                                            Visit Firm
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button className="w-full bg-plug-blue text-white font-bold py-3 rounded-xl hover:bg-nic-blue transition-colors shadow-md">
                                    Submit Pitch
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Details) */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Firm Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                {venture.description || 'No description provided.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <Target size={18} className="text-plug-blue" /> Investment Stage
                                </h3>
                                <p className="text-gray-600 font-medium">Seed to Series A</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <Users size={18} className="text-plug-blue" /> Portfolio
                                </h3>
                                <p className="text-gray-600 font-medium">50+ active investments globally.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
