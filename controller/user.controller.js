const { poolPromise } = require('../db');

const managerApi = require('../traderroom/manager-api')


// Fetch Pending Requests with Pagination
const getalluserList = async () => {
    try {

        const result = [

        ];
        return result;
    } catch (err) {
        console.error('Error fetching GetGroups:', err.message);
        throw err;
    }
};

const  getKycUser = async ( fType,   Search,  Kyc_Status,  index,  count)=> {
    const pool = await poolPromise;
    let FilterType = {
        NAME: 1,
        EMAIL: 2,
        PHONE: 3,
        ALL: 4
    }
    // KYCSTATUS

    
    let plist = {Profiles:[], Count:0};
    // return plist;

    let ulist = [];
    // Profile_Count_Obj plist = new Profile_Count_Obj();

    let  Count = 0;
    let sql1 = " ";
    
    sql1 += " SELECT  count(Trader_Id) As Count FROM [Profiles]" +
        " where Kyc_Status=" +  Kyc_Status + " and (1!=1  ";

    if (fType == FilterType.NAME || fType == FilterType.ALL)
        sql1 += " or Name like '%" + Search + "%'";
    if (fType == FilterType.EMAIL || fType == FilterType.ALL)
        sql1 += " or Email like '%" + Search + "%'";
    if (fType == FilterType.PHONE || fType == FilterType.ALL)
        sql1 += " or Phone like '%" + Search + "%'";

    sql1 += " ) ";
    //   "  order by Trader_Id desc  ";
    // using (SqlCommand cmd = new SqlCommand(sql1, oConnection))
    // {
    //     //cmd.Parameters.Add("@WalletId", (int)WalletId);
    //     using (SqlDataReader reader = cmd.ExecuteReader())
    //     {
    //         if (reader.HasRows)
    //         {
    //             if (reader.Read())
    //             {
    //                 Profile_Obj proObj = new Profile_Obj();
    //                 Count = Convert.ToInt32(reader.GetValue(0));
    //             }
    //         }
    //     }
    // }

    const CountList = await pool.request().query(sql1);
    Count = CountList.recordset[0]['Count'] || 0;


    sql1 = " select * from ( SELECT [Trader_Id] ,[Name],[Password],[Email],[Phone]" +
      " ,[City],[Country],[State],[Zip_Code]  ,[Leverage]" +
      " ,[Plan_Id] ,  [Id_proof],[Address_Proof],  Kyc_Status ," +
      " ROW_NUMBER() OVER ( ORDER BY Trader_Id desc) AS RowNum, " +
      " Other_Proof, Kyc_Comment " +
        "  profession,  sources_of_funds,  financial_details " +
      " FROM [Profiles]";
    sql1 +=" Where Kyc_Status=" + Kyc_Status + "  and ( 1!=1   ";

    if (fType == FilterType.NAME || fType == FilterType.ALL)
        sql1 += " or Name like '%" + Search + "%'";

    if (fType == FilterType.EMAIL || fType == FilterType.ALL)
        sql1 += " or Email like '%" + Search + "%'";

    if (fType == FilterType.PHONE || fType == FilterType.ALL)
        sql1 += " or Phone like '%" + Search + "%'";


    sql1 += " )  )as c " +
      " where   RowNum >= " + (((index - 1) * count) + 1) + "  AND RowNum <" + ((((index - 1) * count) + count) + 1);


    //sql += " order by trader_id desc ";

    try
    {
        // using (SqlCommand cmd = new SqlCommand(sql1, oConnection))
        // {
        //     using (SqlDataReader reader = cmd.ExecuteReader())
        //     {
        //         if (reader.HasRows)
        //             while (reader.Read())
        //             {
        //                 //  if (!reader.IsDBNull(0))
        //                 //  {
        //                 Profile_Obj proObj = new Profile_Obj();
        //                 proObj.Trader_Id = Convert.ToInt32(reader.GetValue(0));
        //                 proObj.Name = Convert.ToString(reader.GetValue(1));
        //                 proObj.Password = Convert.ToString(reader.GetValue(2));
        //                 proObj.Email = Convert.ToString(reader.GetValue(3));
        //                 proObj.Phone = Convert.ToString(reader.GetValue(4));

        //                 proObj.City = Convert.ToString(reader.GetValue(5));
        //                 proObj.Country = Convert.ToString(reader.GetValue(6));
        //                 proObj.State = Convert.ToString(reader.GetValue(7));
        //                 proObj.Zip_Code = Convert.ToString(reader.GetValue(8));
        //                 proObj.Leverage = Convert.ToInt16(reader.GetValue(9));


        //                 if (reader.GetValue(10) == null)
        //                     proObj.Plan_Id = 0;
        //                 else
        //                     proObj.Plan_Id = Convert.ToInt32(reader.GetValue(10));


        //                 proObj.Id_proof = Convert.ToString(reader.GetValue(11));
        //                 proObj.Address_Proof = Convert.ToString(reader.GetValue(12));
        //                 proObj.Kyc_Status = (KYCSTATUS)Convert.ToInt32(reader.GetValue(13));
        //                 proObj.Other_Proof = reader.GetValue(15) != null? Convert.ToString(reader.GetValue(15)) : "" ;
        //                 proObj.Kyc_Comment = reader.GetValue(16) != null ? Convert.ToString(reader.GetValue(16)) : "" ;
        //                 proObj.profession = reader.GetValue(17) != null ? Convert.ToString(reader.GetValue(17)) : "" ;
        //                 proObj.sources_of_funds = reader.GetValue(18) != null ? Convert.ToString(reader.GetValue(18)) : "" ;
        //                 proObj.financial_details = reader.GetValue(19) != null ? Convert.ToString(reader.GetValue(19)) : "" ;


        //                 ulist.Add(proObj);
        //                 // }
        //             }

        //     }
        // }

        
    const List = await pool.request().query(sql1); 
    ulist = List.recordset.map((row) => {
        return {
            Trader_Id: row.Trader_Id,
            Name: row.Name,
            Password: row.Password,
            Email: row.Email,
            Phone: row.Phone,
            City: row.City,
            Country: row.Country,
            State: row.State,
            Zip_Code: row.Zip_Code,
            Leverage: row.Leverage,
            Plan_Id: row.Plan_Id || 0,
            Id_proof: row.Id_proof,
            Address_Proof: row.Address_Proof,
            Kyc_Status: row.Kyc_Status,
            Other_Proof: row.Other_Proof || "",
            Kyc_Comment: row.Kyc_Comment || "",
            profession: row.profession || "",
            sources_of_funds: row.sources_of_funds || "",
            financial_details: row.financial_details || ""
        };
    })


    }
    catch (  ex)
    {
        console.log("Exception >> {0} : {1}",  ex.message || ex);
        logs("Exception: " + ex.message || ex);

    }


    plist.Profiles = ulist;
    plist.Count = Count;
    return plist;
}

module.exports = { getalluserList, getKycUser };

