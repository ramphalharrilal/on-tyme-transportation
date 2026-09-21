const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

const rideForm = document.querySelector('[data-ride-form]');
rideForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(rideForm);
  const subject = `Ride inquiry from ${formData.get('name') || 'website visitor'}`;
  const body = [
    'Hello Mrs. A. Jones,',
    '',
    'I would like to ask about an ON TYME ride.',
    '',
    `Name: ${formData.get('name') || ''}`,
    `Phone: ${formData.get('phone') || ''}`,
    `Email: ${formData.get('email') || ''}`,
    `Preferred date: ${formData.get('date') || ''}`,
    `Rider group: ${formData.get('group') || ''}`,
    '',
    'Pickup, destination, and rider details:',
    String(formData.get('details') || ''),
    '',
    'I understand this inquiry does not confirm a ride.',
  ].join('\n');
  const status = rideForm.querySelector('[data-form-status]');
  if (status) status.textContent = 'Opening your email app. Please review the details, then press Send.';
  window.location.href = `mailto:ontymenow@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement?.querySelector('[data-copy-status]');
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      if (status) status.textContent = 'Number copied. Please check the recipient in your banking app.';
    } catch {
      if (status) status.textContent = 'Copy is unavailable here. You can enter the number shown above.';
    }
  });
});
