import { stringify } from "querystring";

sessionStorage.setItem("cart", "[]");

class Item {
    constructor(
        public id: number,
        public price: number,
        public name: string,
        public img_url: string,
        public description: string,
        public num_added: number
    ) {};
}

class Cart {
    constructor(
        public items,
        public total: number
    ) {}; 
    
    removeFromCart(item) {
        if (this.items.includes(item)) {
            item.num_added = Math.max(0, item.num_added - 1);
            this.items = this.items.filter(item => item.num_added > 0);

            this.total -= item.price;
            sessionStorage.setItem("cart", JSON.stringify(this));
        }
    }

    addToCart(item) {
        if (!this.items.includes(item)) {
            this.items.push(item);
        } 
        item.num_added++;
        this.total += item.price;
        sessionStorage.setItem("cart", JSON.stringify(this));
    }
}

// BUG: on refresh, new batch of Item objects are instantiated. 
// work-around: assume no refresh, and refresh means new session ...
const items = [
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
]

// update cart based on session storage instead of reverting to empty cart on refresh
let cart = new Cart([], 0);
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
    let element = document.getElementById("cart");
    if (element.classList.contains("compressed")) {
        element.classList.remove("compressed");
    } else {
        element.classList.add("compressed");
    }
}

// load items into html
function loadItem(item) {
    let content = `
<div class="card"">
    <img class="card-img-top" src="${item.img_url}">
    <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-text"><small class="text-muted"> ${usd(item.price)}</small></p>
    </div>
    <div class="editing">
        <i class="fas fa-minus-circle" onclick="removeFromCart(${item.id})"></i>
        <i class="fas fa-plus-circle" onclick="addToCart(${item.id})"></i>
    </div>
</div>  
    `
    document.write(content);
}

function loadAllItems() {
    items.forEach(item => loadItem(item));
} 

function loadCartItem(item) {
    let content = `
<tr>
    <td><img class="cart-img-icon" src="${item.img_url}"></td>
    <td>${item.name}</td>
    <td>x${item.num_added}</td>
    <td>${usd(item.num_added * item.price)}</td>
</tr>
        `
    document.getElementById("cart-items").innerHTML += content;
}

function loadAllCartItems() {
    document.getElementById("cart-items").innerHTML = "";
    let my_cart = JSON.parse(sessionStorage.getItem("cart")).items;
    my_cart.forEach(item => loadCartItem(item));
} 

function loadNumAdded() {
    let total = 0;
    cart.items.forEach(item => total += item.num_added);

    if (total > 0)
        document.getElementById("numz").innerHTML = `<b>${total}</b>`;
    else 
        document.getElementById("numz").innerHTML = "";
}

function loadCartTotal() {
    let total = 0;
    cart.items.forEach(item => total += item.num_added * item.price);

    document.getElementById("cartTotal").innerHTML = usd(total);
}

// ============= FN ============= //
function addToCart(id: number) {
    cart.addToCart( items[id - 1] );
    loadAllCartItems();
    loadNumAdded();
    loadCartTotal();
}

function removeFromCart(id: number) {
    cart.removeFromCart( items[id - 1] );
    loadAllCartItems();
    loadNumAdded();
    loadCartTotal();
}