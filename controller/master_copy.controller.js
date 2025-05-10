const { sql, poolPromise } = require('../db');

// Fetch Pending Requests with Pagination
const getPendingMasters = async (page = 1, limit = 10) => {
    try {
        const pool = await poolPromise;

        const offset = (page - 1) * limit;
        const sqlQuery = `
            SELECT * FROM Masters_Copy
            WHERE Status = 0
            ORDER BY Created_On
            OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
        `;

        const result = await pool.request().query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching pending masters:', err.message);
        throw err;
    }
};

// Approve Master Request
const approveMaster = async (id) => {
    try {
        const pool = await poolPromise;

        const sqlQuery = `
            UPDATE Masters_Copy
            SET Status = 1, Updated_On = GETDATE()
            WHERE Id = ${id};
        `;

        const result = await pool.request().query(sqlQuery);
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error approving master:', err.message);
        throw err;
    }
};

// Update Master Fields
const updateMasterFields = async (id, fields) => {
    try {
        const pool = await poolPromise;

        const updates = Object.entries(fields)
            .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
            .join(', ');

        const sqlQuery = `
            UPDATE Masters_Copy
            SET ${updates}, Updated_On = GETDATE()
            WHERE Id = ${id};
        `;

        const result = await pool.request().query(sqlQuery);
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error updating master fields:', err.message);
        throw err;
    }
};

// Reject Master Request
const rejectMaster = async (id, rejectionReason) => {
    try {
        const pool = await poolPromise;

        const sqlQuery = `
            UPDATE Masters_Copy
            SET Status = -1, Updated_On = GETDATE(), Rejection_Reason = ${rejectionReason ? `'${rejectionReason}'` : 'NULL'}
            WHERE Id = ${id};
        `;

        const result = await pool.request().query(sqlQuery);
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error rejecting master:', err.message);
        throw err;
    }
};// Get Active Masters
const getActiveMasters = async (page, limit) => {
    try {
        const pool = await poolPromise;

        // Calculate pagination offset
        const offset = (page - 1) * limit;

        const sqlQuery = `
            SELECT Id, Trader_Id, Name, Time, Inc_percent, Inc_USD, Win_Rate, AUM, Updated_On, Created_On
            FROM Masters_Copy
            WHERE Status = 1
            ORDER BY Created_On DESC
            OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;

            SELECT COUNT(*) AS TotalCount
            FROM Masters_Copy
            WHERE Status = 1;
        `;

        const result = await pool.request().query(sqlQuery);

        return {
            data: result.recordsets[0],
            total: result.recordsets[1][0].TotalCount,
        };
    } catch (err) {
        console.error('Error fetching active masters:', err.message);
        throw err;
    }
};

module.exports = { getPendingMasters, approveMaster, updateMasterFields, rejectMaster, getActiveMasters };

