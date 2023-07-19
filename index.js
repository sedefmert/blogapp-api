const express = require('express');
const cors = require('cors');
const app = express();//ikisine de aldım
const cookieParser = require('cookie-parser'); //autha aldım
const mongoose = require('mongoose'); //ikisine de aldım
const dotenv = require('dotenv').config();

const authRoutes = require('./routes/Auth');
const postRoutes = require('./routes/Post');


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); 
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(mongodb_url).then(() => {
    console.log('database connected');
}).catch(err => {
    console.log(err);
});

const port  = 4000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))