import { useEffect, useState } from "react";
import {
    FiUser,
    FiMail,
    FiCheckCircle,
    FiStar,
    FiAward,
    FiTarget
} from "react-icons/fi";

import "./Profile.css";

function Profile() {

    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = JSON.parse(
            localStorage.getItem("user")
        );

        const loggedInUser =
            storedUser?.user || storedUser || {};

        setUser(loggedInUser);

        const fetchTasks = async () => {

            try {
const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/tasks`
);

                const data = await response.json();

                if (response.ok) {
                    setTasks(
                        Array.isArray(data)
                            ? data
                            : []
                    );
                } else {
                    setTasks([]);
                }

            } catch (error) {

                console.log(
                    "Profile Task Error:",
                    error
                );

                setTasks([]);

            } finally {

                setLoading(false);

            }

        };

        fetchTasks();

    }, []);


    // ===============================
    // STATISTICS
    // ===============================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    const xp = completedTasks * 10;

    const level =
        Math.floor(xp / 100) + 1;

    const xpProgress =
        xp % 100;


    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (
            <div className="profile-page">

                <div className="profile-loading">
                    Loading profile...
                </div>

            </div>
        );

    }


    // ===============================
    // PROFILE
    // ===============================

    return (

        <div className="profile-page">

            {/* Profile Header */}

            <div className="profile-header">

                <div className="profile-avatar">
                    <FiUser />
                </div>

                <div className="profile-info">

                    <h1>
                        {user.name || "TaskVerse User"}
                    </h1>

                    <p>
                        <FiMail />
                        {user.email || "No email available"}
                    </p>

                    <span className="profile-level">
                        Level {level}
                    </span>

                </div>

            </div>


            {/* Statistics */}

            <div className="profile-stats">

                <div className="profile-stat-card">

                    <div className="profile-stat-icon">
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

                </div>


                <div className="profile-stat-card">

                    <div className="profile-stat-icon">
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

                </div>


                <div className="profile-stat-card">

                    <div className="profile-stat-icon">
                        <FiStar />
                    </div>

                    <div>
                        <h2>
                            {xp}
                        </h2>

                        <p>
                            XP Earned
                        </p>
                    </div>

                </div>


                <div className="profile-stat-card">

                    <div className="profile-stat-icon">
                        <FiAward />
                    </div>

                    <div>
                        <h2>
                            {pendingTasks}
                        </h2>

                        <p>
                            Pending
                        </p>
                    </div>

                </div>

            </div>


            {/* XP Progress */}

            <div className="profile-card">

                <div className="profile-card-title">

                    <FiStar />

                    <h2>
                        Level {level} Progress
                    </h2>

                </div>

                <div className="profile-xp-bar">

                    <div
                        className="profile-xp-progress"
                        style={{
                            width: `${xpProgress}%`
                        }}
                    />

                </div>

                <p className="xp-text">
                    {xpProgress}/100 XP to next level
                </p>

            </div>


            {/* Achievements */}

            <div className="profile-card">

                <div className="profile-card-title">

                    <FiAward />

                    <h2>
                        Achievements
                    </h2>

                </div>


                {completedTasks === 0 ? (

                    <div className="empty-achievements">

                        <div className="empty-icon">
                            <FiTarget />
                        </div>

                        <h3>
                            Start Your Journey
                        </h3>

                        <p>
                            Complete your first task
                            to unlock your first achievement.
                        </p>

                    </div>

                ) : (

                    <div className="achievement-grid">

                        {completedTasks >= 1 && (

                            <div className="achievement-card">

                                <div className="achievement-icon">
                                    <FiCheckCircle />
                                </div>

                                <div>
                                    <h3>
                                        First Task
                                    </h3>

                                    <p>
                                        Completed your first task.
                                    </p>
                                </div>

                            </div>

                        )}


                        {completedTasks >= 10 && (

                            <div className="achievement-card">

                                <div className="achievement-icon">
                                    <FiAward />
                                </div>

                                <div>
                                    <h3>
                                        Productive
                                    </h3>

                                    <p>
                                        Completed 10 tasks.
                                    </p>
                                </div>

                            </div>

                        )}


                        {xp >= 100 && (

                            <div className="achievement-card">

                                <div className="achievement-icon">
                                    <FiStar />
                                </div>

                                <div>
                                    <h3>
                                        XP Hero
                                    </h3>

                                    <p>
                                        Earned 100 XP.
                                    </p>
                                </div>

                            </div>

                        )}

                    </div>

                )}

            </div>


            {/* No Tasks */}

            {totalTasks === 0 && (

                <div className="profile-empty-message">

                    <FiTarget />

                    <div>

                        <h3>
                            No tasks yet
                        </h3>

                        <p>
                            Create your first task from
                            the Dashboard to start building
                            your productivity journey.
                        </p>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Profile;