// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} added to cart!`);
}

// Function to display cart items on cart page
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const placeOrderButton = document.getElementById('placeOrderButton');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        placeOrderButton.style.display = 'none';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `<p>${item.name} - ₹${item.price}</p>`;
            cartItemsDiv.appendChild(itemElement);
        });
        placeOrderButton.style.display = 'block';
    }
}

// Function to place order
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Send order via WhatsApp
    let message = 'New Order:\n';
    cart.forEach(item => {
        message += `${item.name} - ₹${item.price}\n`;
    });

    let url = `https://wa.me/917589882400?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Save order history
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ order: cart, time: new Date().toLocaleString() });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart and redirect to Thank You page
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'thankyou.html';
}

// Function to display orders in admin panel
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersDiv = document.getElementById('orders');
    ordersDiv.innerHTML = '';

    if (orders.length === 0) {
        ordersDiv.innerHTML = '<p>No orders found.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        let itemsList = '';
        order.order.forEach(item => {
            itemsList += `<li>${item.name} - ₹${item.price}</li>`;
        });
        orderElement.innerHTML = `<h3>Order ${index + 1} - ${order.time}</h3><ul>${itemsList}</ul>`;
        ordersDiv.appendChild(orderElement);
    });
}
