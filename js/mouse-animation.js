// Mouse Movement Animation - Cursor Trail Effect
(function() {
    const colors = ['#ff5600', '#6f0820', '#d4926f', '#ffc857', '#ff6b6b', '#ee5a6f', '#c44569'];
    let mouseX = 0;
    let mouseY = 0;
    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 3;
            this.speedX = (Math.random() - 0.5) * 4;
            this.speedY = (Math.random() - 0.5) * 4;
            this.opacity = 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.decay = Math.random() * 0.03 + 0.015;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.decay;
            this.speedX *= 0.95; // Friction
            this.speedY *= 0.95;
        }

        draw(canvas, ctx) {
            if (this.opacity > 0) {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        isDead() {
            return this.opacity <= 0;
        }
    }

    // Create canvas for particle animation
    function createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'mouse-trail-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(canvas);
        return canvas;
    }

    const canvas = createCanvas();
    const ctx = canvas.getContext('2d');

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create particles on mouse move
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    // Animation loop
    function animate() {
        // Clear canvas with slight trail effect
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(canvas, ctx);

            if (particles[i].isDead()) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Add glow effect to mouse cursor
    document.addEventListener('mousemove', (e) => {
        // Optional: Add additional visual effect on hover
        const x = e.clientX;
        const y = e.clientY;
    });

    // Optional: Add pulsing glow effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-glow {
            0%, 100% {
                box-shadow: 0 0 10px rgba(255, 86, 0, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(255, 86, 0, 0.8);
            }
        }

        /* Custom cursor highlight on hover */
        button:hover, a:hover {
            animation: pulse-glow 1.5s infinite;
        }

        /* Style improvements */
        body {
            cursor: crosshair;
        }
    `;
    document.head.appendChild(style);
})();
