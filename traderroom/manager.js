const axios = require('axios');
const rootUrl = process.env.ROOT_Url;

const getHeaders = () => {
    return {
        'x-token': '1000', // Replace with your x-token value
        'type': 1,
        'Content-Type': 'application/json'
    };
};

const Test = async () => {

    // call API
    const url = `${rootUrl}/test`; // Replace with your actual API URL

    const headers = getHeaders();
    // Make the GET request
    const response = await axios.get(url, { headers });

    // Log and return the response
    return response.data;

};

const InitialAddManager = async () => {
    // call API
    const url = `${rootUrl}/InitialAddManager`; // Replace with your actual API URL

    const headers = getHeaders();
    // Make the GET request
    const response = await axios.get(url, { headers });

    // Log and return the response
    return response.data;
}

const Signup = async (oUserInfo) => {
    // call API
    const url = `${rootUrl}/Signup`; // Replace with your actual API URL

    const headers = getHeaders();
    // Make the GET request
    const response = await axios.post(url, oUserInfo, { headers });

    // Log and return the response
    return response.data;
}

const SignupNew = async (oUserInfo) => {
    const url = `${rootUrl}/SignupNew`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, oUserInfo, { headers });
    return response.data;
}

const SignupWithAccount = async (oUserInfo) => {
    const url = `${rootUrl}/SignupWithAccount`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, oUserInfo, { headers });
    return response.data;
}

const UpdateProfile = async (oUserInfo) => {
    const url = `${rootUrl}/UpdateProfile`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, oUserInfo, { headers });
    return response.data;
}

const GenerateReferral = async (Trader_Id, Referral) => {
    const url = `${rootUrl}/GenerateReferral?Trader_Id=${Trader_Id}&Referral=${Referral}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const SignupByAdmin = async (oUserInfo) => {
    const url = `${rootUrl}/SignupByAdmin`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, oUserInfo, { headers });
    return response.data;
}

const VerificationAccountWithSignup = async (vCode, isTrader) => {
    const url = `${rootUrl}/VerificationAccountWithSignup?vCode=${vCode}&isTrader=${isTrader}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ResetPassword = async (Email) => {
    const url = `${rootUrl}/ResetPassword?Email=${Email}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ChangeProfilePassword = async (Email, oPassword, nPassword) => {
    const url = `${rootUrl}/ChangeProfilePassword?Email=${Email}&oPassword=${oPassword}&nPassword=${nPassword}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ChangeLeverage = async (MT5Account, Leverage) => {
    const url = `${rootUrl}/ChangeLeverage?MT5Account=${MT5Account}&Leverage=${Leverage}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ChangeMasterPassword = async (MT5Account, Password) => {
    const url = `${rootUrl}/ChangeMasterPassword?MT5Account=${MT5Account}&Password=${Password}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ChangeInvestorPassword = async (MT5Account, Password) => {
    const url = `${rootUrl}/ChangeInvestorPassword?MT5Account=${MT5Account}&Password=${Password}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const verifyPasswordMaster = async (Account, Password) => {
    const url = `${rootUrl}/verifyPasswordMaster?Account=${Account}&Password=${Password}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const verifyPasswordInverstor = async (Account, Password) => {
    const url = `${rootUrl}/verifyPasswordInverstor?Account=${Account}&Password=${Password}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getDashboard_Data = async () => {
    const url = `${rootUrl}/getDashboard_Data`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const GetGroups = async () => {
    const url = `${rootUrl}/GetGroups`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const GetGroup = async () => {
    const url = `${rootUrl}/GetGroup`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const AccountInfo = async (MT5Account) => {
    const url = `${rootUrl}/AccountInfo?MT5Account=${MT5Account}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const login = async (Email, Password) => {
    const url = `${rootUrl}/login?Email=${Email}&Password=${Password}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const login_new = async (login) => {
    const url = `${rootUrl}/login_new`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, login, { headers });
    return response.data;
}

const getalluserList = async (fType, Search, index, count) => {
    const url = `${rootUrl}/getalluserList?fType=${fType}&Search=${Search}&index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const Get_Profile_Account = async (fType, Search, index, count) => {
    const url = `${rootUrl}/Get_Profile_Account?fType=${fType}&Search=${Search}&index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getRequestuserList = async (fType, Search, index, count) => {
    const url = `${rootUrl}/getRequestuserList?fType=${fType}&Search=${Search}&index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const createLiveMT5AccountForUser = async (Trader_Id, Plan_Id, Leverage, LPOA) => {
    const url = `${rootUrl}/createLiveMT5AccountForUser?Trader_Id=${Trader_Id}&Plan_Id=${Plan_Id}&Leverage=${Leverage}&LPOA=${LPOA}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const createLiveAccountWithAccountBanance = async (Trader_Id, Plan_Id, Leverage, Account, Balance) => {
    const url = `${rootUrl}/createLiveAccountWithAccountBanance?Trader_Id=${Trader_Id}&Plan_Id=${Plan_Id}&Leverage=${Leverage}&Account=${Account}&Balance=${Balance}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const createLiveAccountWithAccountBananceBYAccountNo = async (Account, Balance, Password) => {
    const url = `${rootUrl}/createLiveAccountWithAccountBananceBYAccountNo?Account=${Account}&Balance=${Balance}&Password=${Password}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getBalance = async (Account) => {
    const url = `${rootUrl}/getBalance?Account=${Account}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const cofigureAccount = async (Trader_Id, MT5Account, Password, Plan_Id, LPOA) => {
    const url = `${rootUrl}/cofigureAccount?Trader_Id=${Trader_Id}&MT5Account=${MT5Account}&Password=${Password}&Plan_Id=${Plan_Id}&LPOA=${LPOA}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const TradeDashData = async (Trader_Id) => {
    const url = `${rootUrl}/TradeDashData?Trader_Id=${Trader_Id}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getProfileAccount = async (Trader_Id) => {
    const url = `${rootUrl}/getProfileAccount?Trader_Id=${Trader_Id}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getProfileAccountDetail = async (Trader_Id) => {
    const url = `${rootUrl}/getProfileAccountDetail?Trader_Id=${Trader_Id}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getIBPlan = async (Referral_Code) => {
    const url = `${rootUrl}/getIBPlan?Referral_Code=${Referral_Code}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getProfileAccountList = async (fType, Search, index, count) => {
    const url = `${rootUrl}/getProfileAccountList?fType=${fType}&Search=${Search}&index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getMataAccountsList = async () => {
    const url = `${rootUrl}/getMataAccountsList`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const changePassword = async (rp) => {
    const url = `${rootUrl}/changePassword`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, rp, { headers });
    return response.data;
}

const passwordChange = async (rp) => {
    const url = `${rootUrl}/passwordChange`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, rp, { headers });
    return response.data;
}

const BlockIBCommition = async (Trader_Id, BlockCommition) => {
    const url = `${rootUrl}/BlockIBCommition?Trader_Id=${Trader_Id}&BlockCommition=${BlockCommition}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const changePlan = async (Trader_Id, BonusPlanId) => {
    const url = `${rootUrl}/changePlan?Trader_Id=${Trader_Id}&BonusPlanId=${BonusPlanId}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const changeProfileStatus = async (Trader_Id, status) => {
    const url = `${rootUrl}/changeProfileStatus?Trader_Id=${Trader_Id}&status=${status}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const DepositCredit = async (WalletId, MT5Account, Amount, Comment) => {
    const url = `${rootUrl}/DepositCredit?WalletId=${WalletId}&MT5Account=${MT5Account}&Amount=${Amount}&Comment=${Comment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const MakeDepositCredit = async (MT5Account, Amount, Comment) => {
    const url = `${rootUrl}/MakeDepositCredit?MT5Account=${MT5Account}&Amount=${Amount}&Comment=${Comment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const MakeDepositBalance = async (MT5Account, Amount, Comment) => {
    const url = `${rootUrl}/MakeDepositBalance?MT5Account=${MT5Account}&Amount=${Amount}&Comment=${Comment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const MakeWithdrawBalance = async (MT5Account, Amount, Comment) => {
    const url = `${rootUrl}/MakeWithdrawBalance?MT5Account=${MT5Account}&Amount=${Amount}&Comment=${Comment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const MakeWithdrawCredit = async (MT5Account, Amount, Comment) => {
    const url = `${rootUrl}/MakeWithdrawCredit?MT5Account=${MT5Account}&Amount=${Amount}&Comment=${Comment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const EnableReadOnly = async (Account, oEnable_Disable) => {
    const url = `${rootUrl}/EnableReadOnly?Account=${Account}&oEnable_Disable=${oEnable_Disable}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const EnableTrading = async (Account, oEnable_Disable) => {
    const url = `${rootUrl}/EnableTrading?Account=${Account}&oEnable_Disable=${oEnable_Disable}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const AddSMTP = async (s) => {
    const url = `${rootUrl}/AddSMTP`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, s, { headers });
    return response.data;
}

const getSMTP = async () => {
    const url = `${rootUrl}/getSMTP`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const AddMailer = async (m) => {
    const url = `${rootUrl}/AddMailer`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, m, { headers });
    return response.data;
}

const getMailer = async () => {
    const url = `${rootUrl}/getMailer`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const DeleteMailer = async (MailID) => {
    const url = `${rootUrl}/DeleteMailer?MailID=${MailID}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const getManager = async (Manager_Index) => {
    const url = `${rootUrl}/getManager?Manager_Index=${Manager_Index}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const updateManager = async (manager) => {
    const url = `${rootUrl}/updateManager`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, manager, { headers });
    return response.data;
}

const Add_Bonus = async (m) => {
    const url = `${rootUrl}/Add_Bonus`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, m, { headers });
    return response.data;
}

const Get_Bonus = async (Trader_Id, index, count) => {
    const url = `${rootUrl}/Get_Bonus?Trader_Id=${Trader_Id}&index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const Get_Wallet_Detail = async (WalletId) => {
    const url = `${rootUrl}/Get_Wallet_Detail?WalletId=${WalletId}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const Get_Wallet_Profile_List = async (fType, Search, index, count) => {
    const url = `${rootUrl}/Get_Wallet_Profile_List?fType=${fType}&Search=${Search}&index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const DepositWithdrawByAdm = async (WalletId, Amount, Comment, Deposit_Withdraw) => {
    const url = `${rootUrl}/DepositWithdrawByAdm?WalletId=${WalletId}&Amount=${Amount}&Comment=${Comment}&Deposit_Withdraw=${Deposit_Withdraw}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const TransferWalletToAccountWishversha = async (wallet_id, Amount, MT5Account, type, Comment) => {
    const url = `${rootUrl}/TransferWalletToAccountWishversha?wallet_id=${wallet_id}&Amount=${Amount}&MT5Account=${MT5Account}&Comment=${Comment}&type=${type}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const TransferAcountToAccount = async (from_MT5Account, Amount, to_MT5Account, Comment) => {
    const url = `${rootUrl}/TransferAcountToAccount?from_MT5Account=${from_MT5Account}&Amount=${Amount}&to_MT5Account=${to_MT5Account}&Comment=${Comment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const get_TransferReq = async (Trancefer_Id, Trader_Id, Reference) => {
    const url = `${rootUrl}/get_TransferReq?Trancefer_Id=${Trancefer_Id}&Trader_Id=${Trader_Id}&Reference=${Reference}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const get_TransferReqCount = async (index, count, Trader_Id, Trancefer_Type, Status, FromDate, ToDate) => {
    const url = `${rootUrl}/get_TransferReqCount?index=${index}&count=${count}&Trader_Id=${Trader_Id}&Trancefer_Type=${Trancefer_Type}&Status=${Status}&FromDate=${FromDate}&ToDate=${ToDate}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const TransferReq = async (p) => {
    const url = `${rootUrl}/TransferReq`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
}

const ApproveTransferReq = async (Trancefer_Id, Status, AdmComment) => {
    const url = `${rootUrl}/ApproveTransferReq?Trancefer_Id=${Trancefer_Id}&Status=${Status}&AdmComment=${AdmComment}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const AdminDepositWithdrawToAccount = async (p) => {
    const url = `${rootUrl}/AdminDepositWithdrawToAccount`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
}

const Get_Ledger_Entry = async (index, count) => {
    const url = `${rootUrl}/Get_Ledger_Entry?index=${index}&count=${count}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ManualPayRequest = async (p) => {
    const url = `${rootUrl}/ManualPayRequest`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
}

const ManualPayRequestVerifyReq = async (TraderId) => {
    const url = `${rootUrl}/ManualPayRequestVerifyReq?TraderId=${TraderId}`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
}

const ManualPayRequestVisionfxglobal_Uk = async (p) => {
    const url = `${rootUrl}/ManualPayRequestVisionfxglobal_Uk`; // Replace with your actual API URL
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
}

const DepositeWithdrawByAdmin = async (p) => {
    const url = `${rootUrl}/DepositeWithdrawByAdmin`;
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
};

const AutoPayUpdateStatus = async (p) => {
    const url = `${rootUrl}/AutoPayUpdateStatus`;
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
};

const AutoPayUpdateGateway = async (p) => {
    const url = `${rootUrl}/AutoPayUpdateGateway`;
    const headers = getHeaders();
    const response = await axios.post(url, p, { headers });
    return response.data;
};

const updateGatewayMaxAmount = async (SourceID, Amount, Auto_Manual) => {
    const url = `${rootUrl}/updateGatewayMaxAmount?SourceID=${SourceID}&Amount=${Amount}&Auto_Manual=${Auto_Manual}`;
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

const resetUpdateGatewayMaxAmount = async (Auto_Manual) => {
    const url = `${rootUrl}/resetUpdateGatewayMaxAmount?Auto_Manual=${Auto_Manual}`;
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

const ApproveManualRequestByAdmin = async (Reference, admComment, status, ProcessedBy) => {
    const url = `${rootUrl}/ApproveManualRequestByAdmin?Reference=${Reference}&admComment=${admComment}&status=${status}&ProcessedBy=${ProcessedBy}`;
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

const ApproveRequestAndDepositToAccountByAdmin = async (Reference, admComment, status, ProcessedBy, Amount) => {
    const url = `${rootUrl}/ApproveRequestAndDepositToAccountByAdmin?Reference=${Reference}&admComment=${admComment}&status=${status}&ProcessedBy=${ProcessedBy}&Amount=${Amount}`;
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

const get_PayManualtRequest = async (WalletId, index, count, Status, Deposit_Withdraw, FromDate, ToDate, MT5Account) => {
    const url = `${rootUrl}/get_PayManualtRequest?WalletId=${WalletId}&index=${index}&count=${count}&Status=${Status}&Deposit_Withdraw=${Deposit_Withdraw}&FromDate=${FromDate}&ToDate=${ToDate}&MT5Account=${MT5Account}`;
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

const getWalletBalance = async (WalletId) => {
    const url = `${rootUrl}/getWalletBalance?WalletId=${WalletId}`;
    const headers = getHeaders();
    const response = await axios.get(url, { headers });
    return response.data;
};

const setaccess_token = async () => {
    try {

        // API URL
        const url = `${rootUrl}/setaccess_token`; // Replace with your actual API URL

        // Request headers
        const headers = getHeaders();

        // Make the GET request
        const response = await axios.get(url, { headers });

        // Log and return the response
        return response.data;
    } catch (error) {
        console.error('Error setting access token:', error.message);
        throw error;
    }
}

module.exports = {
    Test,
    InitialAddManager,
    Signup,
    SignupNew,
    SignupWithAccount,
    UpdateProfile,
    GenerateReferral,
    SignupByAdmin,
    VerificationAccountWithSignup,
    ResetPassword,
    ChangeProfilePassword,
    ChangeLeverage,
    ChangeMasterPassword,
    ChangeInvestorPassword,
    verifyPasswordMaster,
    verifyPasswordInverstor,
    getDashboard_Data,
    GetGroups,
    GetGroup,
    AccountInfo,
    login,
    login_new,
    getalluserList,
    Get_Profile_Account,
    getRequestuserList,
    createLiveMT5AccountForUser,
    createLiveAccountWithAccountBanance,
    createLiveAccountWithAccountBananceBYAccountNo,
    getBalance,
    cofigureAccount,
    TradeDashData,
    getProfileAccount,
    getProfileAccountDetail,
    getIBPlan,
    getProfileAccountList,
    getMataAccountsList,
    changePassword,
    passwordChange,
    BlockIBCommition,
    changePlan,
    changeProfileStatus,
    DepositCredit,
    MakeDepositCredit,
    MakeDepositBalance,
    MakeWithdrawBalance,
    MakeWithdrawCredit,
    EnableReadOnly,
    EnableTrading,
    AddSMTP,
    getSMTP,
    AddMailer,
    getMailer,
    DeleteMailer,
    getManager,
    updateManager,
    Add_Bonus,
    Get_Bonus,
    Get_Wallet_Detail,
    Get_Wallet_Profile_List,
    DepositWithdrawByAdm,
    TransferWalletToAccountWishversha,
    TransferAcountToAccount,
    get_TransferReq,
    get_TransferReqCount,
    TransferReq,
    ApproveTransferReq,
    AdminDepositWithdrawToAccount,
    Get_Ledger_Entry,
    ManualPayRequest,
    ManualPayRequestVerifyReq,
    ManualPayRequestVisionfxglobal_Uk,
    DepositeWithdrawByAdmin,
    AutoPayUpdateStatus,
    AutoPayUpdateGateway,
    updateGatewayMaxAmount,
    resetUpdateGatewayMaxAmount,
    ApproveManualRequestByAdmin,
    ApproveRequestAndDepositToAccountByAdmin,
    get_PayManualtRequest,
    getWalletBalance,
    setaccess_token
};