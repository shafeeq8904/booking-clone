const express = require('express')
const app = express()
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
require('dotenv').config()
const bcrypt = require('bcrypt')
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));


const port = process.env.PORT || 3000;

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req,res)=>{
    res.json('Hello World')
})

app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body

    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
    
        res.json(userDoc);
        
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body 
    const emailDoc = await User.findOne({email})
    if(emailDoc){
        res.json('found')
    }
    else{
        res.json('not found')
    }
})

app.listen( port , ()=>{
    console.log(`Server is running on port ${port}`)
})