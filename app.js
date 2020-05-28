const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/mybrary', {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', function(error){
    console.log(error);
})
db.once('open', function(){
    console.log("connected to mongoDB...");
})



app.use('/', indexRouter);

app.listen(3000, function(){
    console.log("server is running...");
})