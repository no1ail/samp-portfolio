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

    // --- Live Viewers & Chat ---
    if (typeof io !== 'undefined') {
        const socket = io();
        
        const viewerCountEl = document.getElementById('live-viewers');
        const viewerCountPlusEl = document.getElementById('live-viewers-plus');
        
        socket.on('viewer count update', (count) => {
            if (viewerCountEl) viewerCountEl.innerText = count;
            if (viewerCountPlusEl) viewerCountPlusEl.innerText = count > 3 ? (count - 3) : 0;
        });

        // Chat socket bindings
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        // Random Guest Name
        let myGuestName = localStorage.getItem('guest_name');
        if (!myGuestName) {
            myGuestName = 'Guest_' + Math.floor(Math.random() * 10000);
            localStorage.setItem('guest_name', myGuestName);
        }

        // Open/Close chat removed from here
        function appendMessage(msg) {
            if (!chatMessages) return;
            const isSelf = msg.author === myGuestName;
            const msgEl = document.createElement('div');
            msgEl.classList.add('chat-message');
            if (isSelf) msgEl.classList.add('self');
            
            const authorEl = document.createElement('div');
            authorEl.classList.add('chat-author');
            authorEl.innerText = msg.author;
            
            const textEl = document.createElement('div');
            textEl.innerText = msg.text;
            
            msgEl.appendChild(authorEl);
            msgEl.appendChild(textEl);
            chatMessages.appendChild(msgEl);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        socket.on('chat history', (messages) => {
            if (chatMessages) chatMessages.innerHTML = '';
            messages.forEach(appendMessage);
        });

        socket.on('chat message', (msg) => {
            appendMessage(msg);
        });

        // Form submission moved outside
    }

    // --- Chat Modal UI (Works even without server) ---
    const chatModal = document.getElementById('chat-modal');
    const openChatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInputFallback = document.getElementById('chat-input');
    const chatFormFallback = document.getElementById('chat-form');
    
    // Fallback logic for Random Guest Name so we have it even offline
    let myGuestName = localStorage.getItem('guest_name');
    if (!myGuestName) {
        myGuestName = 'Guest_' + Math.floor(Math.random() * 10000);
        localStorage.setItem('guest_name', myGuestName);
    }
    
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            chatModal.classList.add('active');
            if (chatInputFallback) setTimeout(() => chatInputFallback.focus(), 300);
        });
    }
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }

    if (chatFormFallback) {
        chatFormFallback.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = chatInputFallback.value.trim();
            if (messageText) {
                // If socket exists, emit to server
                if (typeof io !== 'undefined') {
                    const socket = io();
                    socket.emit('chat message', {
                        author: myGuestName,
                        text: messageText
                    });
                } else {
                    // Fallback: If no server (running locally via file://), just show the message locally
                    const chatMessages = document.getElementById('chat-messages');
                    const msgEl = document.createElement('div');
                    msgEl.classList.add('chat-message', 'self');
                    msgEl.innerHTML = `<div class="chat-author">${myGuestName} (Offline)</div><div>${messageText}</div>`;
                    chatMessages.appendChild(msgEl);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                chatInputFallback.value = '';
            }
        });
    }

    // --- Snake Game ---
    const snakeModal = document.getElementById('snake-modal');
    const openSnakeBtn = document.getElementById('open-snake-btn');
    const closeSnakeBtn = document.getElementById('close-snake-btn');
    const startSnakeBtn = document.getElementById('start-snake-btn');
    const canvas = document.getElementById('snake-canvas');
    const scoreEl = document.getElementById('snake-score');
    const highScoreEl = document.getElementById('snake-high-score');

    if (openSnakeBtn) {
        openSnakeBtn.addEventListener('click', () => {
            snakeModal.classList.add('active');
        });
    }
    if (closeSnakeBtn) {
        closeSnakeBtn.addEventListener('click', () => {
            snakeModal.classList.remove('active');
            if (gameInterval) clearInterval(gameInterval);
            startSnakeBtn.style.display = 'block';
        });
    }

    let ctx;
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
    
    let snake = [];
    let dx = 10;
    let dy = 0;
    let foodX;
    let foodY;
    let score = 0;
    let highScore = localStorage.getItem('snake_high_score') || 0;
    if(highScoreEl) highScoreEl.innerText = highScore;
    let gameInterval;
    let gameSpeed = 100;
    let gameStarted = false;

    function initGame() {
        snake = [
            { x: 150, y: 150 },
            { x: 140, y: 150 },
            { x: 130, y: 150 },
            { x: 120, y: 150 },
            { x: 110, y: 150 }
        ];
        score = 0;
        dx = 10;
        dy = 0;
        if(scoreEl) scoreEl.innerText = score;
        createFood();
    }

    function clearCanvas() {
        if (!ctx) return;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-canvas') || '#111';
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border') || '#333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnakePart(snakePart) {
        if (!ctx) return;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-brand') || 'lightgreen';
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function drawSnake() {
        snake.forEach(drawSnakePart);
    }

    function advanceSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
        if (didEatFood) {
            score += 10;
            if(scoreEl) scoreEl.innerText = score;
            createFood();
        } else {
            snake.pop();
        }
    }

    function randomTen(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    function createFood() {
        foodX = randomTen(0, canvas.width - 10);
        foodY = randomTen(0, canvas.height - 10);
        snake.forEach(function isFoodOnSnake(part) {
            const foodIsOnSnake = part.x == foodX && part.y == foodY;
            if (foodIsOnSnake) createFood();
        });
    }

    function drawFood() {
        if (!ctx) return;
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'darkred';
        ctx.fillRect(foodX, foodY, 10, 10);
        ctx.strokeRect(foodX, foodY, 10, 10);
    }

    function didGameEnd() {
        for (let i = 4; i < snake.length; i++) {
            const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
            if (didCollide) return true;
        }
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x >= canvas.width;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y >= canvas.height;

        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    }

    function main() {
        if (didGameEnd()) {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('snake_high_score', highScore);
                if(highScoreEl) highScoreEl.innerText = highScore;
            }
            gameStarted = false;
            startSnakeBtn.style.display = 'block';
            startSnakeBtn.innerText = 'Game Over - Play Again';
            return;
        }

        gameInterval = setTimeout(function onTick() {
            clearCanvas();
            drawFood();
            advanceSnake();
            drawSnake();
            main();
        }, gameSpeed);
    }

    function changeDirection(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        
        const W_KEY = 87;
        const A_KEY = 65;
        const S_KEY = 83;
        const D_KEY = 68;

        if (!gameStarted) return;

        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) {
            dx = 0;
            dy = 10;
        }
    }

    // Touch controls / D-pad
    function triggerDirection(dir) {
        if (!gameStarted) return;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if (dir === 'LEFT' && !goingRight) { dx = -10; dy = 0; }
        if (dir === 'UP' && !goingDown) { dx = 0; dy = -10; }
        if (dir === 'RIGHT' && !goingLeft) { dx = 10; dy = 0; }
        if (dir === 'DOWN' && !goingUp) { dx = 0; dy = 10; }
    }

    if (document.getElementById('dpad-up')) {
        document.getElementById('dpad-up').addEventListener('click', () => triggerDirection('UP'));
        document.getElementById('dpad-left').addEventListener('click', () => triggerDirection('LEFT'));
        document.getElementById('dpad-right').addEventListener('click', () => triggerDirection('RIGHT'));
        document.getElementById('dpad-down').addEventListener('click', () => triggerDirection('DOWN'));
    }

    document.addEventListener("keydown", changeDirection);

    if (startSnakeBtn) {
        startSnakeBtn.addEventListener('click', () => {
            if (gameInterval) clearTimeout(gameInterval);
            startSnakeBtn.style.display = 'none';
            gameStarted = true;
            initGame();
            main();
            // Optional: prevent default scrolling when playing
            canvas.focus();
        });
    }

});
