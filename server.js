const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db')

app.use(express.json())

const userRoutes = require('./routes/userRoutes')

app.use('/user', userRoutes);


app.listen(3000, () => {
  console.log("listening to 3000")
})


