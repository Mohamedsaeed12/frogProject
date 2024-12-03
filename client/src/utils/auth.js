const getToken = () => {
    return localStorage.getItem('token');
};

const setToken = (token) => {
    localStorage.setItem('token', token);
};

const removeToken = () => {
    localStorage.removeItem('token');
};

const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

export { getToken, setToken, removeToken, getAuthHeaders }; 