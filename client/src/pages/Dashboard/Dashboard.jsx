import { useEffect, useState, useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import "./Dashboard.css";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatsCard from "../../components/dashboard/StatsCard";
import TaskCard from "../../components/dashboard/TaskCard";
import AddTask from "../../components/dashboard/AddTask";
import Analytics from "../../components/dashboard/Analytics";
import TaskCalendar from "../../components/dashboard/TaskCalendar";
import BadgeSection from "../../components/dashboard/BadgeSection";
import DashboardHero from "../../components/dashboard/DashboardHero";

import {
    requestNotificationPermission,
    showNotification,
} from "../../utils/notifications";


function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [search, setSearch] = useState("");

    const { darkMode } = useContext(ThemeContext);

    const [filter, setFilter] = useState("all");

    const [priorityFilter, setPriorityFilter] = useState("all");

    const [userProgress, setUserProgress] = useState({
        streak: 0,
        badges: [],
    });


    // ========================================
    // GET LOGGED-IN USER
    // ========================================

    const storedUser =
        JSON.parse(localStorage.getItem("user"));

    const userId =
        storedUser?.user?._id;


    // ========================================
    // FETCH USER PROGRESS
    // ========================================

    useEffect(() => {

        /*
         * Your current backend does not have
         * a separate progress endpoint.
         *
         * Keep default progress for now.
         *
         * Your streak/badge calculations are
         * already handled below using tasks.
         */

        setUserProgress({
            streak: 0,
            badges: [],
        });

    }, []);


    // ========================================
    // FETCH USER TASKS
    // ========================================

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                if (!userId) {

                    console.log(
                        "No logged-in user found"
                    );

                    return;

                }


                const response = await fetch(
                    `http://localhost:5000/api/tasks?userId=${userId}`
                );


                const data = await response.json();


                if (!response.ok) {

                    console.log(
                        "Task Fetch Error:",
                        data.message
                    );

                    return;

                }


                setTasks(data);


            } catch (error) {

                console.log(
                    "Task Fetch Error:",
                    error
                );

            }

        };


        fetchTasks();

    }, [userId]);


    // ========================================
    // BROWSER NOTIFICATIONS
    // ========================================

    useEffect(() => {

        requestNotificationPermission();


        const interval =
            setInterval(() => {

                tasks.forEach((task) => {

                    if (
                        task.reminder &&
                        !task.completed
                    ) {

                        const reminderTime =
                            new Date(
                                task.reminder
                            ).getTime();


                        const currentTime =
                            new Date().getTime();


                        if (
                            reminderTime <=
                            currentTime
                        ) {

                            showNotification(
                                "Task Reminder 🔔",
                                task.title
                            );

                        }

                    }

                });

            }, 60000);


        return () =>
            clearInterval(interval);

    }, [tasks]);


    // ========================================
    // STATISTICS
    // ========================================

    const completedTasks =
        tasks.filter(
            (task) => task.completed
        ).length;


    const pendingTasks =
        tasks.filter(
            (task) => !task.completed
        ).length;


    const totalXP =
        tasks
            .filter(
                (task) => task.completed
            )
            .reduce(
                (sum, task) =>
                    sum + (task.xp || 10),
                0
            );


    const level =
        Math.floor(totalXP / 100) + 1;


    const xpProgress =
        totalXP % 100;


    // ========================================
    // ACHIEVEMENT BADGES
    // ========================================

    const badges = [];


    if (completedTasks >= 1) {

        badges.push("🌱 Beginner");

    }


    if (completedTasks >= 10) {

        badges.push("⚡ Productive");

    }


    if (totalXP >= 100) {

        badges.push("💯 XP Hero");

    }


    if (
        (userProgress.streak || 0) >= 7
    ) {

        badges.push("🔥 Streak Master");

    }


    if (completedTasks >= 50) {

        badges.push("👑 Task Legend");

    }


    // ========================================
    // SEARCH + FILTER
    // ========================================

    const filteredTasks =
        tasks.filter((task) => {

            const searchText =
                search
                    .trim()
                    .toLowerCase();


            const title =
                (task.title || "")
                    .toLowerCase();


            const description =
                (task.description || "")
                    .toLowerCase();


            const matchesSearch =
                searchText === "" ||
                title.includes(searchText) ||
                description.includes(searchText);


            const matchesStatus =
                filter === "all" ||
                (
                    filter === "completed" &&
                    task.completed === true
                ) ||
                (
                    filter === "pending" &&
                    task.completed !== true
                );


            const matchesPriority =
                priorityFilter === "all" ||
                task.priority === priorityFilter;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );

        });


    // ========================================
    // DASHBOARD
    // ========================================

    return (

        <div
            className={
                darkMode
                    ? "dashboard-container dark"
                    : "dashboard-container"
            }
        >


            {/* Sidebar */}

            <Sidebar />


            {/* Main Content */}

            <main className="dashboard-content">


                {/* Topbar */}

                <Topbar
                    search={search}
                    setSearch={setSearch}
                />


                {/* Hero Section */}

                <DashboardHero
                    user={storedUser}
                    level={level}
                    totalXP={totalXP}
                    streak={
                        userProgress.streak || 0
                    }
                />


                {/* Add Task */}

                <section className="dashboard-section">

                    <AddTask
                        setTasks={setTasks}
                    />

                </section>


                {/* Search + Filters */}

                <section className="task-controls">


                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="🔍 Search your tasks..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="filters">


                        <button
                            className={
                                filter === "all"
                                    ? "active-filter"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >
                            All
                        </button>


                        <button
                            className={
                                filter === "completed"
                                    ? "active-filter"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("completed")
                            }
                        >
                            Completed ✅
                        </button>


                        <button
                            className={
                                filter === "pending"
                                    ? "active-filter"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("pending")
                            }
                        >
                            Pending ⏳
                        </button>


                        <select
                            value={priorityFilter}
                            onChange={(e) =>
                                setPriorityFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="all">
                                All Priority
                            </option>

                            <option value="High">
                                🔥 High
                            </option>

                            <option value="Medium">
                                ⚡ Medium
                            </option>

                            <option value="Low">
                                🌱 Low
                            </option>

                        </select>


                    </div>


                </section>


                {/* Statistics */}

                <section className="dashboard-section">


                    <div className="stats-grid">


                        <StatsCard
                            title="Total Tasks"
                            value={tasks.length}
                            icon="📋"
                        />


                        <StatsCard
                            title="Completed"
                            value={completedTasks}
                            icon="✅"
                        />


                        <StatsCard
                            title="Pending"
                            value={pendingTasks}
                            icon="⏳"
                        />


                        <StatsCard
                            title="XP Earned"
                            value={totalXP}
                            icon="⭐"
                        />


                        <StatsCard
                            title="Level"
                            value={`Level ${level}`}
                            icon="🏆"
                        />


                        <StatsCard
                            title="Streak"
                            value={`${userProgress.streak || 0} Days`}
                            icon="🔥"
                        />


                    </div>


                </section>


                {/* XP Progress */}

                <section className="xp-container">


                    <h3>
                        ⭐ Level {level} Progress
                    </h3>


                    <div className="xp-bar">


                        <div
                            className="xp-progress"
                            style={{
                                width:
                                    `${xpProgress}%`
                            }}
                        />


                    </div>


                    <p>
                        {xpProgress}/100 XP to next level
                    </p>


                </section>


                {/* Analytics + Calendar */}

                <div className="dashboard-widgets">


                    <Analytics
                        tasks={tasks}
                    />


                    <TaskCalendar
                        tasks={tasks}
                    />


                </div>


                {/* Badges */}

                <BadgeSection
                    tasks={tasks}
                />


                {/* Tasks */}

                <section className="tasks-section">


                    <h2>
                        🚀 Your Tasks
                    </h2>


                    <div className="task-grid">


                        {
                            filteredTasks.length === 0 ? (

                                <p>
                                    No tasks found 🎯
                                </p>

                            ) : (

                                filteredTasks.map(
                                    (task) => (

                                        <TaskCard
                                            key={task._id}
                                            task={task}
                                            setTasks={setTasks}
                                        />

                                    )
                                )

                            )
                        }


                    </div>


                </section>


            </main>


        </div>

    );

}


export default Dashboard;