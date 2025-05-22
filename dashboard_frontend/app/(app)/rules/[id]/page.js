'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';

import { getAuthHeader } from '@/utils/authHeader';
import RulesNewCard from "@/components/RulesNewCard";

const NewRulesPage = () => {
    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const [rule, setRule] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchRules = async () => {
        setLoading(true);
        try {
            const headers = getAuthHeader();
            if (!headers) throw new Error("Missing auth info");
            
            let url = `${process.env.NEXT_PUBLIC_API_HOST}/rules/detail?id=${id}`;
            const res = await fetch(url, {headers});

            if (!res.ok) throw new Error("Failed to fetch rules");
            const data = await res.json();
            
            if (
                !data.rules ||
                data.rules.length === 0 ||
                Object.keys(data.rules[0] || {}).length === 0
            ) {
                router.replace('/rules');
                return;
            }

            else {
                setRule(data.rules[0]);
                setLoading(false);
            }
        } catch (err) {
            console.error("Error fetching rules:", err);
        }
    };

    useEffect(() => {        
        fetchRules();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Rule</h1>

            {loading ? (
                <div className="p-6 text-gray-500">Loading...</div>
            ) : (
                <RulesNewCard rule={rule} />
            )}
            
            
        </>
    );
}

export default NewRulesPage;
  