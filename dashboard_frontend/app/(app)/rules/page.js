'use client';
import { useState, useEffect } from "react";

import { getAuthHeader } from '@/utils/authHeader';
import RulesListCard from "@/components/RulesListCard";

const RulesPage = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRules = async () => {
        setLoading(true);
        try {
            const headers = getAuthHeader();
            if (!headers) throw new Error("Missing auth info");
            
            let url = `${process.env.NEXT_PUBLIC_API_HOST}/rules`;
            const params = new URLSearchParams();
            
            const res = await fetch(url, {
                headers
            });

            if (!res.ok) throw new Error("Failed to fetch rules");

            const data = await res.json();
            setRules(data.rules || []);
        } catch (err) {
            console.error("Error fetching rules:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {        
        fetchRules();
    }, []);

    return (
        <>
            {loading ? (
                <div className="p-6 text-gray-500">Loading...</div>
            ) : (
                <>
                    <div className="mb-2 flex justify-end">
                        <a href="/rules/new"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-sm shadow transition">
                            New Rule 
                        </a>
                    </div>
                    <RulesListCard rules={rules} />
                </>
            )}
        </>
    );
}

export default RulesPage;
  