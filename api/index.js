const express = require('express')
const app = express()
const cors= require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Places');
const Booking = require('./models/Booking')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcryptSalt = bcrypt.genSaltSync(10);
const imageDownloader = require('image-downloader');
const jwtSecret = 'jweniubhvhhyvbyubybwciunc';
const multer = require('multer');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'))

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

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }

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
            jwt.sign({email:emailDoc.email, 
                      id:emailDoc._id, 
                      name:emailDoc.name}, jwtSecret ,{}, (err,token)=>{
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
 
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret , {}, async (err,userData)=>{
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        })
    }
    else{
        res.json(null);
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-by-link', async (req,res)=>{
    const {link} = req.body;
    const newName = 'Photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link, 
        dest: __dirname + '/uploads/' +newName,
    });
    res.json(newName)
})

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload' , photosMiddleware.array('photos',100), (req,res) =>{
    const uploadedFiles = [];
    for(let i =0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        const newPath = path + '.' + ext;
         // Rename the file
         fs.renameSync(path, newPath);
        
         // Normalize the path to use forward slashes for consistency
         const normalizedPath = newPath.replace(/\\/g, '/');
         
         uploadedFiles.push(normalizedPath.replace('uploads/', ''));
        
    }
    res.json(uploadedFiles);
})

app.post('/places', (req,res)=>{
    const {token} = req.cookies;
    const {title,address,addedPhotos,description
        ,perks,extraInfo,checkin,checkout,maxGuests,price} = req.body
    jwt.verify(token, jwtSecret , {}, async (err,userData)=>{
        if (err) throw err;
        const placeDoc = await Place.create({
            owner : userData.id,
            title,address,photos: addedPhotos,description
            ,perks,extraInfo,checkin,checkout,maxGuests,price
        });
        res.json(placeDoc);
    })
   
})

app.get('/user-places', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret , {}, async (err,userData)=>{
        const {id} = userData;
        res.json(await Place.find({owner:id}));

    });
})

app.get('/places/:id',async(req,res)=>{
    const{id}= req.params;
    res.json(await Place.findById(id))
})

app.put('/places', async(req,res)=>{
    const {token} = req.cookies;
    const { id,title,address,addedPhotos,description
        ,perks,extraInfo,checkin,checkout,maxGuests,price} = req.body
    jwt.verify(token, jwtSecret , {}, async (err,userData)=>{
        const placeDoc= await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos: addedPhotos,description
                ,perks,extraInfo,checkin,checkout,maxGuests,price
            })
            await placeDoc.save();
            res.json('ok')
        }
    })
})

app.get('/places', async(req,res)=>{
    res.json(await Place.find());
})

app.post('/bookings',async(req,res)=>{
    const userData = await getUserDataFromReq(req);
    const {place,checkin,
        checkout,numberOfGuests,
        name,phone,price} =req.body;
    Booking.create({
        place,checkin,
        checkout,numberOfGuests,
        name,phone,price,
        user:userData.id
    }).then((doc)=>{
        
        res.json(doc);
    }).catch((err)=>{
        throw err;
    })
        
})

app.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    res.json( await Booking.find({user:userData.id}).populate('place') );
  });

app.listen( port , ()=>{
    console.log(`Server is running on port ${port}`)
})