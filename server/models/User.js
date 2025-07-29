import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    profile: {type : String},
    points : {
        type :Number,
        default : 0
    },
    point_history : [{
        value : {
            type : Number
        },
        updatedAt : {
            type : Date,
            default : Date.now
        },
    }]
},{timestamps:true})

export const User = mongoose.model("User",UserSchema);