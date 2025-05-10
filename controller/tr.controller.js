const { sql, poolPromise } = require('../db');
const managerApi = require('../traderroom/manager-api')


// Fetch Pending Requests with Pagination
const GetGroups = async () => {
    try {

        const result = await managerApi.GetGroups();
        return result;
    } catch (err) {
        console.error('Error fetching GetGroups:', err.message);
        throw err;
    }
};


module.exports = { GetGroups };

