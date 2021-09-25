const express = require('express');
require("dotenv").config()
const app = express();
require('./config/sqlite');
const postsController = require('./controllers/postsController');
const userController = require('./controllers/usersController');
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json())
app.use('/posts', postsController)
app.use('/users', userController);

app.listen(5500, () => {
    console.log("server started at 5500");
})