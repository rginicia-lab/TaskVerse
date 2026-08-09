import "./DashboardPreview.css";

function DashboardPreview() {
  return (
    <section className="preview">

      <div className="dashboard-card">

        <div className="top-bar">
          <h2>Dashboard</h2>
          <button>+ New Task</button>
        </div>

        <div className="stats">

          <div className="stat-box">
            <h3>24</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-box">
            <h3>18</h3>
            <p>Completed</p>
          </div>

          <div className="stat-box">
            <h3>6</h3>
            <p>Pending</p>
          </div>

        </div>

        <div className="task-list">

          <div className="task">
            <span>✔ Complete UI Design</span>
          </div>

          <div className="task">
            <span>⏳ Connect Backend API</span>
          </div>

          <div className="task">
            <span>🔥 Deploy Project</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPreview;