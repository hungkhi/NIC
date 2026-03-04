import { Search, Filter, Globe2, Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

function isValidUrl(str: string | null | undefined): boolean {
    if (!str) return false;
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

export default async function VenturesDirectory() {
    const { data: ventures, error } = await supabase.from('ventures').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching ventures:', error);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-nic-blue text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Ventures &amp; Partners</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
                        Connect with leading venture capital firms and corporate innovators.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search ventures by name or focus..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-plug-accent"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                        <Filter size={20} /> Filters
                    </button>
                </div>

                {/* Ventures Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ventures && ventures.map((venture) => {
                        const logoSrc = isValidUrl(venture.logo_url) ? venture.logo_url : null;
                        const initials = venture.logo && !isValidUrl(venture.logo)
                            ? venture.logo
                            : venture.name.substring(0, 2).toUpperCase();

                        return (
                            <div key={venture.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col sm:flex-row gap-6 items-start">
                                <div className="w-20 h-20 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center text-2xl font-black flex-shrink-0 overflow-hidden">
                                    {logoSrc ? (
                                        <img src={logoSrc} alt={venture.name} className="w-full h-full object-contain bg-white p-1" />
                                    ) : (
                                        initials
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-black text-nic-blue mb-2">{venture.name}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Briefcase size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-900">Type:</span> {venture.type}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Search size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-900">Focus:</span> {venture.focus}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Globe2 size={16} className="text-gray-400" />
                                            <span className="font-medium text-gray-900">Region:</span> {venture.region}
                                        </div>
                                    </div>
                                    <Link href={`/ventures/${venture.id}`} className="px-5 py-2.5 bg-plug-accent/10 text-plug-blue font-bold rounded-lg hover:bg-plug-accent hover:text-white transition-colors text-sm w-full sm:w-auto text-center inline-block">
                                        Connect
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    {(!ventures || ventures.length === 0) && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No ventures found. Check your database connections!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
