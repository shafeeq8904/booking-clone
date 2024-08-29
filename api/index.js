const express = require('express')
const app = express()
const cors= require('cors')
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));


const port = process.env.PORT || 3000;

app.get('/test',(req,res)=>{
    res.json('Hello World')
})

app.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    res.json({
        name,email,password
    })
})

app.listen( port , ()=>{
    console.log(`Server is running on port ${port}`)
})