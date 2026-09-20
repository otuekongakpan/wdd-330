import CheckoutProcess from '/js/CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.order-summary');
checkout.init();

// Recalculate tax/shipping/total when user finishes typing the zip
document.querySelector('#zip').addEventListener('blur', () => {
  checkout.calculateOrderTotal();
});

// Handle form submit
document.querySelector('#checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const res = await checkout.checkout(e.target);
    const data = await res.json();
    console.log('Server response:', data);
    alert('Order placed! Check console for server response.');
  } catch (err) {
    console.error('Checkout failed:', err);
    alert('Checkout failed. See console for details.');
  }
});