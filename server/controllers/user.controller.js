import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// For Signup
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "user already exist with this email." });
    }

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        const newUser = new User({
          name,
          email,
          password: hash,
        });

        newUser.save();
        
        return res.status(201).json({
          success: true,
          message: "User Sign In successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

// For Login
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(404).json({
          success: false,
          message: "All fields are required.",
        });
      }
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({
            success: false,
            message: "user not found.",
          });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if(!isPasswordMatch){
        return res.status(400).json({
            success: false,
            message: "Incorrect email or password.",
          });
      }
      generateToken(res,user,`Welcom back ${user.name}`)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Login",
    });
  }
};

//for Logout

export const logout = (req,res)=>{
  try {
    return res.status(200).cookie("token", "",{maxAge:0}).json({
      message:"Logged out successfully",
      success:true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Logout",
    });
  }
}

export const getUserProfile = async(req,res)=>{
  try {
    const userId =req.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Logout",
    });
  }
}

export const updateProfile = async(req,res)=>{
try {
  const userId = req.id;
  const{name} = req.body;
  const profilePhoto = req.file;

  const user = await User.findById(userId);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

 if(user.photoUrl){
 const publicId = user.photoUrl.split("/").pop().split(".")[0];
 deleteMediaFromCloudinary(publicId)
 }

//  upload new photo
const cloudResponse = await uploadMedia(profilePhoto.path)
const photoUrl = cloudResponse.secure_url;
  const updateData = {name, photoUrl}
  const updateUser = await User.findByIdAndUpdate(userId, updateData,{new:true}).select("-password")
  return res.status(200).json({
    success:true,
    user:updateUser,
    message:"Profile Updated successfully"
  })

} catch (error) {
  console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
}
}