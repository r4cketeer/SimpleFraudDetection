'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { getAuthHeader } from '@/utils/authHeader';
import QueuesListCard from "@/components/QueuesListCard";

const QueuesPage = () => {
    const [queues, setQueues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueues = async () => {
        setLoading(true);
        try {
            const headers = getAuthHeader();
            if (!headers) throw new Error("Missing auth info");
            
            let url = `${process.env.NEXT_PUBLIC_API_HOST}/queues`;
            const params = new URLSearchParams();
            
            const res = await fetch(url, {
                headers
            });

            if (!res.ok) throw new Error("Failed to fetch queues");

            const data = await res.json();
            setQueues(data.events || []);
        } catch (err) {
            console.error("Error fetching queues:", err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleApplyFilter = () => {
        fetchQueues();
    };

    useEffect(() => {        
        fetchQueues();
    }, []);

    return (
        <>
            {loading ? (
                <div className="p-6 text-gray-500">Loading events...</div>
            ) : (
                <QueuesListCard events={queues} />
            )}
        </>
    );
}

export default QueuesPage;
  