const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/netflix', userRoutes)


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});




const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.by2yz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log('Connected to Database')

    })
    .catch((error) => {
        console.log(error)
    });