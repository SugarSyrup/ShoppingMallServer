require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: '*',
  credential: true,
}

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(express.json());

mongoose
    .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@sampleloginserver.vccnx70.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}, {useFindAndModify: false})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use('/', require('./routes/user'));
app.use('/auth', require('./routes/auth'));

//https://velog.io/@ssumniee/node.js-%EC%84%9C%EB%B2%84%EC%97%90-SMS-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Example app listening on port 3000`)
})