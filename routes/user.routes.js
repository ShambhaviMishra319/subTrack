import { Router } from "express";
const userRouter=Router()
import authorize from '../middlewares/auth.middleware.js'
import { getUsers,getUser } from "../controllers/user.controller.js";

userRouter.get('/',getUsers)
userRouter.get('/get-users',getUsers)

userRouter.get('/:id',authorize,getUser)

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