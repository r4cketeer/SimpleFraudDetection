'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const { setIsLoggedIn } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
      
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || 'Login gagal');
                return;
            }
            
            const data = await res.json();
            if (data.session && data.user_id) {
                localStorage.setItem('session_key', data.session);
                localStorage.setItem('user_id', data.user_id);
            }

            setIsLoggedIn(true);
            router.replace('/dashboard');

        } catch (err) {    
            console.log(err)        
            setError('Terjadi kesalahan saat menghubungi server');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-lg w-96">
                <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" 
                            className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan username" />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" 
                            className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan password" />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;