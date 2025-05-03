const { poolPromise } = require('../db');
const trApi = require('../traderroom/api')
const managerApi = require('../traderroom/manager-api')
const moment = require('moment'); // or use native Date
const dayjs = require('dayjs');
// -----------------

const getLastToTimestampFromDB = async () => {

    let sql = "SELECT TOP 1 Commission_Date_Id,	From_Date,	To_Date,	Active,	isdelete,	create_on,	no_of_account,	no_of_trade FROM [IB_Commission_Gen_Date] ORDER BY Commission_Date_Id DESC";
    const pool = await poolPromise;

    const result = await pool.request().query(sql);

    let lastToTimestamp = result.recordset[0]?.To_Date || Date.now()

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

const startCommissionScheduler = async (type = 'min', value = 1) => {

    const intervalMs = getIntervalMs(type, value);
    console.log(`Scheduler started: ${type} ${value} every ${intervalMs} ms`);


    const fromTimestamp = await getLastToTimestampFromDB();

    let sTime = await managerApi.TimeServer();

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

    console.log("First fromDate, toDate", moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'), ' ---- ', toTimestamp);
    let col = {
        From_Date: moment(fromTimestamp).format('YYYY-MM-DD HH:mm:ss'),
        To_Date: toTimestamp,
        Active: 1
    }
    let res = await GenerateCommissionByDate(col.From_Date, col.To_Date);

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
        // await GenerateCommissionByDate(fromTimestamp, toTimestamp);

        let col = {
            From_Date: moment(fromTimestamp).format('YYYY-MM-DD hh:mm:ss'),
            To_Date: toTimestamp,//.format('YYYY-MM-DD hh:mm:ss'),
            Active: 1
        }
        let res = await GenerateCommissionByDate(col.From_Date, col.To_Date);
        // let resAddComm = await AddIBCommissionDate_Object(col);

        // console.log("resAddComm", resAddComm)
        // }
    }, intervalMs);
};

//   startCommissionScheduler('min', 5); // Runs every 5 minutes
// startCommissionScheduler('min', 30); // Runs every 5 minutes
// --------------


const generateCommition = async (trad) => {

    let MT5Account = '';
    let Ticket = '';
    let Trader_Id = '';
    let Commission = '';
    let Commission_Amount = '';
    let Lot = '';
    let Commission_Code = '';
    let Reffered_By = '';
    let IBCommissionPlans = '';
    let Close_Time = '';

    // 	select @MT5Account = trad.MT5Account , @Ticket = trad.Ticket ,@Trader_Id = trad.Trader_Id , @Commission= trad.Commission , @Lot = trad.Lot, @Close_Time = trad.Close_Time  from inserted;

    MT5Account = trad.MT5Account;
    Ticket = trad.Ticket;
    Trader_Id = trad.Trader_Id;
    Commission = trad.Commission;
    Lot = trad.Lot;
    Close_Time = trad.Close_Time;

    // 	--select @MT5Account = Trades.MT5Account , @Ticket = Trades.Ticket ,@Trader_Id = Trades.Trader_Id , @Commission= Trades.Commission, @Lot = Trades.Lot  from Trades where Trdae_Id=14;

    // let sql1 = "select  MT5Account , Ticket , Trader_Id , Commission, Lot  from Trades where Trdae_Id=14;";
    // const trad1 = await pool.request().query(sql1);

    // let trad1_data = trad1.recordset;
    // let MT5Account = trad1_data[0].MT5Account ; 
    // let Ticket = trad1_data[0].Ticket ;
    // let Trader_Id = trad1_data[0].Trader_Id;
    // let Commission= trad1_data[0].Commission ;
    // let Lot = trad1_data[0].Lot;
    // let Close_Time = trad1_data[0].Close_Time ; 

    // 	select @Trader_Id = Trader_Id , @IBCommissionPlans = IBCommissionPlans from  [dbo].[MT5_Profile_Account] where [Account] = @MT5Account;
    let sql1 = `select  Trader_Id ,  IBCommissionPlans from  [dbo].[MT5_Profile_Account] where [Account] = ${MT5Account};`;
    const MT5_Profile_Account = await pool.request().query(sql1);
    Trader_Id = MT5_Profile_Account[0].Trader_Id;
    IBCommissionPlans = MT5_Profile_Account[0].IBCommissionPlans;

    // 	SELECT * INTO #CommitionPlan from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = @IBCommissionPlans;
    let sql2 = ` SELECT * from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = ${IBCommissionPlans};;`;
    const CommitionPlan = await pool.request().query(sql2);
    Commission_Code = CommitionPlan[0].Commission_Code;
    Commission_Amount = CommitionPlan[0].Commission_Amount;

    // 	SELECT @Commission_Code=Commission_Code , @Commission_Amount = Commission_Amount from #CommitionPlan 


    Commission = Commission_Amount * Lot;


    if (Commission != 0) {

        // 		SELECT * INTO #CommitionLvl from IB_Commission_Level Where Commission_Code=@Commission_Code Order by Level_No ASC
        let sql3 = ` SELECT * from [IB_Commission_Level] Where Commission_Code=${Commission_Code} Order by Level_No ASC;`;
        const CommitionLvl = await pool.request().query(sql3);
        // 		Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
        let sql4 = ` SELECT * from [Profiles] Where Trader_Id=${Trader_Id} ;`;
        const Reffered_By_prof = await pool.request().query(sql4);
        Reffered_By = Reffered_By_prof[0].Reffered_By
        let lvl = 0;

        while (Reffered_By != 0) {
            lvl += 1;
            // Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Reffered_By;
            let sql4 = ` Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=${Reffered_By};`;
            const Reffered_By_prof = await pool.request().query(sql4);
            Reffered_By = Reffered_By_prof[0].Reffered_By

        }

        if (lvl != 0) {
            let Level1 = 0;
            let Level2 = 0;
            let Level3 = 0;
            let Level4 = 0;
            let Level5 = 0;
            let Level6 = 0;
            let Level7 = 0;
            let Level8 = 0;
            let Level9 = 0;
            let Level10 = 0;
            let cTrader_Id;


            // 			Select @Level1=Level1 ,@Level2=Level2 ,@Level3=Level3 ,@Level4=Level4 ,@Level5=Level5 ,
            // 			@Level6=Level6 ,@Level7=Level7 ,@Level8=Level8 ,@Level9=Level9 ,@Level10=Level10   from  #CommitionLvl where Level_No=@lvl

            let CommitionLvlF = CommitionLvl.find(data => data.Level_No == lvl);
            Level1 = CommitionLvlF.Level1;
            Level2 = CommitionLvlF.Level2;
            Level3 = CommitionLvlF.Level3;
            Level4 = CommitionLvlF.Level4;
            Level5 = CommitionLvlF.Level5;
            Level6 = CommitionLvlF.Level6;
            Level7 = CommitionLvlF.Level7;
            Level8 = CommitionLvlF.Level8;
            Level9 = CommitionLvlF.Level9;
            Level10 = CommitionLvlF.Level10;
            // 			Select @cTrader_Id=Trader_Id ,@Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;

            let sql4 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id= ${Trader_Id};`;
            const Profile = await pool.request().query(sql4);
            cTrader_Id = Profile[0].Trader_Id;
            Reffered_By = Profile[0].Reffered_By;
            lvl = 0;

            while (Reffered_By != 0) {
                lvl += 1;
                // Select @cTrader_Id=Trader_Id , @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Reffered_By;
                let comm = 0;

                let sql4 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id=${Reffered_By};`;
                const Profile = await pool.request().query(sql4);
                cTrader_Id = Profile[0].Trader_Id;
                Reffered_By = Profile[0].Reffered_By;

                if (lvl = 1) {
                    comm = (Level1 * Commission / 100);
                }
                if (lvl = 2) {
                    comm = (Level2 * Commission / 100);
                }
                if (lvl = 3) {
                    comm = (Level3 * Commission / 100);
                }
                if (lvl = 4) {
                    comm = Level4 * Commission / 100;
                }
                if (lvl = 5) {
                    comm = Level5 * Commission / 100;
                }
                if (lvl = 6) {
                    comm = Level6 * Commission / 100;
                }
                if (lvl = 7) {
                    comm = Level7 * Commission / 100;
                }
                if (lvl = 8) {
                    comm = Level8 * Commission / 100;
                }
                if (lvl = 9) {
                    comm = Level9 * Commission / 100;
                }
                if (lvl = 10) {
                    comm = Level10 * Commission / 100;
                }

                if (comm != 0) {
                    // INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
                    // 	VALUES (@cTrader_Id,@comm,@lvl,@Trader_Id,@MT5Account,(select GETDATE()),@Ticket, @Close_Time);

                    let sql4 = `INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
                      	VALUES (${cTrader_Id},${comm},${lvl},${Trader_Id},${MT5Account},(select GETDATE()),${Ticket}, ${Close_Time});`;
                    const inrtComm = await pool.request().query(sql4);
                }
            }

        }




    }


}


async function processIBCommission(tradeId) {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Fetch trade details (equivalent to `inserted` in trigger)
        const tradeQuery = `
            SELECT MT5Account, Ticket, Trader_Id, -Commission AS Commission, Lot, Close_Time
            FROM Trades WHERE Trade_Id = @tradeId
        `;
        request.input("tradeId", tradeId);
        const tradeResult = await request.query(tradeQuery);
        if (tradeResult.recordset.length === 0) throw new Error("Trade not found");

        const { MT5Account, Ticket, Trader_Id, Commission, Lot, Close_Time } = tradeResult.recordset[0];

        // Get trader and IB commission plan
        const profileQuery = `
            SELECT Trader_Id, IBCommissionPlans FROM MT5_Profile_Account WHERE [Account] = @MT5Account
        `;
        request.input("MT5Account", MT5Account);
        const profileResult = await request.query(profileQuery);
        if (profileResult.recordset.length === 0) return;

        const { IBCommissionPlans } = profileResult.recordset[0];

        // Fetch active commission plan
        const commissionPlanQuery = `
            SELECT Commission_Code, Commission_Amount FROM IB_Commission_Plan 
            WHERE Active = 1 AND Commission_Plan_Id = @IBCommissionPlans
        `;
        request.input("IBCommissionPlans", IBCommissionPlans);
        const commissionPlanResult = await request.query(commissionPlanQuery);
        if (commissionPlanResult.recordset.length === 0) return;

        const { Commission_Code, Commission_Amount } = commissionPlanResult.recordset[0];

        // Calculate commission
        let totalCommission = Commission_Amount * Lot;
        if (totalCommission === 0) return;

        // Fetch commission levels
        const commissionLevelsQuery = `
            SELECT * FROM IB_Commission_Level 
            WHERE Commission_Code = @Commission_Code ORDER BY Level_No ASC
        `;
        request.input("Commission_Code", Commission_Code);
        const levelsResult = await request.query(commissionLevelsQuery);
        if (levelsResult.recordset.length === 0) return;

        const levels = levelsResult.recordset[0];

        // Get referral chain
        let currentTrader = Trader_Id;
        let level = 0;

        while (currentTrader) {
            level++;

            // Fetch referrer
            const referrerQuery = `
                SELECT Trader_Id, Reffered_By FROM Profiles WHERE Trader_Id = @currentTrader
            `;
            request.input("currentTrader", currentTrader);
            const referrerResult = await request.query(referrerQuery);
            if (referrerResult.recordset.length === 0) break;

            const { Trader_Id: referredTrader, Reffered_By } = referrerResult.recordset[0];

            // Determine commission percentage for the level
            let levelCommission = levels[`Level${level}`] || 0;
            let commissionAmount = (levelCommission * totalCommission) / 100;

            if (commissionAmount > 0) {
                // Insert commission record
                const insertCommissionQuery = `
                    INSERT INTO IB_Commission 
                    (Trader_Id, Commission, Levels, Source, SourceAccount, DateTime, Ticket, TradeTime)
                    VALUES (@referredTrader, @commissionAmount, @level, @Trader_Id, @MT5Account, GETDATE(), @Ticket, @Close_Time)
                `;
                request
                    .input("referredTrader", referredTrader)
                    .input("commissionAmount", commissionAmount)
                    .input("level", level)
                    .input("Trader_Id", Trader_Id)
                    .input("MT5Account", MT5Account)
                    .input("Ticket", Ticket)
                    .input("Close_Time", Close_Time);

                await request.query(insertCommissionQuery);
            }

            currentTrader = Reffered_By;
        }
    } catch (error) {
        console.error("Error processing IB commission:", error.message);
    }
}


const GenerateCommissionByToDate = async (toTimestemp) => {
    const fromTimestempDb = await getLastToTimestampFromDB();

    let fromTimestemp = moment(fromTimestempDb).format('YYYY-MM-DD hh:mm:ss');
    await GenerateCommissionByDate(fromTimestemp, toTimestemp);
}

const GenerateCommissionByDate = async (fromTimestemp, toTimestemp) => {

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
    // console.log("isfromDate, istoDate", isfromDate, istoDate)
    // if (isfromDate > 0 || istoDate > 0) {
    //     Console.WriteLine("Already Gen Commition");
    //     res.result = false;
    //     res.Message = "Already Gen Commition";
    //     return res;
    // }

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
    for (let i = 0; i < dt.length; i++) {

        let Account = dt[i].Account;
        let Trader_Id = dt[i].Trader_Id;

        // get close commition
        let clt = await GetCloseTrade(Account, fromTimestemp, toTimestemp);
        console.log(i + " -Account-", Account, ' | lstCLOSE', clt.lstCLOSE.length, ' Trader_Id:', Trader_Id, 'Time:', fromTimestemp, ' - ', toTimestemp);
        if (clt.lstCLOSE.length > 0) {

            col.no_of_trade += clt.lstCLOSE.Count;

            clt.lstCLOSE = clt.lstCLOSE.map(data => { data.Trader_Id = Trader_Id; return data; });

            res = CommissionTadeADD(clt.lstCLOSE);

        }



    }



    let resAddComm = await AddIBCommissionDate_Object(col);
    if (resAddComm.result == false) {
        res.result = false;
        res.Message = "Unable to add commission date";
        console.log("Unable to add commission date", resAddComm.Message);
        return res;
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

        let object = [];

        for (let i = 0; i < col.length; i++) {
            if (col[i].Symbol != "" && col[i].Symbol != null) {

                sql += " INSERT INTO [Trades]" +
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
            }
        }

        // await addTrades_Commission(object)


        if (sql == "") {

            res.result = false;
            res.Message = "No Trader Found, No create SQL";

        }
        else {

            // console.log("SQL", sql);
            const pool = await poolPromise;
            const request = pool.request();
            let res = await request.query(sql);
            console.log("res", res);
            res.result = true;
            res.Message = "Trade Added Successfully";
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



const GetCloseTrade = async (Account, fromDate, toDate) => {


    let res = await trApi.GetCloseTrade(Account, fromDate, toDate);

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
        // console.log("AddIBCommissionDate_Object", rr);
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
    // console.log("isDateExists", result.recordset);
    // console.log("isDateExists", result);
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

        // 	declare @MT5Account int;  
        // 	declare @Ticket int;  
        // 	declare @Trader_Id int;  
        // 	declare @Commission float;  
        // 	declare @Commission_Amount float;  
        // 	declare @Lot float;  
        // 	declare @Commission_Code int;  
        // 	declare @Reffered_By int;  
        // 	declare @IBCommissionPlans int;  
        // 	declare @Close_Time DateTime;

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

        // 	--select Lot from Trades where Trdae_Id=10;
        // 	select @MT5Account = MT5Account , @Ticket = Ticket ,@Trader_Id = Trader_Id , @Commission= - Commission , @Lot = Lot, @Close_Time = Close_Time  from inserted;
        // 	--select @MT5Account = Trades.MT5Account , @Ticket = Trades.Ticket ,@Trader_Id = Trades.Trader_Id , @Commission= Trades.Commission, @Lot = Trades.Lot  from Trades where Trdae_Id=14;

        if (!cTrade) {

            let sql1 = `select  MT5Account , Ticket , Trader_Id , Commission, Lot, Close_Time  from Trades 
                        where Trdae_Id=8;`;

            const trad1 = await pool.request().query(sql1);
            if (trad1.recordset.length == 0) {
                throw new Error("No trad found");
            }
            // console.log("for test only", trad1.recordset);
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


        // 	if(@Commission!=0)
        // 	BEGIN 
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


            // 		while @Reffered_By!=0
            // 		BEGIN
            while (_Reffered_By != 0) {
                // 			SET @lvl+=1;
                _lvl += 1;
                // Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Reffered_By;
                let sql6 = ` Select Reffered_By from Profiles Where Trader_Id=${_Reffered_By};`;
                let Reffered_By_prof = await pool.request().query(sql6);
                Reffered_By_prof = Reffered_By_prof.recordset;
                // console.log("Reffered_By_prof", Reffered_By_prof);

                _Reffered_By = Reffered_By_prof[0]?.Reffered_By || 0;
                // END
            }

            // console.log("lvl", _lvl);

            // 		if @lvl!=0
            // 		BEGIN
            if (_lvl != 0) {
                // 			declare @total_comission float=0;
                // 			declare @Level1 float=0;
                // 			declare @Level2 float=0;
                // 			declare @Level3 float=0;
                // 			declare @Level4 float=0;
                // 			declare @Level5 float=0;
                // 			declare @Level6 float=0;
                // 			declare @Level7 float=0;
                // 			declare @Level8 float=0;
                // 			declare @Level9 float=0;
                // 			declare @Level10 float=0;
                // 			declare @cTrader_Id int;

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

                // 			--select * from #CommitionLvl

                // 			Select @Level1=Level1 ,@Level2=Level2 ,@Level3=Level3 ,@Level4=Level4 ,@Level5=Level5 ,
                // 			@Level6=Level6 ,@Level7=Level7 ,@Level8=Level8 ,@Level9=Level9 ,@Level10=Level10   from  #CommitionLvl where Level_No=@lvl
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

                // console.log("CommitionLvlF", CommitionLvlF);
                // console.log("_Commission", _Commission);
                // console.log("_Commission ", _Commission, '_Level1', _Level1, '_Level2', _Level2, '_Level3', _Level3, '_Level4', _Level4, '_Level5', _Level5, '_Level6', _Level6, '_Level7', _Level7, '_Level8', _Level8, '_Level9', _Level9, '_Level10', _Level10);
                // 			Select @cTrader_Id=Trader_Id ,@Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
                let sql7 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id= ${_Trader_Id};`;
                let Profile = await pool.request().query(sql7);
                Profile = Profile.recordset;
                // console.log("Profile--", Profile);
                _cTrader_Id = Profile[0].Trader_Id;
                _Reffered_By = Profile[0].Reffered_By;
                // 			SET @lvl=0;
                _lvl = 0;

                // 				while @Reffered_By!=0
                // 				BEGIN
                while (_Reffered_By != 0) {
                    // 					SET @lvl+=1;
                    _lvl += 1;
                    // 					Select @cTrader_Id=Trader_Id , @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Reffered_By;
                    let sql8 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id=${_Reffered_By};`;
                    let Profile = await pool.request().query(sql8);
                    Profile = Profile.recordset;
                    // console.log("Profile222", _lvl, _Reffered_By, Profile);
                    if (Profile.length == 0) {
                        break;
                    }
                    _cTrader_Id = Profile[0]?.Trader_Id;
                    _Reffered_By = Profile[0]?.Reffered_By || 0;
                    // 					declare @comm float=0;
                    let _comm = 0;

                    // 					if @lvl=1
                    // 					BEGIN
                    if (_lvl == 1) {
                        // 						SET @comm=(@Level1 * @Commission/100);
                        // 					END
                        _comm = (_Level1 * _Commission / 100);
                    }
                    // 					if @lvl=2
                    // 					BEGIN
                    // 						SET @comm=(@Level2 * @Commission/100);
                    // 					END
                    if (_lvl == 2) {
                        _comm = (_Level2 * _Commission / 100);
                    }
                    // 					if @lvl=3
                    // 					BEGIN
                    // 						SET @comm=(@Level3 * @Commission/100);
                    // 					END
                    if (_lvl == 3) {
                        _comm = (_Level3 * _Commission / 100);
                    }
                    // 					if @lvl=4
                    // 					BEGIN
                    // 						SET @comm=@Level4 * @Commission/100;
                    // 					END
                    // console.log("Level-", _Level4, _Commission, _lvl == 4);
                    if (_lvl == 4) {
                        _comm = (_Level4 * _Commission / 100);
                        // console.log("Level4", _Level4, _Commission, _Comm);
                    }
                    // 					if @lvl=5
                    // 					BEGIN
                    // 						SET @comm=@Level5 * @Commission/100;
                    // 					END
                    if (_lvl == 5) {
                        _comm = (_Level5 * _Commission / 100);
                    }
                    // 					if @lvl=6
                    // 					BEGIN
                    // 						SET @comm=@Level6 * @Commission/100;
                    // 					END
                    if (_lvl == 6) {
                        _comm = (_Level6 * _Commission / 100);
                    }
                    // 					if @lvl=7
                    // 					BEGIN
                    // 						SET @comm=@Level7 * @Commission/100;
                    // 					END
                    if (_lvl == 7) {
                        _comm = (_Level7 * _Commission / 100);
                    }
                    // 					if @lvl=8
                    // 					BEGIN
                    // 						SET @comm=@Level8 * @Commission/100;
                    // 					END
                    if (_lvl == 8) {
                        _comm = (_Level8 * _Commission / 100);
                    }
                    // 					if @lvl=9
                    // 					BEGIN
                    // 						SET @comm=@Level9 * @Commission/100;
                    // 					END
                    if (_lvl == 9) {
                        _comm = (_Level9 * _Commission / 100);
                    }
                    // 					if @lvl=10
                    // 					BEGIN
                    // 						SET @comm=@Level10 * @Commission/100;
                    // 					END

                    if (_lvl == 10) {
                        _comm = (_Level10 * _Commission / 100);
                    }
                    // 					if @comm != 0
                    // 					BEGIN
                    // 						SET @total_comission = @total_comission + @comm;
                    // 						INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
                    // 							VALUES (@cTrader_Id,@comm,@lvl,@Trader_Id,@MT5Account,(select GETDATE()),@Ticket, @Close_Time);
                    // 					END
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
                // console.log("total_comission", _total_comission);
                // UPDATE IB_Commission_Gen_Date SET total_comission = @total_comission WHERE Commission_Date_Id = (SELECT MAX(Commission_Date_Id) FROM IB_Commission_Gen_Date);
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

                // END
            }

            // drop table #CommitionLvl;

            // END
        }
        // 	drop table #CommitionPlan;

        // END
    } catch (error) {
        console.error("Error running trigger:", error.message);
    }

}

// { Commission_Id:'', Trader_Id:'', Commission:'', Source:'', SourceAccount:'', Ticket:'', Levels:'',}
const tri_AdddRecordIB_CommissionWallet = async (comm) => {

    console.log("tri_AdddRecordIB_CommissionWallet", comm);

    let pool = await poolPromise;
    /****** Object:  Trigger [dbo].[AdddRecordIB_CommissionWallet]    Script Date: 4/13/2025 11:14:23 AM ******/
    // SET ANSI_NULLS ON
    // GO
    // SET QUOTED_IDENTIFIER ON
    // GO
    // ALTER TRIGGER [dbo].[AdddRecordIB_CommissionWallet] ON [dbo].[IB_Commission]
    // AFTER  insert   
    // AS  
    // BEGIN
    // set NOCount on;

    // declare @Trader_Id int;     
    // declare @IB_Commition float;   
    // declare @Source int;    
    // declare @SourceAccount int;    
    // declare @Ticket int;      
    // declare @Levels int;      
    // declare @BlockCommition int;
    // declare @Commission_Id int;    


    let _Trader_Id = 0;
    let _IB_Commition = 0;
    let _Source = 0;
    let _SourceAccount = 0;
    let _Ticket = 0;
    let _Levels = 0;
    let _BlockCommition = 0;
    let _Commission_Id = 0;


    // select @Commission_Id = Commission_Id, @Trader_Id =inserted.Trader_Id , @IB_Commition = inserted.Commission 
    // , @Source = inserted.Source, @SourceAccount = inserted.SourceAccount
    // , @Ticket = inserted.Ticket 
    // , @Levels = inserted.Levels 
    // from inserted;


    _Commission_Id = comm.Commission_Id
    _Trader_Id = comm.Trader_Id
    _IB_Commition = comm.Commission
    _Source = comm.Source
    _SourceAccount = comm.SourceAccount
    _Ticket = comm.Ticket
    _Levels = comm.Levels

    // 	Select @BlockCommition = BlockCommition  from Profiles Where Trader_Id = @Trader_Id;
    let sql11 = `Select BlockCommition from Profiles Where Trader_Id = ${_Trader_Id};`;
    let BlockCommition = await pool.request().query(sql11);
    BlockCommition = BlockCommition.recordset;
    _BlockCommition = BlockCommition[0].BlockCommition;

    // 	if @BlockCommition!=1
    // 	BEGIN
    if (_BlockCommition != 1) {

        // 		 INSERT INTO [IB_Commission_Wallet]
        // 				   ( [Trader_Id],[Deposite_Withdraw],[Type]
        // 				   ,[IB_Commition], CurrentBalance, [Source],[Ticket],[Comment]
        // 				   ,[AdmComment],[Status],[Created_On])
        // 			 VALUES
        // 				   (@Trader_Id,0,1
        // 				   ,@IB_Commition,
        // 		  ( select ISNULL((select top 1 CurrentBalance from [IB_Commission_Wallet] where Trader_Id = @Trader_Id  order by  IB_Commition_Wallet_Id desc),0) as CurrentBalance) + @IB_Commition,
        // 		   @Source, @Ticket, CONCAT('Commission From Account : ', @SourceAccount)
        // 				   ,CONCAT('Auto generate Commission ',@SourceAccount),1,(select GETDATE()) );

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
        // 	END
    }
    // 	if @BlockCommition=1
    // 	BEGIN

    if (_BlockCommition == 1) {
        // 		update IB_Commission set commition_generated = 0 where Commission_Id = @Commission_Id;
        // 	END
        let sql13 = `update IB_Commission set commition_generated = 0 where Commission_Id = ${_Commission_Id};`;
        const inrtComm = await pool.request().query(sql13);
    }
    // END
}


let settingList = {};
const getSeting = async () => {
    //     
    //ALTER TABLE [Setting] ADD auto_generate_commission_min varchar(10);
    let sql = ` SELECT Setting_id, Check_KYC_on, Wallet_to_Wallet_Transfer, Account_to_Account, Wallet_to_Account, Account_to_Wallet, Default_Tradersroom_Workspace, Allow_Withdraw_when_Trade_Open, blockEmailPhone, totalNoOfAccountOpen, Type, Is_Auto_Gen_Account, Signup_Type, account_series, AutoDeposit, Enable_Wallet, minimum_withdrawal, 
    open_account_on_kyc, auto_generate_commission_min
     FROM [Setting] Where Setting_id = 1`;
    let pool = await poolPromise;
    const result = await pool.request().query(sql);
    // console.log("getSeting", result.recordset);
    result.recordset[0].auto_generate_commission_min = 300;
    settingList = result.recordset[0];

    // console.log("settingList", settingList.auto_generate_commission_min);
    if (settingList?.auto_generate_commission_min)
        startCommissionScheduler('min', settingList.auto_generate_commission_min); // Runs every 5 minutes

    return result.recordset[0];
}

getSeting()



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
            console.log("addTrades_Commission", sql);
            const pool = await poolPromise;
            const request = pool.request();
            let rr = await request.query(sql);
            console.log("addTrades_Commission", rr);
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
    // console.log("Trades_CommissionDateWish", result.recordset.length);
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

    if(Trader_Ids.length == 0){
        return { response: [], summary: {
            total_trade: 0,
            total_lot: 0,
            total_amount: 0,
            total_profit: 0,
            total_loss: 0,
            total_commission: 0
        } };

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

    console.log("IBTrades_CommissionDateWish", result.recordset);

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
    console.log("resultIB2", resultIB2);

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

    console.log("summary", summary);
    return { response: resultIB2, summary: summary };


}

module.exports = { generateCommition, processIBCommission, GenerateCommissionByDate, GenerateCommissionByToDate, tri_IBCommission, Trades_CommissionDateWish, IBTrades_CommissionDateWish }