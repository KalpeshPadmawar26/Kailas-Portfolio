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
   3D Wireframe Face Renderers (Logo & Hero profile avatar)
   ========================================================================= */
function init3DFaceRenderers() {
  // 3D low-poly face mesh definition
  const FACE_VERTICES = [
    {x: 0, y: 1.1, z: 0.3},      // 0: Forehead
    {x: -0.7, y: 0.8, z: 0.1},   // 1: L Temple
    {x: 0.7, y: 0.8, z: 0.1},    // 2: R Temple
    {x: -0.85, y: 0, z: 0.2},    // 3: L Cheek
    {x: 0.85, y: 0, z: 0.2},     // 4: R Cheek
    {x: -0.55, y: -0.7, z: 0.1},  // 5: L Jaw
    {x: 0.55, y: -0.7, z: 0.1},   // 6: R Jaw
    {x: 0, y: -1.1, z: 0.3},     // 7: Chin
    {x: 0, y: 0.35, z: 0.5},     // 8: Nose Bridge
    {x: 0, y: -0.1, z: 0.8},     // 9: Nose Tip
    {x: 0, y: -0.3, z: 0.6},     // 10: Nose Base
    {x: -0.28, y: 0.25, z: 0.4},  // 11: L Eye
    {x: 0.28, y: 0.25, z: 0.4},   // 12: R Eye
    {x: -0.5, y: 0.5, z: 0.3},    // 13: L Brow Outer
    {x: -0.15, y: 0.5, z: 0.45},  // 14: L Brow Inner
    {x: 0.15, y: 0.5, z: 0.45},   // 15: R Brow Inner
    {x: 0.5, y: 0.5, z: 0.3},     // 16: R Brow Outer
    {x: -0.22, y: -0.55, z: 0.5}, // 17: Mouth L
    {x: 0.22, y: -0.55, z: 0.5},  // 18: Mouth R
    {x: 0, y: -0.6, z: 0.55}      // 19: Mouth Center
  ];

  const FACE_CONNECTIONS = [
    // Outline
    [7, 5], [5, 3], [3, 1], [1, 0], [0, 2], [2, 4], [4, 6], [6, 7],
    // Forehead to Brows
    [0, 14], [0, 15],
    // Brows
    [14, 13], [13, 1], [15, 16], [16, 2],
    // Nose
    [8, 9], [9, 10], [10, 19], [8, 11], [8, 12],
    // Eyes
    [14, 11], [11, 3], [13, 11],
    [15, 12], [12, 4], [16, 12],
    // Cheeks to Nose Base
    [10, 3], [10, 4],
    // Mouth
    [17, 19], [19, 18], [18, 7], [17, 7],
    [17, 3], [18, 4]
  ];

  // Helper function to render a wireframe face on a canvas
  function renderFace(canvasId, scale, autoRotSpeed, interactiveCard) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    // Handle dynamic canvas resizing for hero badge
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

    // Add pointer tracking if interactive
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

    // Animation Loop
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Rotate over time
      angleY += autoRotSpeed;

      // Apply auto-rotation combined with interactive tilts
      const currentAngleY = angleY + (mousePercentX * 0.9);
      const currentAngleX = mousePercentY * -0.9;

      // 3D Point Projection Equation
      const projected = FACE_VERTICES.map(v => {
        // Rotate around Y-axis
        let x1 = v.x * Math.cos(currentAngleY) - v.z * Math.sin(currentAngleY);
        let z1 = v.x * Math.sin(currentAngleY) + v.z * Math.cos(currentAngleY);
        
        // Rotate around X-axis
        let y2 = v.y * Math.cos(currentAngleX) - z1 * Math.sin(currentAngleX);
        let z2 = v.y * Math.sin(currentAngleX) + z1 * Math.cos(currentAngleX);
        
        // Perspective projection calculation
        const fov = 3.5;
        const distance = 4.2;
        const projScale = scale * fov / (z2 + distance);
        
        const px = x1 * projScale + width / 2;
        const py = y2 * projScale + height / 2;
        
        return { x: px, y: py };
      });

      // Draw wireframe connections
      ctx.strokeStyle = canvasId === 'logo-3d-face' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = canvasId === 'logo-3d-face' ? 1.0 : 1.3;

      FACE_CONNECTIONS.forEach(conn => {
        const p1 = projected[conn[0]];
        const p2 = projected[conn[1]];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw nodes (dots on junctions) for a highly technical mockup look (Hero only)
      if (canvasId === 'hero-3d-face') {
        ctx.fillStyle = '#ffffff';
        projected.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  // Launch render loops:
  // 1. Logo Face (Small, 24px diameter scale, slow constant rotation)
  renderFace('logo-3d-face', 22, 0.006, false);
  
  // 2. Hero Profile Face (Large, 180px diameter scale, mouse tilt interaction enabled)
  renderFace('hero-3d-face', 180, 0.003, true);
}
