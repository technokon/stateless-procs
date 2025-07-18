const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // keep going create hashes
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the use in DB
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // create a token for session
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        // send this back
        res
            .status(201)
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            })
            .json({
                token,
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                }
            });
    } catch (err) {
        res.status(500).json({ error: `Something went wrong, ${err.message}` });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // keep going match credentials
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // create a token for session
        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        // send this back
        res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            })
            .json({
                token,
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            });
    } catch (err) {
        res.status(500).json({ error: `Something went wrong, ${err.message}` });
    }
});

module.exports = router;
