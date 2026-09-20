import { loadHeaderFooter } from '/js/utils.mjs';
import CheckoutProcess from '/js/CheckoutProcess.mjs';

loadHeaderFooter();   // ← adds this

const checkout = new CheckoutProcess('so-cart', '.order-summary');
checkout.init();
// ...rest unchanged