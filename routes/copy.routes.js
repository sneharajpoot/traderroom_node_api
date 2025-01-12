// copy.routes.js

const express = require('express');
const router = express.Router();
const copyController = require('../controller/copy.controller.js');

// Route to add manager
router.post('/home/AddMng', async (req, res) => {
    try {
        const result = await copyController.addManager(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to generate token
router.post('/home/token', async (req, res) => {
    try {
        const result = await copyController.generateToken(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to login manager
router.post('/home/managerLogin', async (req, res) => {
    try {
        const result = await copyController.managerLogin(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add master
router.post('/home/addMaster', async (req, res) => {
    try {
        const result = await copyController.addMaster(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to remove master
router.post('/home/removeMaster', async (req, res) => {
    try {
        const result = await copyController.removeMaster(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add user
router.post('/home/addUser', async (req, res) => {
    try {
        const result = await copyController.addUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to open trade
router.post('/home/opentrade', async (req, res) => {
    try {
        const result = await copyController.openTrade(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to close order
router.post('/home/closeOrder', async (req, res) => {
    try {
        const result = await copyController.closeOrder(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to check manager login and add manager if not found
router.post('/home/ensureManager', async (req, res) => {
    try {
        const loginResult = await copyController.managerLogin(req.body);
        res.status(200).json(loginResult);
    } catch (loginError) {
        if (loginError.message.includes('not found')) {
            try {
                const addManagerResult = await copyController.addManager(req.body);
                res.status(200).json(addManagerResult);
            } catch (addError) {
                res.status(500).json({ error: addError.message });
            }
        } else {
            res.status(500).json({ error: loginError.message });
        }
    }
});

module.exports = router;
