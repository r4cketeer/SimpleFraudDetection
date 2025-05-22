import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { fetchMasterData } from '@/utils/fetchMasterData';
import { getAuthHeader } from '@/utils/authHeader';

const RulesNewCard = ({ rule = null }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [masterDatas, setMasterDatas] = useState({});

    const [id, setId] = useState(rule?._id || "");
    const [formData, setFormData] = useState({
        name: rule?.name || "",
        description: rule?.description || "",
        condition_type: rule?.condition_type || "",
        field: rule?.field || "",
        blacklist: rule?.blacklist ? rule.blacklist.join(", ") : "",
        priority: rule?.priority ? String(rule.priority) : "",
        active: rule?.active === true ? "1" : rule?.active === false ? "0" : "",
    });
    
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const headers = getAuthHeader();
            if (!headers) throw new Error("Missing auth info");
            let url = `${process.env.NEXT_PUBLIC_API_HOST}/rules/save`;

            const payload = {
                ...formData,
                _id: id,
                blacklist: formData.blacklist
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item !== ""),
                priority: Number(formData.priority),
                active: Number(formData.active)
            };

            const res = await fetch(url, {headers,
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save rule");    
            else router.replace('/rules');

        } catch (err) {
            setError(err.message || String(err));
            setLoading(false);
        }
    };

    useEffect(() => {
        const getMasterdatas = async () => {
            const data = await fetchMasterData(["rule_types"]);
            if (data) {
                setMasterDatas(data);                
            }
        };

        getMasterdatas();
    }, []);

    return (           
        <div className="bg-white rounded-sm shadow-md p-6 overflow-x-auto">
            <form onSubmit={handleSubmit}
                className="space-y-4">
                <div>
                    <label htmlFor="name" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Input rule name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div>
                    <label htmlFor="description" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea id="description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Input rule description"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        value={formData.description} />
                </div>

                <div>
                    <label htmlFor="condition_type" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Condition Type
                    </label>
                    <select id="condition_type"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFormData({ ...formData, condition_type: e.target.value })} 
                        value={formData.condition_type}>
                        <option value="">Select Condition</option>
                        {masterDatas["rule_types"] && masterDatas["rule_types"].map(rule_type => (
                            <option key={rule_type} value={rule_type}>
                                {rule_type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="field" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Field
                    </label>
                    <input type="text"
                        id="field"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Input field name"
                        value={formData.field}
                        onChange={(e) => setFormData({ ...formData, field: e.target.value })} />
                </div>

                <div>
                    <label htmlFor="blacklist" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Blacklist
                    </label>
                    <textarea id="blacklist"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Input blacklist rule with comma separated. Eg: 127.0.0.1, 127.0.0.2"
                        onChange={(e) => setFormData({ ...formData, blacklist: e.target.value })} 
                        value={formData.blacklist} />
                </div>

                <div>
                    <label htmlFor="priority" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <input type="number"
                        id="priority"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Input priority rule"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })} />
                </div>

                <div>
                    <label htmlFor="active" 
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Active
                    </label>
                    <select id="active"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFormData({ ...formData, active: e.target.value })}
                        value={formData.active}>
                        <option value="">Select status</option>
                        <option value="1">Active</option>
                        <option value="0">Disabled</option>
                    </select>
                </div>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button type="submit"
                    disabled={loading}
                    className={`w-full py-2 font-semibold rounded-md focus:outline-none
                        ${loading
                        ? "bg-blue-300 cursor-not-allowed text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    >
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default RulesNewCard;
