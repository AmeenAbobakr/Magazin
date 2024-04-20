// Select the cart icon and cart items container
const cartIcon = document.querySelector('.cart-icon');
const cartItemsContainer = document.querySelector('.cart-items');



// Define an array to store cart items
let cartItems = [];

// Function to add item to cart
function addToCart(productId, productName, price) {
    // Add the item to the cartItems array
    cartItems.push({ id: productId, name: productName, price: price });

    // Update the cart icon count
    updateCartIcon();

    // Update the cart UI
    updateCartUI();
}

// Function to update the cart icon count
function updateCartIcon() {
    const cartCount = cartItems.length;
    document.querySelector('.cart-icon span').textContent = cartCount;
}

// Function to update the cart UI
function updateCartUI() {
    // Clear the existing cart items
    cartItemsContainer.innerHTML = '';

    // Loop through the cart items and append them to the cart items container
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Event listener for clicking on the cart icon
cartIcon.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

// Add event listeners to each "Add to Cart" button
const addToCartButtons = document.querySelectorAll('.cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.pro');
        //const productId = productElement.dataset.productId;
        const productName = productElement.querySelector('.des h5').textContent;
        const productId = productName
        const price = productElement.querySelector('.des h4').textContent.replace('$', '');
        addToCart(productId, productName, price);
    });
});


// Define total price variable
let totalPrice = 0;

// Function to add item to cart
function addToCart(productId, productName, price) {
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === productId);
  
    if (existingItem) {
      // Increase quantity of existing item
      existingItem.quantity++;
    } else {
      // Add new item with quantity 1
      cartItems.push({ id: productId, name: productName, price: parseFloat(price), quantity: 1 });
    }
  
    // Update the total price and cart icon count
    updateCartIcon();
    updateCartUI();
  }

  function removeFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
  
    if (itemIndex !== -1) {
      // Remove the item from the cart
      cartItems.splice(itemIndex, 1);
  
      // Update the total price and cart icon count
      updateCartIcon();
      updateCartUI();
    }
  }
  
  // Function to update the cart icon count
  function updateCartIcon() {
    // Calculate total quantity of items
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('.cart-icon span').textContent = totalQuantity;
  }
  
  function updateCartUI() {
    // Clear the existing cart items
    cartItemsContainer.innerHTML = '';
  
    // Loop through the cart items and append them with quantity and remove button
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item'); // Add a class for styling
  
      const removeButton = document.createElement('div');
      removeButton.innerHTML = '  <i class="fad fa-times" style="--fa-primary-color: #ff0000; --fa-secondary-color: #ff0000;"></i>';
      removeButton.addEventListener('click', () => removeFromCart(item.id));
  
      cartItemElement.textContent = `${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}`;
      cartItemElement.appendChild(removeButton);
      cartItemsContainer.appendChild(cartItemElement);
    });
  
    // Update the total price display
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.querySelector('.cart-total').textContent = `$${totalPrice.toFixed(2)}`;
}