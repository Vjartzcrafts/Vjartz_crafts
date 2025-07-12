// script.js
const products = [
  { id: 1, name: 'Resin Keychain', price: 150, category: 'Accessories', image: 'assets/keychain.jpg' },
  { id: 2, name: 'Decor Tray', price: 450, category: 'Home Decor', image: 'assets/tray.jpg' },
  { id: 3, name: 'Nameplate', price: 800, category: 'Nameplates', image: 'assets/nameplate.jpg' },
  { id: 4, name: 'Coaster Set', price: 350, category: 'Tableware', image: 'assets/coasters.jpg' }
];

let cart = [];
let wishlist = [];

window.onload = () => {
  renderProducts(products);
  initSearch();
  initCarousel();
};

function renderProducts(items) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">♡ Wishlist</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cart-count').textContent = `🛒 ${cart.length}`;
  alert(`${product.name} added to cart.`);
  showPaymentOption();
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (!wishlist.find(p => p.id === id)) wishlist.push(product);
  document.getElementById('wishlist-count').textContent = `♥ ${wishlist.length}`;
  alert(`${product.name} added to wishlist.`);
}

function initSearch() {
  const input = document.getElementById('searchInput');
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
  });
}

function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 3000);
}

function showPaymentOption() {
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const orderId = 'VJ' + Math.floor(100000 + Math.random() * 900000);
  const upiLink = `upi://pay?pa=9550588369@ybl&pn=Vjartz%20Crafts&am=${totalAmount}&cu=INR&tn=Order%20${orderId}`;
  const payBtn = document.createElement('a');
  payBtn.href = upiLink;
  payBtn.target = '_blank';
  payBtn.className = 'product-card';
  payBtn.style.background = '#007BFF';
  payBtn.style.color = 'white';
  payBtn.style.padding = '10px';
  payBtn.style.margin = '20px';
  payBtn.style.textAlign = 'center';
  payBtn.style.display = 'block';
  payBtn.innerText = `Pay ₹${totalAmount} via PhonePe`;
  document.body.appendChild(payBtn);
}
