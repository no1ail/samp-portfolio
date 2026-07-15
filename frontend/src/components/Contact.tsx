export default function Contact() {
  return (
    <section id="contact" className="section fade-in visible">
      <h2 style={{ textAlign: "center" }}>Let's Connect</h2>
      <div className="glass-card" style={{ margin: "0 auto", maxWidth: "800px", textAlign: "center" }}>
        <p style={{ marginBottom: "2rem" }}>
          I'm currently looking for new opportunities in front-end development, general administration, and lead generation. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div className="contact-content">
          <a href="mailto:sadassds65@gmail.com" className="contact-item" style={{ textDecoration: "none" }}>
            <i className="fas fa-envelope"></i>
            sadassds65@gmail.com
          </a>
          <a href="tel:+639428563134" className="contact-item" style={{ textDecoration: "none" }}>
            <i className="fas fa-phone-alt"></i>
            +639428563134
          </a>
          <p className="contact-item" style={{ justifyContent: "center" }}>
            <i className="fas fa-map-marker-alt"></i>
            Mandaluyong City
          </p>
          <a
            href="https://github.com/no1ail"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-github"></i>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/islam-cabugatan-b11462229/"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/islam.cabugatan/"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-facebook"></i>
            Facebook
          </a>
          <a
            href="https://www.instagram.com/cbgtn_/"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-instagram"></i>
            Instagram
          </a>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <a
            href="https://calendly.com/sadassds65/30min"
            target="_blank"
            rel="noreferrer"
            className="btn btn-booking"
          >
            <i className="fas fa-calendar-alt"></i> Book a Meeting
          </a>
        </div>
      </div>
    </section>
  );
}
