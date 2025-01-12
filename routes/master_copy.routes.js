const express = require('express');
const router = express.Router();
const { getPendingMasters, approveMaster, updateMasterFields } = require('../controller/master_copy.controller');
// const ibControler = require('../controller/ib.controler');

// Fetch Pending Masters with Pagination
router.get('/masters/pending', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await getPendingMasters(Number(page), Number(limit));
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Approve Master Request
router.post('/masters/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await approveMaster(id);
        if (success) {
            res.status(200).json({ success: true, message: 'Master approved successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Master not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Approve Master Request
router.post('/masters/rejection/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await rejectMaster(id, req.body.rejectionReason);
        if (success) {
            res.status(200).json({ success: true, message: 'Master approved successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Master not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update Master Fields
router.put('/masters/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fields = req.body;

        const success = await updateMasterFields(id, fields);
        if (success) {
            res.status(200).json({ success: true, message: 'Master updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Master not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// Get Active Masters with Pagination
router.get('/masters/active', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

        const { data, total } = await getActiveMasters(Number(page), Number(limit));

        res.status(200).json({
            success: true,
            data,
            pagination: {
                totalRecords: total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
