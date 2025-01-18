// ./services/copy.service.js

const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL || 'http://164.132.247.26:6005/Home';
const tokenAuth = {
    mngid: process.env.MNGID || "amok",
    password: process.env.PASSWORD || "CsaWp2QOLdgk1n832QZULw=="
};

let cachedToken = null;
let tokenExpiry = null;

// Helper: Get Auth Token
async function getAuthToken() {
    if (cachedToken && tokenExpiry && tokenExpiry > Date.now()) {
        return cachedToken;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token`, tokenAuth);
        cachedToken = response.data.token;
        tokenExpiry = Date.now() + 15 * 60 * 1000; // Token validity for 15 minutes
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

// Remove Manager mngId
exports.removeManager = async (userid, password) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/removeManager`, { userid, password }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing manager:", error.response?.data || error.message);
        throw new Error('Error removing manager');
    }
};

// Login Manager
exports.managerLogin = async (mngId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/managerLogin`, { mngId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in manager:", error.response?.data || error.message);
        throw new Error('Error logging in manager');
    }
};
// Login Manager
exports.managerLogout = async (mngId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/managerLogout`, { mngId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in manager:", error.response?.data || error.message);
        throw new Error('Error logging in manager');
    }
};

// Login Manager
exports.connectionStatus = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/connectionStatus`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in manager:", error.response?.data || error.message);
        throw new Error('Error logging in manager');
    }
};

// 
exports.resetDB = async (mngId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/resetDB`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error resetDB in manager:", error.response?.data || error.message);
        throw new Error('Error resetDB in manager');
    }
};

exports.getMasters = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/getMasters`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getMasters in manager:", error.response?.data || error.message);
        throw new Error(error.response?.data || error.message || 'Error getMasters in manager');
    }
};

// Logout Manager
exports.logoutManager = async (mngId) => {
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
        throw new Error(error.response?.data?.result || error.message || 'Error adding master');
    }
};
// Remove Master
exports.removeMaster = async (userid) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/removeMaster/${id}`,{userid}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing master:", error.response?.data || error.message);
        throw new Error('Error removing master');
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
        throw new Error(error.response?.data?.result || error.message || 'Error adding user');
    }
};

// Add User
exports.updateUser = async (userData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/updateUser`, userData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
        throw new Error(error.response?.data?.result || error.message || 'Error adding user');
    }
};

// Add User
exports.removeUser = async (userid) => {
    try {
        const token = await getAuthToken();
        const response = await axios.post(`${API_BASE_URL}/removeUser`, { userid }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
        throw new Error(error.response?.data?.result || error.message || 'Error adding user');
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

// Get API Log
exports.getAPILog = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/getAPILog`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching API log:", error.response?.data || error.message);
        throw new Error('Error fetching API log');
    }
};

// Get App Log
exports.getAppLog = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/getAppLog`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching app log:", error.response?.data || error.message);
        throw new Error('Error fetching app log');
    }
};
