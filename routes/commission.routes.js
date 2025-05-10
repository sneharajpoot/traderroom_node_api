// GenerateCommissionByDate

// copy.routes.js

const express = require('express');
const router = express.Router();
const commissionController = require('../controller/commission.controller.js'); // Adjust the path as necessary
const yup = require('yup');
const moment = require('moment')

// Route to add managers
router.get('/commission/GenerateCommission', async (req, res) => {
    try {

        const resultM = await commissionController.generateCommitionAPI();
        res.status(200).json({ Message: 'Commission Generate  ', result: true, response: resultM });
    } catch (error) {
        console.log("Error", error.message || error);
        res.status(500).json({ result: false, Message: error.message });
    }
});

router.get('/commission/tri_IBCommission', async ( req, res) => {
    try {
        const resultM = await commissionController.tri_IBCommission( );
        res.status(200).json({ Message: 'Commission Generate  ', result: true, response: resultM });
    } catch (error) {
        console.log("Error", error|| error);
        res.status(500).json({ result: false, Message: error.message });
    }
});
 
router.post('/commission/Trades_CommissionDateWish', async (req, res) => {
    try {
        let { fromDate, toDate, traderId } = req.body; // Extract fromDate and toDate from the request body
 
        if(fromDate){
            fromDate = moment(fromDate).format('YYYY-MM-DD');
        }
        if(toDate){
            toDate = moment(toDate).format('YYYY-MM-DD');
        }

        // Call the controller function with the validated dates
        const resultM = await commissionController.Trades_CommissionDateWish({fromDate, toDate, traderId });
        res.status(200).json({ Message: 'Commission Generate  ', result: true, ...resultM });
    } catch (error) {
        console.log("Error", error || error);
        res.status(500).json({ result: false, Message: error.message });
    }
});

router.post('/commission/IB_Trades_CommissionDateWish', async (req, res) => {
    try {
        let { fromDate, toDate, traderId } = req.body; // Extract fromDate and toDate from the request body
 
        if(fromDate){
            fromDate = moment(fromDate).format('YYYY-MM-DD');
        }
        if(toDate){
            toDate = moment(toDate).format('YYYY-MM-DD');
        }

        // Call the controller function with the validated dates
        const resultM = await commissionController.IBTrades_CommissionDateWish({fromDate, toDate, traderId });
        res.status(200).json({ Message: 'Commission Generate  ', result: true,...resultM });
    } catch (error) {
        console.log("Error", error.message || error);
        res.status(500).json({ result: false, Message: error.message });
    }
});

module.exports = router;
