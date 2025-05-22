import React from "react";
import { Circle, Eye } from 'lucide-react';

const RulesListCard = ({ rules }) => {
    return (           
        <div className="bg-white rounded-sm shadow-md p-6 overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="border-b">
                    <tr>
                        <th>#</th>
                        <th>Priority</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Fields</th>
                        <th className="text-left p-2">Value</th>
                        <th className="text-left p-2">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {rules.map((rule) => (
                        <tr key={rule._id} 
                            className="border-t hover:bg-gray-50 p-4">
                            <td className="p-2 text-center"
                                width={50}>
                                <a className="flex items-center justify-center h-full text-blue-600 hover:text-blue-800 p-1 rounded-sm"
                                    href={`/rules/${rule._id}`}>
                                    <Eye size={16} />
                                </a>
                            </td>
                            <td className="p-2 text-center"
                                width={100}>
                                {rule.priority}
                            </td>
                            <td className="p-2">{rule.name}</td>
                            <td className="p-2">{rule.condition_type}</td>
                            <td className="p-2">{rule.field}</td>
                            <td className="p-2">{rule.blacklist.join(", ")}</td>
                            <td className="p-2"
                                width={50}>
                                <div className="flex items-center justify-center h-full">
                                    <Circle size={16} 
                                        color={rule.active ? 'green' : 'red'} 
                                        fill={rule.active ? 'green' : 'red'} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>            
        </div>
    );
};

export default RulesListCard;
