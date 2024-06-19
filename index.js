const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const fs =require('fs');
const User =require('./User')
const cors =require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// -- to import the data on db --
// fs.readFile('db.json',"utf-8",(err,data)=>{
//     if(err){
//         console.log("Err reading file",err)
//     }

//     const users = JSON.parse(data);

//     User.insertMany(users).then(()=>{
//         console.log("data is imported successfully")
//     }).catch((err)=>{
//         console.log("err instering data",err);
//     })
// })


mongoose.connect(process.env.MONGO_URL).
    then(() => {
        console.log("connected db successfully")
    }).catch((err) => {
        console.log("err to connect db", err)
    })

    app.get('/api/users', async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
            console.log(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server is running on port", PORT);
})