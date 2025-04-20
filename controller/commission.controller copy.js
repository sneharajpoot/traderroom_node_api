const { poolPromise } = require('../db');
const trApi = require('../traderroom/api')
const managerApi = require('../traderroom/manager-api')

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
const GenerateCommissionByDate = async (fromDate, toDate) => {

    let res = {};

    let gr = await managerApi.GetGroups();

    // console.log('Group', gr);

    if (gr.lstGroups.Count <= 0) {
        res.result = false;
        res.Message = " Unable to connect manager.";

        return res;
    }

    const isfromDate = await isDateExists(fromDate)
    const istoDate = await isDateExists(toDate)
    // console.log("isfromDate, istoDate", isfromDate, istoDate)
    // if (isfromDate > 0 || istoDate > 0) {
    //     Console.WriteLine("Already Gen Commition");
    //     res.result = false;
    //     res.Message = "Already Gen Commition";
    //     return res;
    // }

    let col = {
        From_Date: fromDate,
        To_Date: toDate,
        Active: 1
    }
    let resAddComm = await AddIBCommissionDate_Object(col);
    console.log("resAddComm", resAddComm)
    if (resAddComm.result == false) {
        res.result = false;
        res.Message = "Unable to add commission date";
        return res;
    }


    let sql = " SELECT p.Trader_Id ,p.Email,p.Reffered_By,p.Reffered_By_Account,pa.Account, " +
        " pa.IBCommissionPlans   " +
        " FROM dbo.Profiles as p " +
        " join MT5_Profile_Account as pa on p.Trader_Id = pa.Trader_Id   " +
        " Where Reffered_By_Account!= 0  and Status=1 ";

    let pool = await poolPromise;
    const result = await pool.request().query(sql);
    let dt = result.recordset;


    //     609872
    // 625557
    // 611360
    dt = [
        {
            Trader_Id: 3,
            Email: 'varunib@yopmail.com',
            Reffered_By: 1,
            Reffered_By_Account: 444205,
            Account: 609872,
            IBCommissionPlans: 0
        },
        //   {
        //     Trader_Id: 4,
        //     Email: 'varunib@yopmail.com',
        //     Reffered_By: 1,
        //     Reffered_By_Account: 444205,
        //     Account: 625557,
        //     IBCommissionPlans: 0
        //   },
        //   {
        //     Trader_Id: 5,
        //     Email: 'varunibsub@yopmail.com',
        //     Reffered_By: 4,
        //     Reffered_By_Account: 102752,
        //     Account: 611360,
        //     IBCommissionPlans: 0
        //   }
    ]
    console.log("dt", dt)

    console.log("dt", dt.length);

    col.no_of_account = dt.length;
    col.no_of_trade = 0;
    for (let i = 0; i < dt.length; i++) {

        let Account = dt[i].Account;

        // get close commition
        // let clt = await GetCloseTrade(Account, fromDate, toDate);
        let clt = {};

        clt.lstCLOSE = [

            {
                Close_Price: 82086.73,
                Close_Time: '2025-04-04 14:40:13',
                Close_Time_MSSec: 0,
                Close_Time_Sec: 0,
                Comment: '',
                Commission: -10,
                Lot: 0.5,
                MT5Account: 609872,
                Open_Price: 82841.26,
                Open_Time: '2025-04-04 13:48:49',
                Open_Time_Sec: 1743774529,
                PositionId: 2902682,
                Profit: -377.27,
                Stop_Loss: 0,
                Swap: 0,
                Symbol: 'BTCUSD_fx',
                Target_Price: 0,
                Taxes: 0,
                Ticket: 2907184,
                Timestamp: 1743777613,
                oBSFlag: 1,
                uPosStatus: 0,
                uTradeFlag: 1
            },
            {
                Close_Price: 82223.43,
                Close_Time: '2025-04-04 14:49:49',
                Close_Time_MSSec: 0,
                Close_Time_Sec: 0,
                Comment: '',
                Commission: -10,
                Lot: 0.5,
                MT5Account: 609872,
                Open_Price: 81938.86,
                Open_Time: '2025-04-04 14:45:04',
                Open_Time_Sec: 1743777904,
                PositionId: 2907508,
                Profit: 142.29,
                Stop_Loss: 0,
                Swap: 0,
                Symbol: 'BTCUSD_fx',
                Target_Price: 0,
                Taxes: 0,
                Ticket: 2908188,
                Timestamp: 1743778189,
                oBSFlag: 1,
                uPosStatus: 0,
                uTradeFlag: 1
            },
            {
                Close_Price: 82286.23,
                Close_Time: '2025-04-04 15:08:18',
                Close_Time_MSSec: 0,
                Close_Time_Sec: 0,
                Comment: '',
                Commission: -10,
                Lot: 0.5,
                MT5Account: 609872,
                Open_Price: 82608.86,
                Open_Time: '2025-04-04 14:04:14',
                Open_Time_Sec: 1743775454,
                PositionId: 2903534,
                Profit: -161.32,
                Stop_Loss: 0,
                Swap: 0,
                Symbol: 'BTCUSD_fx',
                Target_Price: 0,
                Taxes: 0,
                Ticket: 2909370,
                Timestamp: 1743779298,
                oBSFlag: 1,
                uPosStatus: 0,
                uTradeFlag: 1
            },
            {
                Close_Price: 3096.043,
                Close_Time: '2025-04-04 15:11:32',
                Close_Time_MSSec: 0,
                Close_Time_Sec: 0,
                Comment: '',
                Commission: -5,
                Lot: 0.5,
                MT5Account: 609872,
                Open_Price: 3097.706,
                Open_Time: '2025-04-04 15:11:23',
                Open_Time_Sec: 1743779483,
                PositionId: 2909465,
                Profit: -83.15,
                Stop_Loss: 0,
                Swap: 0,
                Symbol: 'XAUUSD_fx',
                Target_Price: 0,
                Taxes: 0,
                Ticket: 2909473,
                Timestamp: 1743779492,
                oBSFlag: 1,
                uPosStatus: 0,
                uTradeFlag: 1
            }
        ]
        console.log("clt--", Account, '---', clt)
        if (clt.lstCLOSE.length > 0) {

            col.no_of_trade += clt.lstCLOSE.Count;
            res = CommissionTadeADD(clt.lstCLOSE);

        }



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
        for (let i = 0; i < col.length; i++) {
            if (col[i].Symbol != "" && col[i].Symbol != null) {

                sql += " INSERT INTO [Trades]" +
                    " ([MT5Account],[Symbol],[Open_Price],[Stop_Loss] " +
                    " ,[Target_Price],[Lot],[Profit],[PositionId] " +
                    " ,[Ticket],[Timestamp],[Open_Time],[Close_Time] " +
                    " ,[oBSFlag],[Taxes],[Swap],[Commission], " +
                    " Comment ) " +
                    " VALUES " +
                    " (" + col[i].MT5Account + ",'" + col[i].Symbol + "'," + col[i].Open_Price + "," + col[i].Stop_Loss + ", " +
                    " " + col[i].Target_Price + "," + (col[i].Lot) + "," + col[i].Profit + "," + col[i].PositionId + ", " +
                    " " + col[i].Ticket + ",'" + col[i].Timestamp + "','" + col[i].Open_Time + "','" + col[i].Close_Time + "', " +
                    " '" + (BUY_SELL[col[i].oBSFlag]) + "'," + col[i].Taxes + "," + col[i].Swap + "," + col[i].Commission + ", " +
                    " '" + col[i].Comment + "' ); ";


                await tri_IBCommission(col[i]);
            }
        }


        if (sql == "") {

            res.result = false;
            res.Message = "No Trader Found, No create SQL";

        }
        else {

            console.log("SQL", sql);
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
    console.log("isDateExists", result.recordset);
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

        // USE[traderroom_jarha]
        // GO
        /****** Object:  Trigger [dbo].[tri_IBCommission]    Script Date: 4/12/2025 4:49:46 PM ******/
        // SET ANSI_NULLS ON
        // GO
        // SET QUOTED_IDENTIFIER ON
        // GO
        // ALTER  TRIGGER [dbo].[tri_IBCommission] ON [dbo].[Trades]
        // AFTER  insert   
        // AS  
        // BEGIN
        // 	set NOCount on;
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
            console.log("trad1", trad1.recordset);
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
        console.log("MT5_Profile_Account", MT5_Profile_Account.recordset);
        _Trader_Id = MT5_Profile_Account.recordset[0].Trader_Id;
        _IBCommissionPlans = MT5_Profile_Account.recordset[0].IBCommissionPlans;
        // 	SELECT * INTO #CommitionPlan from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = @IBCommissionPlans;
        let sql3 = ` SELECT * from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = ${_IBCommissionPlans};;`;
        const CommitionPlanList = await pool.request().query(sql3);
        console.log("CommitionPlanList", CommitionPlanList.recordset);
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
            console.log("CommitionLvl", CommitionLvl);

            if (CommitionLvl.length == 0) {
                throw new Error("No CommitionLvl found");
            }

            // 		Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
            let sql5 = ` SELECT * from [Profiles] Where Trader_Id=${_Trader_Id} ;`;
            let Reffered_By_prof = await pool.request().query(sql5);
            Reffered_By_prof = Reffered_By_prof.recordset;
            console.log("Reffered_By_prof", Reffered_By_prof);
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
                console.log("Reffered_By_prof", Reffered_By_prof);

                _Reffered_By = Reffered_By_prof[0]?.Reffered_By || 0;
                // END
            }

            console.log("_lvl -sss", _lvl);

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

                console.log("CommitionLvlF", CommitionLvlF);
                console.log("_Commission", _Commission);
                console.log("Level", '_Level1', _Level1, '_Level2', _Level2, '_Level3', _Level3, '_Level4', _Level4, '_Level5', _Level5, '_Level6', _Level6, '_Level7', _Level7, '_Level8', _Level8, '_Level9', _Level9, '_Level10', _Level10);
                // 			Select @cTrader_Id=Trader_Id ,@Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
                let sql7 = `Select Trader_Id , Reffered_By from Profiles Where Trader_Id= ${_Trader_Id};`;
                let Profile = await pool.request().query(sql7);
                Profile = Profile.recordset;
                console.log("Profile--", Profile);
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
                    console.log("Profile222", _lvl, _Reffered_By, Profile);
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
                        _Comm = (_Level1 * _Commission / 100);
                    }
                    // 					if @lvl=2
                    // 					BEGIN
                    // 						SET @comm=(@Level2 * @Commission/100);
                    // 					END
                    if (_lvl == 2) {
                        _Comm = (_Level2 * _Commission / 100);
                    }
                    // 					if @lvl=3
                    // 					BEGIN
                    // 						SET @comm=(@Level3 * @Commission/100);
                    // 					END
                    if (_lvl == 3) {
                        _Comm = (_Level3 * _Commission / 100);
                    }
                    // 					if @lvl=4
                    // 					BEGIN
                    // 						SET @comm=@Level4 * @Commission/100;
                    // 					END
                    console.log("Level-", _Level4, _Commission, _lvl == 4);
                    if (_lvl == 4) {
                        _Comm = (_Level4 * _Commission / 100);
                        console.log("Level4", _Level4, _Commission, _Comm);
                    }
                    // 					if @lvl=5
                    // 					BEGIN
                    // 						SET @comm=@Level5 * @Commission/100;
                    // 					END
                    if (_lvl == 5) {
                        _Comm = (_Level5 * _Commission / 100);
                    }
                    // 					if @lvl=6
                    // 					BEGIN
                    // 						SET @comm=@Level6 * @Commission/100;
                    // 					END
                    if (_lvl == 6) {
                        _Comm = (_Level6 * _Commission / 100);
                    }
                    // 					if @lvl=7
                    // 					BEGIN
                    // 						SET @comm=@Level7 * @Commission/100;
                    // 					END
                    if (_lvl == 7) {
                        _Comm = (_Level7 * _Commission / 100);
                    }
                    // 					if @lvl=8
                    // 					BEGIN
                    // 						SET @comm=@Level8 * @Commission/100;
                    // 					END
                    if (_lvl == 8) {
                        _Comm = (_Level8 * _Commission / 100);
                    }
                    // 					if @lvl=9
                    // 					BEGIN
                    // 						SET @comm=@Level9 * @Commission/100;
                    // 					END
                    if (_lvl == 9) {
                        _Comm = (_Level9 * _Commission / 100);
                    }
                    // 					if @lvl=10
                    // 					BEGIN
                    // 						SET @comm=@Level10 * @Commission/100;
                    // 					END

                    if (_lvl == 10) {
                        _Comm = (_Level10 * _Commission / 100);
                    }
                    // 					if @comm != 0
                    // 					BEGIN
                    // 						SET @total_comission = @total_comission + @comm;
                    // 						INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
                    // 							VALUES (@cTrader_Id,@comm,@lvl,@Trader_Id,@MT5Account,(select GETDATE()),@Ticket, @Close_Time);
                    // 					END
                    console.log("_Comm", _Comm);
                    if (_Comm != 0) {
                        _total_comission += _Comm;
                        let sql9 = `INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
                         OUTPUT INSERTED.Commission_Id  
                        VALUES (${_cTrader_Id},${_Comm},${_lvl},${_Trader_Id},${_MT5Account},(select GETDATE()),${_Ticket}, '${_Close_Time}');`;
                        console.log("sql9", sql9);
                        const inrtComm = await pool.request().query(sql9);
                        console.log("INSERT [IB_Commission]", inrtComm);

                        let Commission_Id = inrtComm.recordset[0].Commission_Id;

                        console.log("Commission_Id", Commission_Id);


                        // { Commission_Id:'', Trader_Id:'', Commission:'', Source:'', SourceAccount:'', Ticket:'', Levels:'',}
                        let adComm = await tri_AdddRecordIB_CommissionWallet({
                            Commission_Id: Commission_Id,
                            Trader_Id: _cTrader_Id,
                            Commission: _Comm,
                            Source: _Trader_Id,
                            SourceAccount: _MT5Account,
                            Ticket: _Ticket,
                            Levels: _lvl,
                        });
                        console.log("adComm", adComm);
                    }
                    // END
                }
                console.log("total_comission", _total_comission);
                // UPDATE IB_Commission_Gen_Date SET total_comission = @total_comission WHERE Commission_Date_Id = (SELECT MAX(Commission_Date_Id) FROM IB_Commission_Gen_Date);
                let sql10 = `UPDATE IB_Commission_Gen_Date SET total_comission = ${_total_comission} WHERE Commission_Date_Id = (SELECT MAX(Commission_Date_Id) FROM IB_Commission_Gen_Date);`;
                const upIB_Commission_Gen_Date = await pool.request().query(sql10);
                console.log("upIB_Commission_Gen_Date", upIB_Commission_Gen_Date);

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

    console.log("BlockCommition---->", _BlockCommition);
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
        console.log("INSERT  [IB_Commission_Wallet]", inrtComm);
        // 	END
    }
    // 	if @BlockCommition=1
    // 	BEGIN

    if (_BlockCommition == 1) {
        // 		update IB_Commission set commition_generated = 0 where Commission_Id = @Commission_Id;
        // 	END
        let sql13 = `update IB_Commission set commition_generated = 0 where Commission_Id = ${_Commission_Id};`;
        const inrtComm = await pool.request().query(sql13);
        console.log("update IB_Commission", inrtComm);
    }
    // END
}

module.exports = { generateCommition, processIBCommission, GenerateCommissionByDate, tri_IBCommission }