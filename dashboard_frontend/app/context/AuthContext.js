'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionKey = localStorage.getItem('session_key');
        const userId = localStorage.getItem('user_id');

        if (sessionKey && userId) {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/verify_session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session: sessionKey, userId })
            })
            .then(res => {
                setIsLoggedIn(res.ok);
                setLoading(false);
            })
            .catch(() => {
                setIsLoggedIn(false);
                setLoading(false);
            });
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
