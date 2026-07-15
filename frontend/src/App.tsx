import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Feedback from "./components/Feedback";
import Contact from "./components/Contact";
import ChatModal from "./components/ChatModal";
import SnakeModal from "./components/SnakeModal";
import Gear from "./components/Gear";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSnakeOpen, setIsSnakeOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers, setViewers] = useState(1);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const muted = localStorage.getItem("site_muted") === "true";
    setIsMuted(muted);
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("site_muted", String(newMuted));
    if (!newMuted) {
      playClickSound();
    }
  };

  const playClickSound = () => {
    if (isMuted) return;
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  };

  const playHoverSound = () => {
    if (isMuted) return;
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  };

  useEffect(() => {
    const backendUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? ""
        : "https://samp-portfolio.onrender.com";

    const newSocket = io(backendUrl);
    setSocket(newSocket);

    newSocket.on("viewer count update", (count: number) => {
      setViewers(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Attach hover sounds
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest(".glass-card") ||
        target.closest(".theme-switch") ||
        target.closest(".menu-toggle")
      ) {
        playHoverSound();
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest(".glass-card") ||
        target.closest(".theme-switch") ||
        target.closest(".menu-toggle")
      ) {
        playClickSound();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isMuted]);

  // Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="bg-glow"></div>
      <div className="bg-glow-2"></div>

      <div className="floating-icons">
        <i className="fab fa-html5" style={{ "--delay": "0s", "--x": "10vw", "--y": "20vh", "--size": "3rem" } as any}></i>
        <i className="fab fa-css3-alt" style={{ "--delay": "2s", "--x": "80vw", "--y": "15vh", "--size": "4rem" } as any}></i>
        <i className="fab fa-js" style={{ "--delay": "1s", "--x": "85vw", "--y": "70vh", "--size": "2.5rem" } as any}></i>
        <i className="fas fa-brain" style={{ "--delay": "4s", "--x": "15vw", "--y": "80vh", "--size": "3.5rem" } as any}></i>
        <i className="fas fa-robot" style={{ "--delay": "3s", "--x": "50vw", "--y": "50vh", "--size": "2rem" } as any}></i>
        <i className="fas fa-bolt" style={{ "--delay": "5s", "--x": "70vw", "--y": "90vh", "--size": "3rem" } as any}></i>
        <i className="fab fa-github" style={{ "--delay": "1.5s", "--x": "5vw", "--y": "50vh", "--size": "4rem" } as any}></i>
        <i className="fas fa-code" style={{ "--delay": "3.5s", "--x": "40vw", "--y": "10vh", "--size": "2.5rem" } as any}></i>
      </div>

      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenSnake={() => setIsSnakeOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        viewers={viewers}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Feedback />
            <Contact />
          </>
        } />
        <Route path="/gear" element={<Gear />} />
      </Routes>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} socket={socket} />
      <SnakeModal isOpen={isSnakeOpen} onClose={() => setIsSnakeOpen(false)} />

      <footer>
        <p>&copy; {new Date().getFullYear()} Islam Cabugatan. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
