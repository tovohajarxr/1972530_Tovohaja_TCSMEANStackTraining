"use strict";
// exports.__esModule = true;
sessionStorage.setItem("cart", "[]");
var Item = /** @class */ (function () {
    function Item(id, price, name, img_url, description, num_added) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.img_url = img_url;
        this.description = description;
        this.num_added = num_added;
    }
    ;
    return Item;
}());
var Cart = /** @class */ (function () {
    function Cart(items, total) {
        this.items = items;
        this.total = total;
    }
    ;
    Cart.prototype.removeFromCart = function (item) {
        if (this.items.includes(item)) {
            item.num_added = Math.max(0, item.num_added - 1);
            this.items = this.items.filter(function (item) { return item.num_added > 0; });
            this.total -= item.price;
            sessionStorage.setItem("cart", JSON.stringify(this));
        }
    };
    Cart.prototype.addToCart = function (item) {
        if (!this.items.includes(item)) {
            this.items.push(item);
        }
        item.num_added++;
        this.total += item.price;
        sessionStorage.setItem("cart", JSON.stringify(this));
    };
    return Cart;
}());
// BUG: on refresh, new batch of Item objects are instantiated. 
// work-around: assume no refresh, and refresh means new session ...
var items = [
    new Item(1, 7000, "Golden Egg", "img/goldenEgg.jpeg", "One egg, the perfect investment.", 0),
    new Item(2, 9000, "Lightning in a Bottle", "img/lightningInABottle.jpeg", "They said it couldn't be done.", 0),
    new Item(3, 2500, "Lucky Clover", "img/luckyClover.jpeg", "We could all use a little more luck.", 0),
    new Item(4, 500000, "mini Amazon", "img/amazon.jpeg", "A miniature version of the amazon rainforest, complete with live mini animals and plants.", 0),
    new Item(5, 9000, "Juicy Apple", "img/apple.png", "Simple, elegant and juicy apple.", 0),
    new Item(6, 250, "Bobble gum", "img/bubbleGum.jpeg", "Be careful these can break your jaw.", 0),
    new Item(7, 835, "Ethereal glasses", "img/glasses.jpeg", "Use these to look into the ethereal.", 0),
    new Item(8, 345000, "Remote of the World", "img/remote.jpeg", "Bend time and space at your will with this.", 0),
    new Item(9, 12000, "Old TV", "img/oldTV.jpeg", "Watch netflix on this TV for a nostalgic experience", 0),
    new Item(10, 7500, "Winning Cards", "img/deckOfCards.jpeg", "Play with these cards to always win.", 0),
    new Item(11, 150000, "Mona Lisa painting", "img/monaLisa.jpeg", "Basically identical to the original.", 0),
];
// update cart based on session storage instead of reverting to empty cart on refresh
var cart = new Cart([], 0);
if (sessionStorage.getItem("cart") != null
    && JSON.parse(sessionStorage.getItem("cart")).items != undefined
    && JSON.parse(sessionStorage.getItem("cart")).items.length > 0) {
    cart.items = JSON.parse(sessionStorage.getItem("cart")).items;
    cart.total = JSON.parse(sessionStorage.getItem("cart")).total;
}
// utility
function usd(n) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(n); /* eg. $2,500.00 */
}
// toggle cart
function toggleCart() {
    var element = document.getElementById("cart");
    if (element.classList.contains("compressed")) {
        element.classList.remove("compressed");
    }
    else {
        element.classList.add("compressed");
    }
}
// load items into html
function loadItem(item) {
    var content = "\n<div class=\"card\"\">\n    <img class=\"card-img-top\" src=\"" + item.img_url + "\">\n    <div class=\"card-body\">\n        <h5 class=\"card-title\">" + item.name + "</h5>\n        <p class=\"card-text\">" + item.description + "</p>\n        <p class=\"card-text\"><small class=\"text-muted\"> " + usd(item.price) + "</small></p>\n    </div>\n    <div class=\"editing\">\n        <i class=\"fas fa-minus-circle\" onclick=\"removeFromCart(" + item.id + ")\"></i>\n        <i class=\"fas fa-plus-circle\" onclick=\"addToCart(" + item.id + ")\"></i>\n    </div>\n</div>  \n    ";
    document.write(content);
}
function loadAllItems() {
    items.forEach(function (item) { return loadItem(item); });
}
function loadCartItem(item) {
    var content = "\n<tr>\n    <td><img class=\"cart-img-icon\" src=\"" + item.img_url + "\"></td>\n    <td>" + item.name + "</td>\n    <td>x" + item.num_added + "</td>\n    <td>" + usd(item.num_added * item.price) + "</td>\n</tr>\n        ";
    document.getElementById("cart-items").innerHTML += content;
}
function loadAllCartItems() {
    document.getElementById("cart-items").innerHTML = "";
    var my_cart = JSON.parse(sessionStorage.getItem("cart")).items;
    my_cart.forEach(function (item) { return loadCartItem(item); });
}
function loadNumAdded() {
    var total = 0;
    cart.items.forEach(function (item) { return total += item.num_added; });
    if (total > 0)
        document.getElementById("numz").innerHTML = "<b>" + total + "</b>";
    else
        document.getElementById("numz").innerHTML = "";
}
function loadCartTotal() {
    var total = 0;
    cart.items.forEach(function (item) { return total += item.num_added * item.price; });
    document.getElementById("cartTotal").innerHTML = usd(total);
}
// ============= FN ============= //
function addToCart(id) {
    cart.addToCart(items[id - 1]);
    loadAllCartItems();
    loadNumAdded();
    loadCartTotal();
}
function removeFromCart(id) {
    cart.removeFromCart(items[id - 1]);
    loadAllCartItems();
    loadNumAdded();
    loadCartTotal();
}
