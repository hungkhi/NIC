'use client';

import { supabase } from'@/lib/supabase';
import { Chrome } from'lucide-react';
import Link from'next/link';

export default function SignInPage() {
 const handleGoogleSignIn = async () => {
 try {
 const { error } = await supabase.auth.signInWithOAuth({
 provider:'google',
 options: {
 redirectTo:`${window.location.origin}/auth/callback`,
 },
 });
 if (error) throw error;
 } catch (error) {
 console.error('Error signing in with Google:', error);
 alert('Supabase project details are missing. Please configure your .env.local');
 }
 };

 return (
 <div className="flex-grow flex items-center justify-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
 <div className="text-center">
 <h2 className="text-4xl font-black text-nic-blue tracking-tight">Welcome Back</h2>
 <p className="mt-3 text-sm text-gray-500">
 Sign in to access the NIC Ventures Network
 </p>
 </div>

 <div className="mt-8 space-y-6">
 <button
 onClick={handleGoogleSignIn}
 className="w-full flex justify-center items-center gap-3 py-3.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-base font-bold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nic-blue"
 >
 <Chrome className="w-5 h-5 text-red-500" />
 Sign in with Google
 </button>

 <div className="relative">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-gray-200"></div>
 </div>
 <div className="relative flex justify-center text-sm">
 <span className="px-2 bg-white text-gray-500">Or</span>
 </div>
 </div>

 <div className="space-y-4">
 <div>
 <label htmlFor="email" className="sr-only">Email address</label>
 <input id="email" name="email" type="email" required className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-nic-blue focus:border-nic-blue sm:text-sm" placeholder="Email address" />
 </div>
 </div>

 <div>
 <button
 onClick={() => alert('Supabase Auth is not fully configured yet.')}
 className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-nic-blue hover:bg-plug-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nic-blue transition-colors shadow-lg"
 >
 Sign in with Email
 </button>
 </div>
 </div>

 <div className="text-center mt-6">
 <p className="text-sm text-gray-600">
 Don't have an account?{''}
 <Link href="/signup" className="font-bold text-plug-accent hover:text-plug-blue transition-colors">
 Sign up
 </Link>
 </p>
 </div>
 </div>
 </div>
 );
}
