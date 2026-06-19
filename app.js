document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeaderScroll();
  initMobileNav();
  initScrollAnimations();
  init3DTilt();
  initMagneticGlow();
  init3DFaceRenderers();
});

/* =========================================================================
   Custom Cursor
   ========================================================================= */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function render() {
    if (isMoving) {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(render);
  }
  render();

  const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-item, .stat-card, .skills-category-card, .contact-detail-pill');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering-link');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering-link');
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

/* =========================================================================
   Header Scroll Class
   ========================================================================= */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* =========================================================================
   Mobile Navigation Toggle
   ========================================================================= */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-link, .mobile-btn');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* =========================================================================
   Scroll Entry Animations (Simple Custom AOS)
   ========================================================================= */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/* =========================================================================
   3D Card Tilt Effect (Interactive CSS transform)
   ========================================================================= */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-target');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const maxRotate = 8;
      const rotateY = ((x - centerX) / centerX) * maxRotate;
      const rotateX = -((y - centerY) / centerY) * maxRotate;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* =========================================================================
   Card Hover Magnetic Glow Effect (Updates custom CSS properties)
   ========================================================================= */
function initMagneticGlow() {
  const cards = document.querySelectorAll('.tilt-target');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* =========================================================================
   3D Drifting Space Skills Particle Visualizer (Replaces Face Mesh)
   ========================================================================= */
function init3DFaceRenderers() {
  const WORDS = ["Java", "Docker", "SQL", "Git", "Spring", "Netty", "JNI", "Cryptography"];
  
  // Set up background stars
  const STARS_COUNT = 50;
  const stars = [];
  for (let i = 0; i < STARS_COUNT; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2.8,
      y: (Math.random() - 0.5) * 2.8,
      z: (Math.random() - 0.5) * 2.8
    });
  }

  // Set up word particles
  const wordParticles = WORDS.map(w => {
    return {
      text: w,
      x: (Math.random() - 0.5) * 2.0,
      y: (Math.random() - 0.5) * 2.0,
      z: (Math.random() - 0.5) * 2.0,
      vx: (Math.random() - 0.5) * 0.006,
      vy: (Math.random() - 0.5) * 0.006,
      vz: (Math.random() - 0.5) * 0.006
    };
  });

  // Helper function to render space on a canvas
  function renderFace(canvasId, scale, autoRotSpeed, interactiveCard) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    if (canvasId === 'hero-3d-face') {
      function resizeCanvas() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }

    let angleX = 0;
    let angleY = 0;
    let mousePercentX = 0;
    let mousePercentY = 0;

    if (interactiveCard) {
      const parentCard = canvas.closest('.tilt-target');
      if (parentCard) {
        parentCard.addEventListener('mousemove', (e) => {
          const rect = parentCard.getBoundingClientRect();
          mousePercentX = (e.clientX - rect.left) / rect.width - 0.5;
          mousePercentY = (e.clientY - rect.top) / rect.height - 0.5;
        });
        parentCard.addEventListener('mouseleave', () => {
          mousePercentX = 0;
          mousePercentY = 0;
        });
      }
    }

    // Rendering loop
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Auto-rotation increment
      angleY += autoRotSpeed;

      // Apply coordinates offsets based on mouse tilts
      const currentAngleY = angleY + (mousePercentX * 1.2);
      const currentAngleX = mousePercentY * -1.2;

      // Update and bounce word particles
      wordParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const bound = 1.2;
        if (p.x > bound || p.x < -bound) p.vx *= -1;
        if (p.y > bound || p.y < -bound) p.vy *= -1;
        if (p.z > bound || p.z < -bound) p.vz *= -1;
      });

      // Projection mapping formula
      function project(x, y, z) {
        // Rotate Y
        let x1 = x * Math.cos(currentAngleY) - z * Math.sin(currentAngleY);
        let z1 = x * Math.sin(currentAngleY) + z * Math.cos(currentAngleY);
        
        // Rotate X
        let y2 = y * Math.cos(currentAngleX) - z1 * Math.sin(currentAngleX);
        let z2 = y * Math.sin(currentAngleX) + z1 * Math.cos(currentAngleX);
        
        // Camera distance projection
        const fov = 3.5;
        const distance = 4.2;
        const projScale = scale * fov / (z2 + distance);
        
        const px = x1 * projScale + width / 2;
        const py = -y2 * projScale + height / 2;
        
        return { x: px, y: py, z2: z2, scale: projScale };
      }

      // Draw background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      stars.forEach(s => {
        const pt = project(s.x, s.y, s.z);
        const starSize = Math.max(0.6, (2.0 - pt.z2) * 1.1);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, starSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw thin constellation lines between close words
      if (canvasId === 'hero-3d-face') {
        for (let i = 0; i < wordParticles.length; i++) {
          for (let j = i + 1; j < wordParticles.length; j++) {
            const p1 = wordParticles[i];
            const p2 = wordParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dz = p1.z - p2.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (dist < 1.1) {
              const pt1 = project(p1.x, p1.y, p1.z);
              const pt2 = project(p2.x, p2.y, p2.z);
              
              const lineOpacity = Math.min(0.14, (1.1 - dist) * 0.16);
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
              ctx.lineWidth = 0.55;
              ctx.beginPath();
              ctx.moveTo(pt1.x, pt1.y);
              ctx.lineTo(pt2.x, pt2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw word labels
      wordParticles.forEach(p => {
        const pt = project(p.x, p.y, p.z);
        const opacity = Math.min(1.0, Math.max(0.12, (2.4 - pt.z2) / 3.2));
        
        if (canvasId === 'logo-3d-face') {
          // Render first letter for miniature header logo
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
          ctx.font = `bold ${Math.max(7, Math.round(pt.scale * 0.45))}px "Fira Code", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.text[0], pt.x, pt.y);
        } else {
          // Render full word for main profile card
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          const fontSize = Math.max(10, Math.round(pt.scale * 0.16));
          ctx.font = `bold ${fontSize}px "Outfit", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Draw connection point dot
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y - fontSize * 0.72, 1.8, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw text label
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillText(p.text, pt.x, pt.y);
        }
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  // Render loops
  renderFace('logo-3d-face', 22, 0.004, false);
  renderFace('hero-3d-face', 165, 0.0015, true);
}
