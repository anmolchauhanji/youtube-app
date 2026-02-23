import mongoose  ,{ Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        trim: true ,
        index:true,
        lowercase:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true ,
        index:true,
        lowercase:true
    },
    fullname:{
        type: String,
        required: true,
        trim: true ,
        index:true
    },
    avtar:{
        type: String,
        required: true
    },
    coverImage:{
        type: String
    },
    WatchHistory:[{
        type:Schema.type.ObjectId,
        Ref:'Video'
    }],
    password:{
        type:String,
        required:[true,'Password is require']
    },
    refreshToken:{
        type: String
    },
    },{
        timestamps:true
    }
)

export const User = mongoose.model('User',userSchema)