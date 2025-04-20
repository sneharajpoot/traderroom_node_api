// GenerateCommissionByDate

// copy.routes.js

const express = require('express');
const router = express.Router();
const trController = require('../controller/tr.controller.js'); // Adjust the path as necessary
const yup = require('yup');
const moment = require('moment')

// Route to add managers
router.get('/tr/GetGroups', async (req, res) => {
    try {

        const resultM = await trController.GetGroups( );
        res.status(200).json({ Message: 'Commission Generate  ', result: true, response: resultM });
    } catch (error) {
        console.log("Error", error.message || error);
        res.status(500).json({ result: false, Message: error.message });
    }
});

module.exports = router;
