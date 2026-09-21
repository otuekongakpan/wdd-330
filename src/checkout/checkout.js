import { loadHeaderFooter, alertMessage } from '/js/utils.mjs';
import CheckoutProcess from '/js/CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.order-summary');
checkout.init();

document.querySelector('#zip').addEventListener('blur', () => {
  checkout.calculateOrderTotal();
});

document.querySelector('#checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const valid = form.checkValidity();
  form.reportValidity();

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Processing...';

  try {
    const res = await checkout.checkout(form);
    const data = await res.json();
    console.log('Server response:', data);

    localStorage.removeItem('so-cart');
    window.location.href = '/checkout/success.html';
  } catch (err) {
    console.error('Checkout failed:', err);

    let message;
    if (err?.name === 'servicesError' && err?.message?.message) {
      message = err.message.message;
    } else if (err?.message === 'Failed to fetch') {
      message = 'Unable to reach the checkout server. Please try again later.';
    } else {
      message = err?.message || 'Checkout failed. Please try again.';
    }

    alertMessage(message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Checkout';
  }
});