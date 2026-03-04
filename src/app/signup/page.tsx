'use client';

import { supabase } from'@/lib/supabase';
import { Chrome, Building2, Rocket } from'lucide-react';
import Link from'next/link';

export default function SignUpPage() {
 const handleGoogleSignUp = async (role:'startup' |'venture') => {
 try {
 // In a real app, you might pass the role via an Auth flow or update the user's profile post-signup
 const { error } = await supabase.auth.signInWithOAuth({
 provider:'google',
 options: {
 redirectTo:`${window.location.origin}/auth/callback?role=${role}`,
 },
 });
 if (error) throw error;
 } catch (error) {
 console.error('Error signing up with Google:', error);
 alert('Supabase project details are missing. Please configure your .env.local');
 }
 };

 return (
 <div className="flex-grow flex items-center justify-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
 <div className="text-center">
 <h2 className="text-4xl font-black text-nic-blue tracking-tight">Join NIC Ventures</h2>
 <p className="mt-3 text-lg text-gray-500 font-light">
 Choose how you want to interact with the network
 </p>
 </div>

 <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
 {/* Startup Option */}
 <div className="relative group bg-white border-2 border-gray-100 hover:border-plug-accent rounded-2xl p-8 flex flex-col items-center text-center transition-all cursor-pointer hover:shadow-xl" onClick={() => handleGoogleSignUp('startup')}>
 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 <Rocket className="w-8 h-8 text-plug-accent" />
 </div>
 <h3 className="text-2xl font-bold text-nic-blue mb-2">I am a Startup</h3>
 <p className="text-gray-500 text-sm mb-6 flex-grow">
 Looking for funding, corporate partnerships, and acceleration programs.
 </p>
 <div className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-bold text-gray-700 group-hover:bg-gray-50 transition-colors">
 <Chrome className="w-4 h-4 text-red-500" />
 Sign up with Google
 </div>
 </div>

 {/* Venture Option */}
 <div className="relative group bg-white border-2 border-gray-100 hover:border-plug-accent rounded-2xl p-8 flex flex-col items-center text-center transition-all cursor-pointer hover:shadow-xl" onClick={() => handleGoogleSignUp('venture')}>
 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 <Building2 className="w-8 h-8 text-plug-accent" />
 </div>
 <h3 className="text-2xl font-bold text-nic-blue mb-2">I am a Venture</h3>
 <p className="text-gray-500 text-sm mb-6 flex-grow">
 Looking to invest, partner, or acquire innovative startups.
 </p>
 <div className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-bold text-gray-700 group-hover:bg-gray-50 transition-colors">
 <Chrome className="w-4 h-4 text-red-500" />
 Sign up with Google
 </div>
 </div>
 </div>

 <div className="text-center mt-12 pt-6 border-t border-gray-100">
 <p className="text-sm text-gray-600">
 Already have an account?{''}
 <Link href="/signin" className="font-bold text-plug-accent hover:text-plug-blue transition-colors">
 Sign in
 </Link>
 </p>
 </div>
 </div>
 </div>
 );
}
