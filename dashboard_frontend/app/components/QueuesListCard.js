import React, { useState } from "react";

const QueuesListCard = ({ events }) => {
    return (           
        <div className="bg-white rounded-sm shadow-md p-6 overflow-x-auto">
            {events.map((event) => (
                <div key={event._id} 
                    className="border-t hover:bg-gray-50 p-4">
                    {JSON.stringify(event, null, 2)}
                </div>
            ))}
        </div>
    );
};

export default QueuesListCard;
