/* ================================================
   ATTOCK DENTAL CLINIC — Main JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---- HAMBURGER MENU ---- */
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

  /* ---- ACTIVE NAV LINK ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- SCROLL REVEAL ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- SERVICE SELECTOR (booking form) ---- */
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const parent = opt.closest('.service-selector');
      parent?.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const hiddenInput = document.getElementById('selected-service');
      if (hiddenInput) hiddenInput.value = opt.dataset.service || opt.querySelector('.svc-name')?.textContent || '';
    });
  });

  /* ---- BOOKING FORM SUBMISSION ---- */
  const bookingForm = document.getElementById('booking-form');
  const successMessage = document.getElementById('form-success');

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = bookingForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>⏳</span> Sending...';
      submitBtn.disabled = true;

      // Check that a service is selected
      const selectedSvc = bookingForm.querySelector('.service-option.selected');
      if (!selectedSvc) {
        alert('Please select a service before submitting.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
      }

      const formData = new FormData(bookingForm);

      try {
        const response = await fetch(bookingForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          bookingForm.style.display = 'none';
          if (successMessage) {
            successMessage.style.display = 'block';
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        // Fallback: if Formspree not configured, show mailto
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        const service = document.getElementById('selected-service')?.value || 'General';
        const date = formData.get('date') || '';
        const time = formData.get('time') || '';
        const notes = formData.get('notes') || '';

        const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0APreferred Date: ${date}%0APreferred Time: ${time}%0ANotes: ${notes}`;
        window.location.href = `https://wa.me/923109273166?text=` + encodeURIComponent(
  `*New Appointment Request*\n\n` +
  `*Name:* ${name}\n` +
  `*Phone:* ${phone}\n` +
  `*Service:* ${service}\n` +
  `*Preferred Date:* ${date}\n` +
  `*Preferred Time:* ${time}\n` +
  `*Notes:* ${notes || 'None'}\n` +
  (formData.get('applied_offer') ? `\n*🏷️ OFFER:* ${formData.get('applied_offer')}\n*Discount:* ${formData.get('offer_discount')}` : ``)
);

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
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
      if (!isOpen) {
        item.classList.add('open');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
