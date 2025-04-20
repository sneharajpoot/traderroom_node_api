// copy.routes.js

const express = require('express');
const router = express.Router();
const copyController = require('../controller/copy.controller.js');
const yup = require('yup');

// Route to add managers
router.post('/self_commision', async (req, res) => {
    try {
        
        res.status(200).json({ Message: 'Manager Added Successfully for copy', result: true  });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});

module.exports = router;
