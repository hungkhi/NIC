'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Listen for the signed-in event that fires after standard OAuth redirect
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                router.push('/');
            }
        });

        // Fallback check in case the event already fired or checking the session directly
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.push('/');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>
                <p className="mt-4 text-gray-600">Completing sign in...</p>
            </div>
        </div>
    );
}
