// copy.controller.js

const { resetDB, removeManager,
    addManager, managerLogin, managerLogout,
    getMasters, generateToken,

    connectionStatus, addMaster, removeMaster, addUser,
    openTrade, closeOrder, removeUser, updateUser, getUsers,
    updatePriceTime, getAppLog, getAPILog
} = require('../copy/api.js');

const { sql, poolPromise } = require('../db');

/**
 * URL: http://<host>:<port>//home/AddMng
 * Method: POST
 * Input: { "mngId": 0, "serverIp": null, "pasword": null }
 * mngId -> int (MT5 manager account number)
 * serverIP -> string (MT5 server IP address)
 * pasword -> string (MT5 manager account password)
 * Note: Before adding new manager account, remove the previous account.
 */
exports.addManager = async (data) => {
    try {

        const pool = await poolPromise;
        const request = pool.request();

        console.log("data", data)

        // Retrieve manager details from the database
        const managerDetails = await request.query(`
        SELECT TOP 1 [ManagerId], [ServerConfig], [Password], [Active], [ServerName]
        FROM [dbo].[MT5_Manager]
        WHERE [ManagerId] = ${data.ManagerId}
    `);

        if (managerDetails.recordset.length === 0) {
            throw new Error("Manager details not found");
        }

        // const manager = managerDetails.recordset[0];
        // console.log("managerDetails", manager)

        const manager = {
            "ServerName": "Demo Server",
            "ManagerId": 10033,
            "ServerConfig": "176.126.66.21:443",
            "Password": "September@2024"

        }

        // Insert data into the database before calling addManager
        let addMng = await request.query(`
        INSERT INTO [dbo].[Copy_Add_Manager]
            (TraderId,[Name], [Mt5MngId], [MngId], [ServerIp], [Pasword], [Result], [Useid], [Password], [CreateBy], [CreatedDate], [UpdateDate])
        VALUES
            (0,'${manager.ServerName}', ${manager.ManagerId}, ${manager.ManagerId}, '${manager.ServerConfig}', '${manager.Password}', '', 0, '', '', GETDATE(), GETDATE())
    `);
        console.log("addMng", addMng.rowsAffected)

        /**
         * result = {
        "result": "Token userid/password",
        "useid": 10033,
        "password": "LKq7EGHsMXIfV0osLs2M4g=="
    }
         */
        const result = await addManager(manager.ManagerId, manager.ServerConfig, manager.Password);

        console.log("result", result)
        // Update the result in the database after calling addManager
        let usql = ` UPDATE [dbo].[Copy_Add_Manager] SET 
        [Result] = '${result.result}',  Useid = '${result.useid}',  [Password] = '${result.password}'
        WHERE [MngId] = ${manager.ManagerId} AND [ServerIp] = '${manager.ServerConfig}' `;
        let updatMng = await request.query(usql);

        console.log("updatMng", updatMng)

        return result;
    } catch (error) {
        console.log("error", error)
        throw new Error(error.message || "Error while adding manager");

    }
};
// get list of manage details db  and from api 
exports.getManagerDetails = async () => {
    const pool = await poolPromise;
    const request = pool.request();

    // Retrieve manager details from the database
    const managerDetails = await request.query(` SELECT * FROM [Copy_Add_Manager] `);

    if (managerDetails.recordset.length === 0) {
        throw new Error("Manager details not found");
    }

    const manager = managerDetails.recordset;


    return { managerDB: manager };
};
exports.removeManager = async (data) => {
    return await removeManager(data.mngId, data.serverIp, data.pasword);
};

/**
 * URL: http://<host>:<port>//home/token
 * Method: POST
 * Input: { "mngid": null, "password": null }
 * mngid -> String (MT5 manager Account id)
 * password -> string (encrypted password returned by the API when you add manager account)
 */
exports.generateToken = async () => {
    return await generateToken();
};

/**
 * URL: http://<host>:<port>//home/managerLogin
 * Method: POST
 * Input: { "mngId": 0 }
 * mngId -> int (MT5 manager Account id)
 */
exports.managerLogin = async () => {
    const pool = await poolPromise;
    const request = pool.request();

    // console.log("data", data)

    // Retrieve manager details from the database
    const managerDetails = await request.query(`
    SELECT TOP 1 [ManagerId], [ServerConfig], [Password], [Active], [ServerName]
    FROM [dbo].[MT5_Manager] 
`);

    if (managerDetails.recordset.length === 0) {
        throw new Error("Manager details not found");
    }

    const manager = managerDetails.recordset[0];
    console.log("managerDetails", manager)

    return await managerLogin(manager.ManagerId);
    // return await managerLogin(10033);
};
exports.managerLogout = async (mngId) => { 
    return await managerLogout(mngId); 
};

exports.connectionStatus = async () => {
    return await connectionStatus();
};


// get list of manage details db  and from api 
exports.getSlaveDetails = async (MasterId) => {
    const pool = await poolPromise;
    const request = pool.request();

    // Retrieve Master details from the database
    const slaveDetails = await request.query(` SELECT  * FROM  Copy_Slave `);

    if (slaveDetails.recordset.length === 0) {
        throw new Error("Slave details not found");
    }

    const slave = slaveDetails.recordset;

    return { slaveDB: slave };
};

exports.resetDB = async () => {
    const pool = await poolPromise;
    const request = pool.request();

    // truncate table before reset
    const reseTbl = await request.query(`  truncate table [Copy_Slave]; truncate table [Copy_Add_Manager];
 truncate table [Copy_Master]; 
 truncate table [Copy_Master_Performance]`)
    console.log("reseTbl", reseTbl)

    return await resetDB();
};

/**
 * URL: http://<host>:<port>/home/addMaster
 * Method: POST
 * Input: {
 *   "masterid": 0,
 *   "masterAccountNumber": 0,
 *   "password": "string",
 *   "name": "string",
 *   "numSalves": 0,
 *   "salveseidt": true,
 *   "accountType": 0
 * }
 * accountType: 0 -> hedding, 1 -> netting
 * Output: Successfully {result=” Master added successfully”, mastered=<Master account>} 
 * Fail: Conflict ({result="master is already exist", accountId=<masters id>})
 */
exports.addMaster = async (data) => {
    try {
        console.log("data", data)
        if (!data.TraderId) {
            throw new Error("TraderId is mandatory");
        }

        const pool = await poolPromise;
        const request = pool.request();

        // Insert data into the database before calling addMaster
        let sql = `
        INSERT INTO [dbo].[Copy_Master]
            ([MasterId], [MasterAccountNumber], [Password], [Name], [NumSalves], [SalveSeidt], [AccountType], [TraderId], [CreatedBy], [CreatedDate], [UpdatedDate], [Status], [Comment], [Result], [AccountId])
        VALUES
            (0, ${data.masterAccountNumber}, '${data.password}', '${data.name}', ${data.numSalves}, ${data.salveseidt ? 1 : 0}, ${data.accountType}, ${data.TraderId}, '', GETDATE(), GETDATE(), 0, '', '', 0)
    `;

        console.log("sql", sql)
        await request.query(sql);
        await exports.addPerformance({
            "Name": data.name,
            "Time": '',
            "IncPercent": 0,
            "IncUsd": 0,
            "WinRate": 0,
            "AUM": 0,
            "TraderId": data.TraderId,
            "MasterAccount": data.masterAccountNumber
        });

        const result = await addMaster(data);
        console.log("result", result)


        // Update the result in the database after calling addMaster
        let mres = await request.query(` UPDATE [dbo].[Copy_Master] SET [Result] = '${JSON.stringify(result)}'
        WHERE  [MasterAccountNumber] = ${data.masterAccountNumber}  ;
        UPDATE MT5_Profile_Account SET AccountType = 'Master' WHERE MT5AccountId =${data.masterAccountNumber} ;
         
    `);
        console.log("mres", mres)

        return result;

    } catch (error) {
        console.log("error", error)
        throw new Error(error.message || "Error while adding master");
    }
};

// get list of manage details db  and from api 
exports.getMasterDetails = async () => {
    const pool = await poolPromise;
    const request = pool.request();

    // Retrieve Master details from the database
    const masterDetails = await request.query(` SELECT  * FROM  Copy_Master `);

    if (masterDetails.recordset.length === 0) {
        throw new Error("Master details not found");
    }

    const master = masterDetails.recordset;

    let masterlive = [];

    try {
        masterlive = await getMasters();

    } catch (error) {
        console.error("Error getMasters: ", error)
    }

    return { masterDB: master, masterlive: masterlive };
};
/**
 * URL: http://<host>:<port>/Home/removeMater/{id}
 * Method: GET
 * Input: id -> Master account number (master must not be attached to any slave)
 * Output: Successfully {result=”Master removed successfully”, masterId=<master id>}
 * Fail: {result=$"master contain slave accounts {count}", masterId=id}
 */
exports.removeMaster = async (data) => {
    return await removeMaster(data.id);
};

/**
 * URL: http://<host>:<port>//home/addSlave
 * Method: POST
 * Input: {
 *   "id": 0,
 *   "loginid": 0,
 *   "mloginid": 0,
 *   "message": null,
 *   "type": 0,
 *   "tradeType": 0,
 *   "fixvolume": 0.0,
 *   "priceType": 0,
 *   "mutlipler": 0,
 *   "roundof": false,
 *   "minLot": false,
 *   "sptp": false
 * }
 * Description: Add a slave with the given details.
 */
exports.addSlave = async (data) => {
    console.log("data", data)
    if (!data.TraderId) {
        throw new Error("TraderId is mandatory");
    }

    const pool = await poolPromise;
    const request = pool.request();

    // Insert data into the database before calling addUser
    console.log("data", data)
    let sql = ` INSERT INTO [dbo].[Copy_Slave]
            ([LoginId], [MLoginId], [Message], [Type], [TradeType], [FixVolume], [PriceType], [Multiplier], [RoundOf], [MinLot], [SPTP], [Percentage], [AccountType], [Comment], [CreatedBy], [CreateDate], [UpdateDate], [Active], [TraderId])
        VALUES
            (${data.loginid}, ${data.mloginid}, '${data.message}', ${data.type}, ${data.tradeType}, ${data.fixvolume}, ${data.priceType}, ${data.mutlipler}, ${data.roundof ? 1 : 0}, ${data.minLot ? 0 : 1}, ${data.sptp}, 0, 0, '', '', GETDATE(), GETDATE(), 1, ${data.TraderId}) `;

    console.log("sql", sql)
    let resql = await request.query(sql);
    console.log("resql", resql)

    const result = await addUser(data);
    console.log("result", result)

    // Update the result in the database after calling addUser
    let usql = ` UPDATE [dbo].[Copy_Slave] SET [Comment] = '${JSON.stringify(result)}' 
    WHERE [LoginId] = ${data.loginid} AND [MLoginId] = ${data.mloginid};    
        UPDATE MT5_Profile_Account SET AccountType = 'Slave' WHERE MT5AccountId =${data.loginid} ;
          `;
    console.log("usql", usql)
    let ures = await request.query(usql);

    console.log("ures", ures)
    return result;
};



/**
 * URL: http://<host>:<port>//home/opentrade
 * Method: POST
 * Input: {
 *   "mloginid": 0,
 *   "loginid": 0,
 *   "dealid": 0,
 *   "symbol": null,
 *   "price": 0.0,
 *   "type": 0,
 *   "volume": 0,
 *   "comment": null,
 *   "priceType": 0,
 *   "positionID": 0
 * }
 * Description: Open a trade with the given parameters.
 */
exports.openTrade = async (data) => {
    return await openTrade(data.tradeData);
};

/**
 * URL: http://<host>:<port>//home/closeOrder
 * Method: POST
 * Input: { "positionId": 0, "price": 0.0 }
 * positionId -> Trade ticket
 * price -> Close price
 */
exports.closeOrder = async (data) => {
    return await closeOrder(data.orderData);
};

/**
 * URL: http://<host>:<port>//home/removeUser
 * Method: POST
 * Input: { "mngId": 0 }
 * mngId -> int (MT5 slave account id)
 */
exports.removeUser = async (data) => {
    return await removeUser(data.mngId);
};

/**
 * URL: http://<host>:<port>//home/updateuser
 * Method: POST
 * Input: {
 *   "id": 0,
 *   "loginid": 0,
 *   "mloginid": 0,
 *   "message": null,
 *   "type": 0,
 *   "tradeType": 0,
 *   "fixvolume": 0.0,
 *   "priceType": 0,
 *   "mutlipler": 0,
 *   "roundof": false,
 *   "minLot": false,
 *   "sptp": false
 * }
 */
exports.updateUser = async (data) => {
    return await updateUser(data.userData);
};

/**
 * URL: http://<host>:<port>//home/users
 * Method: GET
 * Description: Get the list of users.
 */
exports.getUsers = async () => {
    return await getUsers();
};

/**
 * URL: http://<host>:<port>//home/updatePriceTime
 * Method: POST
 * Input: {
 *   "positionid": 0,
 *   "price": 0.0,
 *   "year": 0,
 *   "month": 0,
 *   "day": 0,
 *   "hour": 0,
 *   "minute": 0,
 *   "second": 0,
 *   "openPriceUpdate": false,
 *   "openTimeUpdate": false
 * }
 */
exports.updatePriceTime = async (data) => {
    return await updatePriceTime(data);
};

/**
 * URL: http://<host>:<port>//home/getAppLog
 * Method: GET
 * Description: Get the application log.
 */
exports.getAppLog = async () => {
    return await getAppLog();
};

/**
 * URL: http://<host>:<port>//home/getAPILog
 * Method: GET
 * Description: Get the API log.
 */
exports.getAPILog = async () => {
    return await getAPILog();
};


// Add a record to Copy_Master_Performance
exports.addPerformance = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        let sql = `
        INSERT INTO [dbo].[Copy_Master_Performance]
            ([Name], [Time], [IncPercent], [IncUsd], [WinRate], [AUM], [TraderId], [MasterAccount])
        VALUES
            ('${data.Name}', '${data.Time}', ${data.IncPercent}, ${data.IncUsd}, ${data.WinRate}, ${data.AUM}, ${data.TraderId}, '${data.MasterAccount}')
        `;

        console.log("sql", sql);
        let result = await request.query(sql);
        console.log("result", result);

        return { result: true, message: 'Record added successfully', response: result };
    } catch (error) {
        console.log("error", error);
        throw new Error(error.message || "Error while adding performance record");
    }
};

// Update a record in Copy_Master_Performance
exports.updatePerformance = async (TraderId, data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        let sql = `
        UPDATE [dbo].[Copy_Master_Performance]
        SET [Name] = '${data.Name}', [Time] = '${data.Time}', 
        [IncPercent] = ${data.IncPercent}, [IncUsd] = ${data.IncUsd}, 
        [WinRate] = ${data.WinRate}, [AUM] = ${data.AUM},
         
         [UpdateDate] = GETDATE()
        WHERE [TraderId] = ${TraderId}
        `;

        console.log("sql", sql);
        let result = await request.query(sql);
        console.log("result", result);

        return { result: true, message: 'Record updated successfully', response: result };
    } catch (error) {
        console.log("error", error);
        throw new Error(error.message || "Error while updating performance record");
    }
};

// Get records from Copy_Master_Performance
exports.getPerformance = async (TraderId) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        let sql = `
        SELECT TOP (1000) [Id], [Name], [Time], [IncPercent], [IncUsd], [WinRate], [AUM], [TraderId], [MasterAccount], [UpdateDate]
        FROM [dbo].[Copy_Master_Performance]
        `;
        if (TraderId) {
            sql += ` WHERE [TraderId] = ${TraderId}`;
        }

        console.log("sql", sql);
        let result = await request.query(sql);
        console.log("result", result);

        return result.recordset;
    } catch (error) {
        console.log("error", error);
        throw new Error(error.message || "Error while getting performance records");
    }
};