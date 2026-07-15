import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenSnake: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  viewers: number;
}

export default function Navbar({ onOpenChat, onOpenSnake, isMuted, onToggleMute, viewers }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setIsDark(currentTheme === "dark");
      if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="logo"><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>IC.</Link></div>
      <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        <li>
          <a href="/#about" onClick={closeMobileMenu}>
            <i className="far fa-user"></i> About
          </a>
        </li>
        <li>
          <a href="/#skills" onClick={closeMobileMenu}>
            <i className="fas fa-code"></i> Skills
          </a>
        </li>
        <li>
          <a href="/#experience" onClick={closeMobileMenu}>
            <i className="fas fa-briefcase"></i> Experience
          </a>
        </li>
        <li>
          <a href="/#projects" onClick={closeMobileMenu}>
            <i className="fas fa-folder-open"></i> Projects
          </a>
        </li>
        <li>
          <Link to="/gear" onClick={closeMobileMenu}>
            <i className="fas fa-laptop"></i> Gear
          </Link>
        </li>
        <li>
          <a href="/#feedback" onClick={closeMobileMenu}>
            <i className="far fa-comment"></i> Feedback
          </a>
        </li>
        <li>
          <a href="/#contact" onClick={closeMobileMenu}>
            <i className="far fa-envelope"></i> Contact
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        <button
          className="mute-btn"
          aria-label={isMuted ? "Unmute Sounds" : "Mute Sounds"}
          onClick={onToggleMute}
        >
          <i className={`fas ${isMuted ? "fa-volume-mute" : "fa-volume-up"}`}></i>
        </button>
        <label className="theme-switch" aria-label="Toggle Theme">
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <div className="slider round">
            <i className="fas fa-moon moon-icon"></i>
            <i className="fas fa-sun sun-icon"></i>
          </div>
        </label>

        <div className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="menu-widget">
        <div className="viewer-count">
          <div className="avatars">
            <img src="https://i.pravatar.cc/30?u=1" alt="avatar" />
            <img src="https://i.pravatar.cc/30?u=2" alt="avatar" />
            <img src="https://i.pravatar.cc/30?u=3" alt="avatar" />
            <div className="avatar-more">+<span>{viewers > 3 ? viewers - 3 : 0}</span></div>
          </div>
          <div className="viewing-text">
            <b>
              <span>{viewers}</span>
            </b>{" "}
            people viewing now
          </div>
        </div>

        <button className="widget-btn" onClick={onOpenChat}>
          <i className="far fa-comment-dots"></i> community chat
        </button>
        <button className="widget-btn" onClick={onOpenSnake}>
          <i className="fas fa-gamepad"></i> quick snake
        </button>
      </div>
    </nav>
  );
}
