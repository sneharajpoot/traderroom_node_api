const axios = require('axios');
// const rootUrl = 'https://service.fxbrokertools.com/fxfzm_com_test'; // Replace with your actual API URL
const rootUrl = process.env.ROOT_Url;
const GetGroups = async () => {
    try {
        // API URL
        const url = `${rootUrl}/GetGroups`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'x-id':0,
            'type': 1,
            'Content-Type': 'application/json'
        };


        // Make the GET request
        const response = await axios.get(url, { headers });

        return response.data;
    } catch (error) {
        console.error('Error calling GetGroups API:', error.message);
        throw error;
    }
}
const GetCloseTrade = async (MT5Accont, _StartTm, _EndTm) => {
    try {
        let queryParams = `?MT5Accont=${MT5Accont}&_StartTm=${_StartTm}&_EndTm=${_EndTm}`;
        // API URL
        const url = `${rootUrl}/GetCloseTrade`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetCloseTrade API:', error.message);
        throw error;
    }
}
const GetCloseTradeAllAccount = async (lstAccount, _StartTm, _EndTm) => {
    try {
        let queryParams = `?lstAccount=${lstAccount.join(',')}&_StartTm=${_StartTm}&_EndTm=${_EndTm}`;

        // API URL
        const url = `${rootUrl}/GetCloseTradeAllAccount`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Make the GET request
        // const response = await axios.get(url, { headers });
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetCloseTradeAllAccount API:', error.message);
        throw error;
    }
}
// https://service.fxbrokertools.com/fxfzm_com1/TimeServer
const TimeServer = async () => {
    try {
        // API URL
        const url = `${rootUrl}/TimeServer`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Make the GET request
        const response = await axios.get(url, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling TimeServer API:', error.message);
        throw error;
    }
}
module.exports = { GetGroups, GetCloseTrade, GetCloseTradeAllAccount, TimeServer };