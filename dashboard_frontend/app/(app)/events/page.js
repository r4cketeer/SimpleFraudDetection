'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { getAuthHeader } from '@/utils/authHeader';
import EventsListCard from "@/components/EventsListCard";
import EventFilterCard from "@/components/EventFilterCard";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter state
    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().slice(0, 10); // ambil YYYY-MM-DD dari ISO string
    };

    const [eventType, setEventType] = useState("");
    const [startDate, setStartDate] = useState(getTodayDateString());
    const [endDate, setEndDate] = useState(getTodayDateString());
    const [queryString, setQueryString] = useState("");
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const headers = getAuthHeader();
            if (!headers) throw new Error("Missing auth info");
            
            const storedQuery = localStorage.getItem("searchQuery");
            
            let url = `${process.env.NEXT_PUBLIC_API_HOST}/events`;
            const params = new URLSearchParams();
            if (startDate) params.append("start_date", startDate);
            if (endDate) params.append("end_date", endDate);
            if (eventType) params.append("event_type", eventType)
            if (query) params.append("query", query)

            const queryString = params.toString();
            if (queryString) url += `?${queryString}`;

            const res = await fetch(url, {
                headers
            });

            if (!res.ok) throw new Error("Failed to fetch events");

            const data = await res.json();
            setEvents(data.events || []);
            setQueryString(queryString)
        } catch (err) {
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleApplyFilter = () => {
        fetchEvents({ eventType });
    };

    useEffect(() => {        
        fetchEvents();
    }, [query]);

    return (
        <>
            <EventFilterCard
                eventType={eventType}
                setEventType={setEventType}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onApply={handleApplyFilter}
            />

            {loading ? (
                <div className="p-6 text-gray-500">Loading events...</div>
            ) : (
                <EventsListCard events={events}
                    searchQuery={queryString} />
            )}
        </>
    );
}

export default EventsPage;
  