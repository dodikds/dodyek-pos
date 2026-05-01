const express = require('express');
const ItemModel = require('../models/itemsModel');
const router = express.Router();

router.get('/get-all-items', async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.send(items);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router