// Add item to cart
function addToCart(itemName, itemPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    playClickSound();
    alert(${itemName} added to cart!);
}

// Play button click sound
function playClickSound() {
    const audio = new Audio('Click.mp3.wav');
    audio.play();
}

// Load cart items on cart page
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = ${item.name} - ₹${item.price} x ${item.quantity};
        cartItemsDiv.appendChild(itemDiv);
    });
}

// Place order and redirect to WhatsApp
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let orderDetails = 'Order Details:\n';
    let total = 0;

    cart.forEach(item => {
        orderDetails += ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n;
        total += item.price * item.quantity;
    });

    orderDetails += \nTotal: ₹${total};

    const whatsappURL = https://wa.me/917589882400?text=${encodeURIComponent(orderDetails)};
    window.location.href = whatsappURL;

    // Clear cart after placing order
    localStorage.removeItem('cart');
}

// Attach events when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('cartItems')) {
        loadCart();
    }

    const placeOrderButton = document.getElementById('placeOrder');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', placeOrder);
    }
});
