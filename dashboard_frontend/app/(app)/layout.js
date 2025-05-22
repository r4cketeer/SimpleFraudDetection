'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import SearchEvents from "@/components/SearchEvents";

export default function ClientLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {  
        if (!loading && !isLoggedIn) {
            router.replace('/');
        }
    }, [loading, isLoggedIn, router]);

    if (loading) return <div>Loading...</div>;
    if (!isLoggedIn) return null;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen}
                onOpen={() => setIsSidebarOpen(true)}
                onClose={() => setIsSidebarOpen(false)}
                title="Dashboard" />
            <main className="flex-1">
                <SearchEvents />
                <div className='p-6'>
                    {children}
                </div>                
            </main>
        </div>
    );
}
