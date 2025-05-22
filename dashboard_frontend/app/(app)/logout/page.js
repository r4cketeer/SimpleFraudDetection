'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from '@/context/AuthContext';

export default function LogoutPage() {
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();
    const [status, setStatus] = useState("logging_out");

    useEffect(() => {
        const sessionKey = localStorage.getItem('session_key');
        const userId = localStorage.getItem('user_id');
        
        const doLogout = async () => {
            if (sessionKey && userId) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/logout`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId }),
                    });

                    localStorage.removeItem('session_key');
                    localStorage.removeItem('user_id');
                    setIsLoggedIn(false);

                    if (res.ok) {
                        setStatus("success");
                        setTimeout(() => router.push("/"), 1500);
                    } 
                    else {
                        setStatus("error");
                    }
                } catch (err) {
                    console.error('Failed to logout', err);
                    setStatus("error");
                }
            } 
            else {
                router.push("/");
            }
        };

        doLogout();
    }, [router, setIsLoggedIn]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {status === "logging_out" && (
            <>
                <p className="text-xl font-semibold mb-2">Logging out...</p>
                <p>Please wait.</p>
            </>
            )}
            {status === "success" && (
            <>
                <p className="text-xl font-semibold mb-2 text-green-600">
                    You have been logged out.
                </p>
                <p>Redirecting to login page...</p>
            </>
            )}
            {status === "error" && (
            <>
                <p className="text-xl font-semibold mb-2 text-red-600">
                    Logout failed.
                </p>
                <p>Please try again.</p>
            </>
            )}
        </div>
    );
}
