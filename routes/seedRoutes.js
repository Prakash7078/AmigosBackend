import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
const seedRouter=express.Router();
seedRouter.get('/',async(req,res)=>{
    const user={
        name:'Prakash',
        email:'ponduriprakash7078@gmail.com',
        password:bcrypt.hashSync('prakash7078'),
        isAdmin:true,
    };
    await User.remove({});
    const createdUser=await User.create(user);
    res.send(createdUser);
})
export default seedRouter;