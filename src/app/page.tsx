import Link from 'next/link';
import { ArrowRight, Globe, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const stats = [
    { label: 'Active Startups', value: '500+' },
    { label: 'Global Ventures', value: '120+' },
    { label: 'Total Investment', value: '$2B+' },
    { label: 'Countries Represented', value: '35+' },
];

const features = [
    {
        icon: <Globe className="w-6 h-6 text-plug-accent" />,
        title: 'Global Reach',
        description: 'Connect with a worldwide network of corporate partners, investors, and innovative startups.',
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-plug-accent" />,
        title: 'Accelerated Growth',
        description: 'Access tailored programs designed to supercharge your startup\'s trajectory to market leader.',
    },
    {
        icon: <Users className="w-6 h-6 text-plug-accent" />,
        title: 'Strategic Matches',
        description: 'Our data-driven approach pairs the right ventures with the right startups for mutual success.',
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-plug-accent" />,
        title: 'Vetted Quality',
        description: 'Every participant undergoes rigorous screening to ensure a high-caliber ecosystem of innovation.',
    },
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero text-white overflow-hidden py-24 lg:py-32 xl:py-40">
                <div className="absolute inset-0 bg-[url('/hero_bg.png')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-plug-accent animate-pulse"></span>
                        <span className="text-sm font-medium">NIC Go Ventures 2026 Cohort Now Open</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-balance max-w-5xl leading-tight">
                        We Drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-plug-accent to-blue-400">Innovation</span> Forward
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl text-balance font-light leading-relaxed">
                        The ultimate platform connecting forward-thinking corporations with the world's most promising startups. Build the future with National Innovation Center.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/startups" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-full bg-white text-nic-blue hover:bg-gray-100 transition-colors shadow-xl hover:-translate-y-1 duration-200">
                            Explore Startups
                        </Link>
                        <Link href="/ventures" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-colors gap-2 hover:-translate-y-1 duration-200">
                            For Ventures <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-gray-100 relative z-10 -mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center p-4">
                                <div className="text-4xl lg:text-5xl font-black text-nic-blue mb-2 tracking-tight">{stat.value}</div>
                                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-nic-blue tracking-tight mb-4">Why Join the Network?</h2>
                        <p className="text-lg text-gray-600">
                            NIC Ventures provides unparalleled access to capital, mentorship, and corporate partnerships required to scale globally.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-nic-blue text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full border border-white/5 opacity-50"></div>
                    <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full border border-white/10 opacity-30"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Ready to Accelerate?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Join the ranks of unicorns and industry leaders. Apply to our next cohort or become a corporate partner today.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/signup" className="px-8 py-4 text-lg font-bold rounded-full bg-plug-accent text-nic-blue hover:scale-105 transition-transform shadow-lg">
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
