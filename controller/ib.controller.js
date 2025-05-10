const { sql, poolPromise } = require('../db');
// const { getUserInfo, getUsersOpenTrade  } = require('../traderroom/api')
const trApi = require('../traderroom/api')
const getRecursiveData = async (traderId, page = 1, limit = 10) => {
    try {
        const pool = await poolPromise; // Connect to the database

        // Dynamic SQL query

        let sql = ` WITH RecursiveCte AS 
                    ( 
                        SELECT 1 as Level, H1.Trader_Id, H1.Reffered_By, H1.Name, H1.Reffered_By_Account,
                        H1.Email, H1.Created_On, H1.Status,
                        H1.Phone  FROM[Profiles] H1
                        WHERE H1.Trader_Id =   ${traderId}
                        UNION ALL 
                        SELECT RCTE.level + 1 as Level, H2.Trader_Id, H2.Reffered_By, H2.Name, H2.Reffered_By_Account, 
                        H2.Email, H2.Created_On, H2.Status, 
                        H2.Phone  FROM Profiles H2 
                        INNER JOIN RecursiveCte RCTE ON H2.Reffered_By = RCTE.Trader_Id 
                    ) 
       SELECT  H1.Trader_Id, H1.Name, H1.Email,H1.Phone, H1.Reffered_By_Account,  H1.Created_On, 
       H1.Status ,  H1.Reffered_By, H1.Level,   
       ISNULL (A.Account ,0) Account , A.IBCommissionPlans , A.Plan_Id   
       FROM RecursiveCte as H1 
       join MT5_Profile_Account as A on H1.Trader_Id = A.Trader_Id
          ORDER BY H1.Level, H1.Trader_Id
          OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY; `;

        // console.log("sql", sql)

        // Execute the query
        const result = await pool.request().query(sql);

        let row = result.recordset;
        let Accounts = row.map(data => data.Account)
        // let Accounts = [609289, 609356]

        // console.log('--Accounts>', Accounts)

        // let info = await getUserInfo(Accounts );
        let info = await trApi.getUserInfo(Accounts);

        ////    PENDING = 0,   REJECT = 2,   APPROVE = 1
        let sql1 = `  SELECT  MT5Account,
        SUM(CASE WHEN Deposit_Withdraw = 0 THEN Amount ELSE 0 END) AS Total_Deposit,
        SUM(CASE WHEN Deposit_Withdraw = 1 THEN Amount ELSE 0 END) AS Total_Withdraw
        FROM Wallet_AutoManualPayment  
        WHERE MT5Account IN (${Accounts}) AND Status = 1  GROUP BY MT5Account; `;


        let DW = await pool.request().query(sql1);

        // [info, DW ]= await Promise.all[info, DW];
        let DW_Data = DW.recordset;
        // 605871, 605887, 605890, 605892, 605893, 605944, 605945,
        row = row.map(data => {
            data.DW_Data = DW_Data.find(d => d.MT5Account == data.Account)

            data.livedata = info.find(d => d.MT5Account == data.Account)
            let ress = {
                Trader_Id: data.Trader_Id,
                Name: data.Name,
                Email: data.Email,
                Reffered_By_Account: data.Reffered_By_Account,
                Level: data.Level,
                Account: data.Account,

                Balance: data.livedata?.Balance || 0,
                Commission: data.livedata?.Commission || 0,
                Credit: data.livedata?.Credit || 0,
                Profit: data.livedata?.Profit || 0,

                Total_Deposit: data.DW_Data?.Total_Deposit || 0,
                Total_Withdraw: data.DW_Data?.Total_Withdraw || 0


            }
            return ress;
        });

        // order by Level/
        row = row.sort((a, b) => {
            if (a.Level === b.Level) {
                return a.Trader_Id - b.Trader_Id; // Sort by Trader_Id if Level is the same
            }
            return a.Level - b.Level; // Sort by Level
        });


        // {id_name:'', ib_code:'',account:'', Profit:'', Commission:'', Balance:'', total_deposit:0, total_withdral:0 }
        // console.log('Query Result:', result.recordset); // Output the results
        return { row, page, limit }; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}


const getOpenTradeByUsers = async (traderId, page = 1, limit = 10) => {
    try {
        const pool = await poolPromise; // Connect to the database

        // Dynamic SQL query

        let sql = ` WITH RecursiveCte AS 
                    ( 
                        SELECT 1 as Level, H1.Trader_Id, H1.Reffered_By, H1.Name, H1.Reffered_By_Account,
                        H1.Email, H1.Created_On, H1.Status,
                        H1.Phone  FROM[Profiles] H1
                        WHERE H1.Trader_Id =   ${traderId}
                        UNION ALL 
                        SELECT RCTE.level + 1 as Level, H2.Trader_Id, H2.Reffered_By, H2.Name, H2.Reffered_By_Account, 
                        H2.Email, H2.Created_On, H2.Status, 
                        H2.Phone  FROM Profiles H2 
                        INNER JOIN RecursiveCte RCTE ON H2.Reffered_By = RCTE.Trader_Id 
                    ) 
       SELECT  H1.Trader_Id, H1.Name, H1.Email,H1.Phone, H1.Reffered_By_Account,  H1.Created_On, 
       H1.Status ,  H1.Reffered_By, H1.Level,   
       ISNULL (A.Account ,0) Account , A.IBCommissionPlans , A.Plan_Id   
       FROM RecursiveCte as H1 
       join MT5_Profile_Account as A on H1.Trader_Id = A.Trader_Id
          ORDER BY H1.Level, H1.Trader_Id
          OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY; `;

        // console.log("sql", sql)

        // Execute the query
        const result = await pool.request().query(sql);

        let row = result.recordset;
        let Accounts = row.map(data => data.Account)


        //let info = await trApi.getUsersOpenTrade(Accounts);
        let info = await trApi.getUsersOpenTradeNew(Accounts);
        // let info = await trApi.getUsersOpenTrade([204728]);


        return info.lstOPEN || []; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const getOpenTradeByUsersNew = async (Accounts) => {
    try {


        let info = await trApi.getUsersOpenTradeNew(Accounts.split(','));
        // let info = await trApi.getUsersOpenTrade([204728]); 609301


        return info; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const getOpenTrade = async (Accounts) => {
    try {

        let info = await trApi.getOpenTrade(Accounts);


        return { info }; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const getTransaction = async (Trader_Id, page = 1, limit = 10) => {
    try {
        const pool = await poolPromise; // Connect to the database

        // Dynamic SQL query

        let sql = ` WITH RecursiveCte AS 
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

        // console.log("sql", sql)

        // Execute the query
        const result = await pool.request().query(sql);

        let row = result.recordset;
        let Accounts = row.map(data => data.Account);

        let sql1 = `SELECT * FROM [Wallet_AutoManualPayment] where where Status=1 and  MT5Account IN (${Accounts}) ;`

        let info = await pool.request().query(sql1);
        // console.log('info', info.recordset)



        let dataTran = info.recordset;

        dataTran = dataTran.map((data, index) => {
            let data1 = row.find(d => d.Account == data.MT5Account)

            data.Name = data1.Name;
            data.Referral_Code = data1.Referral_Code;
            return data;
        })

        return dataTran; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const getTransactionByuser = async (Account, page = 1, limit = 10, Deposit_Withdraw = null) => {
    try {
        const pool = await poolPromise; // Connect to the database

        let cond = '';

        if (Deposit_Withdraw == 0 || Deposit_Withdraw == 1) {

            cond = ` AND Deposit_Withdraw = ${Deposit_Withdraw}`;
        }

        let sql1 = `SELECT * FROM [Wallet_AutoManualPayment] where MT5Account = ${Account} AND status = 1 ${cond}   ORDER BY ID 
            OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY;`;


        let info = await pool.request().query(sql1);
        let dataTran = info.recordset;


        return dataTran; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const GetOpenTrade = async (MT5Accont) => {

    try {

        let info = await trApi.GetOpenTrade(MT5Accont);


        return info; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}


const getDashboardData = async () => {
    try {
        const pool = await poolPromise; // Connect to the database


        // Upload Kyc
        // Withdraw Request
        // Deposit Request
        // Profile Request


        // PENDING = 0, APPROVED = 1, REJECTED = 2, HOLD = 3, UPLOADED = 4
        let kycStatus = ['PENDING', 'APPROVED', 'REJECTED', 'HOLD', 'UPLOADED']
        // select COUNT(Trader_Id) as total ,Kyc_Status from [dbo].[Profiles]  GROUP BY Kyc_Status;


        //  -- PENDING = 0, APPROVED = 1, REJECTED = 2, HOLD = 3
        const paymentStatus = ['PENDING', 'APPROVED', 'REJECTED', 'HOLD']
        // select COUNT(ID) as total_count from [dbo].[Wallet_AutoManualPayment] where Deposit_Withdraw = 0 and Status = 0;
        // select COUNT(ID) as total_count from [dbo].[Wallet_AutoManualPayment] where Deposit_Withdraw = 1 and Status = 0;

        let sql1 = `select COUNT(Trader_Id) as total ,Kyc_Status from [dbo].[Profiles]  GROUP BY Kyc_Status;`;
        let sql2 = `select COUNT(ID) as total_count, Deposit_Withdraw ,Status from [dbo].[Wallet_AutoManualPayment]   GROUP BY Deposit_Withdraw ,Status;`;
        let sql3 = `select SUM(amount) as total_deposit from [dbo].[Wallet_AutoManualPayment]   where Deposit_Withdraw = 0  and Status = 1;`;
        let sql4 = `select SUM(amount) as total_Withdraw from [dbo].[Wallet_AutoManualPayment]   where Deposit_Withdraw = 1  and Status = 1;`;

        let profiles = pool.request().query(sql1);
        // let kycStatusCount = profiles.recordset;

        let payments = pool.request().query(sql2);
        // let paymentsCount = payments.recordset;

        let totalDeposit = pool.request().query(sql3);
        //  totalDeposit = totalDeposit.recordset;

        let totalWithdraw = pool.request().query(sql4);
        // totalWithdraw = payments.recordset;

        let resData = await Promise.allSettled([profiles, payments, totalDeposit, totalWithdraw]);

        let kycStatusCount = resData[0].value.recordset;
        let paymentsCount = resData[1].value.recordset;
        totalDeposit = resData[2].value.recordset[0].total_deposit;
        totalWithdraw = resData[3].value.recordset[0].total_Withdraw;


        kycStatusCount = kycStatusCount.map(data => {
            data.Kyc_Status = kycStatus[data.Kyc_Status]
            return data;
        });

        paymentsCount = paymentsCount.map(data => {
            data.Deposit_Withdraw = data.Deposit_Withdraw ? 'Withdraw' : 'Deposit'
            data.Status = paymentStatus[data.Status]

            return data;
        })

        // return { paymentsCount, kycStatusCount }; // Return the result
        // console.log("paymentsCount", paymentsCount, kycStatusCount )
        // dataTran [
        //        { total: 18, Kyc_Status: 0 },
        //        { total: 325, Kyc_Status: 1 },
        //        { total: 3, Kyc_Status: 2 },
        //        { total: 1, Kyc_Status: 4 }
        //      ]
        //      paymentsCount [
        //        { total_count: 166, Deposit_Withdraw: 0, Status: 0 }, 
        //        { total_count: 602, Deposit_Withdraw: 0, Status: 1 }, 
        //        { total_count: 5, Deposit_Withdraw: 1, Status: 0 },   
        //        { total_count: 46, Deposit_Withdraw: 0, Status: 2 },  
        //        { total_count: 90, Deposit_Withdraw: 1, Status: 1 }   
        //      ]

        return { kycStatusCount, paymentsCount, totalDeposit, totalWithdraw }; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}
module.exports = { getDashboardData, getRecursiveData, getOpenTradeByUsers, getOpenTrade, getTransaction, getTransactionByuser, GetOpenTrade, getOpenTradeByUsersNew };
