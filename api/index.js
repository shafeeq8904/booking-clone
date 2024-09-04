const express = require('express')
const app = express()
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jweniubhvhhyvbyubybwciunc';

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));


const port = process.env.PORT || 3000;

//console.log(process.env.MONGO_URL)
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with a failure code
    }
}

connectDB();

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
        const passok = bcrypt.compareSync(password,emailDoc.password)
        if(passok){
            jwt.sign({email:emailDoc.email, id:emailDoc._id}, jwtSecret ,{}, (err,token)=>{
                if (err) throw err;   
                res.cookie('token', token).json(emailDoc); 
            })
            
        }
        else{
            res.status(422).json('password wrong');
        }
    }
    else{
        res.json('email ID not found')
    }
})

app.listen( port , ()=>{
    console.log(`Server is running on port ${port}`)
})