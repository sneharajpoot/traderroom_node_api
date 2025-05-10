const { poolPromise } = require('../db');
const trApi = require('../traderroom/api')
const managerApi = require('../traderroom/manager-api')
const moment = require('moment'); // or use native Date
// -----------------

const getLastToTimestampFromDB = async () => {

    let sql = "SELECT TOP 1 Commission_Date_Id,	From_Date,	To_Date,	Active,	isdelete,	create_on,	no_of_account,	no_of_trade FROM [IB_Commission_Gen_Date] ORDER BY Commission_Date_Id DESC";
    const pool = await poolPromise;

    const result = await pool.request().query(sql);


    // uct time
    let lastToTimestamp = moment(result.recordset[0]?.To_Date).utc().format('YYYY-MM-DD HH:mm:ss');

    return lastToTimestamp;
};

// Converts time interval to milliseconds
const getIntervalMs = (type, value) => {
    const multipliers = {
        sec: 1000,
        min: 60 * 1000,
        hr: 60 * 60 * 1000,
        days: 24 * 60 * 60 * 1000,
    };
    return multipliers[type] * value;
};
// Main scheduler

// isRunningCommitionGen: Boolean = false; 
// // YYYY-MM-DD HH:mm:ss
const generateCommitionAPI = async (toTimestamp) => {

    if (isRunningCommitionGen) {
        console.log("Already running commission generation");
        return { result: false, message: "Already running commission generation" };
    }
    const fromTimestamp = await getLastToTimestampFromDB();

    console.log("API fromDate,", moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'), ' -- toDate-- ', toTimestamp);
    let col = {
        From_Date: moment(fromTimestamp).format('YYYY-MM-DD HH:mm:ss'),
        To_Date: toTimestamp,
        Active: 1
    }
    let res = await GenerateCommissionByDateNewBatch(col.From_Date, col.To_Date);
}

const generateCommitionMAPAPI = async (fromTimestamp, toTimestamp) => {

    if (isRunningCommitionGen) {
        console.log("Already running commission generation");
        return { result: false, message: "Already running commission generation" };
    }
    // const fromTimestamp = await getLastToTimestampFromDB();

    // console.log("API fromDate,", moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'), ' -- toDate-- ', toTimestamp);
    console.log("MAP API fromDate,", fromTimestamp, ' -- toDate-- ', toTimestamp);
    let col = {
        From_Date: moment(fromTimestamp).format('YYYY-MM-DD HH:mm:ss'),
        To_Date: toTimestamp,
        Active: 1
    }
    let res = await GenerateCommissionByDateNewBatch(col.From_Date, col.To_Date);
}

const startCommissionScheduler = async (type = 'min', value = 1) => {

    const intervalMs = getIntervalMs(type, value);
    // console.log(`Scheduler started: ${type} ${value} every ${intervalMs} ms`);


    const fromTimestamp = await getLastToTimestampFromDB();
    // current Global time to time stemp
    // const toTimestamp = moment().format('YYYY-MM-DD HH:mm:ss'); 

    // const toTimestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    let sTime = await managerApi.TimeServer();

    if (!(sTime > 0)) {
        console.error("Invalid interval specified. Please provide a valid type and value.");
        return;
    }
    // console.log("sTime", sTime, moment(sTime*1000).toLocaleString(),  moment(sTime*1000)); // Convert to UTC
    // console.log("sTime", new Date(sTime*1000)); // Convert to UTC
    // console.log("dayjs", dayjs(sTime*1000).format('YYYY-MM-DD HH:mm:ss')); // Convert to UTC

    const timestamp = sTime * 1000;
    const date = new Date(timestamp);

    const formattedUTC =
        date.getUTCFullYear() + '-' +
        String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
        String(date.getUTCDate()).padStart(2, '0') + ' ' +
        String(date.getUTCHours()).padStart(2, '0') + ':' +
        String(date.getUTCMinutes()).padStart(2, '0') + ':' +
        String(date.getUTCSeconds()).padStart(2, '0');

    // console.log('formattedUTC----', formattedUTC);  // e.g., "2025-06-02 12:05:09"

    // const toTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const toTimestamp = formattedUTC;// moment(sTime*1000).format('YYYY-MM-DD HH:mm:ss'); 
    // console.log("toTimestamp", toTimestamp);

    console.log("First From Date: ", moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'), ' ----To Date: ', toTimestamp);
    let col = {
        From_Date: moment(fromTimestamp).format('YYYY-MM-DD HH:mm:ss'),
        To_Date: toTimestamp,
        Active: 1
    }
    let res = await GenerateCommissionByDateNewBatch(col.From_Date, col.To_Date);

    setInterval(async () => {
        // while (true) {
        const fromTimestamp = await getLastToTimestampFromDB();
        // const toTimestamp = moment().utc().format('YYYY-MM-DD hh:mm:ss');
        let sTime = await managerApi.TimeServer();

        // console.log("sTime", sTime)
        const timestamp = sTime * 1000;
        const date = new Date(timestamp);

        const formattedUTC =
            date.getUTCFullYear() + '-' +
            String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
            String(date.getUTCDate()).padStart(2, '0') + ' ' +
            String(date.getUTCHours()).padStart(2, '0') + ':' +
            String(date.getUTCMinutes()).padStart(2, '0') + ':' +
            String(date.getUTCSeconds()).padStart(2, '0');

        console.log('formattedUTC----', formattedUTC);
        const toTimestamp = formattedUTC;//moment(sTime*1000).format('YYYY-MM-DD hh:mm:ss');
        //const toTimestamp = moment();

        //   fromDate: fD.format('YYYY-MM-DD') + ' 00:00:00',
        //   toDate: TD.format('YYYY-MM-DD') + ' 23:59:59',

        console.log("fromDate, toDate", moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'), ' ---- ', toTimestamp);
        let res = await GenerateCommissionByDateNewBatch(fromTimestamp, toTimestamp);

        let col = {
            From_Date: moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'),
            To_Date: toTimestamp,//.format('YYYY-MM-DD hh:mm:ss'),
            Active: 1
        }
        // let resAddComm = await AddIBCommissionDate_Object(col);

        // console.log("resAddComm", resAddComm)
        // }
    }, intervalMs);
};

const GenerateCommissionByDateNew = async (fromTimestemp, toTimestemp) => {

    try {

        isRunningCommitionGen = true;
        // console.log("GenerateCommissionByDate", fromTimestemp, toTimestemp);
        let res = {};

        let gr = await managerApi.GetGroups();

        // console.log('Group', gr);

        if (gr.lstGroups.Count <= 0) {
            res.result = false;
            res.Message = " Unable to connect manager.";

            return res;
        }

        const isfromDate = await isDateExists(fromTimestemp)
        const istoDate = await isDateExists(toTimestemp)
        let col = {
            From_Date: fromTimestemp,
            To_Date: toTimestemp,
            Active: 1
        }


        let sql = " SELECT p.Trader_Id ,p.Email,p.Reffered_By,p.Reffered_By_Account,pa.Account, " +
            " pa.IBCommissionPlans   " +
            " FROM dbo.Profiles as p " +
            " join MT5_Profile_Account as pa on p.Trader_Id = pa.Trader_Id   " +
            // " Where Reffered_By_Account!= 0  and Status=1 and Account = 629131";
            " Where Reffered_By_Account!= 0  and Status=1  ";

        let pool = await poolPromise;
        const result = await pool.request().query(sql);
        let dt = result.recordset;

        console.log("IB Accounts", dt.length);

        col.no_of_account = dt.length;
        col.no_of_trade = 0;

        let Accounts = {}
        Accounts = dt.reduce((acc, item) => {
            acc[item.Account] = item.Trader_Id
            return acc;
        }, Accounts);

        //Object.keys(Accounts)
        // let AccountsList = Object.keys(Accounts) 

        // get close commition
        let clt = await GetCloseTradeAllAccount(Object.keys(Accounts), fromTimestemp, toTimestemp);
        // console.log('Proccess Start :' + i + " Account", Account, ' | lstCLOSE', clt.lstCLOSE.length, ' Trader_Id:', Trader_Id, 'Time:', fromTimestemp, ' - ', toTimestemp, ' -- Proccess End');
        console.log("Proccess Star Accounts ", Object.keys(Accounts), ' | lstCLOSE', clt.lstCLOSE.length, 'Time:', fromTimestemp, ' - ', toTimestemp);
        if (clt.lstCLOSE.length > 0) {

            col.no_of_trade += clt.lstCLOSE.Count;

            clt.lstCLOSE = clt.lstCLOSE.map(data => { data.Trader_Id = Accounts[data.Account]; return data; });

            res = CommissionTadeADD(clt.lstCLOSE);

        }
        console.log("Proccess End Accounts ", Object.keys(Accounts), ' | lstCLOSE', clt.lstCLOSE.length, 'Time:', fromTimestemp, ' - ', toTimestemp);

        let resAddComm = await AddIBCommissionDate_Object(col);
        if (resAddComm.result == false) {
            res.result = false;
            res.Message = "Unable to add commission date";
            // console.log("Unable to add commission date", resAddComm.Message);
            // return res;
        }
        console.log('Add Commossion Date : Time:', fromTimestemp, ' - ', toTimestemp, '  Proccess End');

        isRunningCommitionGen = false;
        return true;

    } catch (error) {
        console.error("Error in GenerateCommissionByDate:", error);
        return { result: false, message: error.message };

    }


}

const GenerateCommissionByDateNewBatch = async (fromTimestemp, toTimestemp) => {

    try {

        isRunningCommitionGen = true;
        // console.log("GenerateCommissionByDate", fromTimestemp, toTimestemp);
        let res = {};

        let gr = await managerApi.GetGroups();

        // console.log('Group', gr);

        if (gr.lstGroups.Count <= 0) {
            res.result = false;
            res.Message = " Unable to connect manager.";

            return res;
        }

        const isfromDate = await isDateExists(fromTimestemp)
        const istoDate = await isDateExists(toTimestemp)
        let col = {
            From_Date: fromTimestemp,
            To_Date: toTimestemp,
            Active: 1
        }


        let sql = " SELECT p.Trader_Id ,p.Email,p.Reffered_By,p.Reffered_By_Account,pa.Account, " +
            " pa.IBCommissionPlans   " +
            " FROM dbo.Profiles as p " +
            " join MT5_Profile_Account as pa on p.Trader_Id = pa.Trader_Id   " +
            // " Where Reffered_By_Account!= 0  and Status=1 and Account = 629131";
            " Where Reffered_By_Account!= 0  and Status=1  ";

        let pool = await poolPromise;
        const result = await pool.request().query(sql);
        let dt = result.recordset;

        console.log("IB Accounts", dt.length);

        col.no_of_account = dt.length;
        col.no_of_trade = 0;

        let Accounts = {}
        Accounts = dt.reduce((acc, item) => {
            acc[item.Account] = item.Trader_Id
            return acc;
        }, Accounts);

        //Object.keys(Accounts)
        let AccountsList = Object.keys(Accounts);
        // let AccountsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]; // Example list of accounts;

        const BatchCount = 20;

        console.log(`Processing accounts in batches of ${BatchCount}...`);
        for (let i = 0; i < AccountsList.length; i += BatchCount) {
            let batch = AccountsList.slice(i, i + BatchCount); // Get a batch of 10 accounts
            console.log(`Processing batch:${i} - ${batch}`);

            // Call GetCloseTradeAllAccount for the current batch
            // let clt = await GetCloseTradeAllAccount(batch, fromTimestemp, toTimestemp);

            // console.log(
            //     `Processed batch: ${i} - ${batch} | lstCLOSE: ${clt.lstCLOSE.length} | Time: ${fromTimestemp} - ${toTimestemp}`
            // );

            // if (clt.lstCLOSE.length > 0) {
            //     col.no_of_trade += clt.lstCLOSE.length;

            //     // Map Trader_Id to each trade
            //     clt.lstCLOSE = clt.lstCLOSE.map(data => {
            //         data.Trader_Id = Accounts[data.Account];
            //         return data;
            //     });

            //     res = await CommissionTadeADD(clt.lstCLOSE);
            // }
        }

        // // get close commition
        // let clt = await GetCloseTradeAllAccount(Object.keys(Accounts), fromTimestemp, toTimestemp);
        // // console.log('Proccess Start :' + i + " Account", Account, ' | lstCLOSE', clt.lstCLOSE.length, ' Trader_Id:', Trader_Id, 'Time:', fromTimestemp, ' - ', toTimestemp, ' -- Proccess End');
        // console.log("Proccess Star Accounts ", Object.keys(Accounts), ' | lstCLOSE', clt.lstCLOSE.length, 'Time:', fromTimestemp, ' - ', toTimestemp);
        // if (clt.lstCLOSE.length > 0) {

        //     col.no_of_trade += clt.lstCLOSE.Count;

        //     clt.lstCLOSE = clt.lstCLOSE.map(data => { data.Trader_Id = Accounts[data.Account]; return data; });

        //     res = CommissionTadeADD(clt.lstCLOSE);

        // }
        // console.log("Proccess End Accounts ", Object.keys(Accounts), ' | lstCLOSE', clt.lstCLOSE.length, 'Time:', fromTimestemp, ' - ', toTimestemp);

        let resAddComm = await AddIBCommissionDate_Object(col);
        if (resAddComm.result == false) {
            res.result = false;
            res.Message = "Unable to add commission date";
            // console.log("Unable to add commission date", resAddComm.Message);
            // return res;
        }
        console.log('Add Commossion Date : Time:', fromTimestemp, ' - ', toTimestemp, '  Proccess End');

        isRunningCommitionGen = false;
        return true;

    } catch (error) {
        console.error("Error in GenerateCommissionByDate:", error);
        return { result: false, message: error.message };

    }


}

const CommissionTadeADD = async (col) => {

    let BUY_SELL = {
        0: "BUY",
        1: "SELL"
    }
    res = {}

    if (col == null || col.length < 1)
        return res;

    let sql = "";

    try {

        const pool = await poolPromise;
        const request = pool.request();

        let object = [];

        for (let i = 0; i < col.length; i++) {
            if (col[i].Symbol != "" && col[i].Symbol != null) {

                sql = " INSERT INTO [Trades]" +
                    " ([MT5Account],[Symbol],[Open_Price],[Stop_Loss] " +
                    " ,[Target_Price],[Lot],[Profit],[PositionId] " +
                    " ,[Ticket],[Timestamp],[Open_Time],[Close_Time] " +
                    " ,[oBSFlag],[Taxes],[Swap],[Commission], " +
                    " Comment, Trader_Id ) " +
                    " VALUES " +
                    " (" + col[i].MT5Account + ",'" + col[i].Symbol + "'," + col[i].Open_Price + "," + col[i].Stop_Loss + ", " +
                    " " + col[i].Target_Price + "," + (col[i].Lot) + "," + col[i].Profit + "," + col[i].PositionId + ", " +
                    " " + col[i].Ticket + ",'" + col[i].Timestamp + "','" + col[i].Open_Time + "','" + col[i].Close_Time + "', " +
                    " '" + (BUY_SELL[col[i].oBSFlag]) + "'," + col[i].Taxes + "," + col[i].Swap + "," + col[i].Commission + ", " +
                    " '" + col[i].Comment + "', " + (col[i].Trader_Id) + " ); ";

                try {

                    let res = await request.query(sql);
                    console.log("Add in DB", '[' + (i + 1) + ' of ' + col.length + ']', res.rowsAffected[0]);

                    object.push({
                        traderId: col[i].Trader_Id,
                        trade_date: col[i].Close_Time,
                        total_trade: 1,
                        total_lot: col[i].Lot,
                        total_amount: col[i].Open_Price,
                        total_profit: col[i].Profit > 0 ? col[i].Profit : 0,
                        total_loss: col[i].Profit < 0 ? col[i].Profit : 0,
                    })

                    await tri_IBCommission(col[i]);
                } catch (error) {
                    console.error("Add in DB", '[' + (i + 1) + ' of ' + col.length + ']', 'MT5Account: ' + col[i].MT5Account, ' Ticket:' + col[i].Ticket, error.message);
                }
            }
        }
    }
    catch (ex) {
        logs("Exception: Add Trade in DB:  " + ex.Message + ", Count : " + col.Count + "MT5Account: " + col[0].MT5Account);

        console.log("Exception >> {0} : {1}", ex.message);
        res.result = false;
        res.Message = ex.Message + " " + sql;
    }

    return res;
}


const GetCloseTradeAllAccount = async (Account, fromDate, toDate) => {
    let res = await trApi.GetCloseTradeAllAccount(Account, fromDate, toDate);
    return res;
}

const AddIBCommissionDate_Object = async (data) => {
    let sql = " INSERT INTO [IB_Commission_Gen_Date]" +
        " ([From_Date],[To_Date] ,[Active])" +
        " VALUES" +
        " ('" + data.From_Date + "','" + data.To_Date + "','" + data.Active + "')";
    let res = {};
    try {
        const pool = await poolPromise;
        const request = pool.request();
        let rr = await request.query(sql);
        if (rr.rowsAffected[0] == 0) {
            res.result = false;
            res.Message = "Unable to add commission date";
            return res;
        }
        res.result = true;
        return res;
    } catch (error) {
        console.error("Error adding commission date:", error.message);
        res.result = false;
        return res;
    }

}
const isDateExists = async (date) => {
    let resCount = 0;
    let sql = "   SELECT count(Commission_Date_Id) as tRecord " +
        "  FROM [IB_Commission_Gen_Date] Where Active = 1  and " +
        " '" + date + "' between From_Date and To_Date";

    let pool = await poolPromise;
    const result = await pool.request().query(sql);
    resCount = result.recordset[0].tRecord;
    return resCount;
}

logs = (message) => {
    console.log(message);
}

const tri_IBCommission = async (trade) => {
    try {
        const cTrade = trade
        let pool = await poolPromise;

        let _MT5Account = 0;
        let _Ticket = 0;
        let _Trader_Id = 0;
        let _Commission = 0.0;
        let _Commission_Amount = 0.0;
        let _Lot = 0.0;
        let _Commission_Code = 0;
        let _Reffered_By = 0;
        let _IBCommissionPlans = 0;
        let _Close_Time = null;


        if (!cTrade) {

            let sql1 = `select  MT5Account , Ticket , Trader_Id , Commission, Lot, Close_Time  from Trades 
                        where Trdae_Id=8;`;

            const trad1 = await pool.request().query(sql1);
            if (trad1.recordset.length == 0) {
                throw new Error("No trad found");
            }
            let trad1_data = trad1.recordset;
            _MT5Account = trad1_data[0].MT5Account;
            _Ticket = trad1_data[0].Ticket;
            // _Trader_Id = trad1_data[0].Trader_Id;
            _Commission = trad1_data[0].Commission;
            _Lot = trad1_data[0].Lot;
            _Close_Time = trad1_data[0].Close_Time;

        } else {

            _MT5Account = cTrade.MT5Account;
            _Ticket = cTrade.Ticket;
            // _Trader_Id = cTrade.Trader_Id;
            _Commission = cTrade.Commission;
            _Lot = cTrade.Lot;
            _Close_Time = cTrade.Close_Time;
        }

        // 	select @Trader_Id = Trader_Id , @IBCommissionPlans = IBCommissionPlans from  [dbo].[MT5_Profile_Account] where [Account] = @MT5Account;
        let sql2 = `select  Trader_Id ,  IBCommissionPlans from  [dbo].[MT5_Profile_Account] where [Account] = ${_MT5Account};`;
        const MT5_Profile_Account = await pool.request().query(sql2);
        if (MT5_Profile_Account.recordset.length == 0) {
            throw new Error("No MT5_Profile_Account found");
        }
        _Trader_Id = MT5_Profile_Account.recordset[0]?.Trader_Id;
        _IBCommissionPlans = MT5_Profile_Account.recordset[0]?.IBCommissionPlans;
        // 	SELECT * INTO #CommitionPlan from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = @IBCommissionPlans;
        let sql3 = ` SELECT * from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = ${_IBCommissionPlans};;`;
        const CommitionPlanList = await pool.request().query(sql3);
        // 	SELECT @Commission_Code=Commission_Code , @Commission_Amount = Commission_Amount from #CommitionPlan 
        _Commission_Code = CommitionPlanList.recordset[0].Commission_Code;
        _Commission_Amount = CommitionPlanList.recordset[0].Commission_Amount;


        // 	SET @Commission = @Commission_Amount * @Lot;
        _Commission = _Commission_Amount * _Lot;


        if (_Commission != 0) {

            // 		SELECT * INTO #CommitionLvl from IB_Commission_Level Where Commission_Code=@Commission_Code Order by Level_No ASC
            let sql4 = ` SELECT * from [IB_Commission_Level] Where Commission_Code=${_Commission_Code} Order by Level_No ASC;`;
            let CommitionLvl = await pool.request().query(sql4);
            CommitionLvl = CommitionLvl.recordset;

            if (CommitionLvl.length == 0) {
                throw new Error("No CommitionLvl found");
            }

            // 		Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
            let sql5 = ` SELECT * from [Profiles] Where Trader_Id=${_Trader_Id} ;`;
            let Reffered_By_prof = await pool.request().query(sql5);
            Reffered_By_prof = Reffered_By_prof.recordset;
            if (Reffered_By_prof.length == 0) {
                throw new Error("No Reffered_By_prof found");
            }
            _Reffered_By = Reffered_By_prof[0].Reffered_By
            // 		declare @lvl int=0;
            let _lvl = 0;


            while (_Reffered_By != 0) {
                _lvl += 1;
                let sql6 = ` Select Reffered_By from Profiles Where Trader_Id=${_Reffered_By};`;
                let Reffered_By_prof = await pool.request().query(sql6);
                Reffered_By_prof = Reffered_By_prof.recordset;

                _Reffered_By = Reffered_By_prof[0]?.Reffered_By || 0;
            }

            if (_lvl != 0) {

                let _total_comission = 0;
                let _Level1 = 0;
                let _Level2 = 0;
                let _Level3 = 0;
                let _Level4 = 0;
                let _Level5 = 0;
                let _Level6 = 0;
                let _Level7 = 0;
                let _Level8 = 0;
                let _Level9 = 0;
                let _Level10 = 0;
                let _cTrader_Id = 0;

                let CommitionLvlF = CommitionLvl.find(data => data.Level_No == _lvl);
                _Level1 = CommitionLvlF.Level1;
                _Level2 = CommitionLvlF.Level2;
                _Level3 = CommitionLvlF.Level3;
                _Level4 = CommitionLvlF.Level4;
                _Level5 = CommitionLvlF.Level5;
                _Level6 = CommitionLvlF.Level6;
                _Level7 = CommitionLvlF.Level7;
                _Level8 = CommitionLvlF.Level8;
                _Level9 = CommitionLvlF.Level9;
                _Level10 = CommitionLvlF.Level10;

                let sql7 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id= ${_Trader_Id};`;
                let Profile = await pool.request().query(sql7);
                Profile = Profile.recordset;
                _cTrader_Id = Profile[0].Trader_Id;
                _Reffered_By = Profile[0].Reffered_By;
                _lvl = 0;

                while (_Reffered_By != 0) {
                    // 					SET @lvl+=1;
                    _lvl += 1;
                    let sql8 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id=${_Reffered_By};`;
                    let Profile = await pool.request().query(sql8);
                    Profile = Profile.recordset;
                    if (Profile.length == 0) {
                        break;
                    }
                    _cTrader_Id = Profile[0]?.Trader_Id;
                    _Reffered_By = Profile[0]?.Reffered_By || 0;
                    // 					declare @comm float=0;
                    let _comm = 0;

                    if (_lvl == 1) {
                        _comm = (_Level1 * _Commission / 100);
                    }
                    if (_lvl == 2) {
                        _comm = (_Level2 * _Commission / 100);
                    }
                    if (_lvl == 3) {
                        _comm = (_Level3 * _Commission / 100);
                    }
                    if (_lvl == 4) {
                        _comm = (_Level4 * _Commission / 100);
                    }
                    if (_lvl == 5) {
                        _comm = (_Level5 * _Commission / 100);
                    }
                    if (_lvl == 6) {
                        _comm = (_Level6 * _Commission / 100);
                    }
                    if (_lvl == 7) {
                        _comm = (_Level7 * _Commission / 100);
                    }
                    if (_lvl == 8) {
                        _comm = (_Level8 * _Commission / 100);
                    }
                    if (_lvl == 9) {
                        _comm = (_Level9 * _Commission / 100);
                    }

                    if (_lvl == 10) {
                        _comm = (_Level10 * _Commission / 100);
                    }
                    if (_comm != 0) {
                        _total_comission += _comm;
                        let sql9 = `INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
                         OUTPUT INSERTED.Commission_Id  
                        VALUES (${_cTrader_Id},${_comm},${_lvl},${_Trader_Id},${_MT5Account},(select GETDATE()),${_Ticket}, '${_Close_Time}');`;
                        const inrtComm = await pool.request().query(sql9);

                        let Commission_Id = inrtComm.recordset[0].Commission_Id;
                        // { Commission_Id:'', Trader_Id:'', Commission:'', Source:'', SourceAccount:'', Ticket:'', Levels:'',}
                        let adComm = await tri_AdddRecordIB_CommissionWallet({
                            Commission_Id: Commission_Id,
                            Trader_Id: _cTrader_Id,
                            Commission: _comm,
                            Source: _Trader_Id,
                            SourceAccount: _MT5Account,
                            Ticket: _Ticket,
                            Levels: _lvl,
                        });
                    }
                    // END
                }
                let sql10 = `UPDATE IB_Commission_Gen_Date SET total_comission = ${_total_comission} WHERE Commission_Date_Id = (SELECT MAX(Commission_Date_Id) FROM IB_Commission_Gen_Date);`;


                const upIB_Commission_Gen_Date = await pool.request().query(sql10);

                let object = {
                    traderId: cTrade.Trader_Id,
                    trade_date: cTrade.Close_Time,
                    total_trade: 1,
                    total_lot: cTrade.Lot,
                    total_amount: cTrade.Open_Price,
                    total_commission: _total_comission,
                    total_profit: cTrade.Profit > 0 ? cTrade.Profit : 0,
                    total_loss: cTrade.Profit < 0 ? cTrade.Profit : 0,
                };
                await addTrades_Commission([object])

            }

        }
    } catch (error) {
        console.error("Error running trigger:", error.message);
    }

}

const tri_AdddRecordIB_CommissionWallet = async (comm) => {

    let pool = await poolPromise;

    let _Trader_Id = 0;
    let _IB_Commition = 0;
    let _Source = 0;
    let _SourceAccount = 0;
    let _Ticket = 0;
    let _Levels = 0;
    let _BlockCommition = 0;
    let _Commission_Id = 0;


    _Commission_Id = comm.Commission_Id
    _Trader_Id = comm.Trader_Id
    _IB_Commition = comm.Commission
    _Source = comm.Source
    _SourceAccount = comm.SourceAccount
    _Ticket = comm.Ticket
    _Levels = comm.Levels

    let sql11 = `Select BlockCommition from Profiles Where Trader_Id = ${_Trader_Id};`;
    let BlockCommition = await pool.request().query(sql11);
    BlockCommition = BlockCommition.recordset;
    _BlockCommition = BlockCommition[0].BlockCommition;

    if (_BlockCommition != 1) {

        let sql12 = `INSERT INTO [IB_Commission_Wallet]
        ( [Trader_Id],[Deposite_Withdraw],[Type]
        ,[IB_Commition], CurrentBalance, [Source],[Ticket],[Comment]
        ,[AdmComment],[Status],[Created_On])
        VALUES
        (${_Trader_Id},0,1
        ,${_IB_Commition},
        ( select ISNULL((select top 1 CurrentBalance from [IB_Commission_Wallet] where Trader_Id = ${_Trader_Id}  order by  IB_Commition_Wallet_Id desc),0) as CurrentBalance) + ${_IB_Commition},
         ${_Source}, ${_Ticket}, CONCAT('Commission From Account : ', ${_SourceAccount})
        ,CONCAT('Auto generate Commission ',${_SourceAccount}),1,(select GETDATE()) );`;

        const inrtComm = await pool.request().query(sql12);
        console.log("Add in IB_Commission_Wallet", _Trader_Id, _Source, _Ticket, inrtComm.rowsAffected[0]);
    }

    if (_BlockCommition == 1) {
        let sql13 = `update IB_Commission set commition_generated = 0 where Commission_Id = ${_Commission_Id};`;
        const inrtComm = await pool.request().query(sql13);
    }
}


let settingList = {};
const getSeting = async () => {

    try {

        let sql = ` SELECT Setting_id, Check_KYC_on, Wallet_to_Wallet_Transfer, Account_to_Account, Wallet_to_Account, Account_to_Wallet, Default_Tradersroom_Workspace, Allow_Withdraw_when_Trade_Open, blockEmailPhone, totalNoOfAccountOpen, Type, Is_Auto_Gen_Account, Signup_Type, account_series, AutoDeposit, Enable_Wallet, minimum_withdrawal, 
    open_account_on_kyc, auto_generate_commission_min
     FROM [Setting] Where Setting_id = 1`;
        let pool = await poolPromise;
        const result = await pool.request().query(sql);
        result.recordset[0].auto_generate_commission_min = 300;
        settingList = result.recordset[0];

        if (settingList?.auto_generate_commission_min)
            startCommissionScheduler('min', settingList.auto_generate_commission_min); // Runs every 5 minutes
        else
            console.log(`auto_generate_commission_min not found in settingList - ${settingList?.auto_generate_commission_min} Min`);

        return result.recordset[0];
    } catch (error) {
        console.error("Error fetching setting:", error.message);
        return null;

    }
}

const addTrades_Commission = async (objectArray) => {
    for (let i = 0; i < objectArray.length; i++) {
        let object = objectArray[i];

        // Use MERGE statement for upserting data
        let sql = `
            MERGE INTO [Trades_Commission] AS target
            USING (SELECT ${object.traderId} AS traderId, '${object.trade_date}' AS trade_date) AS source
            ON target.traderId = source.traderId AND target.trade_date = source.trade_date
            WHEN MATCHED THEN
                UPDATE SET
                    total_trade = total_trade + ${object.total_trade},
                    total_lot = total_lot + ${object.total_lot},
                    total_amount = total_amount + ${object.total_amount},
                    total_profit = total_profit + ${object.total_profit},
                    total_loss = total_loss + ${object.total_loss},
                    total_commission = total_commission + ${object.total_commission},
                    update_date = GETDATE()
            WHEN NOT MATCHED THEN
                INSERT (traderId, trade_date, total_trade, total_lot, total_amount, total_profit, total_loss, create_date, total_commission)
                VALUES (${object.traderId}, '${object.trade_date}', ${object.total_trade}, ${object.total_lot}, ${object.total_amount}, ${object.total_profit}, ${object.total_loss}, GETDATE(), ${object.total_commission});
        `;

        try {
            const pool = await poolPromise;
            const request = pool.request();
            let rr = await request.query(sql);
        } catch (error) {
            console.error("Error adding commission date:", error.message);
        }
    }
    return true;
};

const Trades_CommissionDateWish = async (params) => {
    let sql = ``;
    if (params.fromDate && params.toDate) {
        let condition = ``;
        if (params.traderId) {
            condition = ` AND traderId = ${params.traderId} `;
        }
        sql = `SELECT traderId,SUM(total_trade) As total_trade, SUM(total_lot) AS total_lot, 
        SUM(total_amount) AS total_amount, SUM(total_profit) AS total_profit, SUM(total_loss) AS total_loss, 
        SUM(total_commission) AS total_commission
        FROM [Trades_Commission] 
        WHERE  trade_date BETWEEN '${params.fromDate}' AND '${params.toDate} ${condition}'
        GROUP BY traderId ;
        `;
    } else {
        let condition = ``;
        if (params.traderId) {
            condition = ` WHERE traderId = ${params.traderId} `;
        }

        sql = `SELECT traderId, SUM(total_trade) As total_trade, SUM(total_lot) AS total_lot, 
        SUM(total_amount) AS total_amount, SUM(total_profit) AS total_profit, SUM(total_loss) AS total_loss,
        SUM(total_commission) AS total_commission
        FROM [Trades_Commission] ${condition}
        GROUP BY traderId `;
    }
    let pool = await poolPromise;
    const result = await pool.request().query(sql);
    let summary = result.recordset.reduce((acc, curr) => {
        acc.total_trade += curr.total_trade;
        acc.total_lot += curr.total_lot;
        acc.total_amount += curr.total_amount;
        acc.total_profit += curr.total_profit;
        acc.total_loss += curr.total_loss;
        acc.total_commission += curr.total_commission;
        return acc;
    }, {
        total_trade: 0,
        total_lot: 0,
        total_amount: 0,
        total_profit: 0,
        total_loss: 0,
        total_commission: 0
    });
    return { response: result.recordset, summary: summary };


}

const IBTrades_CommissionDateWish = async (params) => {

    if (!params.traderId) {
        return { result: false, message: "traderId is required" };
    }


    const pool = await poolPromise; // Connect to the database
    let Trader_Id = params.traderId;
    // Dynamic SQL query

    let sql1 = ` WITH RecursiveCte AS 
                    ( 
                        SELECT 1 as Level, H1.Trader_Id, H1.Reffered_By, H1.Name, H1.Reffered_By_Account, H1.Referral_Code,
                        H1.Email, H1.Created_On, H1.Status,
                        H1.Phone  FROM[Profiles] H1
                        WHERE H1.Trader_Id =   ${Trader_Id}
                        UNION ALL 
                        SELECT RCTE.level + 1 as Level, H2.Trader_Id, H2.Reffered_By, H2.Name, H2.Reffered_By_Account, H2.Referral_Code,
                        H2.Email, H2.Created_On, H2.Status, 
                        H2.Phone  FROM Profiles H2 
                        INNER JOIN RecursiveCte RCTE ON H2.Reffered_By = RCTE.Trader_Id 
                    ) 
       SELECT  H1.Trader_Id, H1.Name, H1.Email,H1.Phone, H1.Reffered_By_Account, H1.Referral_Code,  H1.Created_On, 
       H1.Status ,  H1.Reffered_By, H1.Level,   
       ISNULL (A.Account ,0) Account , A.IBCommissionPlans , A.Plan_Id   
       FROM RecursiveCte as H1 
       join MT5_Profile_Account as A on H1.Trader_Id = A.Trader_Id
          ORDER BY H1.Level, H1.Trader_Id `;

    // Execute the query
    const resultIB = await pool.request().query(sql1);

    let row = resultIB.recordset;
    row = row.filter((data) => data.Level != 1);
    let Trader_Ids = row.map(data => data.Trader_Id);

    if (Trader_Ids.length == 0) {
        return {
            response: [], summary: {
                total_trade: 0,
                total_lot: 0,
                total_amount: 0,
                total_profit: 0,
                total_loss: 0,
                total_commission: 0
            }
        };

    }

    let sql = ``;
    if (params.fromDate && params.toDate) {
        let condition = ``;
        sql = `SELECT traderId,SUM(total_trade) As total_trade, SUM(total_lot) AS total_lot, 
        SUM(total_amount) AS total_amount, SUM(total_profit) AS total_profit, SUM(total_loss) AS total_loss,
        SUM(total_commission) AS total_commission
        FROM [Trades_Commission] 
        WHERE  traderId IN (${Trader_Ids}) AND trade_date BETWEEN '${params.fromDate}' AND '${params.toDate} ${condition}'
        GROUP BY traderId ;
        `;
    } else {
        let condition = ``;

        sql = `SELECT traderId,SUM(total_trade) As total_trade, SUM(total_lot) AS total_lot, 
        SUM(total_amount) AS total_amount, SUM(total_profit) AS total_profit, SUM(total_loss) AS total_loss,
        SUM(total_commission) AS total_commission
        FROM [Trades_Commission] WHERE traderId IN (${Trader_Ids})  ${condition} 
        GROUP BY traderId `;
    }
    const result = await pool.request().query(sql);

    let resultIB2 = row.map(data => {

        let trader = result.recordset.find(trader => trader.traderId == data.Trader_Id);
        return {
            ...trader,
            ...data,
            Level: data.Level - 1,

        }
    }).filter(data => data.Level != 0);

    // sort by level
    resultIB2.sort((a, b) => a.Level - b.Level);

    let summary = result.recordset.reduce((acc, curr) => {
        acc.total_trade += curr.total_trade;
        acc.total_lot += curr.total_lot;
        acc.total_amount += curr.total_amount;
        acc.total_profit += curr.total_profit;
        acc.total_loss += curr.total_loss;
        acc.total_commission += curr.total_commission;
        return acc;
    }, {
        total_trade: 0,
        total_lot: 0,
        total_amount: 0,
        total_profit: 0,
        total_loss: 0,
        total_commission: 0
    });

    return { response: resultIB2, summary: summary };


}

module.exports = {
    getSeting,

    generateCommitionAPI,
    generateCommitionMAPAPI,

    Trades_CommissionDateWish,
    IBTrades_CommissionDateWish
}