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

        console.log("Trader Account: ", info)

        let sql1 = `  SELECT  MT5Account,
        SUM(CASE WHEN Deposit_Withdraw = 0 THEN Amount ELSE 0 END) AS Total_Deposit,
        SUM(CASE WHEN Deposit_Withdraw = 1 THEN Amount ELSE 0 END) AS Total_Withdraw
        FROM Wallet_AutoManualPayment
        WHERE MT5Account IN (${Accounts}) GROUP BY MT5Account; `;

        // console.log("sql1", sql1)

        let DW = await pool.request().query(sql1);

        // [info, DW ]= await Promise.all[info, DW];
        let DW_Data = DW.recordset;
        console.log(">DW_Data>>", DW_Data)
        // 605871, 605887, 605890, 605892, 605893, 605944, 605945,
        // console.log('-->', info)
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
        })

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

        
        console.log("Trader Accounts: ", Accounts)
        //let info = await trApi.getUsersOpenTrade(Accounts);
        let info = await trApi.getUsersOpenTradeNew(Accounts);
        // let info = await trApi.getUsersOpenTrade([204728]);


        return info.lstOPEN ||[] ; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const getOpenTradeByUsersNew = async (Accounts) => {
    try { 

        
        console.log("Trader Accounts: ", Accounts)
        let info = await trApi.getUsersOpenTradeNew(Accounts.split(','));
        // let info = await trApi.getUsersOpenTrade([204728]); 609301


        return info  ; // Return the result
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
        console.log('Accounts', Accounts)

        let sql1 = `SELECT * FROM [Wallet_AutoManualPayment] where MT5Account IN (${Accounts}) ;`

        let info = await pool.request().query(sql1 );
        // console.log('info', info.recordset)



        let dataTran = info.recordset;

        dataTran = dataTran.map((data, index) => {
        let data1 = row.find(d => d.Account == data.MT5Account)
            
        data.Name = data1.Name;
        data.Referral_Code = data1.Referral_Code;
        return data;
        })

        return    dataTran ; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const getTransactionByuser = async (Account, page = 1, limit = 10) => {
    try {
        const pool = await poolPromise; // Connect to the database
 

        let sql1 = `SELECT * FROM [Wallet_AutoManualPayment] where MT5Account = ${Account}  ORDER BY ID 
            OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY;`;

          console.log('lodas', sql1);

        let info = await pool.request().query(sql1 );
        let dataTran = info.recordset;
        console.log("dataTran", dataTran)
 

        return dataTran ; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}

const GetOpenTrade = async (MT5Accont) =>{

    try{
        
        let info = await trApi.GetOpenTrade(MT5Accont);
 

        return  info  ; // Return the result
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
}
module.exports = { getRecursiveData, getOpenTradeByUsers, getOpenTrade, getTransaction, getTransactionByuser, GetOpenTrade, getOpenTradeByUsersNew };
