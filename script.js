document.addEventListener('DOMContentLoaded', () => {
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
