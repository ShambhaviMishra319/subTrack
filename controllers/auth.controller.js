import mongoose from "mongoose";
import User from "../models/users.model.js";
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import e from "express";
import bcrypt from 'bcrypt'

export const signup=async(req,res,next)=>{
    const session=await mongoose.startSession()
    session.startTransaction()

    try{
    const{name,email,password}=req.body

    const existingUser=await User.findOne({email})

    if(existingUser){
        const error=new Error('User already exist')
        error.status=409
        throw error
    }

    //hash password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //creating new user
    const newUser=await User.create([{name,email,password:hashedPassword}],{session})

    //jwt auth
    const token =jwt.sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

    await session.commitTransaction()
    session.endSession()

    res.status(201).json({
        sucess:true,
        message:'user created sucessfully',
        data:{
            token,
            user:newUser[0]
        }
    })}
    catch(error){
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}


export const signin=async(req,res,next)=>{
    try{
        const{email,password}=req.body

        //find user
        const user=await User.findOne({email})

        if(!user){
            const error=new Error('user not found')
            error.statusCode=404;
            throw error
        }

        //checking if password is valid
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            const error=new Error('incorrect password');
            error.statusCode=401;
            throw error
        }

        //JWT TOKEN
        const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }
}

export const signout = async (req, res, next) => {}