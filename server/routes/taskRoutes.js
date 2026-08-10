import express from "express";
import Task from "../models/Task.js";

const router = express.Router();


// ==========================================
// CREATE TASK
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            title,
            description,
            priority,
            category,
            reminder,
            dueDate,
            userId
        } = req.body;


        if (!userId) {

            return res.status(400).json({
                message: "User ID required"
            });

        }

        console.log("CREATE TASK BODY:", req.body);
        const task = await Task.create({

            title,
            description,
            priority,
            category,
            reminder,
            dueDate,
            user: userId

        });


        res.status(201).json(task);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET USER TASKS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const { userId } = req.query;


        if (!userId) {

            return res.status(400).json({
                message: "User ID required"
            });

        }


        const tasks = await Task.find({
    user: userId
});


        res.json(tasks);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// UPDATE TASK
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const { userId } = req.body;


        if (!userId) {

            return res.status(400).json({
                message: "User ID required"
            });

        }


        const task = await Task.findOne({
    _id: req.params.id,
    user: userId
});

        if (!task) {

            return res.status(404).json({
                message: "Task not found or unauthorized"
            });

        }


        const {
            title,
            description,
            priority,
            category,
            dueDate,
            completed,
            completedAt
        } = req.body;


        task.title =
            title !== undefined
                ? title
                : task.title;

        task.description =
            description !== undefined
                ? description
                : task.description;

        task.priority =
            priority !== undefined
                ? priority
                : task.priority;

        task.category =
            category !== undefined
                ? category
                : task.category;

        task.dueDate =
            dueDate !== undefined
                ? dueDate
                : task.dueDate;

        task.completed =
            completed !== undefined
                ? completed
                : task.completed;

        task.completedAt =
            completedAt !== undefined
                ? completedAt
                : task.completedAt;


        const updatedTask =
            await task.save();


        res.json(updatedTask);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// DELETE TASK
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const { userId } = req.body;


        if (!userId) {

            return res.status(400).json({
                message: "User ID required"
            });

        }


        const deletedTask =
    await Task.findOneAndDelete({
        _id: req.params.id,
        user: userId
    });


        if (!deletedTask) {

            return res.status(404).json({
                message:
                    "Task not found or unauthorized"
            });

        }


        res.json({

            message:
                "Task deleted successfully"

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


export default router;