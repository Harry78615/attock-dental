document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---- HAMBURGER ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu?.classList.contains('open');
    if (spans[0]) spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    if (spans[1]) spans[1].style.opacity = isOpen ? '0' : '1';
    if (spans[2]) spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  /* ---- ACTIVE NAV ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
  });

  /* ---- SCROLL REVEAL ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- SERVICE SELECTOR ---- */
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const parent = opt.closest('.service-selector');
      parent?.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const hiddenInput = document.getElementById('selected-service');
      if (hiddenInput) hiddenInput.value = opt.dataset.service || opt.querySelector('.svc-name')?.textContent || '';
    });
  });

  /* ---- BOOKING FORM — WHATSAPP ---- */
  const bookingForm = document.getElementById('booking-form');
  const successMessage = document.getElementById('form-success');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('.submit-btn');
      const selectedSvc = bookingForm.querySelector('.service-option.selected');
      if (!selectedSvc) { alert('Please select a treatment before submitting.'); return; }
      submitBtn.innerHTML = '<span>⏳</span> Opening WhatsApp...';
      submitBtn.disabled = true;
      const name     = document.getElementById('name')?.value || '';
      const email    = document.getElementById('email')?.value || '';
      const phone    = document.getElementById('phone')?.value || '';
      const service  = document.getElementById('selected-service')?.value || 'General';
      const date     = document.getElementById('date')?.value || '';
      const time     = document.getElementById('time')?.value || '';
      const notes    = document.getElementById('notes')?.value || '';
      const offer    = document.getElementById('applied-offer')?.value || '';
      const discount = document.getElementById('offer-discount')?.value || '';
      const price    = document.getElementById('offer-price')?.value || '';
      let message =
        '*New Appointment Request*\n*Attock Dental Clinic*\n\n' +
        '*Name:* ' + name + '\n' +
        '*Phone:* ' + phone + '\n' +
        '*Email:* ' + email + '\n' +
        '*Service:* ' + service + '\n' +
        '*Preferred Date:* ' + date + '\n' +
        '*Preferred Time:* ' + time + '\n' +
        '*Notes:* ' + (notes || 'None');
      if (offer) {
        message += '\n\n*OFFER APPLIED*\n*Offer:* ' + offer + '\n*Discount:* ' + discount + '\n*Price:* ' + price;
      }
      bookingForm.style.display = 'none';
      if (successMessage) successMessage.style.display = 'block';
      setTimeout(() => {
        window.open('https://wa.me/923109273166?text=' + encodeURIComponent(message), '_blank');
      }, 600);
    });
  }

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.faq-answer');
    toggle?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) { item.classList.add('open'); if (answer) answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ---- TESTIMONIAL SLIDER ---- */
  const track = document.querySelector('.slider-track');
  const dots  = document.querySelectorAll('.slider-dot');
  if (track) {
    let current = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const perView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    const total = Math.ceil(cards.length / perView);
    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      const cardW = cards[0].offsetWidth + 16;
      track.style.transform = `translateX(-${current * perView * cardW}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    document.querySelector('.slider-prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.slider-next')?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    // Auto play
    setInterval(() => goTo(current + 1 >= total ? 0 : current + 1), 5000);
    goTo(0);
  }

  /* ---- DATE MIN ---- */
  const dateInput = document.getElementById('date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

});
