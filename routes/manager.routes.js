const managerTr = require('../traderroom/manager');

const express = require("express");

const router = express.Router();

// //using StructLib;
// using System;
// using System.Collections;
// using System.Collections.Generic;
// using System.Data;
// using System.ServiceModel;
// using System.ServiceModel.Web;
// using traderStructue;

// namespace WCFRestFullServices1
// {
//     [ServiceContract()]
//     public interface IService1
//     {



//         [WebInvoke(Method = "*", UriTemplate = "test", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/Test", async (req, res) => {
    try {
        let result = await managerTr.Test()
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: Test", error.message || "Error Test");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "InitialAddManager", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/InitialAddManager", async (req, res) => {
    try {
        let result = await managerTr.InitialAddManager()
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: InitialAddManager", error.message || "Error InitialAddManager");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "Signup", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/Signup", async (req, res) => {
    try {
        let result = await managerTr.Signup(req.body)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: Signup", error.message || "Error Signup");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "SignupNew", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/SignupNew", async (req, res) => {
    try {
        let result = await managerTr.SignupNew(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: SignupNew", error.message || "Error SignupNew");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "SignupWithAccount", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/SignupWithAccount", async (req, res) => {
    try {
        let result = await managerTr.SignupWithAccount(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: SignupWithAccount", error.message || "Error SignupWithAccount");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "UpdateProfile", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/UpdateProfile", async (req, res) => {
    try {
        let result = await managerTr.UpdateProfile(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: UpdateProfile", error.message || "Error UpdateProfile");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "GenerateReferral?Trader_Id={Trader_Id}&Referral={Referral}", ResponseFormat = WebMessageFormat.Json )]
//         [OperationContract]
router.get("/GenerateReferral", async (req, res) => {
    try {
        const { Trader_Id, Referral } = req.query;
        let result = await managerTr.GenerateReferral(Trader_Id, Referral);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: GenerateReferral", error.message || "Error GenerateReferral");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "SignupByAdmin", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/SignupByAdmin", async (req, res) => {
    try {
        let result = await managerTr.SignupByAdmin(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: SignupByAdmin", error.message || "Error SignupByAdmin");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "VerificationAccountWithSignup?vCode={vCode}&isTrader={isTrader}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/VerificationAccountWithSignup", async (req, res) => {
    try {
        const { vCode, isTrader } = req.query;
        let result = await managerTr.VerificationAccountWithSignup(vCode, isTrader);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: VerificationAccountWithSignup", error.message || "Error VerificationAccountWithSignup");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "ResetPassword?Email={Email}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/ResetPassword", async (req, res) => {
    try {
        const { Email } = req.query;
        let result = await managerTr.ResetPassword(Email);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: ResetPassword", error.message || "Error ResetPassword");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "ChangeProfilePassword?Email={Email}&oPassword={oPassword}&nPassword={nPassword}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/ChangeProfilePassword", async (req, res) => {
    try {
        const { Email, oPassword, nPassword } = req.query;
        let result = await managerTr.ChangeProfilePassword(Email, oPassword, nPassword);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: ChangeProfilePassword", error.message || "Error ChangeProfilePassword");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "ChangeLeverage?MT5Account={MT5Account}&Leverage={Leverage}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/ChangeLeverage", async (req, res) => {
    try {
        const { MT5Account, Leverage } = req.query;
        let result = await managerTr.ChangeLeverage(MT5Account, Leverage);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: ChangeLeverage", error.message || "Error ChangeLeverage");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "ChangeMasterPassword?MT5Account={MT5Account}&Password={Password}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/ChangeMasterPassword", async (req, res) => {
    try {
        const { MT5Account, Password } = req.query;
        let result = await managerTr.ChangeMasterPassword(MT5Account, Password);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: ChangeMasterPassword", error.message || "Error ChangeMasterPassword");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});



//         [WebInvoke(Method = "*", UriTemplate = "ChangeInvestorPassword?MT5Account={MT5Account}&Password={Password}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/ChangeInvestorPassword", async (req, res) => {
    try {
        const { MT5Account, Password } = req.query;
        let result = await managerTr.ChangeInvestorPassword(MT5Account, Password);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: ChangeInvestorPassword", error.message || "Error ChangeInvestorPassword");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});


//         [WebGet(UriTemplate = "verifyPasswordMaster?Account={Account}&Password={Password}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/verifyPasswordMaster", async (req, res) => {
    try {
        const { Account, Password } = req.query;
        let result = await managerTr.verifyPasswordMaster(Account, Password);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: verifyPasswordMaster", error.message || "Error verifyPasswordMaster");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});



//         [WebGet(UriTemplate = "verifyPasswordInverstor?Account={Account}&Password={Password}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/verifyPasswordInverstor", async (req, res) => {
    try {
        const { Account, Password } = req.query;
        let result = await managerTr.verifyPasswordInverstor(Account, Password);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: verifyPasswordInverstor", error.message || "Error verifyPasswordInverstor");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "getDashboard_Data", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getDashboard_Data", async (req, res) => {
    try {
        let result = await managerTr.getDashboard_Data()
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getDashboard_Data", error.message || "Error getDashboard_Data");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});



//         //====
//         [WebInvoke(Method = "*", UriTemplate = "GetGroups", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/GetGroups", async (req, res) => {
    try {
        let result = await managerTr.GetGroups()
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: GetGroups", error.message || "Error GetGroups");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});
//         [WebInvoke(Method = "*", UriTemplate = "GetGroup", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/GetGroup", async (req, res) => {
    try {
        let result = await managerTr.GetGroup()
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: GetGroup", error.message || "Error GetGroup");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "AccountInfo?MT5Account={MT5Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/AccountInfo", async (req, res) => {
    try {
        const { MT5Account } = req.query;
        let result = await managerTr.AccountInfo(MT5Account)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: AccountInfo", error.message || "Error AccountInfo");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         //=======User

//         [WebInvoke(Method = "*", UriTemplate = "login?Email={Email}&Password={Password}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/login", async (req, res) => {
    try {
        const { Email, Password } = req.query;
        let result = await managerTr.login(Email, Password)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: login", error.message || "Error login");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "login_new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/login_new", async (req, res) => {
    try {
        let result = await managerTr.login_new(req.body)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: login_new", error.message || "Error login_new");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "getalluserList?fType={fType}&Search={Search}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getalluserList", async (req, res) => {
    try {
        const { fType, Search, index, count } = req.query;
        let result = await managerTr.getalluserList(fType, Search, index, count)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getalluserList", error.message || "Error getalluserList");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "Get_Profile_Account?fType={fType}&Search={Search}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/Get_Profile_Account", async (req, res) => {
    try {
        const { fType, Search, index, count } = req.query;
        let result = await managerTr.Get_Profile_Account(fType, Search, index, count)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: Get_Profile_Account", error.message || "Error Get_Profile_Account");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "getRequestuserList?fType={fType}&Search={Search}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getRequestuserList", async (req, res) => {
    try {
        const { fType, Search, index, count } = req.query;
        let result = await managerTr.getRequestuserList(fType, Search, index, count)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getRequestuserList", error.message || "Error getRequestuserList");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "createLiveMT5AccountForUser?Trader_Id={Trader_Id}&Plan_Id={Plan_Id}&Leverage={Leverage}&LPOA={LPOA}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/createLiveMT5AccountForUser", async (req, res) => {
    try {
        const { Trader_Id, Plan_Id, Leverage, LPOA } = req.query;
        let result = await managerTr.createLiveMT5AccountForUser(Trader_Id, Plan_Id, Leverage, LPOA)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: createLiveMT5AccountForUser", error.message || "Error createLiveMT5AccountForUser");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "createLiveAccountWithAccountBanance?Trader_Id={Trader_Id}&Plan_Id={Plan_Id}&Leverage={Leverage}&Account={Account}&Balance={Balance}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/createLiveAccountWithAccountBanance", async (req, res) => {
    try {
        const { Trader_Id, Plan_Id, Leverage, Account, Balance } = req.query;
        let result = await managerTr.createLiveAccountWithAccountBanance(Trader_Id, Plan_Id, Leverage, Account, Balance)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: createLiveAccountWithAccountBanance", error.message || "Error createLiveAccountWithAccountBanance");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "createLiveAccountWithAccountBananceBYAccountNo?Account={Account}&Balance={Balance}&Password={Password}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/createLiveAccountWithAccountBananceBYAccountNo", async (req, res) => {
    try {
        const { Account, Balance, Password } = req.query;
        let result = await managerTr.createLiveAccountWithAccountBananceBYAccountNo(Account, Balance, Password)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: createLiveAccountWithAccountBananceBYAccountNo", error.message || "Error createLiveAccountWithAccountBananceBYAccountNo");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "getBalance?Account={Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getBalance", async (req, res) => {
    try {
        const { Account } = req.query;
        let result = await managerTr.getBalance(Account)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getBalance", error.message || "Error getBalance");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "cofigureAccount?Trader_Id={Trader_Id}&MT5Account={MT5Account}&Password={Password}&Plan_Id={Plan_Id}&LPOA={LPOA}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/cofigureAccount", async (req, res) => {
    try {
        const { Trader_Id, MT5Account, Password, Plan_Id, LPOA } = req.query;
        let result = await managerTr.cofigureAccount(Trader_Id, MT5Account, Password, Plan_Id, LPOA)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: cofigureAccount", error.message || "Error cofigureAccount");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "TradeDashData?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/TradeDashData", async (req, res) => {
    try {
        const { Trader_Id } = req.query;
        let result = await managerTr.TradeDashData(Trader_Id)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: TradeDashData", error.message || "Error TradeDashData");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         //==========Admin

//         [WebInvoke(Method = "*", UriTemplate = "getProfileAccount?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getProfileAccount", async (req, res) => {
    try {
        const { Trader_Id } = req.query;
        let result = await managerTr.getProfileAccount(Trader_Id)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getProfileAccount", error.message || "Error getProfileAccount");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});
//         [WebInvoke(Method = "*", UriTemplate = "getProfileAccountDetail?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getProfileAccountDetail", async (req, res) => {
    try {
        const { Trader_Id } = req.query;
        let result = await managerTr.getProfileAccountDetail(Trader_Id)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getProfileAccountDetail", error.message || "Error getProfileAccountDetail");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "getIBPlan?Referral_Code={Referral_Code}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getIBPlan", async (req, res) => {
    try {
        const { Referral_Code } = req.query;
        let result = await managerTr.getIBPlan(Referral_Code)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getIBPlan", error.message || "Error getIBPlan");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         //==
//         [WebInvoke(Method = "*", UriTemplate = "getProfileAccountList?fType={fType}&Search={Search}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getProfileAccountList", async (req, res) => {
    try {
        const { fType, Search, index, count } = req.query;
        let result = await managerTr.getProfileAccountList(fType, Search, index, count)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getProfileAccountList", error.message || "Error getProfileAccountList");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});
//         //----


//         [WebInvoke(Method = "*", UriTemplate = "getMataAccountsList", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getMataAccountsList", async (req, res) => {
    try {
        let result = await managerTr.getMataAccountsList()
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getMataAccountsList", error.message || "Error getMataAccountsList");
        return res.status(500).send({ result: true, message: error.message || error });
    }
        });



//         //==

//         [WebInvoke(Method = "*", UriTemplate = "changePassword", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/changePassword", async (req, res) => {
    try {
        let result = await managerTr.changePassword(req.body)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: changePassword", error.message || "Error changePassword");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});



//         [WebInvoke(Method = "*", UriTemplate = "passwordChange", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/passwordChange", async (req, res) => {
    try {
        let result = await managerTr.passwordChange(req.body)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: passwordChange", error.message || "Error passwordChange");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "BlockIBCommition?Trader_Id={Trader_Id}&BlockCommition={BlockCommition}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/BlockIBCommition", async (req, res) => {
    try {
        const { Trader_Id, BlockCommition } = req.query;
        let result = await managerTr.BlockIBCommition(Trader_Id, BlockCommition)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: BlockIBCommition", error.message || "Error BlockIBCommition");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         //==
//         [WebInvoke(Method = "*", UriTemplate = "changePlan?Trader_Id={Trader_Id}&BonusPlanId={BonusPlanId}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
// add full route
router.get("/changePlan", async (req, res) => {
    try {
        const { Trader_Id, BonusPlanId } = req.query;
        let result = await managerTr.changePlan(Trader_Id, BonusPlanId)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: changePlan", error.message || "Error changePlan");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "changeProfileStatus?Trader_Id={Trader_Id}&status={status}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]

router.get("/changeProfileStatus", async (req, res) => {
    try {
        const { Trader_Id, status } = req.query;
        let result = await managerTr.changeProfileStatus(Trader_Id, status)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: changeProfileStatus", error.message || "Error changeProfileStatus");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});
//         //==
//         [WebInvoke(Method = "*", UriTemplate = "DepositCredit?WalletId={WalletId}&MT5Account={MT5Account}&Amount={Amount}&Comment={Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/DepositCredit", async (req, res) => {
    try {
        const { WalletId, MT5Account, Amount, Comment } = req.query;
        let result = await managerTr.DepositCredit(WalletId, MT5Account, Amount, Comment)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: DepositCredit", error.message || "Error DepositCredit");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "MakeDepositCredit?MT5Account={MT5Account}&Amount={Amount}&Comment={Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/MakeDepositCredit", async (req, res) => {
    try {
        const { MT5Account, Amount, Comment } = req.query;
        let result = await managerTr.MakeDepositCredit(MT5Account, Amount, Comment)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: MakeDepositCredit", error.message || "Error MakeDepositCredit");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "MakeDepositBalance?MT5Account={MT5Account}&Amount={Amount}&Comment={Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/MakeDepositBalance", async (req, res) => {
    try {
        const { MT5Account, Amount, Comment } = req.query;
        let result = await managerTr.MakeDepositBalance(MT5Account, Amount, Comment)
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: MakeDepositBalance", error.message || "Error MakeDepositBalance");
        return res.status(500).send({ result: true, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "MakeWithdrawBalance?MT5Account={MT5Account}&Amount={Amount}&Comment={Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/MakeWithdrawBalance", async (req, res) => {
    try {
        const { MT5Account, Amount, Comment } = req.query;
        let result = await managerTr.MakeWithdrawBalance(MT5Account, Amount, Comment);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: MakeWithdrawBalance", error.message || "Error MakeWithdrawBalance");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "MakeWithdrawCredit?MT5Account={MT5Account}&Amount={Amount}&Comment={Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/MakeWithdrawCredit", async (req, res) => {
    try {
        const { MT5Account, Amount, Comment } = req.query;
        let result = await managerTr.MakeWithdrawCredit(MT5Account, Amount, Comment);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: MakeWithdrawCredit", error.message || "Error MakeWithdrawCredit");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         //==

//         [WebInvoke(Method = "*", UriTemplate = "EnableReadOnly?Account={Account}&oEnable_Disable={oEnable_Disable}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/EnableReadOnly", async (req, res) => {
    try {
        const { Account, oEnable_Disable } = req.query;
        let result = await managerTr.EnableReadOnly(Account, oEnable_Disable);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: EnableReadOnly", error.message || "Error EnableReadOnly");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});


//         [WebInvoke(Method = "*", UriTemplate = "EnableTrading?Account={Account}&oEnable_Disable={oEnable_Disable}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/EnableTrading", async (req, res) => {
    try {
        const { Account, oEnable_Disable } = req.query;
        let result = await managerTr.EnableTrading(Account, oEnable_Disable);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: EnableTrading", error.message || "Error EnableTrading");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});


//         //===========Mailer
//         [WebInvoke(Method = "*", UriTemplate = "AddSMTP", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/AddSMTP", async (req, res) => {
    try {
        let result = await managerTr.AddSMTP(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: AddSMTP", error.message || "Error AddSMTP");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "getSMTP", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getSMTP", async (req, res) => {
    try {
        let result = await managerTr.getSMTP();
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getSMTP", error.message || "Error getSMTP");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "AddMailer", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.post("/AddMailer", async (req, res) => {
    try {
        let result = await managerTr.AddMailer(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: AddMailer", error.message || "Error AddMailer");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "getMailer", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/getMailer", async (req, res) => {
    try {
        let result = await managerTr.getMailer();
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getMailer", error.message || "Error getMailer");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "DeleteMailer?MailID={MailID}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
router.get("/DeleteMailer", async (req, res) => {
    try {
        const { MailID } = req.query;
        let result = await managerTr.DeleteMailer(MailID);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: DeleteMailer", error.message || "Error DeleteMailer");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         //===========//Mailer
//         //----------Manager

//         [WebInvoke(Method = "*", UriTemplate = "getManager?Manager_Index={Manager_Index}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<MT5_Manager> getManager(int Manager_Index);
router.get("/getManager", async (req, res) => {
    try {
        const { Manager_Index } = req.query;
        let result = await managerTr.getManager(Manager_Index);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: getManager", error.message || "Error getManager");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "updateManager", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result updateManager(MT5_Manager manager);
router.post("/updateManager", async (req, res) => {
    try {
        let result = await managerTr.updateManager(req.body);
        res.status(200).json({ result: true, data: result });
    } catch (error) {
        console.error("error: updateManager", error.message || "Error updateManager");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});
//         //===========Wallet

//         [WebInvoke(Method = "*", UriTemplate = "Add_Bonus", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result Add_Bonus(WBonus_Obj m);
router.post("/Add_Bonus", async (req, res) => {
    try {
        let result = await managerTr.Add_Bonus(req.body);
        res.status(200).json( result );
    } catch (error) {
        console.error("error: Add_Bonus", error.message || "Error Add_Bonus");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "Get_Bonus?Trader_Id={Trader_Id}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         WBonus_Count_Obj Get_Bonus(int Trader_Id, int index, int count);
router.get("/Get_Bonus", async (req, res) => {
    try {
        const { Trader_Id, index, count } = req.query;
        let result = await managerTr.Get_Bonus(Trader_Id, index, count);
        res.status(200).json( result );
    } catch (error) {
        console.error("error: Get_Bonus", error.message || "Error Get_Bonus");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "Get_Wallet_Detail?WalletId={WalletId}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         WalletProfile_obj Get_Wallet_Detail(int WalletId);
router.get("/Get_Wallet_Detail", async (req, res) => {
    try {
        const { WalletId } = req.query;
        let result = await managerTr.Get_Wallet_Detail(WalletId);
        res.status(200).json( result );
    } catch (error) {   
        console.error("error: Get_Wallet_Detail", error.message || "Error Get_Wallet_Detail");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         [WebInvoke(Method = "*", UriTemplate = "Get_Wallet_Profile_List?fType={fType}&Search={Search}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         WalletProfile_Count_obj Get_Wallet_Profile_List(FilterType fType, string Search, int index, int count);
router.get("/Get_Wallet_Profile_List", async (req, res) => {
    try {
        const { fType, Search, index, count } = req.query;
        let result = await managerTr.Get_Wallet_Profile_List(fType, Search, index, count);
        res.status(200).json( result );
    } catch (error) {
        console.error("error: Get_Wallet_Profile_List", error.message || "Error Get_Wallet_Profile_List");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});

//         //=====
//         [WebInvoke(Method = "*", UriTemplate = "DepositWithdrawByAdm?WalletId={WalletId}&Amount={Amount}&Comment={Comment}&Deposit_Withdraw={Deposit_Withdraw}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result DepositWithdrawByAdm(int WalletId, double Amount, string Comment, int Deposit_Withdraw);

router.get("/DepositWithdrawByAdm", async (req, res) => {
    try {
        const { WalletId, Amount, Comment, Deposit_Withdraw } = req.query;
        let result = await managerTr.DepositWithdrawByAdm(WalletId, Amount, Comment, Deposit_Withdraw);
        res.status(200).json( result );
    } catch (error) {
        console.error("error: DepositWithdrawByAdm", error.message || "Error DepositWithdrawByAdm");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});
//         [WebInvoke(Method = "*", UriTemplate = "TransferWalletToAccountWishversha?wallet_id={wallet_id}&Amount={Amount}&MT5Account={MT5Account}&Comment={Comment}&type={type}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result TransferWalletToAccountWishversha(int wallet_id, double Amount, long MT5Account, int type, string Comment);

router.get("/TransferWalletToAccountWishversha", async (req, res) => {
    try {
        const { wallet_id, Amount, MT5Account, type, Comment } = req.query;
        let result = await managerTr.TransferWalletToAccountWishversha(wallet_id, Amount, MT5Account, type, Comment);
        res.status(200).json( result );
    } catch (error) {
        console.error("error: TransferWalletToAccountWishversha", error.message || "Error TransferWalletToAccountWishversha");
        return res.status(500).send({ result: false, message: error.message || error });
    }
});
//         [WebInvoke(Method = "*", UriTemplate = "TransferAcountToAccount?from_MT5Account={from_MT5Account}&Amount={Amount}&to_MT5Account={to_MT5Account}&Comment={Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result TransferAcountToAccount(long from_MT5Account, double Amount, long to_MT5Account, string Comment);
// suject complet rourte in one go

//         //====

//         //===Trancefer_Request

//         [WebInvoke(Method = "*", UriTemplate = "get_TransferReq?Trancefer_Id={Trancefer_Id}&Trader_Id={Trader_Id}&Reference={Reference}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Trancefer_Request_Obj> get_TransferReq(int Trancefer_Id, int Trader_Id, string Reference);

//         [WebInvoke(Method = "*", UriTemplate = "get_TransferReqCount?index={index}&count={count}&Trader_Id={Trader_Id}&Trancefer_Type={Trancefer_Type}&Status={Status}&FromDate={FromDate}&ToDate={ToDate}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Trancefer_Request_Count_Obj get_TransferReqCount(int index, int count, int Trader_Id, int Trancefer_Type, STATUS Status, string FromDate, string ToDate);

//         [WebInvoke(Method = "*", UriTemplate = "TransferReq", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result TransferReq(Trancefer_Request_Obj p);

//         [WebInvoke(Method = "*", UriTemplate = "ApproveTransferReq?Trancefer_Id={Trancefer_Id}&Status={Status}&AdmComment={AdmComment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ApproveTransferReq(int Trancefer_Id, STATUS Status, string AdmComment);


//         [WebInvoke(Method = "*", UriTemplate = "AdminDepositWithdrawToAccount", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AdminDepositWithdrawToAccount(Trancefer_Request_Obj p);
//         //===//Trancefer_Request
//         [WebInvoke(Method = "*", UriTemplate = "Get_Ledger_Entry?index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Ledger_Entry_Count_List Get_Ledger_Entry(int index, int count);

//         [WebInvoke(Method = "*", UriTemplate = "ManualPayRequest", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ManualPayRequest(AutoManualPayment_obj p);

//         [WebInvoke(Method = "*", UriTemplate = "ManualPayRequestVerifyReq?TraderId={TraderId}", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         int ManualPayRequestVerifyReq(int TraderId);

//         //only for Visionfxglobal_Uk
//         [WebInvoke(Method = "*", UriTemplate = "ManualPayRequestVisionfxglobal_Uk", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ManualPayRequestVisionfxglobal_Uk(AutoManualPayment_obj p);

//         [WebInvoke(Method = "*", UriTemplate = "DepositeWithdrawByAdmin", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result DepositeWithdrawByAdmin(AutoManualPayment_obj p);

//         [WebInvoke(Method = "*", UriTemplate = "AutoPayUpdateStatus", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AutoPayUpdateStatus(AutoManualPayment_obj p);

//         [WebInvoke(Method = "*", UriTemplate = "AutoPayUpdateGateway", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AutoPayUpdateGateway(AutoManualPayment_obj p);

//         [WebInvoke(Method = "*", UriTemplate = "updateGatewayMaxAmount?SourceID={SourceID}&Amount={Amount}&Auto_Manual={Auto_Manual}", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result updateGatewayMaxAmount(int SourceID, decimal Amount, int Auto_Manual);

//         [WebInvoke(Method = "*", UriTemplate = "resetUpdateGatewayMaxAmount?Auto_Manual={Auto_Manual}", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result resetUpdateGatewayMaxAmount(int Auto_Manual);

//         [WebInvoke(Method = "*", UriTemplate = "ApproveManualRequestByAdmin?Reference={Reference}&admComment={admComment}&status={status}&ProcessedBy={ProcessedBy}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ApproveManualRequestByAdmin(string Reference, string admComment, int status, int ProcessedBy);

//         [WebInvoke(Method = "*", UriTemplate = "ApproveRequestAndDepositToAccountByAdmin?Reference={Reference}&admComment={admComment}&status={status}&ProcessedBy={ProcessedBy}&Amount={Amount}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ApproveRequestAndDepositToAccountByAdmin(string Reference, string admComment, int status, int ProcessedBy, decimal Amount);


//         [WebInvoke(Method = "*", UriTemplate = "get_PayManualtRequest?WalletId={WalletId}&index={index}&count={count}&Status={Status}&Deposit_Withdraw={Deposit_Withdraw}&FromDate={FromDate}&ToDate={ToDate}&MT5Account={MT5Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         PaymentReqtCount_obj get_PayManualtRequest(int WalletId, int index, int count, STATUS Status, int Deposit_Withdraw, string FromDate  , string ToDate  ,string MT5Account  );

//         [WebInvoke(Method = "*", UriTemplate = "getWalletBalance?WalletId={WalletId}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         WalletProfile_obj getWalletBalance(int WalletId);

//         //===Setting

//         [WebInvoke(Method = "*", UriTemplate = "getSetting", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Setting_Obj getSetting();

//         [WebInvoke(Method = "*", UriTemplate = "addSetting", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result addSetting(Setting_Obj p);

//         //====Plan

//         [WebInvoke(Method = "*", UriTemplate = "getPlan?Active={Active}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Plan_Obj> getPlan(int Active=-1);

//         [WebInvoke(Method = "*", UriTemplate = "addPlan", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result addPlan(Plan_Obj p);

//         [WebInvoke(Method = "*", UriTemplate = "deletePlan?AccountPlanId={AccountPlanId}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result deletePlan(int AccountPlanId);


//         //====Gateway

//         [WebInvoke(Method = "*", UriTemplate = "getGatways", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Gateway_Obj> getGatways();

//         [WebInvoke(Method = "*", UriTemplate = "addGatways", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result addGatways(List<Gateway_Obj> p);

//         [WebInvoke(Method = "*", UriTemplate = "deleteGatways?Gateway_Id={Gateway_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result deleteGatways(int Gateway_Id);



//         ///trade
//         [WebInvoke(Method = "*", UriTemplate = "GetOpenTrade?MT5Accont={MT5Accont}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         OPENED_ALL GetOpenTrade(long MT5Accont);

//         [WebInvoke(Method = "*", UriTemplate = "GetCloseTrade?MT5Accont={MT5Accont}&_StartTm={_StartTm}&_EndTm={_EndTm}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         CLOSED_ALL GetCloseTrade(long MT5Accont, string _StartTm, string _EndTm);


//         [WebInvoke(Method = "*", UriTemplate = "GetCloseTradeAllAccount?lstAccount={lstAccount}&_StartTm={_StartTm}&_EndTm={_EndTm}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         CLOSED_ALL GetCloseTradeAllAccount(string lstAccount, string _StartTm, string _EndTm);

//         [WebInvoke(Method = "*", UriTemplate = "MAKE_OPEN_TRADE", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         MQ_MGR_TRD_RESP MAKE_OPEN_TRADE(MQ_MGR_TRD_REQ p);
//         [WebInvoke(Method = "*", UriTemplate = "MAKE_CLOSE_TRADE", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         MQ_MGR_TRD_RESP MAKE_CLOSE_TRADE(MQ_MGR_TRD_REQ p);
//         [WebInvoke(Method = "*", UriTemplate = "GET_DEAL_ALL?MT5Accont={MT5Accont}&_StartTm={_StartTm}&_EndTm={_EndTm}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         CLOSED_ALL GET_DEAL_ALL(long MT5Accont, string _StartTm, string _EndTm);

//         [WebInvoke(Method = "*", UriTemplate = "AddTrades", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddTrades(List<CLOSED> p);

//         [WebInvoke(Method = "*", UriTemplate = "AddIBCommission", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddIBCommission(List<TradeCommition_Obj> col);

//         [WebInvoke(Method = "*", UriTemplate = "AddIB_Commission_Wallet", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddIB_Commission_Wallet(IB_Commission_Wallet_Obj col);

//         [WebInvoke(Method = "*", UriTemplate = "getIBCommissionTrade", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<TradeCommition_Obj> getIBCommissionTrade();

//         [WebInvoke(Method = "*", UriTemplate = "DistributeCommition", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result DistributeCommition();

//         [WebInvoke(Method = "*", UriTemplate = "IB_Total_Commission?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<IB_Total_Commission_Obj> IB_Total_Commission(int Trader_Id);
//         [WebInvoke(Method = "*", UriTemplate = "IB_Commission?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<IB_Commission_Obj> IB_Commission(int Trader_Id);
//         [WebInvoke(Method = "*", UriTemplate = "IB_Profile?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<IB_Profile_Obj> IB_Profile(int Trader_Id);
//         [WebInvoke(Method = "*", UriTemplate = "getTrades?MT5Account={MT5Account}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Trade_Count_Obj getTrades(int MT5Account, int index, int count);



//         [WebInvoke(Method = "*", UriTemplate = "get_Logs?index={index}&count={count}&FromDate={FromDate}&ToDate={ToDate}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Logs_Count_Obj get_Logs(int index, int count, string FromDate, string ToDate);


//         [WebInvoke(Method = "*", UriTemplate = "getLogs?count={count}&page={page}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Logs_Obj> getLogs(int count, int page );



//         [WebInvoke(Method = "*", UriTemplate = "GenerateCommissionByDate?fromDate={fromDate}&toDate={toDate}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result GenerateCommissionByDate(string fromDate, string toDate);

//         [WebInvoke(Method = "*", UriTemplate = "MapCommissionByDate?fromDate={fromDate}&toDate={toDate}&Account={Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result MapCommissionByDate(string fromDate, string toDate, long Account);


//         [WebInvoke(Method = "*", UriTemplate = "GetIB_Commission_Date?index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)] 
//         [OperationContract]
//         IB_Commission_Gen_Date_Count_Obj GetIB_Commission_Date(int index, int count);


//         [WebInvoke(Method = "*", UriTemplate = "IB_CommissionByDate?Trader_Id={Trader_Id}&fromDate={fromDate}&toDate={toDate}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         IB_Commission_Count_Obj IB_CommissionByDate(int Trader_Id, string fromDate, string toDate, int index, int count);


//         [WebInvoke(Method = "*", UriTemplate = "CommissionTadeADD", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result CommissionTadeADD(List<CLOSED> p);


//         //========


//         [WebInvoke(Method = "*", UriTemplate = "UploadImage", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         string UploadImage(UploadImage p);

//         ///kyc
//         [WebInvoke(Method = "*", UriTemplate = "ProfileKycUpload?Trader_Id={Trader_Id}&Id_proof={Id_proof}&Address_Proof={Address_Proof}&Other_Proof={Other_Proof}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ProfileKycUpload(int Trader_Id, string Id_proof, string Address_Proof, string Other_Proof);


//         [WebInvoke(Method = "*", UriTemplate = "UpdateKycStaus?Trader_Id={Trader_Id}&Kyc_Status={Kyc_Status}&Kyc_Comment={Kyc_Comment}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdateKycStaus(int Trader_Id, KYCSTATUS Kyc_Status, string Kyc_Comment);

//         [WebInvoke(Method = "*", UriTemplate = "UpdateMyIB?Trader_Id={Trader_Id}&Reffered_By={Reffered_By}&Reffered_By_Account={Reffered_By_Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdateMyIB(int Trader_Id, int Reffered_By, Decimal Reffered_By_Account);

//         [WebInvoke(Method = "*", UriTemplate = "getKycUser?fType={fType}&Search={Search}&Kyc_Status={Kyc_Status}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Profile_Count_Obj getKycUser(FilterType fType, string Search, KYCSTATUS Kyc_Status, int index, int count);

//         [WebInvoke(Method = "*", UriTemplate = "getKycProfileStatus?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Profile_Obj getKycProfileStatus(int Trader_Id);


//         //--------tickts

//         [WebInvoke(Method = "*", UriTemplate = "AddTicket", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddTicket(Ticket_Obj p);

//         [WebInvoke(Method = "*", UriTemplate = "Ticket?craeted_by={craeted_by}&open_cloased={open_cloased}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Ticket_Count_Obj Ticket(int craeted_by, int open_cloased, int index, int count);
//         [WebInvoke(Method = "*", UriTemplate = "CloseTicket?ticket_id={ticket_id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result CloseTicket(int ticket_id);


//         [WebInvoke(Method = "*", UriTemplate = "AddTicketMassage", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddTicketMassage(TicketMassage_Obj p);
//         [WebInvoke(Method = "*", UriTemplate = "TicketMassage?ticket_id={ticket_id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<TicketMassage_Obj> TicketMassage(int ticket_id);
//         [WebInvoke(Method = "*", UriTemplate = "NewTicketMassage?ticket_id={ticket_id}&message_id={message_id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<TicketMassage_Obj> NewTicketMassage(int ticket_id, int message_id);

//         //bonus
//         [WebInvoke(Method = "*", UriTemplate = "addBonus", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result addBonus(Bonus_Obj p);
//         [WebInvoke(Method = "*", UriTemplate = "getBonus", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Bonus_Obj> getBonus();
//         [WebInvoke(Method = "*", UriTemplate = "deleteBonus?Bonus_Id={Bonus_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result deleteBonus(int Bonus_Id);


//         //Banner
//         [WebInvoke(Method = "*", UriTemplate = "addBanner", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result addBanner(Banner_Obj p);
//         [WebInvoke(Method = "*", UriTemplate = "getBanner?Active={Active}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Banner_Obj> getBanner(int Active);
//         [WebInvoke(Method = "*", UriTemplate = "StatusBanner?Banner_Id={Banner_Id}&Active={Active}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result StatusBanner(int Banner_Id, int Active);
//         [WebInvoke(Method = "*", UriTemplate = "DeleteBanner?Banner_Id={Banner_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result DeleteBanner(int Banner_Id);


//         //Quiery
//         [WebInvoke(Method = "*", UriTemplate = "addQuiery", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result addQuiery(Quiery_Obj p);
//         [WebInvoke(Method = "*", UriTemplate = "getQuiery", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Quiery_Obj> getQuiery();
//         [WebInvoke(Method = "*", UriTemplate = "ReplyStatusQuiery?quiery_id={quiery_id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ReplyStatusQuiery(int quiery_id);
//         [WebInvoke(Method = "*", UriTemplate = "ReplyMessageQuiery?quiery_id={quiery_id}&message={message}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ReplyMessageQuiery(int quiery_id, string message);



//         ///IB
//         [WebInvoke(Method = "*", UriTemplate = "IB_Profile_Request", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result IB_Profile_Request(IB_Profile_Obj s);
//         [WebInvoke(Method = "*", UriTemplate = "IB_CommissionPlan", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result IB_CommissionPlan(IB_Commission_Plan_Obj s);

//         [WebInvoke(Method = "*", UriTemplate = "IB_CommissionPlanDefault?Commission_Plan_Id={Commission_Plan_Id}&Type={Type}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result IB_CommissionPlanDefault(int Commission_Plan_Id, int Type);

//         [WebInvoke(Method = "*", UriTemplate = "IB_CommissionPlanDelete?Commission_Plan_Id={Commission_Plan_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result IB_CommissionPlanDelete(int Commission_Plan_Id);


//         [WebInvoke(Method = "*", UriTemplate = "getIB_Profile?Trader_Id={Trader_Id}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         IB_Profile_Count_Obj getIB_Profile(double Trader_Id, int index, int count);

//         [WebInvoke(Method = "*", UriTemplate = "StatusIB_Profile?IB_Profile_Id={IB_Profile_Id}&Status={Status}&Commission_Plan_Id={Commission_Plan_Id}&IB_Account_Opening_Plan={IB_Account_Opening_Plan}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result StatusIB_Profile(int IB_Profile_Id, int Status, int Commission_Plan_Id, int IB_Account_Opening_Plan);

//         [WebInvoke(Method = "*", UriTemplate = "IB_User_List?Reffered_By_Account={Reffered_By_Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         IB_USER_Profile_Obj IB_User_List(int Reffered_By_Account);


//         [WebInvoke(Method = "*", UriTemplate = "getIB_CommissionPlan", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<IB_Commission_Plan_Obj> getIB_CommissionPlan();



//         [WebInvoke(Method = "*", UriTemplate = "Distribute?Trader_Id={Trader_Id}&Commition={Commition}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         string Distribute(int Trader_Id, double Commition);
//         [WebInvoke(Method = "*", UriTemplate = "DistributeT2?Trader_Id={Trader_Id}&Commition={Commition}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         string DistributeT2(int Trader_Id, double Commition);



//         [WebInvoke(Method = "*", UriTemplate = "Self_Commission?Trader_Id={Trader_Id}&index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Self_Commission_Count_Obj Self_Commission(int Trader_Id, int index, int count);




//         [WebInvoke(Method = "*", UriTemplate = "IB_WithdrawReq", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result IB_WithdrawReq(IB_Commission_Withdraw_Req_Obj p);


//         [WebInvoke(Method = "*", UriTemplate = "ApproveIB_WithdrawReq?IB_Withdraw_Req={IB_Withdraw_Req}&status={status}&AdmComment={AdmComment}&ProcessedBy={ProcessedBy}", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result ApproveIB_WithdrawReq(int IB_Withdraw_Req, int status, string AdmComment, int ProcessedBy);


//         [WebInvoke(Method = "*", UriTemplate = "getIB_WithdrawReq?Trader_Id={Trader_Id}&index={index}&count={count}&fromDate={fromDate}&toDate={toDate}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         IB_Commission_Withdraw_Req_Count_Obj getIB_WithdrawReq(int Trader_Id, int index, int count, string fromDate, string toDate);

//         [WebInvoke(Method = "*", UriTemplate = "GetCommission?Trader_Id={Trader_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         double GetCommission(int Trader_Id);



//         [WebInvoke(Method = "*", UriTemplate = "UpdareStatusIB_Comm_Wallet?Trader_Id={Trader_Id}&IB_Commition_Wallet_Id={IB_Commition_Wallet_Id}&Status={Status}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdareStatusIB_Comm_Wallet(int Trader_Id, int IB_Commition_Wallet_Id, STATUS Status);
//         [OperationContract]
//         Result ADDUpdateExecutiveExicutive(Executive_Obj p);

//         [WebInvoke(Method = "*", UriTemplate = "GetPerssion?admin_client={admin_client}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Permission_Obj> GetPerssion(int admin_client);
//         [WebInvoke(Method = "*", UriTemplate = "GetPerssionList?admin_client={admin_client}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<Permission_List_Obj> GetPerssionList(int admin_client);

//         [WebInvoke(Method = "*", UriTemplate = "AddUpdatePermission", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddUpdatePermission(Permission_List_Obj p);
//         [WebInvoke(Method = "*", UriTemplate = "UpdateExecutivePermission", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdateExecutivePermission(Executive_Obj p);


//         [WebInvoke(Method = "*", UriTemplate = "UpdateAccountPlan?Account={Account}&AccountPlanId={AccountPlanId}&GroupName={GroupName}&IBCommissionPlans={IBCommissionPlans}&LPOA={LPOA}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdateAccountPlan(int Account, int AccountPlanId, string GroupName, int IBCommissionPlans, int LPOA);

//         [WebInvoke(Method = "*", UriTemplate = "UpdateAccountCommissionPlan?Account={Account}&Commission_Plan_Id={Commission_Plan_Id}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdateAccountCommissionPlan(int Account, int Commission_Plan_Id);


//         [WebInvoke(Method = "*", UriTemplate = "UpdateAccountAgreement?Account={Account}&LPOA={LPOA}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result UpdateAccountAgreement(int Account, int LPOA);


//         //--chart data
//         [WebInvoke(Method = "*", UriTemplate = "NoOfTraderMonthWise", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<CountMothWise_Obj> NoOfTraderMonthWise();

//         [WebInvoke(Method = "*", UriTemplate = "TotalCommission15Days", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<TotalCommDateWise_Obj> TotalCommission15Days();


//         [WebInvoke(Method = "*", UriTemplate = "generateCommissionDetail", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result generateCommissionDetail();


//         [WebInvoke(Method = "*", UriTemplate = "getTotalWithdrawDeposite", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         TotalWithdrawDeposite_Obj getTotalWithdrawDeposite();

//         [WebInvoke(Method = "*", UriTemplate = "getTraderDetailByTicket?Ticket={Ticket}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         TreaderDetails_Obj getTraderDetailByTicket(int Ticket);



//         [WebInvoke(Method = "*", UriTemplate = "Get_ROI_Account?index={index}&count={count}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         ROICount_obj Get_ROI_Account(int index, int count);


//         [WebInvoke(Method = "*", UriTemplate = "AddROIByAdmin", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Result AddROIByAdmin(AutoManualPayment_obj p);

//         [WebInvoke(Method = "*", UriTemplate = "BlankPhonEmailProfileAccount?code={code}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Ret_BOOL BlankPhonEmailProfileAccount(int code);

//         [WebInvoke(Method = "*", UriTemplate = "FixName?page={page}&limit={limit}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         Ret_BOOL FixName(int page, int limit);

//         //-------------

//         [WebInvoke(Method = "*", UriTemplate = "GetUserInfoAll?lstAccount={lstAccount}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<MT5_USER_INFO> GetUserInfoAll(string lstAccount);

//         [WebInvoke(Method = "*", UriTemplate = "GetUserInfoByAccountList?lstAccount={lstAccount}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         List<MT5_USER_INFO> GetUserInfoByAccountList(string lstAccount);


//         [WebInvoke(Method = "*", UriTemplate = "GetOpenTradeByUsers?lstAccount={lstAccount}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         OPENED_ALL GetOpenTradeByUsers(string lstAccount);


//         [WebInvoke(Method = "*", UriTemplate = "GetOpenTradeByUsersNew?lstAccount={lstAccount}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         OPENED_ALL GetOpenTradeByUsersNew(string lstAccount);

//         [WebInvoke(Method = "*", UriTemplate = "GetOpenTradeByUser?Account={Account}", ResponseFormat = WebMessageFormat.Json)]
//         [OperationContract]
//         OPENED_ALL GetOpenTradeByUser(long Account);

//     }
// }


module.exports = router;
