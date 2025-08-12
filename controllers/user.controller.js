import User from "../models/users.model.js"

export const getUser=async(req,res,next)=>{
    try{
        const users=User.findOne()
    }
    catch(error){
        next(error)
    }
}