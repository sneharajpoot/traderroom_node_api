// GenerateCommissionByDate

// copy.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js'); // Adjust the path as necessary
const yup = require('yup');
const moment = require('moment')

// Route to add managers
router.get('/getKycUser', async (req, res) => {
    try {

         let {fType,   Search,  Kyc_Status,  index,  count} = req.query;
        const resultM = await userController.getKycUser( fType,   Search,  Kyc_Status,  index,  count);
        res.status(200).json({ Message: 'Commission Generate  ', result: true, response: resultM });
    } catch (error) {
        console.log("Error", error.message || error);
        res.status(500).json({ result: false, Message: error.message });
    }
});

module.exports = router;
