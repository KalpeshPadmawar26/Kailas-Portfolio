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
   3D Wireframe Face Renderers (Logo & Hero profile avatar - Realistic low-poly)
   ========================================================================= */
function init3DFaceRenderers() {
  // Realistic 3D low-poly face mesh nodes (39 vertices)
  const FACE_VERTICES = [
    {x: 0, y: 1.25, z: 0.45},       // 0: Forehead Center
    {x: -0.4, y: 1.15, z: 0.35},     // 1: Forehead Left
    {x: 0.4, y: 1.15, z: 0.35},      // 2: Forehead Right
    {x: -0.75, y: 0.85, z: 0.2},     // 3: Temple Left
    {x: 0.75, y: 0.85, z: 0.2},      // 4: Temple Right
    {x: -0.6, y: 0.55, z: 0.35},     // 5: Brow Left Outer
    {x: -0.35, y: 0.6, z: 0.45},     // 6: Brow Left Middle
    {x: -0.1, y: 0.55, z: 0.48},     // 7: Brow Left Inner
    {x: 0.1, y: 0.55, z: 0.48},      // 8: Brow Right Inner
    {x: 0.35, y: 0.6, z: 0.45},      // 9: Brow Right Middle
    {x: 0.6, y: 0.55, z: 0.35},      // 10: Brow Right Outer
    {x: 0, y: 0.5, z: 0.55},         // 11: Nose Bridge
    {x: 0, y: 0.1, z: 0.72},         // 12: Nose Mid-bridge
    {x: 0, y: -0.25, z: 0.95},       // 13: Nose Tip
    {x: 0, y: -0.4, z: 0.75},        // 14: Nose Base
    {x: -0.25, y: -0.35, z: 0.72},   // 15: Nostril Left
    {x: 0.25, y: -0.35, z: 0.72},    // 16: Nostril Right
    {x: -0.5, y: 0.3, z: 0.4},       // 17: Eye Left Outer corner
    {x: -0.15, y: 0.3, z: 0.5},      // 18: Eye Left Inner corner
    {x: 0.15, y: 0.3, z: 0.5},       // 19: Eye Right Inner corner
    {x: 0.5, y: 0.3, z: 0.4},        // 20: Eye Right Outer corner
    {x: -0.32, y: 0.38, z: 0.48},    // 21: Eye Left Upper lid
    {x: -0.32, y: 0.22, z: 0.45},    // 22: Eye Left Lower lid
    {x: 0.32, y: 0.38, z: 0.48},     // 23: Eye Right Upper lid
    {x: 0.32, y: 0.22, z: 0.45},     // 24: Eye Right Lower lid
    {x: -0.55, y: -0.1, z: 0.4},     // 25: Cheek Left Mid
    {x: 0.55, y: -0.1, z: 0.4},      // 26: Cheek Right Mid
    {x: -0.85, y: -0.05, z: 0.25},   // 27: Cheek Left Outer
    {x: 0.85, y: -0.05, z: 0.25},    // 28: Cheek Right Outer
    {x: 0, y: -0.52, z: 0.68},       // 29: Lip Upper Center
    {x: 0, y: -0.72, z: 0.65},       // 30: Lip Lower Center
    {x: -0.3, y: -0.62, z: 0.58},    // 31: Mouth Left Corner
    {x: 0.3, y: -0.62, z: 0.58},     // 32: Mouth Right Corner
    {x: 0, y: -1.2, z: 0.45},        // 33: Chin Tip
    {x: 0, y: -1.3, z: 0.3},         // 34: Chin Base
    {x: -0.6, y: -0.85, z: 0.1},     // 35: Jaw Angle Left
    {x: 0.6, y: -0.85, z: 0.1},      // 36: Jaw Angle Right
    {x: -0.35, y: -1.05, z: 0.28},   // 37: Jaw Mid Left
    {x: 0.35, y: -1.05, z: 0.28}     // 38: Jaw Mid Right
  ];

  // Wireframe facet edge connections (71 connections)
  const FACE_CONNECTIONS = [
    // Outer boundary outline
    [33, 37], [37, 35], [35, 27], [27, 3], [3, 1], [1, 0], [0, 2], [2, 4], [4, 28], [28, 36], [36, 38], [38, 33],
    // Forehead vertical struts
    [0, 7], [1, 6], [3, 5], [0, 8], [2, 9], [4, 10],
    // Brow arcs
    [7, 6], [6, 5], [8, 9], [9, 10], [7, 8],
    // Nose vertical bridge & base
    [11, 12], [12, 13], [13, 14], [14, 29], [12, 15], [12, 16], [15, 14], [16, 14],
    // Eye Left lines
    [17, 21], [21, 18], [18, 22], [22, 17], [18, 11], [17, 5], [21, 6], [22, 25],
    // Eye Right lines
    [20, 23], [23, 19], [19, 24], [24, 20], [19, 11], [20, 10], [23, 9], [24, 26],
    // Left cheek networks
    [5, 27], [27, 25], [15, 25], [25, 31], [25, 35], [31, 37],
    // Right cheek networks
    [10, 28], [28, 26], [16, 26], [26, 32], [26, 36], [32, 38],
    // Nose side transitions
    [15, 13], [16, 13], [11, 12],
    // Mouth outline
    [29, 31], [31, 30], [30, 32], [32, 29], [15, 31], [16, 32], [14, 29],
    // Chin and lower jaw
    [30, 33], [37, 33], [38, 33], [37, 34], [38, 34]
  ];

  // Helper function to render wireframe face on a canvas
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

      // Apply coordinates offsets based on mouse percentage tilts
      const currentAngleY = angleY + (mousePercentX * 0.95);
      const currentAngleX = mousePercentY * -0.95;

      // Map vertices with 3D projection formulas
      const projected = FACE_VERTICES.map(v => {
        // Rotate Y
        let x1 = v.x * Math.cos(currentAngleY) - v.z * Math.sin(currentAngleY);
        let z1 = v.x * Math.sin(currentAngleY) + v.z * Math.cos(currentAngleY);
        
        // Rotate X
        let y2 = v.y * Math.cos(currentAngleX) - z1 * Math.sin(currentAngleX);
        let z2 = v.y * Math.sin(currentAngleX) + z1 * Math.cos(currentAngleX);
        
        // Camera distance projection
        const fov = 3.5;
        const distance = 4.2;
        const projScale = scale * fov / (z2 + distance);
        
        const px = x1 * projScale + width / 2;
        const py = y2 * projScale + height / 2;
        
        return { x: px, y: py };
      });

      // Draw wireframe connections
      ctx.strokeStyle = canvasId === 'logo-3d-face' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.82)';
      ctx.lineWidth = canvasId === 'logo-3d-face' ? 0.8 : 1.1;

      FACE_CONNECTIONS.forEach(conn => {
        const p1 = projected[conn[0]];
        const p2 = projected[conn[1]];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw node dots at intersections for high-tech CAD aesthetic (Hero only)
      if (canvasId === 'hero-3d-face') {
        ctx.fillStyle = '#ffffff';
        projected.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  // Render loops
  // 1. Logo Face (Small, 22px diameter scale, constant auto-rotation)
  renderFace('logo-3d-face', 22, 0.005, false);
  
  // 2. Hero profile badge avatar (Large, 175px diameter scale, mouse tilt tracking)
  renderFace('hero-3d-face', 175, 0.002, true);
}
