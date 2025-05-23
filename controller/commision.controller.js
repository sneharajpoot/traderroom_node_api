const { poolPromise } = require('../db');
const trApi = require('../traderroom/api')

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

module.exports = { generateCommition, processIBCommission }