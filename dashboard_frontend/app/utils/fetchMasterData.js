export const fetchMasterData = async (include = []) => {
    const query = include.length > 0
        ? `?include=${include.join(",")}`
        : "";

    const url = `${process.env.NEXT_PUBLIC_API_HOST}/masterdata${query}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to fetch master data: ${res.status} - ${text}`);
        }

        const json = await res.json();
        return json || {};
    } catch (err) {
        console.error("Error fetching master data:", err);
        return null;
    }
};