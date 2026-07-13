document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Controller ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Mute state management
    let isMuted = localStorage.getItem('site_muted') === 'true';
    
    const muteToggleBtn = document.getElementById('mute-toggle');
    const muteIcon = document.getElementById('mute-icon');
    
    function updateMuteIcon() {
        if (!muteIcon) return;
        if (isMuted) {
            muteIcon.classList.remove('fa-volume-up');
            muteIcon.classList.add('fa-volume-mute');
            muteToggleBtn.setAttribute('aria-label', 'Unmute Sounds');
        } else {
            muteIcon.classList.remove('fa-volume-mute');
            muteIcon.classList.add('fa-volume-up');
            muteToggleBtn.setAttribute('aria-label', 'Mute Sounds');
        }
    }
    
    if (muteToggleBtn) {
        updateMuteIcon();
        muteToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isMuted = !isMuted;
            localStorage.setItem('site_muted', isMuted);
            updateMuteIcon();
            
            // Play a sound to confirm unmute
            if (!isMuted) {
                if (audioCtx.state === 'suspended') audioCtx.resume();
                playClickSound();
            }
        });
    }

    function playHoverSound() {
        if (isMuted) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    function playClickSound() {
        if (isMuted) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }

    // Attach to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .theme-switch, .menu-toggle');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', playHoverSound);
        el.addEventListener('mousedown', playClickSound);
    });
    // --- End Audio Controller ---

    // Theme Toggle Logic
    const themeCheckbox = document.getElementById('theme-checkbox');
    
    // Set default theme to dark if not set, since user requested dark mode recently
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if(themeCheckbox) themeCheckbox.checked = true;
        } else {
            document.documentElement.removeAttribute('data-theme');
            if(themeCheckbox) themeCheckbox.checked = false;
        }
    } else {
        // Default to dark mode based on recent preference
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if(themeCheckbox) themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Typewriter Animation
    const text1 = "Hi, I'm ";
    const text2 = "Islam Cabugatan";
    const el1 = document.getElementById('typewriter-text-1');
    const el2 = document.getElementById('typewriter-text-2');
    
    if (el1 && el2) {
        let charIndex1 = 0;
        let charIndex2 = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pauseBeforeDelete = 2000;
        let pauseBeforeType = 500;

        function typeWriter() {
            if (!isDeleting) {
                // Typing
                if (charIndex1 < text1.length) {
                    charIndex1++;
                    el1.textContent = text1.substring(0, charIndex1);
                    setTimeout(typeWriter, typingSpeed);
                } else if (charIndex2 < text2.length) {
                    charIndex2++;
                    el2.textContent = text2.substring(0, charIndex2);
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Finished typing both, pause before deleting
                    isDeleting = true;
                    setTimeout(typeWriter, pauseBeforeDelete);
                }
            } else {
                // Deleting
                if (charIndex2 > 0) {
                    charIndex2--;
                    el2.textContent = text2.substring(0, charIndex2);
                    setTimeout(typeWriter, deletingSpeed);
                } else if (charIndex1 > 0) {
                    charIndex1--;
                    el1.textContent = text1.substring(0, charIndex1);
                    setTimeout(typeWriter, deletingSpeed);
                } else {
                    // Finished deleting both, pause before typing again
                    isDeleting = false;
                    setTimeout(typeWriter, pauseBeforeType);
                }
            }
        }
        
        // Start the animation
        setTimeout(typeWriter, 500);
    }
});
