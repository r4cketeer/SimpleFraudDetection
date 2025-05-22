import React, { useState, useEffect } from "react";

import { fetchMasterData } from '@/utils/fetchMasterData';

const EventFilterCard = ({
    eventType,
    setEventType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onApply,
}) => {
    const [loading, setLoading] = useState(true);
    const [masterDatas, setMasterDatas] = useState([]);

    useEffect(() => {
        const getMasterdatas = async () => {
            setLoading(true);
            
            const data = await fetchMasterData(["event_types"]);
            if (data) {
                setMasterDatas(data);
            }
            setLoading(false);
        };

        getMasterdatas();
    }, []);

    return (
        <div className="bg-white rounded-md shadow p-6">
            <h3 className="text-md font-semibold mb-3">Filter Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm mb-1">Event Type</label>
                    <select value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full border rounded p-2">
                        <option value="">All</option>
                        {!loading && masterDatas["event_types"] && masterDatas["event_types"].map(event_type => (
                            <option key={event_type} 
                                value={event_type}>
                                {event_type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Start Date</label>
                    <input type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block text-sm mb-1">End Date</label>
                    <input type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border rounded p-2" />
                </div>
            </div>
            <button
                onClick={onApply}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Apply Filter
            </button>
        </div>
    );
};

export default EventFilterCard;
