import React from "react";

const webDevSkills = [
  { icon: "fab fa-html5", name: "HTML5", color: "#E34F26" },
  { icon: "fab fa-css3-alt", name: "CSS3", color: "#1572B6" },
  { icon: "fab fa-js", name: "JavaScript", color: "#F7DF1E" },
  { icon: "fab fa-react", name: "React", color: "#61DAFB" },
  { icon: "fab fa-php", name: "PHP", color: "#777BB4" },
  { icon: "fas fa-database", name: "MySQL", color: "#4479A1" },
];

const aiSkills = [
  { icon: "fas fa-brain", name: "ChatGPT", color: "#10A37F" },
  { icon: "fas fa-robot", name: "Gemini", color: "#8E75B2" },
  { icon: "fas fa-bolt", name: "Claude", color: "#D97757" },
];

const productivitySkills = [
  { icon: "fab fa-microsoft", name: "Microsoft Office", color: "#D83B01" },
  { icon: "fab fa-google", name: "Google Workspace", color: "#4285F4" },
  { icon: "fab fa-hubspot", name: "HubSpot", color: "#FF7A59" },
  { icon: "fab fa-jira", name: "Jira", color: "#0052CC" },
  { icon: "fab fa-intercom", name: "Intercom", color: "#1A8B9D" },
];

const designSkills = [
  { icon: "fas fa-cube", name: "Blender3D", color: "#EA7600" },
];

const MarqueeRow = ({ items, speed = 20 }: { items: any[], speed?: number }) => {
  const repeatCount = Math.max(2, Math.ceil(12 / items.length));
  const repeatedItems = Array(repeatCount).fill(items).flat();

  return (
    <div className="skills-marquee-container">
      <div className="skills-marquee-content" style={{ animationDuration: `${speed}s` }}>
        {repeatedItems.map((skill, index) => (
          <div className="glass-card skill-item" key={`a-${index}`}>
            <i className={skill.icon} style={{ color: skill.color }}></i>
            <h3>{skill.name}</h3>
          </div>
        ))}
      </div>
      <div className="skills-marquee-content" style={{ animationDuration: `${speed}s` }} aria-hidden="true">
        {repeatedItems.map((skill, index) => (
          <div className="glass-card skill-item" key={`b-${index}`}>
            <i className={skill.icon} style={{ color: skill.color }}></i>
            <h3>{skill.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

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
        <MarqueeRow items={webDevSkills} speed={25} />
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
        <MarqueeRow items={aiSkills} speed={20} />
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
        <MarqueeRow items={productivitySkills} speed={22} />
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
        <MarqueeRow items={designSkills} speed={15} />
      </div>
    </section>
  );
}
