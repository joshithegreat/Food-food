let cart = [];

window.onload = () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
    }, 2000);
};

function addToCart(item, price) {
    let audio = new Audio('click.mp3');
    audio.play();

    cart.push({ item, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(item + ' added to cart!');
    animateCart();
}

function animateCart() {
    let cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.animation = 'cartAnimation 1s';
        setTimeout(() => { cartIcon.style.animation = ''; }, 1000);
    }
}

function goToCart() {
    window.location.href = 'cart.html';
}

function placeOrder() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(JSON.parse(localStorage.getItem('cart')));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    window.location.href = 'thankyou.html';
}

function checkAdmin() {
    let password = document.getElementById('adminPassword').value;
    if (password === '1234') {
        document.getElementById('orders').classList.remove('hidden');
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        let orderList = document.getElementById('orderList');
        orderList.innerHTML = '';
        orders.forEach((order, index) => {
            let li = document.createElement('li');
            li.textContent = `Order ${index + 1}: ` + order.map(o => o.item).join(', ');
            orderList.appendChild(li);
        });
    } else {
        alert('Wrong Password');
    }
}
