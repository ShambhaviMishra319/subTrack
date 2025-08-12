import mongoose, { model } from "mongoose";

const subscriptionSchema=mongoose.Schema(
    {
        Name:{
            type:String,
            required:[true,'Subscription is required'],
            trim:true,
            minLength:2,
            maxLength:100
        },

        price:{
            type:Number,
            required:[true,'Subscription price is required'],
            min:[0,'Price must be greater than 0']
        },

        currency:{
            type:String,
            enum:['USD','INR','GBP'],
            default:'USD'
        },

        frequency:{
            type:String,
            enum:['daily','weekly','monthly','yearly']
        },

        category:{
            type:String,
            enum:['sports','entertainment','lifestyle','news','finance','others'],
            required:true
        },

        paymentMethod:{
            type:String,
            required:true,
            trim:true
    },

        status:{
            type:String,
            enum:['active','cancelled','expired'],
            default:'active'
        },

        startDate:{
            type:Date,
            required:true,
            validate:{
                validator:(value)=>value<=new Date(),
                message:'Start date should be in the past'
            }
        },

        renewDate:{
            type:Date,
            required:true,
            validate:{
                validator: function(value){
                    return value>this.startDte
                },
                message:'renewal must be after start date'
            }
        },

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
            index:true
        }


    },{timestamps:true}
)

subscriptionSchema.pre('save',function(){
    if(!this.renewDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        }

        this.renewDate=new Date(this.startDate)
        this.renewDate.setDate(this.renewDate.getDate()+renewalPeriods[this.frequency])
    }

    if(this.renewDate<new Date()){
        this.status='expired'
    }
    next()
})

const Subscription=mongoose.model('Subscription',subscriptionSchema)

export default Subscription
