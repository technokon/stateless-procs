const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log('Connection to DB failed', err));

const app = express();

// Middlleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
// parse cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Routes placeholders
app.get('/', (req, res) => {
    res.send('Server is Runningggg!');
})

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

/*
mongo
mongodb+srv://technokon:Password12.@cluster-0.s7tbtre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-0
username: technokon
Password12.
 */