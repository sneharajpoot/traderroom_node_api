// copy.routes.js

const express = require('express');
const router = express.Router();
const copyController = require('../controller/copy.controller.js');
const yup = require('yup');

// Route to add managers
router.post('/copy/AddMng', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            ManagerId: yup.string().required('Manager ID is required'), 
        });

        await schema.validate(req.body);

        const resultM = await copyController.addManager(req.body);
        res.status(200).json({ Message: 'Manager Added Successfully for copy', result: true, response: resultM });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});


// Route to add managers
router.get('/copy/removeManager', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            mngId: yup.string().required('Manager ID is required'),
        });

        await schema.validate(req.query);

        const resultM = await copyController.removeManager(req.query.mngId);
        res.status(200).json({ Message: 'Manager Added Successfully for copy', result: true, response: resultM });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to add managers /Home/removeMaster
router.get('/copy/removeMaster', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            userid: yup.number().required('User ID is required'),
        });

        await schema.validate(req.query);

        const resultM = await copyController.removeMaster(req.query.userid);
        res.status(200).json({ Message: 'Manager Added Successfully for copy', result: true, response: resultM });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});


// Route to add managers /Home/removeMaster
router.get('/copy/removeUser', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            userid: yup.number().required('User ID is required'),
        });

        await schema.validate(req.query);

        const resultM = await copyController.removeUser(req.query.userid);
        res.status(200).json({ Message: 'Delete slave Success', result: true, response: resultM });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});





// Route to login manager
router.get('/copy/managerLogin', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            ManagerId: yup.string().required('Manager ID is required')
        });

        await schema.validate(req.query);

        const result = await copyController.managerLogin(req.query.ManagerId);
        res.status(200).json({ result: true, Message: 'Manager Login Successfully for copy', response: result });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});
// Route to login manager
router.get('/copy/managerLogout', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            mngId: yup.string().required('Manager ID is required')
        });

        await schema.validate(req.query);

        const result = await copyController.managerLogout(req.query.mngId);
        res.status(200).json({ result: true, Message: result.result, response: result });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to login manager
router.get('/copy/connectionStatus', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            mngId: yup.string().required('Manager ID is required')
        });

        await schema.validate(req.query);




        const result = await copyController.connectionStatus(req.query.mngId);
        res.status(200).json({ result: true, Message: result.result, response: result });
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ Message: error.message });
    }
});

// Route to add master
router.post('/copy/addMaster', async (req, res) => {
    try {
        // add validation use yup validation
        const schema = yup.object().shape({
            TraderId: yup.number().required('Trader ID is required'),
            masterid: yup.number().required('Master ID is required'),
            masterAccountNumber: yup.number().required('Master Account Number is required'),
            password: yup.string().required('Password is required'),
            name: yup.string().required('Name is required'),

            numSalves: yup.number().required('Number of Salves is required'),
            salveseidt: yup.boolean().required('Salves Edit is required'),
            accountType: yup.number().required('Account Type is required')
        });

        await schema.validate(req.body);


        const result = await copyController.addMaster(req.body);
        res.status(200).json({ result: true, Message: 'Master Added Successfully for copy', response: result });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});
// Route to add master
router.get('/copy/EnableSubscription', async (req, res) => {
    try {
        // add validation use yup validation 
        const schema = yup.object().shape({
            mngId: yup.string().required('Manager ID is required'),
            subscriptionType: yup.string().required('Subscription type is required')
        });

        await schema.validate(req.query);

        const result = await copyController.enableSubscription(req.query);
        res.status(200).json({ result: true, Message: 'Master Added Successfully for copy', response: result });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});

// 
// Route to remove master
router.get('/copy/removeMaster', async (req, res) => {
    try {
        // add yup validation
        const schema = yup.object().shape({
            userid: yup.number().required('User ID is required')
        });

        await schema.validate(req.query);

        const result = await copyController.removeMaster(req.query.userid);
        res.status(200).json({ result: true, Message: 'Master Removed Successfully for copy', response: result });
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to add user
router.post('/copy/addUser', async (req, res) => {
    try {
        // add yup validation

        const schema = yup.object().shape({
            TraderId: yup.number().required('Trader ID is required'),
            id: yup.number().required('ID is required'),
            loginid: yup.number().required('Login ID is required'),
            mloginid: yup.number().required('MLogin ID is required'),
            message: yup.string(),
            type: yup.number().required('Type is required'),
            tradeType: yup.number().required('Trade Type is required'),
            fixvolume: yup.number().required('Fix Volume is required'),
            priceType: yup.number().required('Price Type is required'),
            mutlipler: yup.number().required('Mutlipler is required'),
            roundof: yup.boolean().required('Round of is required'),
            minLot: yup.boolean().required('Min Lot is required'),
            sptp: yup.number().required('SPTP is required'),
            precentage: yup.number().required('Precentage is required'),
            accountType: yup.number().required('Account Type is required')
        });

        await schema.validate(req.body);

        const result = await copyController.addSlave(req.body);
        res.status(200).json({ result: true, Message: 'User Added Successfully for copy', response: result });
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to   resetDB
router.get('/copy/resetDB', async (req, res) => {
    try {
        const result = await copyController.resetDB();
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});
// Route to   getManagerDetails
router.get('/copy/getManagerDetails', async (req, res) => {
    try {
        const result = await copyController.getManagerDetails();
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});
// Route to   getMasterDetails
router.get('/copy/getMasterDetails', async (req, res) => {
    try {
        const result = await copyController.getMasterDetails();
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: true, Message: error.message });
    }
});

// Route to   getSlaveDetails
router.get('/copy/getSlaveDetails', async (req, res) => {
    try {
        // add yup validation
        const schema = yup.object().shape({
            MasterId: yup.number().required('Master ID is required')
        });


        await schema.validate(req.query);

        const result = await copyController.getSlaveDetails(req.query.MasterId);
        res.status(200).json(result);
    } catch (error) {
        console.error('error', error.message);
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to open trade
router.post('/copy/opentrade', async (req, res) => {
    try {
        const result = await copyController.openTrade(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
    }
});

// Route to close order
router.post('/copy/closeOrder', async (req, res) => {
    try {
        const result = await copyController.closeOrder(req.body);
        res.status(200).json(resulst);
    } catch (error) {
        res.status(500).json({ result: false, Message: error.message });
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
                res.status(500).json({ result: false, Message: addError.message });
            }
        } else {
            res.status(500).json({ result: false, Message: loginError.message });
        }
    }
});

// Route to add a record to Copy_Master_Performance
router.post('/copy/addPerformance', async (req, res) => {
    try {
        // add yup validation 

        const schema = yup.object().shape({
            Name: yup.string().required('Name is required'),
            Time: yup.string().required('Time is required'),
            IncPercent: yup.number().required('IncPercent is required'),
            IncUsd: yup.number().required('IncUsd is required'),
            WinRate: yup.number().required('WinRate is required'),
            AUM: yup.number().required('AUM is required'),
            TraderId: yup.number().required('TraderId is required'),
            MasterAccount: yup.string().required('MasterAccount is required')
        });

        await schema.validate(req.body);

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

        // add yup validation
        const schema = yup.object().shape({
            Name: yup.string().required('Name is required'),
            Time: yup.string() ,
            IncPercent: yup.number().required('IncPercent is required'),
            IncUsd: yup.number().required('IncUsd is required'),
            WinRate: yup.number().required('WinRate is required'),
            AUM: yup.number().required('AUM is required'),
            // TraderId: yup.number().required('TraderId is required'),
            // MasterAccount: yup.string().required('MasterAccount is required')
        });

        await schema.validate(req.body);


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
