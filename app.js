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
  // Realistic 3D low-poly face mesh nodes (59 vertices)
  const FACE_VERTICES = [
    {x: 0, y: 1.5, z: 0.2},         // 0: Center top forehead
    {x: -0.4, y: 1.4, z: 0.15},      // 1: Left top forehead
    {x: 0.4, y: 1.4, z: 0.15},       // 2: Right top forehead
    {x: -0.7, y: 1.1, z: 0.05},      // 3: Left temple high
    {x: 0.7, y: 1.1, z: 0.05},       // 4: Right temple high
    {x: 0, y: 1.0, z: 0.4},          // 5: Mid forehead center
    {x: -0.35, y: 0.95, z: 0.35},    // 6: Mid forehead left
    {x: 0.35, y: 0.95, z: 0.35},     // 7: Mid forehead right
    {x: -0.75, y: 0.8, z: 0.15},     // 8: Temple left mid
    {x: 0.75, y: 0.8, z: 0.15},      // 9: Temple right mid
    {x: -0.6, y: 0.6, z: 0.38},      // 10: Brow left outer
    {x: -0.32, y: 0.65, z: 0.46},    // 11: Brow left middle
    {x: -0.1, y: 0.58, z: 0.48},     // 12: Brow left inner
    {x: 0.1, y: 0.58, z: 0.48},      // 13: Brow right inner
    {x: 0.32, y: 0.65, z: 0.46},     // 14: Brow right middle
    {x: 0.6, y: 0.6, z: 0.38},       // 15: Brow right outer
    {x: 0, y: 0.48, z: 0.54},        // 16: Nose bridge top
    {x: 0, y: 0.15, z: 0.72},        // 17: Nose bridge mid
    {x: 0, y: -0.22, z: 0.95},       // 18: Nose tip
    {x: 0, y: -0.38, z: 0.76},       // 19: Nose base center
    {x: -0.22, y: -0.32, z: 0.72},   // 20: Nose left nostril outer
    {x: 0.22, y: -0.32, z: 0.72},    // 21: Nose right nostril outer
    {x: -0.1, y: -0.38, z: 0.74},     // 22: Nose left nostril bottom
    {x: 0.1, y: -0.38, z: 0.74},      // 23: Nose right nostril bottom
    {x: -0.16, y: 0.32, z: 0.48},    // 24: Left eye inner corner
    {x: -0.48, y: 0.32, z: 0.38},    // 25: Left eye outer corner
    {x: -0.32, y: 0.4, z: 0.46},     // 26: Left eye top
    {x: -0.32, y: 0.24, z: 0.44},    // 27: Left eye bottom
    {x: -0.32, y: 0.32, z: 0.43},    // 28: Left pupil/center
    {x: 0.16, y: 0.32, z: 0.48},     // 29: Right eye inner corner
    {x: 0.48, y: 0.32, z: 0.38},     // 30: Right eye outer corner
    {x: 0.32, y: 0.4, z: 0.46},      // 31: Right eye top
    {x: 0.32, y: 0.24, z: 0.44},     // 32: Right eye bottom
    {x: 0.32, y: 0.32, z: 0.43},     // 33: Right pupil/center
    {x: -0.82, y: 0.2, z: 0.22},     // 34: Cheekbone left outer
    {x: 0.82, y: 0.2, z: 0.22},      // 35: Cheekbone right outer
    {x: -0.52, y: -0.05, z: 0.42},   // 36: Cheek left mid
    {x: 0.52, y: -0.05, z: 0.42},    // 37: Cheek right mid
    {x: -0.32, y: -0.38, z: 0.58},   // 38: Nasolabial fold left
    {x: 0.32, y: -0.38, z: 0.58},    // 39: Nasolabial fold right
    {x: -0.08, y: -0.5, z: 0.69},    // 40: Upper lip top center L
    {x: 0.08, y: -0.5, z: 0.69},     // 41: Upper lip top center R
    {x: -0.28, y: -0.58, z: 0.6},    // 42: Mouth corner left
    {x: 0.28, y: -0.58, z: 0.6},     // 43: Mouth corner right
    {x: 0, y: -0.56, z: 0.66},       // 44: Lip join center
    {x: 0, y: -0.7, z: 0.64},        // 45: Lower lip bottom center
    {x: -0.16, y: -0.53, z: 0.64},   // 46: Upper lip left mid
    {x: 0.16, y: -0.53, z: 0.64},    // 47: Upper lip right mid
    {x: -0.14, y: -0.65, z: 0.62},   // 48: Lower lip left mid
    {x: 0.14, y: -0.65, z: 0.62},    // 49: Lower lip right mid
    {x: 0, y: -1.0, z: 0.52},        // 50: Chin tip top
    {x: 0, y: -1.2, z: 0.45},        // 51: Chin tip bottom
    {x: 0, y: -1.35, z: 0.25},       // 52: Chin base
    {x: -0.68, y: -0.78, z: 0.05},   // 53: Jaw angle left
    {x: 0.68, y: -0.78, z: 0.05},    // 54: Jaw angle right
    {x: -0.4, y: -1.02, z: 0.28},    // 55: Jaw mid left
    {x: 0.4, y: -1.02, z: 0.28},     // 56: Jaw mid right
    {x: -0.18, y: -0.9, z: 0.46},    // 57: Chin left crease
    {x: 0.18, y: -0.9, z: 0.46}      // 58: Chin right crease
  ];

  // Wireframe facet edge connections (110 connections)
  const FACE_CONNECTIONS = [
    // Forehead and hairline
    [0, 1], [1, 3], [0, 2], [2, 4],
    // Forehead internal
    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
    [5, 6], [6, 8], [5, 7], [7, 9],
    [1, 5], [2, 5],
    // Forehead to brows
    [5, 12], [5, 13], [6, 11], [7, 14], [8, 10], [9, 15],
    // Brow line
    [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
    // Nose bridge
    [12, 16], [13, 16], [16, 17], [17, 18], [18, 19],
    // Nostrils
    [17, 20], [17, 21], [18, 20], [18, 21], [20, 22], [21, 23], [22, 19], [23, 19],
    // Left Eye
    [24, 26], [26, 25], [25, 27], [27, 24],
    [28, 24], [28, 25], [28, 26], [28, 27],
    // Left Eye connections to Brow & Cheek
    [11, 26], [12, 24], [10, 25], [24, 16], [24, 17],
    // Right Eye
    [29, 31], [31, 30], [30, 32], [32, 29],
    [33, 29], [33, 30], [33, 31], [33, 32],
    // Right Eye connections to Brow & Cheek
    [14, 31], [13, 29], [15, 30], [29, 16], [29, 17],
    // Cheekbones & outer boundaries
    [3, 34], [4, 35], [25, 34], [30, 35],
    [34, 36], [35, 37], [25, 36], [30, 37],
    [36, 38], [37, 39], [36, 42], [37, 43],
    [20, 38], [21, 39], [19, 38], [19, 39],
    // Mouth & Lips
    [40, 41], [40, 46], [41, 47], [46, 42], [47, 43],
    [42, 44], [43, 44], [40, 44], [41, 44],
    [42, 48], [43, 49], [48, 45], [49, 45], [44, 45],
    [19, 40], [19, 41], [20, 46], [21, 47],
    // Jaw & Chin boundary
    [53, 55], [55, 51], [54, 56], [56, 51], [51, 52],
    [34, 53], [35, 54],
    // Lower cheeks to jaw
    [36, 53], [37, 54], [36, 55], [37, 56],
    // Lips to chin
    [42, 57], [43, 58], [48, 57], [49, 58],
    [45, 50], [57, 50], [58, 50], [50, 51], [57, 55], [58, 56]
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
