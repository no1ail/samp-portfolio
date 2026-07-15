

const allSkills = [
  { icon: "fab fa-html5", name: "HTML5", color: "#E34F26" },
  { icon: "fab fa-css3-alt", name: "CSS3", color: "#1572B6" },
  { icon: "fab fa-js", name: "JavaScript", color: "#F7DF1E" },
  { icon: "fab fa-react", name: "React", color: "#61DAFB" },
  { icon: "fab fa-php", name: "PHP", color: "#777BB4" },
  { icon: "fas fa-database", name: "MySQL", color: "#4479A1" },
  { icon: "fas fa-brain", name: "ChatGPT", color: "#10A37F" },
  { icon: "fas fa-robot", name: "Gemini", color: "#8E75B2" },
  { icon: "fas fa-bolt", name: "Claude", color: "#D97757" },
  { icon: "fab fa-microsoft", name: "Microsoft Office", color: "#D83B01" },
  { icon: "fab fa-google", name: "Google Workspace", color: "#4285F4" },
  { icon: "fab fa-hubspot", name: "HubSpot", color: "#FF7A59" },
  { icon: "fab fa-jira", name: "Jira", color: "#0052CC" },
  { icon: "fab fa-intercom", name: "Intercom", color: "#1A8B9D" },
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
      <MarqueeRow items={allSkills} speed={40} />
    </section>
  );
}
