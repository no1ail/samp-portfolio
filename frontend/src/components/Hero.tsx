import { useEffect, useState } from "react";

export default function Hero() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    const fullText1 = "Hi, I'm ";
    const fullText2 = "Islam Cabugatan";
    
    let charIndex1 = 0;
    let charIndex2 = 0;
    let isDeleting = false;
    let timer: number;
    
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    const typeWriter = () => {
      if (!isDeleting) {
        if (charIndex1 < fullText1.length) {
          charIndex1++;
          setText1(fullText1.substring(0, charIndex1));
          timer = window.setTimeout(typeWriter, typingSpeed);
        } else if (charIndex2 < fullText2.length) {
          charIndex2++;
          setText2(fullText2.substring(0, charIndex2));
          timer = window.setTimeout(typeWriter, typingSpeed);
        } else {
          isDeleting = true;
          timer = window.setTimeout(typeWriter, pauseBeforeDelete);
        }
      } else {
        if (charIndex2 > 0) {
          charIndex2--;
          setText2(fullText2.substring(0, charIndex2));
          timer = window.setTimeout(typeWriter, deletingSpeed);
        } else if (charIndex1 > 0) {
          charIndex1--;
          setText1(fullText1.substring(0, charIndex1));
          timer = window.setTimeout(typeWriter, deletingSpeed);
        } else {
          isDeleting = false;
          timer = window.setTimeout(typeWriter, pauseBeforeType);
        }
      }
    };

    timer = window.setTimeout(typeWriter, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section id="home" className="hero section fade-in visible">
      <div
        className="hero-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "0 1 auto", maxWidth: "600px", minWidth: "300px" }}>
          <h1 style={{ minHeight: "2.4em" }}>
            <span>{text1}</span>
            <br />
            <span className="text-gradient">{text2}</span>
            <span className="cursor"></span>
          </h1>
          <p>
            I am a BS Information Technology student passionate about front-end development, user experience, general administrative support, and lead generation.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#contact" className="btn">
              Get In Touch
            </a>
            <a
              href="https://calendly.com/sadassds65/30min"
              target="_blank"
              rel="noreferrer"
              className="btn btn-booking"
            >
              <i className="fas fa-calendar-alt"></i> Book a Meeting
            </a>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", fontSize: "1.8rem" }}>
            <a
              href="https://github.com/no1ail"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--color-text-secondary)", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-brand)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/islam-cabugatan-b11462229/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--color-text-secondary)", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-brand)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="hero-profile-container" style={{ display: "flex", justifyContent: "center" }}>
          <img src="/profile.jpg" alt="Islam Cabugatan" className="hero-profile-img" />
        </div>
      </div>
    </section>
  );
}
