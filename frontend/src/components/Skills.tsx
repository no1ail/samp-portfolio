export default function Skills() {
  return (
    <section id="skills" className="section fade-in visible">
      <h2>Skills</h2>

      <div className="skills-category">
        <h3
          style={{
            marginBottom: "1.5rem",
            color: "var(--color-brand)",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <i className="fas fa-code"></i> Web Development
        </h3>
        <div className="skills-grid">
          <div className="glass-card skill-item">
            <i className="fab fa-html5"></i>
            <h3>HTML5</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-css3-alt"></i>
            <h3>CSS3</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-js"></i>
            <h3>JavaScript</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-react"></i>
            <h3>React</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-php"></i>
            <h3>PHP</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fas fa-database"></i>
            <h3>MySQL</h3>
          </div>
        </div>
      </div>

      <div className="skills-category" style={{ marginTop: "3rem" }}>
        <h3
          style={{
            marginBottom: "1.5rem",
            color: "var(--color-brand)",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <i className="fas fa-robot"></i> AI Tools
        </h3>
        <div className="skills-grid">
          <div className="glass-card skill-item">
            <i className="fas fa-brain"></i>
            <h3>ChatGPT</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fas fa-robot"></i>
            <h3>Gemini</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fas fa-bolt"></i>
            <h3>Claude</h3>
          </div>
        </div>
      </div>

      <div className="skills-category" style={{ marginTop: "3rem" }}>
        <h3
          style={{
            marginBottom: "1.5rem",
            color: "var(--color-brand)",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <i className="fas fa-briefcase"></i> Productivity & Management
        </h3>
        <div className="skills-grid">
          <div className="glass-card skill-item">
            <i className="fab fa-microsoft"></i>
            <h3>Microsoft Office</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-google"></i>
            <h3>Google Workspace</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-hubspot"></i>
            <h3>HubSpot</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-jira"></i>
            <h3>Jira</h3>
          </div>
          <div className="glass-card skill-item">
            <i className="fab fa-intercom"></i>
            <h3>Intercom</h3>
          </div>
        </div>
      </div>

      <div className="skills-category" style={{ marginTop: "3rem" }}>
        <h3
          style={{
            marginBottom: "1.5rem",
            color: "var(--color-brand)",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <i className="fas fa-palette"></i> Design & Media
        </h3>
        <div className="skills-grid">
          <div className="glass-card skill-item">
            <i className="fas fa-cube"></i>
            <h3>Blender3D</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
