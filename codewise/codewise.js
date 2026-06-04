/* ═══════════════════════════════
   Codewise — Interactions
   ═══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── MOBILE NAV ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }

  // ── NAV SCROLL ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 10, 10, 0.95)';
      nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      nav.style.background = 'rgba(10, 10, 10, 0.85)';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.product-card, .service-card, .price-card, .about-grid, .contact-grid, .asc-item, .early-access-box').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // ── AI BRAIN ANIMATION ──
  const afmItems = document.querySelectorAll('.afm-item');
  let currentFeature = 0;
  setInterval(() => {
    afmItems.forEach(i => i.classList.remove('active'));
    afmItems[currentFeature].classList.add('active');
    currentFeature = (currentFeature + 1) % afmItems.length;
  }, 2500);

  // ── CONTACT FORM ──
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const formData = {
        date: new Date().toLocaleString(),
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        business: document.getElementById('business').value,
        interest: document.getElementById('interest').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value,
        status: 'New Lead',
        source: 'Website'
      };
      console.log("FORM DATA:", formData);
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxWiIYSe1W3fFD2zgqaVxbJxATQHcbiEDEh90luAnwUQOUAO94nzH83g-FOBFlbHBGAxA/exec',
          {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        );

        contactForm.innerHTML = `
          <div class="form-success">
            <div class="checkmark">✅</div>
            <h3>Lead Captured!</h3>
            <p>Thank you for reaching out. We'll contact you soon.</p>
          </div>
        `;

      } catch (error) {
        console.error(error);
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        alert('Unable to submit form. Please try again.');
      }
    });
  }


  console.log('%c⚡ Codewise — Building in public ✨', 'color: #d4a843; font-weight: bold; font-size: 14px;');
});
