function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(list) {
    localStorage.setItem("wishlist", JSON.stringify(list));
}

function addToWishlist(product) {
    const list = getWishlist();
    if (!list.find(p => p.id === product.id)) {
        list.push(product);
        saveWishlist(list);
    }
}

function removeFromWishlist(id) {
    saveWishlist(getWishlist().filter(p => p.id !== id));
    location.reload();
}

window.getWishlist = getWishlist;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
