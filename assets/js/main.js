/**
 * CV & PORTFOLIO WAHYU ARDIAN - EXECUTIVE CREATIVE STUDIO ENGINE
 * High-End Interactive System: Ambient Dynamic Particle Canvas, Studio Palette Morphing, Lightbox & HUD
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initStudioPalette();
  initLiveClock();
  initThemeToggle();
  initMobileNav();
  initPortfolioFilter();
  initPortfolioModal();
  initActiveNavOnScroll();
  initStatsCounter();
});

/* ========================================================
   1. AMBIENT NEURAL CONSTELLATION & PARTICLE MESH CANVAS
   ======================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Calculate particle count dynamically based on screen size
  const particleCount = Math.min(Math.floor((width * height) / 16000), 70);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1.2,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.01
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  let isMouseOver = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseOver = true;
  });

  window.addEventListener('mouseleave', () => {
    isMouseOver = false;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Read active accent color from CSS variables
    const activeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#6366f1';
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Screen edge bounce / wrap
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse interactive gentle gravity & repel
      if (isMouseOver) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
        }
      }

      // Draw glowing particle node
      p.phase += p.pulseSpeed;
      const currentRadius = p.radius + Math.sin(p.phase) * 0.6;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(currentRadius, 0.6), 0, Math.PI * 2);
      ctx.fillStyle = activeAccent;
      ctx.shadowBlur = isDark ? 12 : 6;
      ctx.shadowColor = activeAccent;
      ctx.globalAlpha = isDark ? 0.65 : 0.45;
      ctx.fill();
      ctx.restore();

      // Connect adjacent particles with hair-thin constellation lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = p.y - p2.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

        if (cdist < 135) {
          const alpha = (1 - cdist / 135) * (isDark ? 0.22 : 0.15);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = activeAccent;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.85;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ========================================================
   2. STUDIO ACCENT PALETTE MORPHING
   ======================================================== */
function initStudioPalette() {
  const dots = document.querySelectorAll('.palette-dot');
  if (!dots.length) return;

  const studioPalettes = {
    indigo: {
      accent: '#6366f1',
      secondary: '#06b6d4',
      glow: 'rgba(99, 102, 241, 0.4)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)',
      name: 'Indigo Velvet // Executive Modern'
    },
    cyan: {
      accent: '#06b6d4',
      secondary: '#3b82f6',
      glow: 'rgba(6, 182, 212, 0.4)',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 50%, #6366f1 100%)',
      name: 'Cyber Cyan // Precision Tech'
    },
    emerald: {
      accent: '#10b981',
      secondary: '#06b6d4',
      glow: 'rgba(16, 185, 129, 0.4)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #3b82f6 100%)',
      name: 'Emerald Jade // Creative Pulse'
    },
    amber: {
      accent: '#f59e0b',
      secondary: '#ef4444',
      glow: 'rgba(245, 158, 11, 0.4)',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #ef4444 100%)',
      name: 'Amber Glow // Warm Luxury'
    },
    rose: {
      accent: '#f43f5e',
      secondary: '#a855f7',
      glow: 'rgba(244, 63, 94, 0.4)',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #d946ef 50%, #8b5cf6 100%)',
      name: 'Rose Sunset // Editorial Flair'
    }
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const key = dot.getAttribute('data-palette') || 'indigo';
      const p = studioPalettes[key] || studioPalettes.indigo;

      const root = document.documentElement;
      root.style.setProperty('--accent-color', p.accent);
      root.style.setProperty('--accent-secondary', p.secondary);
      root.style.setProperty('--accent-glow', p.glow);
      root.style.setProperty('--accent-gradient', p.gradient);

      showStudioToast(`🎨 Tema Studio diubah ke ${p.name}`);
    });
  });
}

/* ========================================================
   3. STUDIO LIVE HUD CLOCK (WIB)
   ======================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${mins}:${secs} WIB`;
  }

  update();
  setInterval(update, 1000);
}

/* ========================================================
   4. THEME TOGGLE (Dark Obsidian / Light Executive)
   ======================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('studio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('studio-theme', nextTheme);
    updateThemeIcon(nextTheme, themeIcon);
    showStudioToast(nextTheme === 'dark' ? '🌙 Mode Obsidian Studio Aktif' : '☀️ Mode Executive Light Aktif');
  });
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

/* ========================================================
   5. MOBILE NAVIGATION TOGGLE
   ======================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = links.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
}

/* ========================================================
   6. PORTFOLIO FILTER SYSTEM
   ======================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 280);
        }
      });
    });
  });
}

/* ========================================================
   7. PORTFOLIO & AUDIENCE QR LIGHTBOX MODAL
   ======================================================== */
function initPortfolioModal() {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCat = document.getElementById('modal-cat');

  if (!modal) return;

  // Portfolio items click
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.portfolio-title');
      const desc = card.querySelector('.portfolio-desc');
      const cat = card.querySelector('.portfolio-cat');

      if (modalImg && img) modalImg.src = img.src;
      if (modalTitle && title) modalTitle.textContent = title.textContent;
      if (modalDesc && desc) modalDesc.textContent = desc.textContent;
      if (modalCat && cat) modalCat.textContent = cat.textContent;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Audience QR Code interactive card click
  const qrCard = document.querySelector('.qr-interactive-card');
  if (qrCard) {
    qrCard.addEventListener('click', () => {
      const qrImg = qrCard.querySelector('img');
      if (modalImg && qrImg) modalImg.src = qrImg.src;
      if (modalTitle) modalTitle.textContent = 'Portofolio Digital & Arsip Karya Wahyu Ardian';
      if (modalDesc) modalDesc.textContent = 'Pindai barcode ini menggunakan kamera ponsel pintar Anda untuk membuka portofolio lengkap berisi karya desain grafis, visual editing, dan foto dokumentasi event Wahyu Ardian.';
      if (modalCat) modalCat.textContent = 'AUDIENCE SCANNER // DIGITAL PORTFOLIO';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ========================================================
   8. ACTIVE NAV ON SCROLL
   ======================================================== */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ========================================================
   9. STATS COUNTER ANIMATION
   ======================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''), 10);
          const suffix = counter.getAttribute('data-suffix') || '+';
          let count = 0;
          const step = Math.max(1, Math.floor(target / 35));
          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target + suffix;
              clearInterval(interval);
            } else {
              counter.textContent = count + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('toolkit') || document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

/* ========================================================
   10. UTILITY: COPY TO CLIPBOARD & TOAST
   ======================================================== */
function copyToClipboard(text, label = 'Data') {
  navigator.clipboard.writeText(text).then(() => {
    showStudioToast(`📋 ${label} berhasil disalin ke clipboard!`);
  }).catch(() => {
    showStudioToast(`Gagal menyalin ${label}`);
  });
}

function showStudioToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-color);"></i> <span>${msg}</span>`;
  toast.classList.add('show');

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ========================================================
   11. PRINT RESUME (A4 CLEAN FORMAT)
   ======================================================== */
function printResume() {
  window.print();
}

// Expose globals for inline onclick handlers
window.copyToClipboard = copyToClipboard;
window.printResume = printResume;
window.showStudioToast = showStudioToast;
