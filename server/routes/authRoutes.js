import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "Registration successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.post("/login", async (req,res)=>{

  try{

    const {email,password}=req.body;

    const user = await User.findOne({email});


    if(!user){
      return res.status(400).json({
        message:"User not found"
      });
    }


    if(user.password !== password){
      return res.status(400).json({
        message:"Invalid password"
      });
    }


    res.json({
      message:"Login successful",
      user
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

export default router;