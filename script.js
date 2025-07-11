
const products = [
  { name: "Keychains", price: 199 },
  { name: "Nameplates", price: 899 },
  { name: "Trays", price: 599 },
  { name: "Varmala Preservation", price: 1499 },
  { name: "Birthday Gifts", price: 799 },
  { name: "Return Gifts", price: 499 },
  { name: "Custom Resin Art", price: 999 }
];

const container = document.getElementById("products");

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `<h3>${product.name}</h3><p>₹${product.price}</p><button onclick='addToCart("${product.name}", ${product.price})'>Add to Cart</button>`;
  container.appendChild(div);
});

let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  alert(name + " added to cart.");
}

function submitOrder() {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const file = document.getElementById("fileInput").files[0]?.name || "None";

  console.log("Order Summary:", { email, message, file, cart });

  alert("Thank you for your order!\n\nWe will contact you soon.\n\nPlease complete payment manually via UPI after we confirm via email.");

  // Reset form
  cart = [];
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("fileInput").value = null;
}
