const ibControler = require('../controler/ib.controler'); 

const express = require("express");

const router = express.Router();

// const os = require("os");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const { assert } = require("console");


router.get("/get-ib", async (req, res) => {
  try {
  
    let result = await ibControler.getRecursiveData(req.query.Trader_Id)

    res.status(200).json({ result: true, message: "ib " , data:result});

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
  
    let result = await ibControler.getOpenTradeByUsers(req.query.Trader_Id)

    res.status(200).json({ result: true, message: "ib " , data:result});

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
  
    let result = await ibControler.getOpenTrade(req.query.Account)

    res.status(200).json({ result: true, message: "ib " , data:result});

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
  
    let result = await ibControler.getTransaction(req.query.Trader_Id)

    res.status(200).json({ result: true, message: "ib " , data:result});

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
module.exports = router;
