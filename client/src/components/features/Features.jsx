import "./Features.css";

function Features() {
  return (
<section id="features" className="features">
      <h2>Why Choose TaskVerse?</h2>

      <div className="feature-grid">

        <div className="card">
          <h3>📋 Task Management</h3>
          <p>Create, edit and organize tasks effortlessly.</p>
        </div>

        <div className="card">
          <h3>📈 Analytics</h3>
          <p>Track your productivity with beautiful charts.</p>
        </div>

        <div className="card">
          <h3>🔒 Secure Login</h3>
          <p>Your data is protected with authentication.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;