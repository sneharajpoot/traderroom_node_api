// GenerateCommissionByDate

// copy.routes.js

const express = require('express');
const router = express.Router();
const commissionController = require('../controller/commission.controller.js'); // Adjust the path as necessary
const yup = require('yup');
const moment = require('moment')

// Route to add managers
router.get('/commission/GenerateCommissionByDate', async (req, res) => {
    try {


        //   fromDate: fD.format('YYYY-MM-DD') + ' 00:00:00',
        //   toDate: TD.format('YYYY-MM-DD') + ' 23:59:59',

        // const fromDate = req.query.fromDate || '2025-04-03 00:00:00';  // Get the query parameters from the request
        const toDate = req.query.toDate || '2025-04-04 23:59:59'; // Get the query parameters from the request

        // let fD = moment(fromDate);
        let TD = moment(toDate);
        let dd = moment();
 
        if (TD.format('YYYY-MM-DD hh:mm:ss') >= dd.format('YYYY-MM-DD hh:mm:ss')) {
            throw new Error("To Date Not grater then Now");
        } 
        const resultM = await commissionController.GenerateCommissionByToDate( toDate);
        res.status(200).json({ Message: 'Commission Generate  ', result: true, response: resultM });
    } catch (error) {
        console.log("Error", error.message || error);
        res.status(500).json({ result: false, Message: error.message });
    }
});
// Route to add managers
router.get('/commission/GenerateCommissionByDate', async (req, res) => {
    try {


        //   fromDate: fD.format('YYYY-MM-DD') + ' 00:00:00',
        //   toDate: TD.format('YYYY-MM-DD') + ' 23:59:59',

        const fromDate = req.query.fromDate || '2025-04-03 00:00:00';  // Get the query parameters from the request
        const toDate = req.query.toDate || '2025-04-04 23:59:59'; // Get the query parameters from the request




        let fD = moment(fromDate);
        let TD = moment(toDate);
        let dd = moment();


        if (fD.format('YYYY-MM-DD') >= dd.format('YYYY-MM-DD')) {
            throw new Error("From  Date Not grater then Now");
            return;
        }
        if (TD.format('YYYY-MM-DD') >= dd.format('YYYY-MM-DD')) {
            throw new Error("To Date Not grater then Now");
            return;
        }
        if (fD.format('YYYY-MM-DD') > TD.format('YYYY-MM-DD')) {
            throw new Error("From Date Not grater To Date");
            return;
        }
        const resultM = await commissionController.GenerateCommissionByDate(fromDate, toDate);
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
