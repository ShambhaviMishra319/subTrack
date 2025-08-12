import mongoose from "mongoose";

import { DB_URI,NODE_ENV } from "../config/env.js";

if (!DB_URI){
    throw new Error('Please define MONGODB_URI VARIABLE');
}

const connectToDatabase=async()=>{
    try{
        await mongoose.connect(DB_URI)
        console.log(`connected to database in ${NODE_ENV} mode`)
    }
    catch(error){
        console.error("error connecting to database : ",error)
    }
}

export default connectToDatabase