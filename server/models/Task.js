import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        default: "Personal"
    },

    description: {
        type: String
    },

    completed: {
        type: Boolean,
        default: false
    },

    priority: {
        type: String,
        default: "Medium"
    },

    xp: {
        type: Number,
        default: 10
    },

    reminder: {
        type: Date,
        default: null
    },

    dueDate: {
        type: Date,
        default: null
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Task = mongoose.model("Task", taskSchema);

export default Task;