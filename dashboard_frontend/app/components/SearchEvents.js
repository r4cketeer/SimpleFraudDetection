import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function SearchEvents() {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const handleSearch = () => {
        if (query.trim() === "") return;

        localStorage.setItem("searchQuery", query);

        router.push(`/events?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="bg-white p-6 shadow-xl flex">                    
            <input type="text"
                placeholder="Search events..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-0 focus:border-gray-300" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} />
            
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-sm hover:bg-blue-600"
                onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}
