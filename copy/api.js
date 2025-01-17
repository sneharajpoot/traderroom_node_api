// ./services/copy.service.js

const axios = require('axios');
const API_BASE_URL = 'http://164.132.247.26:6005/Home';

const tokenAuth = {
    mngid: "amok",
    password: "CsaWp2QOLdgk1n832QZULw=="
};

// Helper function to get token
let cachedToken = null;
let tokenExpiry = null;

async function getAuthToken() {
    if (cachedToken && tokenExpiry && tokenExpiry > Date.now()) {
        return cachedToken;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token`, tokenAuth);
        cachedToken = response.data.token;
        console.log("cachedToken", cachedToken)
        tokenExpiry = Date.now() + 15 * 60 * 1000; // Assuming token is valid for 15 minutes
        return cachedToken;
    } catch (error) {
        console.error("Error generating token:", error.response?.data || error.message);
        throw new Error('Error generating token');
    }
}

// Add Manager
exports.addManager = async (mngId, serverIp, pasword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/AddMng`, { mngId, serverIp, pasword });
        return response.data;
    } catch (error) {
        console.error("Error adding manager:", error.response?.data?.result || error.message);
        throw new Error(error.response?.data?.result || 'Error adding manager');
    }
};
// Remove Master
exports.removeManager = async (userid , password ) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/removeManager`, {
            "userid": userid,
            "password": password
          }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing master:", error.response?.data || error.message);
        throw new Error('Error removing master');
    }
};
// Generate Token
exports.generateToken = async () => {
    try {
        return await getAuthToken();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Manager Login
exports.loginManager = async (mngId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/managerLogin`, { mngId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in manager:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message || 'Error logging in manager');
    }
};

// Remove Master
exports.removeMaster = async (id) => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/removeMaster/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing master:", error.response?.data || error.message);
        throw new Error('Error removing master');
    }
};

// Add Master
exports.addMaster = async (masterData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/addMaster`, masterData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding master:", error.response?.data || error.message);
        throw new Error('Error adding master');
    }
};

// Add User
exports.addUser = async (userData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/AddUser`, userData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
        throw new Error('Error adding user');
    }
};

// Open Trade
exports.openTrade = async (tradeData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/opentrade`, tradeData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error opening trade:", error.response?.data || error.message);
        throw new Error('Error opening trade');
    }
};

// Close Order
exports.closeOrder = async (orderData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/closeOrder`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error closing order:", error.response?.data || error.message);
        throw new Error('Error closing order');
    }
};
