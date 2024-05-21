const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/user");

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true }).
    then(() => console.log('MongoDB connected!'))
    .catch(err => console.error("Error in MongoDB connecting! ", err));
    
app.use("/api/users", userRoute)

app.use("/api/pins", pinRoute);


const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Backend Server is running in port ${PORT}...`)
})