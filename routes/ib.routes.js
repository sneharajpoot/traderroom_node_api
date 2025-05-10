const ibController = require('../controller/ib.controller.js');

const express = require("express");

const router = express.Router();

// const os = require("os");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const { assert } = require("console");


router.get("/get-ib", async (req, res) => {
  try {

    let result = await ibController.getRecursiveData(req.query.Trader_Id, req.query.page || 1, req.query.limit || 10)

    res.status(200).json({ result: true, message: "ib ", data: result });

  } catch (error) {

    console.error(
      "error: AddAircraft",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});


router.get("/get-ib-trades", async (req, res) => {
  try {

    let result = await ibController.getOpenTradeByUsers(req.query.Trader_Id, req.query.page || 1, req.query.limit || 10)

    res.status(200).json({ result: true, message: "ib ", data: result });

  } catch (error) {

    console.error(
      "error: IB Trades",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});



router.get("/get-trades", async (req, res) => {
  try {

    let result = await ibController.getOpenTrade(req.query.Account)

    res.status(200).json({ result: true, message: "ib ", data: result });

  } catch (error) {

    console.error(
      "error: Account Trade",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});

router.get("/get-trades-new", async (req, res) => {
  try {

    let result = await ibController.getOpenTradeByUsersNew(req.query.Account)

    res.status(200).json({ result: true, message: "ib ", data: result });

  } catch (error) {

    console.error(
      "error: Account Trade",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});

router.get("/get-ib-transaction", async (req, res) => {
  try {

    let result = await ibController.getTransaction(req.query.Trader_Id)

    res.status(200).json({ result: true, message: "ib ", data: result });

  } catch (error) {

    console.error(
      "error: Account Trade",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});
router.get("/get-user-transaction", async (req, res) => {
  try {

    let result = await ibController.getTransactionByuser(req.query.Account, req.query.page, req.query.limit,req.query.Deposit_Withdraw)

    res.status(200).json(result );

  } catch (error) {

    console.error(
      "error: Account Trade",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});
router.get("/get-open-trades", async (req, res) => {

  try {

    let result = await ibController.GetOpenTrade(req.query.Account)

    res.status(200).json( result );

  } catch (error) {

    console.error(
      "error: AddAircraft",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
});

// dashboard Data 

router.get("/get-dashboard-data", async (req, res) => {
  
  try {

    let result = await ibController.getDashboardData()

    res.status(200).json({ result: true, message: "ib ", data: result });

  } catch (error) {

    console.error(
      "error: Account Trade",
      error.message || "Error adding aircraft"
    );
    return res
      .status(500)
      .send({ result: true, message: error.message || error });
  }
})
module.exports = router;
