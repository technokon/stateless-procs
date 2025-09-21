const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

// GET single user
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params?.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid user id'});
    }
    // get user
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found'});
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: `Error performing operation ${error.message}`});
  }
});

// DELETE single user
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params?.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid user id'});
    }
    // delete user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ error: 'User not found'});
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `Error performing operation ${error.message}`});
  }
});


module.exports = router;
