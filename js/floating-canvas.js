/**
 * ANTIGRAVITY FLOATING CANVAS AMBIENT LIGHT ENGINE
 * Creates soft, organic breathing background ambient lights and floating micro-particles.
 */

(function () {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, targetX: null, targetY: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class AmbientBlob {
    constructor(x, y, radius, color, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.baseRadius = radius;
      this.color = color;
      this.vx = speedX;
      this.vy = speedY;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update() {
      // Gentle drift
      this.x += this.vx;
      this.y += this.vy;

      // Bounce at edges
      if (this.x < -this.radius) this.x = width + this.radius;
      if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;

      // Breathing pulse
      this.pulseAngle += 0.01;
      this.radius = this.baseRadius + Math.sin(this.pulseAngle) * 25;

      // Subtle mouse magnetic drift
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          this.x += (dx / dist) * 0.4;
          this.y += (dy / dist) * 0.4;
        }
      }
    }

    draw() {
      ctx.save();
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, this.color[0]);
      gradient.addColorStop(0.6, this.color[1]);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [
      new AmbientBlob(
        width * 0.2, height * 0.25, 
        width < 768 ? 160 : 320, 
        ['rgba(243, 115, 33, 0.12)', 'rgba(243, 115, 33, 0.03)'], 
        0.2, -0.15
      ),
      new AmbientBlob(
        width * 0.8, height * 0.65, 
        width < 768 ? 180 : 380, 
        ['rgba(30, 58, 138, 0.08)', 'rgba(30, 58, 138, 0.02)'], 
        -0.25, 0.1
      ),
      new AmbientBlob(
        width * 0.5, height * 0.85, 
        width < 768 ? 140 : 280, 
        ['rgba(243, 115, 33, 0.08)', 'rgba(243, 115, 33, 0.01)'], 
        0.15, 0.25
      )
    ];
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    if (mouse.targetX !== null) {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  resize();
  render();
})();
