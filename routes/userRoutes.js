import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const userRoutes=express.Router();
userRoutes.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.data.email});
    if(user){
        if(bcrypt.compareSync(req.body.data.password,user.password)){
            res.send(
                {
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user),
                }
            );
            return;
        }
    }
    res.status(401).send({message:'invalid Password or Email'});
}));
userRoutes.post('/signup',expressAsyncHandler(async(req,res)=>{
   const newUser=new User({
    name:req.body.data.name,
    email:req.body.data.email,
    password:bcrypt.hashSync(req.body.data.password),
   });
   const user=await newUser.save();
   res.send(
    {
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user),
    });
}));
export default userRoutes;