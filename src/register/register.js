import { loadHeaderFooter, alertMessage } from '/js/utils.mjs';
import ExternalServices from '/js/ExternalServices.mjs';

loadHeaderFooter();

const services = new ExternalServices();

document.querySelector('#register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  // Validate using HTML5 built-in validation
  const valid = form.checkValidity();
  form.reportValidity();
  if (!valid) return;

  try {
    const res = await services.register(form);
    const data = await res.json();
    console.log('Registration response:', data);

    // Redirect to login or home on success
    window.location.href = '/login/index.html';
  } catch (err) {
    console.error('Registration failed:', err);

    let message = 'Registration failed. Please try again.';
    if (err?.name === 'servicesError' && err?.message?.message) {
      message = err.message.message;
    } else if (err?.message) {
      message = err.message;
    }

    alertMessage(message);
  }
});