import { useState } from "react";
import "./AddTask.css";

function AddTask({ setTasks }) {

    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "Medium",
        category: "Personal",
        reminder: "",
        dueDate: ""
    });


    // ===============================
    // HANDLE INPUT CHANGES
    // ===============================

    const handleChange = (e) => {

        setTask({
            ...task,
            [e.target.name]: e.target.value
        });

    };


    // ===============================
    // CREATE TASK
    // ===============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Get logged-in user

            const storedUser =
                JSON.parse(
                    localStorage.getItem("user")
                );

            const userId =
                storedUser?.user?._id;


            // Make sure user is logged in

            if (!userId) {

                alert(
                    "Please login before creating a task."
                );

                return;
            }


            // Send task + userId

            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        ...task,
                        userId
                    })
                }
            );


            const newTask =
                await response.json();


            // Check response

            if (!response.ok) {

                console.log(
                    "Task creation error:",
                    newTask.message
                );

                alert(
                    newTask.message ||
                    "Unable to create task."
                );

                return;
            }


            // Add task to dashboard

            setTasks((prevTasks) => [
                ...prevTasks,
                newTask
            ]);


            // Reset form

            setTask({
                title: "",
                description: "",
                priority: "Medium",
                category: "Personal",
                reminder: "",
                dueDate: ""
            });


        } catch (error) {

            console.log(
                "Add Task Error:",
                error
            );

            alert(
                "Unable to connect to server."
            );

        }

    };


    // ===============================
    // UI
    // ===============================

    return (

        <div className="add-task-container">

            <h2>
                ✨ Create New Task
            </h2>


            <form
                onSubmit={handleSubmit}
                className="task-form"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="📝 Enter task title..."
                    value={task.title}
                    onChange={handleChange}
                    required
                />


                <textarea
                    name="description"
                    placeholder="📖 Describe your task..."
                    value={task.description}
                    onChange={handleChange}
                    rows="4"
                />


                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                >

                    <option value="High">
                        🔴 High Priority
                    </option>

                    <option value="Medium">
                        🟡 Medium Priority
                    </option>

                    <option value="Low">
                        🟢 Low Priority
                    </option>

                </select>


                <label>
                    📅 Due Date
                </label>

                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                />


                <label>
                    ⏰ Set Reminder
                </label>

                <input
                    type="datetime-local"
                    name="reminder"
                    value={task.reminder}
                    onChange={handleChange}
                />


                <button type="submit">
                    ➕ Add Task
                </button>

            </form>

        </div>

    );

}

export default AddTask;