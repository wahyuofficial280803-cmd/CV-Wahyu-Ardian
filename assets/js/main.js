/**
 * CV & PORTOFOLIO WAHYU ARDIAN - ABSTRACT NOIR & DEEP BLUE ENGINE
 * Generative Fluid Wave Ribbons, Interactive Geometric Shards, Deep Blue Hue Tuner
 */

document.addEventListener('DOMContentLoaded', () => {
  initAbstractCanvas();
  initHueTuner();
  initLiveClock();
  initThemeToggle();
  initMobileNav();
  initPortfolioFilter();
  initPortfolioModal();
  initActiveNavOnScroll();
  initStatsCounter();
});

/* ========================================================
   1. GENERATIVE ABSTRACT FLUID SINE WAVES & SHARDS CANVAS
   ======================================================== */
function initAbstractCanvas() {
  const canvas = document.getElementById('abstract-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  // Abstract Floating Geometric Shards
  const shardCount = Math.min(Math.floor(width / 50), 30);
  const shards = [];

  for (let i = 0; i < shardCount; i++) {
    shards.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 24 + 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.35 + 0.15,
      sides: Math.random() > 0.5 ? 4 : 3 // Rhombus or Triangle shards
    });
  }

  // Draw an abstract geometric shard
  function drawShard(ctx, shard, accentColor) {
    ctx.save();
    ctx.translate(shard.x, shard.y);
    ctx.rotate(shard.rotation);
    ctx.beginPath();

    if (shard.sides === 3) {
      // Abstract Triangle Shard
      ctx.moveTo(0, -shard.size * 0.8);
      ctx.lineTo(shard.size * 0.7, shard.size * 0.6);
      ctx.lineTo(-shard.size * 0.7, shard.size * 0.6);
    } else {
      // Abstract Diamond / Rhombus Shard
      ctx.moveTo(0, -shard.size);
      ctx.lineTo(shard.size * 0.6, 0);
      ctx.lineTo(0, shard.size);
      ctx.lineTo(-shard.size * 0.6, 0);
    }

    ctx.closePath();
    ctx.strokeStyle = accentColor;
    ctx.globalAlpha = shard.opacity;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Subtle inner glow
    ctx.fillStyle = 'rgba(30, 58, 138, 0.08)';
    ctx.fill();

    ctx.restore();
  }

  // Multi-layered Fluid Wave Ribbons
  let waveTick = 0;

  function drawFluidRibbons(ctx, accentColor, isDark) {
    waveTick += 0.012;

    // Smooth inertia mouse tracking
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const mouseRatioY = (mouseY / height - 0.5) * 80;
    const ribbonLayers = [
      { amp: 65, freq: 0.002, speed: 0.8, yOffset: height * 0.28 + mouseRatioY, alpha: isDark ? 0.35 : 0.2, width: 2 },
      { amp: 95, freq: 0.0015, speed: 1.1, yOffset: height * 0.52 - mouseRatioY * 0.7, alpha: isDark ? 0.45 : 0.25, width: 2.5 },
      { amp: 75, freq: 0.0022, speed: 0.6, yOffset: height * 0.78 + mouseRatioY * 0.5, alpha: isDark ? 0.3 : 0.18, width: 1.8 }
    ];

    ribbonLayers.forEach((layer, idx) => {
      ctx.save();
      ctx.beginPath();

      const step = 20;
      for (let x = 0; x <= width + step; x += step) {
        const y = layer.yOffset +
          Math.sin(x * layer.freq + waveTick * layer.speed) * layer.amp +
          Math.cos(x * layer.freq * 0.6 + waveTick * 0.5) * (layer.amp * 0.4);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = layer.alpha;
      ctx.lineWidth = layer.width;
      ctx.shadowBlur = isDark ? 18 : 8;
      ctx.shadowColor = accentColor;
      ctx.stroke();

      // Second harmonic shadow wave for abstract 3D ribbon depth
      ctx.beginPath();
      for (let x = 0; x <= width + step; x += step) {
        const y2 = layer.yOffset + 18 +
          Math.sin(x * layer.freq + waveTick * layer.speed + 0.3) * (layer.amp * 0.95);
        if (x === 0) ctx.moveTo(x, y2);
        else ctx.lineTo(x, y2);
      }
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.lineWidth = 1;
      ctx.globalAlpha = layer.alpha * 0.6;
      ctx.stroke();

      ctx.restore();
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const activeCobalt = getComputedStyle(document.documentElement).getPropertyValue('--c-electric-blue').trim() || '#2563eb';

    // 1. Render Fluid Waves
    drawFluidRibbons(ctx, activeCobalt, isDark);

    // 2. Render Floating Shards
    for (let i = 0; i < shards.length; i++) {
      const s = shards[i];
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotSpeed;

      if (s.x < -40) s.x = width + 30;
      if (s.x > width + 40) s.x = -30;
      if (s.y < -40) s.y = height + 30;
      if (s.y > height + 40) s.y = -30;

      drawShard(ctx, s, activeCobalt);
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ========================================================
   2. ABSTRACT DEEP BLUE & NOIR HUE TUNER
   ======================================================== */
function initHueTuner() {
  const dots = document.querySelectorAll('.tuner-dot');
  if (!dots.length) return;

  const abstractThemes = {
    cobalt: {
      primary: '#2563eb',
      royal: '#1e40af',
      highlight: '#38bdf8',
      grad: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%)',
      name: 'Midnight Cobalt & Pitch Black'
    },
    abyssal: {
      primary: '#0284c7',
      royal: '#0369a1',
      highlight: '#06b6d4',
      grad: 'linear-gradient(135deg, #075985 0%, #0284c7 50%, #06b6d4 100%)',
      name: 'Abyssal Deep Cyan & Noir'
    },
    sapphire: {
      primary: '#1d4ed8',
      royal: '#1e3a8a',
      highlight: '#60a5fa',
      grad: 'linear-gradient(135deg, #172554 0%, #1d4ed8 50%, #3b82f6 100%)',
      name: 'Deep Sapphire & Space Void'
    },
    electric: {
      primary: '#3b82f6',
      royal: '#2563eb',
      highlight: '#93c5fd',
      grad: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
      name: 'Electric Navy & Obsidian'
    },
    laser: {
      primary: '#0052cc',
      royal: '#0c1a38',
      highlight: '#00c3ff',
      grad: 'linear-gradient(135deg, #091a44 0%, #0052cc 50%, #00c3ff 100%)',
      name: 'Neon Laser Blue & Pitch Black'
    }
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const key = dot.getAttribute('data-tuner') || 'cobalt';
      const t = abstractThemes[key] || abstractThemes.cobalt;

      const root = document.documentElement;
      root.style.setProperty('--c-electric-blue', t.primary);
      root.style.setProperty('--c-royal-cobalt', t.royal);
      root.style.setProperty('--c-sky-highlight', t.highlight);
      root.style.setProperty('--grad-noir-blue', t.grad);

      showAbstractToast(`🌊 Perpaduan Warna: ${t.name}`);
    });
  });
}

/* ========================================================
   3. ABSTRACT LIVE HUD CLOCK (WIB)
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
   4. THEME TOGGLE (Dark Noir / Executive Light)
   ======================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('abstract-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('abstract-theme', nextTheme);
    updateThemeIcon(nextTheme, themeIcon);
    showAbstractToast(nextTheme === 'dark' ? '🌌 Mode Hitam Biru Gelap Aktif' : '❄️ Mode Executive Light Aktif');
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
    showAbstractToast(`📋 ${label} berhasil disalin!`);
  }).catch(() => {
    showAbstractToast(`Gagal menyalin ${label}`);
  });
}

function showAbstractToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-circle-check" style="color: var(--c-sky-highlight);"></i> <span>${msg}</span>`;
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

// Global expose
window.copyToClipboard = copyToClipboard;
window.printResume = printResume;
window.showAbstractToast = showAbstractToast;
