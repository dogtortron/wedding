// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Countdown (set your wedding date/time below)
const countdownEl = document.getElementById('countdown');
(function initCountdown(){
  if (!countdownEl) return;
  // TODO: set your exact time and timezone if needed
  const target = new Date('2025-10-18T09:00:00-06:00'); // 1:30 PM MDT
  const pad = (n)=> String(n).padStart(2,'0');

  function render(){
    const now = new Date();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    diff -= mins * (1000*60);
    const secs = Math.floor(diff / 1000);

    countdownEl.innerHTML = `
      <span class="chip"><strong>${pad(days)}</strong> days</span>
      <span class="chip"><strong>${pad(hours)}</strong> hrs</span>
      <span class="chip"><strong>${pad(mins)}</strong> min</span>
      <span class="chip"><strong>${pad(secs)}</strong> sec</span>
    `;
  }
  render();
  setInterval(render, 1000);
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll (enhances default)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const to = document.getElementById(id);
  if (to) {
    e.preventDefault();
    to.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

//// Gallery
// Get elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('#lightbox .close');
const galleryImgs = document.querySelectorAll('.gallery img');

let currentIndex = 0;

// Open lightbox
galleryImgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.style.display = 'flex';
  });
});

// Show image by index
function showImage(index) {
  lightboxImg.src = galleryImgs[index].src;
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Click X
closeBtn.addEventListener('click', closeLighstbox);

// Click outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});


// Get new arrow elements
const leftArrow = document.querySelector('#lightbox .arrow.left');
const rightArrow = document.querySelector('#lightbox .arrow.right');

// Show image by index
function showImage(index) {
  lightboxImg.src = galleryImgs[index].src;
}

// Move left
function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  showImage(currentIndex);
}

// Move right
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  showImage(currentIndex);
}

// Arrow button clicks
leftArrow.addEventListener('click', prevImage);
rightArrow.addEventListener('click', nextImage);

// Keyboard controls (unchanged, now reuse functions)
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  }
});
