function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Product added to cart");
}

function updateQuantity(id, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (item.quantity === 1 && change === -1) return;

    item.quantity += change;
    saveCart(cart);
    location.reload();
}

function removeFromCart(id) {
    saveCart(getCart().filter(item => item.id !== id));
    location.reload();
}

function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}
function placeOrder() {
    if (getCart().length === 0) {
        alert("Your cart is empty");
        return;
    }

    localStorage.removeItem("cart");
    window.location.href = "order.html";
}

window.placeOrder = placeOrder;
window.getCart = getCart;
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
