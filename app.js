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
  // 3D low-poly wireframe of a working man coding at a desk (52 vertices)
  const FACE_VERTICES = [
    // Head (0-7)
    {x: -0.12, y: 0.85, z: 0.15},    // 0
    {x: 0.12, y: 0.85, z: 0.15},     // 1
    {x: -0.12, y: 0.85, z: -0.1},    // 2
    {x: 0.12, y: 0.85, z: -0.1},     // 3
    {x: -0.1, y: 0.65, z: 0.15},     // 4
    {x: 0.1, y: 0.65, z: 0.15},      // 5
    {x: -0.1, y: 0.65, z: -0.1},     // 6
    {x: 0.1, y: 0.65, z: -0.1},      // 7

    // Neck (8-9)
    {x: 0, y: 0.65, z: 0.02},        // 8
    {x: 0, y: 0.55, z: 0.02},        // 9

    // Torso/Shoulders/Spine (10-15)
    {x: -0.35, y: 0.5, z: 0.0},      // 10: Left Shoulder
    {x: 0.35, y: 0.5, z: 0.0},       // 11: Right Shoulder
    {x: -0.18, y: -0.15, z: -0.1},   // 12: Left Hip
    {x: 0.18, y: -0.15, z: -0.1},    // 13: Right Hip
    {x: 0, y: 0.32, z: 0.12},        // 14: Chest Center
    {x: 0, y: 0.22, z: -0.06},       // 15: Spine Center

    // Left Arm (16-17)
    {x: -0.4, y: 0.26, z: 0.22},     // 16: Left Elbow
    {x: -0.18, y: 0.14, z: 0.45},    // 17: Left Wrist

    // Right Arm (18-19)
    {x: 0.4, y: 0.26, z: 0.22},      // 18: Right Elbow
    {x: 0.18, y: 0.14, z: 0.45},     // 19: Right Wrist

    // Legs (20-25)
    {x: -0.22, y: -0.22, z: 0.25},   // 20: Left Knee
    {x: 0.22, y: -0.22, z: 0.25},    // 21: Right Knee
    {x: -0.22, y: -0.85, z: 0.2},    // 22: Left Ankle/Foot
    {x: 0.22, y: -0.85, z: 0.2},     // 23: Right Ankle/Foot
    {x: -0.2, y: -0.18, z: -0.2},    // 24: Left seat area
    {x: 0.2, y: -0.18, z: -0.2},     // 25: Right seat area

    // Desk (26-29)
    {x: -0.85, y: 0.06, z: 0.6},     // 26: Front-Left Corner
    {x: 0.85, y: 0.06, z: 0.6},      // 27: Front-Right Corner
    {x: -0.85, y: 0.06, z: 0.25},    // 28: Back-Left Corner
    {x: 0.85, y: 0.06, z: 0.25},     // 29: Back-Right Corner

    // Laptop (30-37)
    {x: -0.2, y: 0.08, z: 0.52},     // 30: Base Front-Left
    {x: 0.2, y: 0.08, z: 0.52},      // 31: Base Front-Right
    {x: -0.18, y: 0.08, z: 0.38},    // 32: Hinge Left
    {x: 0.18, y: 0.08, z: 0.38},     // 33: Hinge Right
    {x: -0.18, y: 0.34, z: 0.3},     // 34: Screen Top-Left
    {x: 0.18, y: 0.34, z: 0.3},      // 35: Screen Top-Right
    {x: 0, y: 0.2, z: 0.34},         // 36: Screen Center
    {x: 0, y: 0.08, z: 0.45},        // 37: Keyboard Center

    // Chair (38-45)
    {x: -0.25, y: 0.65, z: -0.25},   // 38: Backrest Top-Left
    {x: 0.25, y: 0.65, z: -0.25},    // 39: Backrest Top-Right
    {x: -0.22, y: 0.08, z: -0.22},   // 40: Backrest Bottom-Left
    {x: 0.22, y: 0.08, z: -0.22},    // 41: Backrest Bottom-Right
    {x: 0, y: -0.85, z: -0.22},      // 42: Wheels Center
    {x: 0, y: -0.38, z: -0.22},      // 43: Stem Bottom
    {x: -0.18, y: -0.85, z: -0.35},  // 44: Wheel Back-Left
    {x: 0.18, y: -0.85, z: -0.35},   // 45: Wheel Back-Right

    // Desk Legs (46-49)
    {x: -0.85, y: -0.85, z: 0.6},    // 46: Leg FL Bottom
    {x: 0.85, y: -0.85, z: 0.6},     // 47: Leg FR Bottom
    {x: -0.85, y: -0.85, z: 0.25},   // 48: Leg BL Bottom
    {x: 0.85, y: -0.85, z: 0.25},    // 49: Leg BR Bottom

    // Additional wheels (50-51)
    {x: -0.18, y: -0.85, z: -0.1},   // 50: Wheel Front-Left
    {x: 0.18, y: -0.85, z: -0.1}     // 51: Wheel Front-Right
  ];

  // Wireframe facet edge connections
  const FACE_CONNECTIONS = [
    // Head (cube wireframe)
    [0, 1], [1, 5], [5, 4], [4, 0],   // Front Face
    [2, 3], [3, 7], [7, 6], [6, 2],   // Back Face
    [0, 2], [1, 3], [4, 6], [5, 7],   // Connectors

    // Neck
    [4, 8], [5, 8], [6, 8], [7, 8],
    [8, 9],

    // Shoulders & Torso
    [10, 11], [9, 10], [9, 11],
    [9, 15], [15, 12], [15, 13],
    [10, 14], [11, 14], [14, 12], [14, 13], [12, 13],

    // Left Arm
    [10, 16], [16, 17], [17, 30], [17, 32],

    // Right Arm
    [11, 18], [18, 19], [19, 31], [19, 33],

    // Legs
    [12, 20], [13, 21], [20, 22], [21, 23],
    [12, 24], [13, 25], [24, 25],

    // Desk Outline
    [26, 27], [27, 29], [29, 28], [28, 26],

    // Desk Legs
    [26, 46], [27, 47], [28, 48], [29, 49],

    // Laptop Base
    [30, 31], [31, 33], [33, 32], [32, 30],
    // Laptop Screen
    [32, 34], [33, 35], [34, 35],
    // Keyboard / Screen details (diagonals/coding look)
    [30, 37], [31, 37], [32, 37], [33, 37],
    [34, 36], [35, 36], [32, 36], [33, 36],

    // Chair Backrest
    [38, 39], [39, 41], [41, 40], [40, 38],
    // Chair Backrest to Seat Connectors
    [40, 24], [41, 25],
    // Chair Stem
    [24, 43], [25, 43], [43, 42],
    // Chair Wheels star pattern
    [42, 44], [42, 45], [42, 50], [42, 51]
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
