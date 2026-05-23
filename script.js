// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-big').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

// ===== FADE-UP ANIMATIONS =====
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.service-card, .why-card, .portfolio-item, .team-card, .testimonial-card, .about-grid, .contact-grid'
).forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// ===== PORTFOLIO FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.display = match ? '' : 'none';
    });
  });
});

// ===== VIDEO MODAL FUNCTIONALITY =====
const videoModal = document.getElementById('videoModal');
const videoModalContainer = document.getElementById('videoModalContainer');
const videoPlayer = document.getElementById('videoPlayer');
const videoExternalLink = document.getElementById('videoExternalLink');
const videoModalClose = document.getElementById('videoModalClose');
const videoModalOverlay = document.getElementById('videoModalOverlay');

document.querySelectorAll('.video-item').forEach(item => {
  const link = item.querySelector('a');
  if (link) {
    link.addEventListener('click', e => {
      e.preventDefault(); // Stop standard link navigation
      
      const videoId = item.getAttribute('data-video-id');
      const videoType = item.getAttribute('data-video-type');
      let embedUrl = '';
      let externalUrl = '';

      if (videoType === 'youtube') {
        videoModalContainer.classList.remove('vertical-aspect');
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        externalUrl = `https://youtu.be/${videoId}`;
        if (videoExternalLink) {
          videoExternalLink.href = externalUrl;
          videoExternalLink.innerHTML = 'Watch on YouTube <span style="font-size: 0.75rem;">↗</span>';
        }
      } else if (videoType === 'instagram') {
        videoModalContainer.classList.add('vertical-aspect');
        embedUrl = `https://www.instagram.com/reel/${videoId}/embed/`;
        externalUrl = `https://www.instagram.com/reel/${videoId}/`;
        if (videoExternalLink) {
          videoExternalLink.href = externalUrl;
          videoExternalLink.innerHTML = 'Watch on Instagram <span style="font-size: 0.75rem;">↗</span>';
        }
      }

      videoPlayer.src = embedUrl;
      videoModal.classList.add('active');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Disable page scrolling
    });
  }
});

const closeVideoModal = () => {
  if (videoModal) {
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
  }
  if (videoPlayer) videoPlayer.src = '';
  document.body.style.overflow = ''; // Re-enable page scrolling
};

if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
if (videoModalOverlay) videoModalOverlay.addEventListener('click', closeVideoModal);

// Close modal on Escape key press
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #2E7D32, #43A047)';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1200);
});
