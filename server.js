const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db')


app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const candidatesRoutes = require('./routes/candidateRoutes')

app.use('/user', userRoutes);
app.use('/candidates', candidatesRoutes);

app.listen(3000, () => {
  console.log("listening to 3000")
})


