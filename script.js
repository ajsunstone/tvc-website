(function () {
  const modal = document.getElementById('apply-modal');
  const openButtons = [
    document.getElementById('open-apply'),
    document.getElementById('open-apply-hero')
  ].filter(Boolean);
  const closeElements = Array.from(document.querySelectorAll('[data-close]'));
  const form = document.getElementById('apply-form');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    const nameInput = document.getElementById('fullName');
    if (nameInput) nameInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
  }

  openButtons.forEach(btn => btn && btn.addEventListener('click', openModal));
  closeElements.forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function setError(inputId, message) {
    const el = document.querySelector(`.error[data-for="${inputId}"]`);
    if (el) el.textContent = message || '';
  }

  function validateName(value) {
    return /^[A-Za-z][A-Za-z\s'.-]{1,60}$/.test(value.trim());
  }

  function validatePhone(value) {
    return /^\d{10}$/.test(value.trim());
  }

  function validatePAN(value) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.trim().toUpperCase());
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName');
      const phone = document.getElementById('phone');
      const pan = document.getElementById('pan');

      const nameValid = validateName(name.value);
      const phoneValid = validatePhone(phone.value);
      const panValid = validatePAN(pan.value);

      setError('fullName', nameValid ? '' : 'Please enter a valid full name.');
      setError('phone', phoneValid ? '' : 'Enter a valid 10-digit mobile number.');
      setError('pan', panValid ? '' : 'Enter a valid PAN (e.g., ABCDE1234F).');

      if (nameValid && phoneValid && panValid) {
        // In a real app, you would send this to a backend. For now, store briefly then redirect.
        try {
          const payload = {
            fullName: name.value.trim(),
            phone: phone.value.trim(),
            pan: pan.value.trim().toUpperCase(),
            ts: Date.now()
          };
          sessionStorage.setItem('tvc_application', JSON.stringify(payload));
        } catch (err) {
          // ignore storage errors
        }
        window.location.href = 'thank-you.html';
      }
    });
  }
})(); 