// copy.routes.js

const express = require('express');
const router = express.Router();
const copyController = require('../controller/copy.controller.js');

// Route to add managers
router.post('/copy/AddMng', async (req, res) => {
    try {
        const resultM = await copyController.addManager(req.body);
        res.status(200).json({ Message: 'Manager Added Successfully for copy', result:true ,  response: resultM});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to login manager
router.get('/copy/managerLogin', async (req, res) => {
    try {
        const result = await copyController.managerLogin();
        res.status(200).json({result:true ,Message: 'Manager Login Successfully for copy', response: result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route to login manager
router.get('/copy/managerLogout', async (req, res) => {
    try {
        const result = await copyController.managerLogout(req.query.mngId);
        res.status(200).json({result:true ,Message: result.result, response: result});
    } catch (error) {
        res.status(500).json({ result:false, Message: error.message });
    }
});

// Route to login manager
router.get('/copy/connectionStatus', async (req, res) => {
    try {
        const result = await copyController.connectionStatus();
        res.status(200).json({result:true ,Message: result.result, response: result});
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
});

// Route to add master
router.post('/copy/addMaster', async (req, res) => {
    try {
        const result = await copyController.addMaster(req.body);
        res.status(200).json({result:true ,Message: 'Master Added Successfully for copy', response: result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to remove master
router.post('/copy/removeMaster', async (req, res) => {
    try {
        const result = await copyController.removeMaster(req.body);
        res.status(200).json({ result:true ,Message: 'Master Removed Successfully for copy', response: result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add user
router.post('/copy/addUser', async (req, res) => {
    try {
        const result = await copyController.addSlave(req.body);
        res.status(200).json({result:true ,Message: 'User Added Successfully for copy', response: result});
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result:false, Message: error.message });
    }
});

// Route to   resetDB
router.post('/copy/resetDB', async (req, res) => {
    try {
        const result = await copyController.resetDB(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result:false, Message: error.message });
    }
});
// Route to   getManagerDetails
router.get('/copy/getManagerDetails', async (req, res) => {
    try {
        const result = await copyController.getManagerDetails();
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ error: error.message });
    }
});
// Route to   getMasterDetails
router.get('/copy/getMasterDetails', async (req, res) => {
    try {
        const result = await copyController.getMasterDetails( );
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result:true,Message: error.message });
    }
});

// Route to   getSlaveDetails
router.get('/copy/getSlaveDetails', async (req, res) => {
    try {
        const result = await copyController.getSlaveDetails(req.query.MasterId );
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result:false,Message: error.message });
    }
});

// Route to open trade
router.post('/copy/opentrade', async (req, res) => {
    try {
        const result = await copyController.openTrade(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to close order
router.post('/copy/closeOrder', async (req, res) => {
    try {
        const result = await copyController.closeOrder(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to check manager login and add manager if not found
router.post('/copy/ensureManager', async (req, res) => {
    try {
        const loginResult = await copyController.managerLogin(req.body);
        res.status(200).json(loginResult);
    } catch (loginError) {
        if (loginError.message.includes('not found')) {
            try {
                const addManagerResult = await copyController.addManager(req.body);
                res.status(200).json(addManagerResult);
            } catch (addError) {
                res.status(500).json({ result:false, Message: addError.message });
            }
        } else {
            res.status(500).json({ result:false,Message: loginError.message });
        }
    }
});

// Route to add a record to Copy_Master_Performance
router.post('/copy/addPerformance', async (req, res) => {
    try {
        const result = await copyController.addPerformance(req.body);
        res.status(200).json({ result: true, Message: 'Record added successfully', response: result });
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to update a record in Copy_Master_Performance
router.put('/copy/updatePerformance/:TraderId', async (req, res) => {
    try {
        const result = await copyController.updatePerformance(req.params.TraderId, req.body);
        res.status(200).json({ result: true, Message: 'Record updated successfully', response: result });
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to get records from Copy_Master_Performance
router.get('/copy/getPerformance', async (req, res) => {
    try {
        const result = await copyController.getPerformance(req.query.TraderId);
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});

module.exports = router;
