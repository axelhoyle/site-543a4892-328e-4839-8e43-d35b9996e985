// Theme toggle
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Hero logo write-in on scroll (simplified, triggers once)
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    var colorImg = document.querySelector('.name-write-img .color');
    if (colorImg) colorImg.style.clipPath = 'inset(0 0% 0 0)';
    return;
  }
  var triggered = false;
  function onScroll() {
    if (triggered) return;
    var scrolled = window.scrollY;
    var pin = document.querySelector('.name-pin');
    if (!pin) return;
    var pinH = pin.offsetHeight;
    var progress = Math.min(scrolled / (pinH * 0.6), 1);
    var colorImg = document.querySelector('.name-write-img .color');
    if (!colorImg) return;
    var pct = Math.round(progress * 100);
    colorImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    if (progress >= 1) triggered = true;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Smooth anchor scrolling to account for fixed header
(function () {
  var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
