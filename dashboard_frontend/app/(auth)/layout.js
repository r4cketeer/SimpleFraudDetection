'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

export default function AppLayout({ children }) {
    const router = useRouter();
    const { isLoggedIn, loading } = useAuth();

    useEffect(() => {
        if (!loading && isLoggedIn) {
            router.replace('/dashboard');
        }
    }, [isLoggedIn, loading, router]);

    if (loading) return <div>Loading...</div>;

    if (!isLoggedIn) return <div className="min-h-screen bg-gray-100">{children}</div>;

    return null;
}
