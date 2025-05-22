import React, { useState } from "react";
import { Eye } from "lucide-react";

import EventDetailSlider from "@/components/EventDetailSlider";

const EventsListCard = ({ events, searchQuery }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const closePanel = () => setSelectedEvent(null);

    return (
        <div className="relative">
            <div className="bg-white rounded-sm shadow-md mt-6 p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4">Events</h2>
                {searchQuery && (
                    <div className="mb-4 text-sm text-gray-600">
                        <span className="font-semibold">Query string:</span> {searchQuery}
                    </div>
                )}
                
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="border-b">
                    <tr>
                        <th>#</th>
                        <th className="text-left p-2">Event Time</th>
                        <th className="text-left p-2">Event ID</th>
                        <th className="text-left p-2">Event Type</th>
                        <th className="text-left p-2">Customer ID</th>
                    </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id} className="border-t hover:bg-gray-50">
                                <td className="p-2 text-center"
                                    width={50}>
                                    <button className="text-blue-600 hover:text-blue-800 p-1 rounded-sm"
                                        onClick={() => setSelectedEvent(event)}>
                                        <Eye size={18} />
                                    </button>
                                </td>
                                <td className="p-2">{ event.eventTime }</td>
                                <td className="p-2">{ event.eventId }</td>
                                <td className="p-2">{ event.eventType }</td>
                                <td className="p-2">{ event.customerId }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EventDetailSlider event={selectedEvent} 
                onClose={closePanel} />
        </div>
    );
};

export default EventsListCard;
