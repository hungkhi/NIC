import { Search, Filter, MapPin, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

function isValidUrl(str: string | null | undefined): boolean {
    if (!str) return false;
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

export default async function StartupsDirectory() {
    const { data: startups, error } = await supabase.from('startups').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching startups:', error);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-nic-blue text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Startup Directory</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
                        Discover the most innovative tech startups in our network ready to scale globally.
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
                            placeholder="Search startups by name or keyword..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-plug-accent"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                        <Filter size={20} /> Filters
                    </button>
                </div>

                {/* Startups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {startups && startups.map((startup) => {
                        const logoSrc = isValidUrl(startup.logo_url) ? startup.logo_url : null;
                        const initials = startup.logo && !isValidUrl(startup.logo)
                            ? startup.logo
                            : startup.name.substring(0, 2).toUpperCase();

                        return (
                            <div key={startup.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-plug-accent group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nic-blue to-blue-600 text-white flex items-center justify-center text-xl font-bold font-mono shadow-inner overflow-hidden flex-shrink-0">
                                        {logoSrc ? (
                                            <img src={logoSrc} alt={startup.name} className="w-full h-full object-contain bg-white p-1" />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-plug-blue transition-colors">{startup.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                            <MapPin size={14} /> {startup.location}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 line-clamp-2">{startup.description}</p>
                                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-nic-blue text-xs font-semibold rounded-full">
                                        <Tag size={12} /> {startup.category}
                                    </span>
                                    <Link href={`/startups/${startup.id}`} className="text-sm font-semibold text-plug-blue hover:text-nic-blue flex items-center gap-1">
                                        View Profile &rarr;
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    {(!startups || startups.length === 0) && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No startups found. Check your database connections!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
