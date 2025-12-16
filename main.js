/**************** CART COUNT ****************/
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const span = document.getElementById("cart-count");
    if (span) span.innerText = count;
}
updateCartCount();

/**************** PRODUCTS PAGE ****************/
const productList = document.getElementById("product-list");

if (productList) {
    productList.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}" class="product-img">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>

            <div class="btn-group">
                <button class="cart-btn" data-id="${product.id}">Add to Cart</button>
                <button class="wish-btn" data-id="${product.id}">♡ Wishlist</button>
                <a href="product-details.html?id=${product.id}">Details</a>
            </div>
        `;

        productList.appendChild(div);
    });

    document.querySelectorAll(".cart-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const product = products.find(p => p.id == this.dataset.id);
            addToCart(product);
            updateCartCount();
        });
    });

    document.querySelectorAll(".wish-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const product = products.find(p => p.id == this.dataset.id);
            addToWishlist(product);
            alert("Added to wishlist");
        });
    });
}

/**************** PRODUCT DETAILS PAGE ****************/
const detailsDiv = document.getElementById("product-details");

if (detailsDiv) {
    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find(p => p.id == id);

    if (product) {
        detailsDiv.innerHTML = `
            <img src="${product.image}" class="details-img">
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
            <p>${product.description}</p>

            <button id="details-cart">Add to Cart</button>
            <button id="details-wish">Add to Wishlist</button>
        `;

        document.getElementById("details-cart").onclick = () => {
            addToCart(product);
            updateCartCount();
        };

        document.getElementById("details-wish").onclick = () => {
            addToWishlist(product);
            alert("Added to wishlist");
        };
    }
}

/**************** CART PAGE ****************/
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalDiv = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

if (cartItemsDiv && cartTotalDiv) {
    const cart = getCart();
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalDiv.innerText = "";
        if (checkoutBtn) checkoutBtn.style.display = "none";
    } else {
        if (checkoutBtn) checkoutBtn.style.display = "inline-block";

        cart.forEach(item => {
            total += item.price * item.quantity;

            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <strong>${item.name}</strong>
                <p>₹${item.price}</p>

                <div class="qty-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>

                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;

            cartItemsDiv.appendChild(div);
        });

        cartTotalDiv.innerText = "Total: ₹" + total;
    }
}

/**************** WISHLIST PAGE ****************/
const wishDiv = document.getElementById("wishlist-items");

if (wishDiv) {
    const list = getWishlist();

    if (list.length === 0) {
        wishDiv.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        wishDiv.innerHTML = "";

        list.forEach(item => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <strong>${item.name}</strong>
                <p>₹${item.price}</p>
                <button onclick="removeFromWishlist(${item.id})">Remove</button>
            `;

            wishDiv.appendChild(div);
        });
    }
}
