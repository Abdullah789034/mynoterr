const express=require('express');
const { body, validationResult } = require('express-validator');
const router=express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_Sec="I am a boy.";


//Route no 1 : POST: /api/auth/createUser -- tocreateuser
router.post('/createUser',[
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min : 5})
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try {
    const salt = await bcrypt.genSalt(10);

    const secPas= await bcrypt.hash(req.body.password,salt);
    let user= await User.findOne({email: req.body.email}) 
    if(user){
        return res.status(400).json({ error: "Sorry email already exists."})
    }
    user= await User.create({
        name:req.body.name,
        password:secPas,
        email:req.body.email
    })

    const data= {
        user:{
            id:user.id
        }
    } ;
    const authToken = jwt.sign(data,JWT_Sec);
    res.json({authToken})
} catch (error) {
        console.error(error);
        res.status(500).send("Some Error Occur");
}
    
    // .then(user=>res.json(user))
    // res.json({error:"Please enter a unique value"})
})


//Route 2: Autheticate user from using : POST/api/auth/login
router.post('/login',[ 
    body('email').isEmail(),
    body('password','Password cannot be blank').exists()
],async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {email,password}=req.body;

    try {
    let user= await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"Login with correct credentials."})
    }
        
    const passCompare= await bcrypt.compare(password,user.password);
    if(!passCompare){
        return res.status(400).json({error:"Login with correct credentials."})
    }

    const data={
        user:{
            id:user.id 
        }
    };
    const authToken = jwt.sign(data,JWT_Sec);
    res.json({authToken})
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})


//Route 3: Getting user details : POST/api/auth/getuser --After Login
router.post('/getuser',[ 
],async(req,res)=>{

    try {
        let userId='todo'
        const user= await User.findById(userId).select("-password")
        
    } catch (error) {
        console.error(error);
            res.status(500).send("Internal Server Error");
    }

})





module.exports= router