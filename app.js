const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const homeRoute = require('./src/routes/home-route');
const customersRoutes = require('./src/routes/customers-route');
const transactionsRoutes = require('./src/routes/transactions-route');

const app = express();

app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}))

app.use('/', homeRoute)

app.use('/customers', customersRoutes)

app.use('/transactions', transactionsRoutes)

app.set("view engine", "ejs");

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Xafy:1234@cluster0.qu4biuq.mongodb.net/bank-system?retryWrites=true&w=majority')
        .then(()=>{
            app.listen(5000);
            console.log('Successfully connected on http://localhost:5000/')
        })
        .catch((err)=>{
            console.log('Connection failed with error :' + err)
        })

