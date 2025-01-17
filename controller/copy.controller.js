// copy.controller.js

const { removeManager, addManager, generateToken, loginManager, addMaster, removeMaster, addUser, openTrade, closeOrder, removeUser, updateUser, getUsers, updatePriceTime, getAppLog, getAPILog } = require('../copy/api.js');

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
    return await addManager(data.mngId, data.serverIp, data.pasword);
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
exports.managerLogin = async (data) => {
    return await loginManager(data.mngId);
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
    return await addMaster(data.masterData);
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
 * URL: http://<host>:<port>//home/addUser
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
 * Description: Add a user with the given details.
 */
exports.addUser = async (data) => {
    return await addUser(data);
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
