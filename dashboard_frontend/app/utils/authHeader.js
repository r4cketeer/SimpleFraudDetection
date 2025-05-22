export function getAuthHeader() {
    const userId = localStorage.getItem('user_id');
    const sessionKey = localStorage.getItem('session_key');

    if (!userId || !sessionKey) return null;

    const token = btoa(`${userId}:${sessionKey}`);

    return {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
    };
}