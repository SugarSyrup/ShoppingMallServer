require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose
    .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@sampleloginserver.vccnx70.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}, {useFindAndModify: false})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use('/', require('./routes/user'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port 3000`)
})