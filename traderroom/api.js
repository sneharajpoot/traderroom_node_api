const axios = require('axios');
// const rootUrl = 'https://service.fxbrokertools.com/fxfzm_com_test'; // Replace with your actual API URL
const rootUrl =  process.env.ROOT_Url ;
const getOpenTrade = async (Account) => {
    try {
        // API URL
        const url = `${rootUrl}/GetOpenTradeByUser`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?Account=${Account}`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}

const getUserInfo = async (lstAccount) => {
    try {
        // API URL
        const url = `${rootUrl}/GetUserInfoAll`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?lstAccount=${lstAccount.join(',')}&type=0`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}

const GetUserInfoByAccountList = async (lstAccount) => {
    try {
        // API URL
        const url = `${rootUrl}/GetUserInfoByAccountList`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': '1',
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?lstAccount=${lstAccount.join(',')}&type=0`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}

const GetOpenTradeByUsers = async (lstAccount) => {
    try {
        // API URL
        const url = `${rootUrl}/GetOpenTradeByUsers`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?lstAccount=${lstAccount.join(',')}`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}


const getUsersOpenTradeNew = async (lstAccount) => {
    try {
        // API URL
        const url = `${rootUrl}/GetOpenTradeByUsersNew`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?lstAccount=${lstAccount.join(',')}`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}


const GetOpenTrade = async (MT5Accont) => {
    //GetOpenTrade?MT5Accont={MT5Accont}

    // const  getUsersOpenTrade = async (lstAccount) => {
    try {
        // API URL
        const url = `${rootUrl}/GetOpenTrade`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?MT5Accont=${MT5Accont}`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}



const GetCloseTrade = async (MT5Accont,   _StartTm,  _EndTm) => {
    //GetOpenTrade?MT5Accont={MT5Accont}

    // const  getUsersOpenTrade = async (lstAccount) => {
    try {
        // API URL
        const url = `${rootUrl}/GetCloseTrade`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?MT5Accont=${MT5Accont}&_StartTm=${_StartTm}&_EndTm=${_EndTm}`;

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
        // API URL
        const url = `${rootUrl}/GetCloseTradeAllAccount`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?lstAccount=${lstAccount.join(',')}&_StartTm=${_StartTm}&_EndTm=${_EndTm}`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}
const GetCloseTradeAllAccountWithoutOpenPrice  = async (lstAccount, _StartTm, _EndTm) => {
    try {
        // API URL
        const url = `${rootUrl}/GetCloseTradeAllAccount`; // Replace with your actual API URL

        // Request headers
        const headers = {
            'x-token': '1000', // Replace with your x-token value
            'type': 1,
            'Content-Type': 'application/json'
        };

        // Request params (if lstAccount is a list of account numbers)
        const queryParams = `?lstAccount=${lstAccount.join(',')}&_StartTm=${_StartTm}&_EndTm=${_EndTm}`;

        // Make the GET request
        const response = await axios.get(url + queryParams, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error calling GetUserInfoAll API:', error.message);
        throw error;
    }
}
module.exports = { getUserInfo, GetUserInfoByAccountList, GetOpenTradeByUsers, getOpenTrade, GetOpenTrade, getUsersOpenTradeNew,
    GetCloseTrade, GetCloseTradeAllAccount, GetCloseTradeAllAccountWithoutOpenPrice 
 };

// Example usage
// (async () => {
//     const accounts = [123, 456, 789]; // Replace with your list of account numbers
//     try {
//         const result = await getUserInfoAll(accounts);
//         console.log('User Info:', result);
//     } catch (err) {
//         console.error('Failed to fetch user info:', err.message);
//     }
// })();
