// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out',
  });

  // Count-up animation for hero stats
  function animateCountUp(el, target, duration = 1500) {
    let start = 0;
    let startTime = null;
    function updateCount(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(updateCount);
  }

  let statsAnimated = false;
  function handleScroll() {
    if (statsAnimated) return;
    const stats = document.querySelectorAll('.count-up');
    const trigger = document.querySelector('.hero-stats');
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      stats.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCountUp(el, target);
      });
      statsAnimated = true;
      window.removeEventListener('scroll', handleScroll);
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // in case already in view

  document.querySelector('.hero-down-arrow').onclick = function(e) {
    e.preventDefault();
    const target = document.getElementById('about');
    const headerOffset = 55; // Adjust this value to your header's height
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Optional: Close menu when a nav link is clicked (on mobile)
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});
});