// =======================
// PRODUCT PAGE FEATURES
// =======================

// Cart logic (store in localStorage)
let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach((btn) => {
  btn.addEventListener('click', () => {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;

    const product = btn.parentElement;
    const title = product.querySelector('h3').textContent;
    const price = product.querySelector('p').textContent;

    cartItems.push({ title, price });
    localStorage.setItem('cart', JSON.stringify(cartItems));
  });
});

// Filter by category
const categoryFilter = document.getElementById('category');
if (categoryFilter) {
  categoryFilter.addEventListener('change', (e) => {
    const value = e.target.value;
    document.querySelectorAll('.product').forEach((product) => {
      product.style.display =
        value === 'all' || product.dataset.category === value
          ? 'block'
          : 'none';
    });
  });
}

// =======================
// CHECKOUT PAGE FEATURES
// =======================

if (document.getElementById('cart-list')) {
  let cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const list = document.getElementById('cart-list');
  const totalDisplay = document.getElementById('total-price');

  function updateTotal() {
    const total = cartData.reduce((sum, item) => {
      return sum + parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    }, 0);
    totalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  function renderCart() {
    list.innerHTML = '';
    cartData.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.title} - ${item.price}
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      list.appendChild(li);
    });

    updateTotal();
    attachRemoveEvents();
  }

  function attachRemoveEvents() {
    document.querySelectorAll('.remove-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        cartData.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartData));
        renderCart();
      });
    });
  }

  renderCart();
}

// =======================
// SPARKLE ANIMATION
// =======================

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');

  sparkle.style.left = `${Math.random() * window.innerWidth}px`;
  sparkle.style.top = `${-10}px`;
  sparkle.style.width = `${Math.random() * 6 + 4}px`;
  sparkle.style.height = sparkle.style.width;
  sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;

  document.getElementById('sparkle-container')?.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 4000);
}

setInterval(() => {
  for (let i = 0; i < 3; i++) createSparkle();
}, 500);