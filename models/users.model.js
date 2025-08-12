import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
        trim:true,
        minLength:2,
        maxLength:100
    },

    email:{
        type:String,
        required:[true,'User Email is required'],
        trim:true,
        minLength:5,
        maxLength:300,
        match:[/\S+@\S+\.\S+/,'Please fill a valid email address']
    },

    password:{
        type:String,
        required:[true,'User password is required'],
        minLength:6
    }
},{timestamps:true}
)

const User=mongoose.model('User',userSchema)

export default User