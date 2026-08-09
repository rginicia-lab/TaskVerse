import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "./Analytics.css";

function Analytics({ tasks = [] }) {

    const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

    const weeklyData = days.map((day) => {

        const completedCount = tasks.filter((task) => {

            if (!task.completed) {
                return false;
            }

            const date = new Date(
                task.completedAt || task.createdAt
            );

            const taskDay = date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );

            return taskDay === day;

        }).length;

        return {
            day,
            completed: completedCount
        };
    });

    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    const total = tasks.length;

    const pending = total - completed;

    const productivity =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    return (
        <section className="analytics-container">

            <div className="productivity-card">

                <h2>Productivity Score</h2>

                <div className="score">
                    {productivity}%
                </div>

                <p>
                    {productivity >= 70
                        ? "Great progress this week"
                        : "Keep completing tasks"}
                </p>

            </div>


            <div className="analytics-card weekly-card">

                <div className="weekly-header">

                    <div>
                        <h2>Weekly Productivity</h2>

                        <p>
                            Daily completed tasks
                        </p>
                    </div>

                    <span className="weekly-total">
                        {completed} Done
                    </span>

                </div>


                <ResponsiveContainer
                    width="100%"
                    height={280}
                >

                    <BarChart data={weeklyData}>

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="completed"
                            fill="#38bdf8"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>


            <div className="progress-card">

                <h2>Task Completion</h2>

                <div className="progress-item">

                    <span>Completed</span>

                    <strong>{completed}</strong>

                </div>

                <div className="progress-bar">

                    <div
                        className="completed-progress"
                        style={{
                            width: `${productivity}%`
                        }}
                    />

                </div>

                <div className="progress-item">

                    <span>Pending</span>

                    <strong>{pending}</strong>

                </div>

            </div>

        </section>
    );
}

export default Analytics;