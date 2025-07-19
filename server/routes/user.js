const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// GET /api/user
router.get('/', verifyToken, async (req, res) => {
    try {
        // Get all users
        const users = await User.find({}, '-password');
        // send this back
        res
            .status(200)
            .json({
                users,
            });
    } catch (err) {
        res.status(500).json({ error: `Something went wrong, ${err.message}` });
    }
});


module.exports = router;
