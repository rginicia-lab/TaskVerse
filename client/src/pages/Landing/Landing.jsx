import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FiCheckCircle,
    FiZap,
    FiAward,
    FiBarChart2
} from "react-icons/fi";

import "./Landing.css";

function Landing() {

    return (

        <div className="landing-page">

            {/* Background Effects */}

            <div className="gradient-orb orb-one"></div>
            <div className="gradient-orb orb-two"></div>
            <div className="gradient-orb orb-three"></div>


            {/* Hero Content */}

            <motion.div
                className="hero-content"

                initial={{
                    opacity: 0,
                    y: 40
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.8
                }}
            >

                <div className="hero-badge">
                    ✨ Productivity made fun
                </div>


               <h1>
    Manage Your World.
    <br />

    <span>Stay Focused.</span>
    <br />

    Grow Every Day. 🚀
</h1>


<p className="hero-description">

    TaskVerse is a modern{" "}

    <strong>
        gamified productivity platform
    </strong>{" "}

    designed to turn everyday productivity into
    an engaging and rewarding experience.

</p>


<div className="hero-keywords">

    <div className="keyword-row">

        <span>🎮 Gamification</span>
        <i>•</i>

        <span>⚡ Productivity</span>
        <i>•</i>

        <span>🔥 Motivation</span>
        <i>•</i>

        <span>📈 Progress</span>

    </div>


    <div className="keyword-row keyword-center">

        <span>🎯 Consistency</span>
        <i>•</i>

        <span>🏆 Achievement</span>

    </div>

</div>
                {/* Buttons */}

                <div className="hero-buttons">

                    <Link
                        to="/register"
                        className="get-started-btn"
                    >
                        Get Started →
                    </Link>


                    <Link
                        to="/login"
                        className="login-btn"
                    >
                        Login
                    </Link>

                </div>


                {/* Highlights */}

                <div className="hero-highlights">

                    <div>
                        <FiCheckCircle />
                        Track Tasks
                    </div>


                    <div>
                        <FiZap />
                        Earn XP
                    </div>


                    <div>
                        <FiAward />
                        Unlock Badges
                    </div>

                </div>

            </motion.div>


            {/* Feature Card */}

            <motion.div
                className="hero-card"

                initial={{
                    opacity: 0,
                    x: 50
                }}

                animate={{
                    opacity: 1,
                    x: 0
                }}

                transition={{
                    duration: 0.8,
                    delay: 0.2
                }}

                whileHover={{
                    scale: 1.03
                }}
            >

                <div className="hero-card-header">

    <div className="card-icon">
        🚀
    </div>

    <div>

        <h3>
            Welcome to TaskVerse
        </h3>

        <p>
            A smarter way to stay productive
        </p>

    </div>

</div>

                {/* Features */}

                <div className="feature-list">

                    <div className="feature-item">

                        <div className="feature-icon">
                            <FiZap />
                        </div>

                        <div>

                            <strong>
                                XP System
                            </strong>

                            <span>
                                Earn XP by completing tasks
                            </span>

                        </div>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            🔥
                        </div>

                        <div>

                            <strong>
                                Daily Streaks
                            </strong>

                            <span>
                                Stay consistent every day
                            </span>

                        </div>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            <FiAward />
                        </div>

                        <div>

                            <strong>
                                Achievements
                            </strong>

                            <span>
                                Unlock badges and milestones
                            </span>

                        </div>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            <FiBarChart2 />
                        </div>

                        <div>

                            <strong>
                                Analytics
                            </strong>

                            <span>
                                Understand your productivity
                            </span>

                        </div>

                    </div>

                </div>


                {/* Progress */}

                

            </motion.div>


            {/* Bottom Message */}

            <div className="why-taskverse">

                <span>✦</span>

                <p>
                    Turn everyday tasks into achievements.
                </p>

                <span>✦</span>

            </div>

        </div>

    );

}

export default Landing;