import { useState } from "react";
import { motion } from "framer-motion";
import "./TaskCard.css";

function TaskCard({ task, setTasks }) {

    const [isEditing, setIsEditing] = useState(false);

    // ===============================
    // LOGGED-IN USER
    // ===============================

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    const userId = storedUser?.user?._id;


    // ===============================
    // EDIT TASK STATE
    // ===============================

    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate,
        userId: task.userId
    });


    // ===============================
    // TASK STATUS
    // ===============================

    const getTaskStatus = () => {

        if (task.completed) {
            return "Completed ✅";
        }

        if (task.dueDate) {

            const today = new Date();
            const due = new Date(task.dueDate);

            today.setHours(0, 0, 0, 0);
            due.setHours(0, 0, 0, 0);

            if (due < today) {
                return "Overdue 🔥";
            }

            if (due.getTime() === today.getTime()) {
                return "Due Today 🟡";
            }
        }

        return "Pending ⏳";
    };


    // ===============================
    // COMPLETE TASK
    // ===============================

    const completeTask = async () => {

        try {

            if (!userId) {

                alert(
                    "User not found. Please login again."
                );

                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userId: userId,
                        completed: true,
                        completedAt: new Date()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to complete task."
                );

                return;
            }

            setTasks((prev) =>
                prev.map((item) =>
                    item._id === data._id
                        ? data
                        : item
                )
            );

        } catch (error) {

            console.log(
                "Complete Task Error:",
                error
            );

        }

    };


    // ===============================
    // DELETE TASK
    // ===============================

    const deleteTask = async () => {

        try {

            if (!userId) {

                alert(
                    "User not found. Please login again."
                );

                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userId: userId
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to delete task."
                );

                return;
            }

            setTasks((prev) =>
                prev.filter(
                    (item) =>
                        item._id !== task._id
                )
            );

        } catch (error) {

            console.log(
                "Delete Task Error:",
                error
            );

            alert(
                "Unable to connect to server."
            );

        }

    };


    // ===============================
    // EDIT TASK
    // ===============================

    const editTask = async () => {

        try {

            if (!userId) {

                alert(
                    "User not found. Please login again."
                );

                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        userId: userId,

                        title: updatedTask.title,

                        description:
                            updatedTask.description,

                        priority:
                            updatedTask.priority,

                        category:
                            updatedTask.category,

                        dueDate:
                            updatedTask.dueDate

                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to update task."
                );

                return;
            }

            setTasks((prev) =>
                prev.map((item) =>
                    item._id === data._id
                        ? data
                        : item
                )
            );

            setIsEditing(false);

        } catch (error) {

            console.log(
                "Edit Task Error:",
                error
            );

        }

    };


    // ===============================
    // UI
    // ===============================

    return (

        <motion.div

            className={
                task.completed
                    ? "task-card completed"
                    : "task-card"
            }

            initial={{
                opacity: 0,
                x: -30
            }}

            animate={{
                opacity: 1,
                x: 0
            }}

            whileHover={{
                scale: 1.03
            }}

        >

            {isEditing ? (

                <>

                    <input
                        value={updatedTask.title}
                        onChange={(e) =>
                            setUpdatedTask({
                                ...updatedTask,
                                title: e.target.value
                            })
                        }
                    />

                    <textarea
                        value={updatedTask.description}
                        onChange={(e) =>
                            setUpdatedTask({
                                ...updatedTask,
                                description:
                                    e.target.value
                            })
                        }
                    />

                    <select
                        value={updatedTask.priority}
                        onChange={(e) =>
                            setUpdatedTask({
                                ...updatedTask,
                                priority:
                                    e.target.value
                            })
                        }
                    >

                        <option value="High">
                            🔴 High
                        </option>

                        <option value="Medium">
                            🟡 Medium
                        </option>

                        <option value="Low">
                            🟢 Low
                        </option>

                    </select>


                    {/* SAVE BUTTON */}

                    <button
                        className="save-btn"
                        onClick={editTask}
                    >
                        💾 Save
                    </button>

                </>

            ) : (

                <>

                    <h3>
                        {task.title}
                    </h3>

                    <p>
                        {task.description}
                    </p>

                    <span
                        className={`priority ${task.priority}`}
                    >
                        {task.priority}
                    </span>

                    <p>
                        ⭐ XP Reward:{" "}
                        {task.xp || 10}
                    </p>

                    <p>
                        📌 Status:{" "}
                        {getTaskStatus()}
                    </p>


                    <div className="task-buttons">

                        <button
                            onClick={completeTask}
                            disabled={task.completed}
                        >
                            {
                                task.completed
                                    ? "Completed ✅"
                                    : "Complete"
                            }
                        </button>


                        <button
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            ✏️ Edit
                        </button>


                        <button
                            onClick={deleteTask}
                            className="delete-btn"
                        >
                            🗑 Delete
                        </button>

                    </div>

                </>

            )}

        </motion.div>

    );
}

export default TaskCard;