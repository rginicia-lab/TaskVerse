import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({

  userId:{
    type:String,
    required:true
  },

  xp:{
    type:Number,
    default:0
  },

  streak:{
    type:Number,
    default:0
  },

  lastCompletedDate:{
    type:Date,
    default:null
  },

  badges:{
    type:Array,
    default:[]
  }

});


const UserProgress = mongoose.model(
  "UserProgress",
  userProgressSchema
);


export default UserProgress;