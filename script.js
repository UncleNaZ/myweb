let cart = [];
let total = 0;

// Define Products with Descriptions and Images
const products = [
  {
    name: 'IR BLASTER',
    price: 10,
    description: 'IR BLASTER IS A DEVICE THAT ALLOWS YOU TO CONNECT TO EVERYTHING THAT HAS A REMOTE LIKE TVs, ACs, Fans...',
    image: 'images/product1.jpg',
  },
  {
    name: 'Product 2',
    price: 15,
    description: 'A premium product with high quality and durability.',
    image: 'images/product2.jpg',
  },
  {
    name: 'Product 3',
    price: 20,
    description: 'Stylish and functional, perfect for daily use.',
    image: 'images/product3.jpg',
  },
  {
    name: 'Product 4',
    price: 30,
    description: 'Top-of-the-line product for discerning customers.',
    image: 'images/product4.jpg',
  },
];

// Display Products
function displayProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = ''; // Clear previous content

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" onclick="openProductDetails('${product.name}')"/>
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <p class="description">${product.description}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}

// Open Product Details Modal
function openProductDetails(productName) {
  const product = products.find(p => p.name === productName);
  document.getElementById('modalTitle').innerText = product.name;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalDescription').innerText = product.description;
  document.getElementById('productModal').style.display = 'block';

  // Add to cart from modal
  document.getElementById('addToCartFromModal').onclick = function() {
    addToCart(product.name, product.price);
    closeModal();
  };
}

// Add to Cart
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartList = document.getElementById('cart-list');
  const totalDisplay = document.getElementById('total');
  cartList.innerHTML = '';

  cart.forEach((item) => {
    cartList.innerHTML += `<li>${item.name} - $${item.price}</li>`;
  });

  totalDisplay.innerText = total;
}

// Checkout Redirect
document.getElementById('checkout').addEventListener('click', () => {
  let message = 'Hello, I want to order:\n';

  cart.forEach((item) => {
    message += `- ${item.name} - $${item.price}\n`;
  });

  message += `Total: $${total}`;
  const whatsappLink = `https://wa.me/96178839213?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
});

// Close Modal
document.getElementById('closeModal').addEventListener('click', closeModal);

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

// Display products when the page loads
window.onload = displayProducts;
