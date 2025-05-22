import React from "react";
import { X } from "lucide-react";

const EventDetailSlider = ({ event, onClose }) => {
    return (
        <div
            className={`fixed overflow-auto top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                event ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Event Detail</h3>
                <button onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            <div className="p-4 text-sm text-gray-800 space-y-2">
                {event && (
                    <>
                    {Object.entries(event)
                        .filter(([key]) => !["_id", "timestamp", "action", "evaluate_timestamp"].includes(key))
                        .map(([key, value]) => {
                        const titleCaseKey = key.replace(/([A-Z])/g, " $1")
                            .replace(/^./, str => str.toUpperCase());
                        return (
                            <p key={key}>
                                <strong>{titleCaseKey}:</strong> {String(value)}
                            </p>
                        );
                    })}

                    <hr className="my-4" />

                    {Object.entries(event)
                        .filter(([key]) => ["_id", "timestamp", "evaluate_timestamp"].includes(key))
                        .map(([key, value]) => {
                        const titleCaseKey = key.replace(/([A-Z])/g, " $1")
                            .replace(/^./, str => str.toUpperCase());
                        return (
                            <p key={key}>
                                <strong>{titleCaseKey}:</strong> {String(value)}
                            </p>
                        );
                    })}

                    {"action" in event && typeof event.action === "object" && (
                        <>
                            <p className="font-bold">Action:</p>
                            <ul className="list-disc list-inside ml-2 text-gray-700">
                                {Object.entries(event.action).map(([actionKey, actionValue]) => (
                                    <li key={actionKey}>
                                        {actionKey}: {String(actionValue)}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EventDetailSlider;