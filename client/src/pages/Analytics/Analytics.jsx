import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
    FiTarget,
    FiCheckCircle,
    FiClock,
    FiTrendingUp,
    FiAward,
    FiCalendar
} from "react-icons/fi";

import "./Analytics.css";


function Analytics() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);


    /* =================================
       FETCH CURRENT USER TASKS
    ================================= */

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const storedUser =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                const userId =
                    storedUser?.user?._id;


                if (!userId) {

                    console.log(
                        "No logged-in user found."
                    );

                    setTasks([]);

                    return;
                }


                const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/tasks?userId=${userId}`
);


                const data =
                    await response.json();


                if (!response.ok) {

                    console.log(
                        data.message ||
                        "Unable to fetch analytics."
                    );

                    setTasks([]);

                    return;
                }


                setTasks(
                    Array.isArray(data)
                        ? data
                        : []
                );


            } catch (error) {

                console.log(
                    "Analytics Error:",
                    error
                );

                setTasks([]);

            } finally {

                setLoading(false);

            }

        };


        fetchTasks();

    }, []);


    /* =================================
       BASIC STATISTICS
    ================================= */

    const totalTasks = tasks.length;


    const completedTasks =
        tasks.filter(
            task => task.completed
        ).length;


    const pendingTasks =
        tasks.filter(
            task => !task.completed
        ).length;


    const successRate =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );


    /* =================================
       XP
    ================================= */

    const totalXP =
        tasks
            .filter(
                task => task.completed
            )
            .reduce(
                (sum, task) =>
                    sum + (task.xp || 10),
                0
            );


    /* =================================
       PRIORITY PROGRESS
    ================================= */

    const priorities = [

        {
            name: "High Priority",
            value: "High"
        },

        {
            name: "Medium Priority",
            value: "Medium"
        },

        {
            name: "Low Priority",
            value: "Low"
        }

    ];


    const progress =
        priorities.map(priority => {

            const priorityTasks =
                tasks.filter(
                    task =>
                        task.priority ===
                        priority.value
                );


            const completed =
                priorityTasks.filter(
                    task =>
                        task.completed
                ).length;


            const percent =
                priorityTasks.length === 0
                    ? 0
                    : Math.round(
                        (
                            completed /
                            priorityTasks.length
                        ) * 100
                    );


            return {
                name: priority.name,
                percent
            };

        });


    /* =================================
       WEEKLY OVERVIEW
    ================================= */

    const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];


    const weeklyData =
        days.map(day => {

            const completed =
                tasks.filter(task => {

                    if (!task.completed) {
                        return false;
                    }


                    if (!task.createdAt) {
                        return false;
                    }


                    const date =
                        new Date(
                            task.createdAt
                        );


                    const taskDay =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "short"
                            }
                        );


                    return taskDay === day;

                }).length;


            return {
                day,
                completed
            };

        });


    /* =================================
       ACHIEVEMENTS
    ================================= */

    const achievements = [];


    if (completedTasks >= 1) {

        achievements.push({

            title: "First Task 🌱",

            description:
                "You completed your first task."

        });

    }


    if (completedTasks >= 5) {

        achievements.push({

            title: "Productive ⚡",

            description:
                "You have completed 5 tasks."

        });

    }


    if (completedTasks >= 10) {

        achievements.push({

            title: "Task Champion 🏆",

            description:
                "You have completed 10 tasks."

        });

    }


    if (totalXP >= 100) {

        achievements.push({

            title: "XP Hero ⭐",

            description:
                `You have earned ${totalXP} XP.`

        });

    }


    if (successRate >= 80) {

        achievements.push({

            title: "Consistency Master 🔥",

            description:
                "Your task completion rate is above 80%."

        });

    }


    /* =================================
       LOADING
    ================================= */

    if (loading) {

        return (

            <div className="analytics-page">

                <div className="analytics-header">

                    <h1>
                        Analytics
                    </h1>

                    <p>
                        Loading your
                        productivity data...
                    </p>

                </div>

            </div>

        );

    }


    /* =================================
       NO TASKS
    ================================= */

    if (tasks.length === 0) {

        return (

            <div className="analytics-page">

                <div className="analytics-header">

                    <h1>
                        Analytics
                    </h1>

                    <p>
                        Track your TaskVerse
                        productivity and progress.
                    </p>

                </div>


                <motion.div
                    className="analytics-empty"

                    initial={{
                        opacity: 0,
                        y: 20
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                >

                    <div className="empty-icon">
                        📋
                    </div>


                    <h2>
                        No Tasks Defined Yet
                    </h2>


                    <p>
                        Your analytics will appear
                        here once you create some tasks.
                    </p>


                    <span>
                        🚀 Create your first task
                        to start tracking your
                        productivity!
                    </span>

                </motion.div>

            </div>

        );

    }


    /* =================================
       MAIN ANALYTICS
    ================================= */

    return (

        <div className="analytics-page">


            {/* HEADER */}

            <div className="analytics-header">

                <h1>
                    Analytics
                </h1>

                <p>
                    Track your TaskVerse
                    productivity and progress.
                </p>

            </div>


            {/* STAT CARDS */}

            <div className="analytics-stats">


                <motion.div
                    className="analytics-stat-card"

                    whileHover={{
                        scale: 1.04
                    }}
                >

                    <div className="stat-icon">
                        <FiTarget />
                    </div>

                    <div>

                        <h2>
                            {totalTasks}
                        </h2>

                        <p>
                            Total Tasks
                        </p>

                    </div>

                </motion.div>


                <motion.div
                    className="analytics-stat-card"

                    whileHover={{
                        scale: 1.04
                    }}
                >

                    <div className="stat-icon">
                        <FiCheckCircle />
                    </div>

                    <div>

                        <h2>
                            {completedTasks}
                        </h2>

                        <p>
                            Completed
                        </p>

                    </div>

                </motion.div>


                <motion.div
                    className="analytics-stat-card"

                    whileHover={{
                        scale: 1.04
                    }}
                >

                    <div className="stat-icon">
                        <FiClock />
                    </div>

                    <div>

                        <h2>
                            {pendingTasks}
                        </h2>

                        <p>
                            Pending
                        </p>

                    </div>

                </motion.div>


                <motion.div
                    className="analytics-stat-card"

                    whileHover={{
                        scale: 1.04
                    }}
                >

                    <div className="stat-icon">
                        <FiTrendingUp />
                    </div>

                    <div>

                        <h2>
                            {successRate}%
                        </h2>

                        <p>
                            Success Rate
                        </p>

                    </div>

                </motion.div>

            </div>


            {/* MAIN CONTENT */}

            <div className="analytics-main">


                {/* TASK PROGRESS */}

                <div className="progress-card">

                    <div className="card-title">

                        <FiTrendingUp />

                        <h2>
                            Task Progress
                        </h2>

                    </div>


                    {progress.map(
                        (item, index) => (

                            <motion.div
                                className="progress-item"
                                key={index}

                                initial={{
                                    opacity: 0,
                                    x: -20
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                            >

                                <div className="progress-info">

                                    <span>
                                        {item.name}
                                    </span>

                                    <span>
                                        {item.percent}%
                                    </span>

                                </div>


                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"

                                        style={{
                                            width:
                                                `${item.percent}%`
                                        }}
                                    />

                                </div>

                            </motion.div>

                        )
                    )}

                </div>


                {/* ACHIEVEMENTS */}

                <div className="achievement-card">

                    <div className="card-title">

                        <FiAward />

                        <h2>
                            Achievements
                        </h2>

                    </div>


                    {achievements.map(
                        (item, index) => (

                            <motion.div
                                className="achievement-box"
                                key={index}

                                whileHover={{
                                    y: -3
                                }}
                            >

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>

                            </motion.div>

                        )
                    )}

                </div>

            </div>


            {/* WEEKLY OVERVIEW */}

            <div className="weekly-card">

                <div className="card-title">

                    <FiCalendar />

                    <h2>
                        Weekly Overview
                    </h2>

                </div>


                <div className="week-grid">

                    {weeklyData.map(
                        (item, index) => (

                            <motion.div
                                key={index}

                                whileHover={{
                                    y: -4
                                }}
                            >

                                <h3>
                                    {item.day}
                                </h3>

                                <span>
                                    {item.completed} completed
                                </span>

                            </motion.div>

                        )
                    )}

                </div>

            </div>


        </div>

    );

}


export default Analytics;