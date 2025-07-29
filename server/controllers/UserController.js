import { User } from "../models/User.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const addUser = async (req,res)=>{
    try {
        const name = req.body.name;
        if(!name){
            return res.status(400).json({
                message : "name is missing",
                success : false
            })
        }
        const user = await User.findOne({name});
        if(user){
            return res.status(400).json({
                message : "user is already present with this name",
                success : false
            })
        }

        let profilePhotoUrl = null;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

        await User.create({
           name,
           profile : profilePhotoUrl
        })

        return res.status(200).json({
            message : "User created Successfully",
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllUser = async(req,res)=>{
    try {
        const users = await User.find().sort({ points: -1 });

        res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong while fetching users",
            success: false
        });
    }
}

export const getUserbyid = async (req,res)=>{
    try {
        const user_id = req.params.id;
        const user = await User.findOne({_id : user_id});
        if(!user){
        return res.status(400).json({
            message : "user is not present with this user_id",
            success : false
        })
     }

     return res.status(200).json({
        message : "User fetched successfully",
        user,
        success : true,
     })
    } catch (error) {
        console.log(error);
    }
}

export const Claim_points = async (req,res)=>{
    try {
        const user_id = req.params.id;
     const user = await User.findOne({_id : user_id});

     if(!user){
        return res.status(400).json({
            message : "user is not present with this user_id",
            success : false
        })
     }
     const point = Math.floor(Math.random()*10 + 1);
     user.points = user.points + point;
     user.point_history.push({value : point});

     await user.save();
     
     return res.status(200).json({
        message : `point claimed successfully by ${user.name}`,
        point,
        success : true
     })
    } catch (error) {
        console.log(error);
    }
}