import express from "express";
import UserProgress from "../models/UserProgress.js";

const router = express.Router();


// Get Progress

router.get("/", async(req,res)=>{

  try{

    let progress = await UserProgress.findOne();


    if(!progress){

      progress = await UserProgress.create({});

    }


    res.json(progress);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});


// Update Streak

router.put("/", async(req,res)=>{

  try{

    const progress =
    await UserProgress.findOne();


    progress.streak += 1;


    progress.xp += 10;


    if(progress.streak === 7){

      progress.badges.push(
        "🔥 7 Day Streak"
      );

    }


    await progress.save();


    res.json(progress);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});


export default router;