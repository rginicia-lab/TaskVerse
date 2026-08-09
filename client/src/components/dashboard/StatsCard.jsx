import "./StatsCard.css";
import { motion } from "framer-motion";

function StatsCard({ title, value, icon, detail }) {

    return (
        <motion.div
            className="stats-card"

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.5
            }}

            whileHover={{
                y: -8
            }}
        >

            <div className="stats-icon">
                {icon}
            </div>

            <div className="stats-info">

                <div className="stats-title">
                    {title}
                </div>

                <div className="stats-value">
                    {value}
                </div>

                {detail && (
                    <div className="stats-detail">
                        {detail}
                    </div>
                )}

            </div>

        </motion.div>
    );
}

export default StatsCard;