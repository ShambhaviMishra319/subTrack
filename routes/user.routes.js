import { Router } from "express";
const userRouter=Router()

import { getUser } from "../controllers/user.controller.js";

userRouter.get('/get-users',getUser)

userRouter.get('/:id',(req,res)=>{
    res.send({
        title:'GET User details'
    }
    )
})

userRouter.post('/',(req,res)=>{
    res.send({
        title:'CREATE New User'
    }
    )
})

userRouter.put('/:id',(req,res)=>{
    res.send({
        title:'UPDATE User details'
    }
    )
})

userRouter.delete('/:id',(req,res)=>{
    res.send({
        title:'delete User'
    }
    )
})

export default userRouter