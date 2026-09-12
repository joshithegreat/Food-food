Warning: truncated output (original token count: 1205)
Total output lines: 151

const CART_STORAGE_KEY = 'cart';
const ORDERS_STORAGE_KEY = 'orders';

function readStoredArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

let cart = readStoredArray(CART_STORAGE_KEY);

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartTotal(items = cart) {
    return items.reduce((total, item) => total + Number(item.price || 0), 0);
}

function formatPrice(price) {
    return `₹${Number(price || 0)}`;
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: Number(itemPrice) });
    saveCart();
    alert(`${itemName} added to cart!`);
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const placeOrderButton = document.getElementById('placeOrderButton');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItemsDiv || !placeOrderButton) {
        return;
    }

    cartItemsDiv.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty.';
        cartItemsDiv.appendChild(emptyMessage);
        placeOrderButton.disabled = true;
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            const itemText = document.createElement('span');
            const removeButton = document.createElement('button');

            itemText.textContent = `${item.name} - ${formatPrice(item.price)}`;
            removeButton.type = 'button';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                saveCart();
                displayCart();
            });

            itemElement.append(itemText, removeButton);
            cartItemsDiv.appendC…205 tokens truncated…saveCart();
    window.open(`https://wa.me/917589882400?text=${encodeURIComponent(message)}`, '_blank');
    window.location.href = 'thankyou.html';
}

function displayOrders() {
    const ordersDiv = document.getElementById('orders');
    if (!ordersDiv) {
        return;
    }

    const orders = readStoredArray(ORDERS_STORAGE_KEY);
    const existingTitle = ordersDiv.querySelector('h2');
    ordersDiv.replaceChildren();
    if (existingTitle) {
        ordersDiv.appendChild(existingTitle);
    }

    if (orders.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No orders found on this browser yet.';
        ordersDiv.appendChild(emptyMessage);
        return;
    }

    orders.forEach((order, index) => {
        const orderElement = document.createElement('section');
        const orderTitle = document.createElement('h3');
        const itemsList = document.createElement('ul');
        const items = Array.isArray(order.items) ? order.items : order.order || [];

        orderTitle.textContent = `Order ${index + 1} - ${order.time || 'Unknown time'}`;
        items.forEach((item) => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.name} - ${formatPrice(item.price)}`;
            itemsList.appendChild(itemElement);
        });

        orderElement.append(orderTitle, itemsList);
        if (typeof order.total === 'number') {
            const totalElement = document.createElement('p');
            totalElement.textContent = `Total: ${formatPrice(order.total)}`;
            orderElement.appendChild(totalElement);
        }
        ordersDiv.appendChild(orderElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButton = document.getElementById('placeOrderButton');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', placeOrder);
        displayCart();
    }

    displayOrders();
});

