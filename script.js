```javascript
/* PRODUCT DATA */

const products = [

    {
        id:1,
        name:"Velocity Runner",
        category:"Running",
        gender:"Men",
        type:"Sneakers",
        price:4999,
        originalPrice:6999,
        discount:29,
        rating:4.5,
        new:true,
        description:"Lightweight performance-inspired running shoe.",
        sizes:["6","7","8","9","10","11"]
    },

    {
        id:2,
        name:"Street Rider",
        category:"Lifestyle",
        gender:"Women",
        type:"Sneakers",
        price:4299,
        originalPrice:5999,
        discount:28,
        rating:4.6,
        new:false,
        description:"Clean street sneaker with an athletic attitude.",
        sizes:["6","7","8","9","10"]
    },

    {
        id:3,
        name:"RS-X Style",
        category:"Sneakers",
        gender:"Men",
        type:"Sneakers",
        price:5799,
        originalPrice:7999,
        discount:28,
        rating:4.8,
        new:true,
        description:"Retro-inspired chunky sneaker.",
        sizes:["7","8","9","10","11"]
    },

    {
        id:4,
        name:"Court Classic",
        category:"Sneakers",
        gender:"Kids",
        type:"Sneakers",
        price:2999,
        originalPrice:3999,
        discount:25,
        rating:4.4,
        new:false,
        description:"Classic court styling for active days.",
        sizes:["6","7","8","9","10"]
    },

    {
        id:5,
        name:"Essential Logo Tee",
        category:"Clothing",
        gender:"Men",
        type:"Clothing",
        price:1499,
        originalPrice:1999,
        discount:25,
        rating:4.3,
        new:false,
        description:"Everyday cotton sports tee.",
        sizes:["S","M","L","XL"]
    },

    {
        id:6,
        name:"Performance Hoodie",
        category:"Clothing",
        gender:"Women",
        type:"Clothing",
        price:2999,
        originalPrice:4499,
        discount:33,
        rating:4.7,
        new:true,
        description:"Soft performance-inspired hoodie.",
        sizes:["S","M","L","XL"]
    },

    {
        id:7,
        name:"Training Shorts",
        category:"Clothing",
        gender:"Men",
        type:"Clothing",
        price:1799,
        originalPrice:2499,
        discount:28,
        rating:4.5,
        new:true,
        description:"Flexible training shorts.",
        sizes:["S","M","L","XL"]
    },

    {
        id:8,
        name:"Active Track Jacket",
        category:"Clothing",
        gender:"Women",
        type:"Clothing",
        price:3499,
        originalPrice:4999,
        discount:30,
        rating:4.6,
        new:false,
        description:"Sporty everyday track jacket.",
        sizes:["S","M","L","XL"]
    },

    {
        id:9,
        name:"Run Cap",
        category:"Accessories",
        gender:"Men",
        type:"Accessories",
        price:999,
        originalPrice:1499,
        discount:33,
        rating:4.2,
        new:true,
        description:"Lightweight sports cap.",
        sizes:[]
    },

    {
        id:10,
        name:"Training Backpack",
        category:"Accessories",
        gender:"Women",
        type:"Accessories",
        price:2299,
        originalPrice:3299,
        discount:30,
        rating:4.4,
        new:true,
        description:"Compact training backpack.",
        sizes:[]
    },

    {
        id:11,
        name:"Kids Active Tee",
        category:"Clothing",
        gender:"Kids",
        type:"Clothing",
        price:1199,
        originalPrice:1599,
        discount:25,
        rating:4.1,
        new:false,
        description:"Comfortable activewear tee.",
        sizes:["S","M","L"]
    },

    {
        id:12,
        name:"Aero Sprint",
        category:"Running",
        gender:"Women",
        type:"Sneakers",
        price:5299,
        originalPrice:7499,
        discount:29,
        rating:4.8,
        new:true,
        description:"Responsive running-inspired shoe.",
        sizes:["6","7","8","9","10"]
    }

];


/* APPLICATION STATE */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

let theme =
    localStorage.getItem("theme") || "light";

let activeFilter = "All";

let searchTerm = "";

let selectedProduct = null;

let selectedSize = null;

let quickQuantity = 1;


/* SHORT SELECTOR */

const $ = selector =>
    document.querySelector(selector);


/* MONEY FORMAT */

function money(value){

    return "₹" + value.toLocaleString("en-IN");

}


/* FIND PRODUCT */

function getProduct(id){

    return products.find(product =>
        product.id === id
    );

}


/* SAVE DATA */

function saveData(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "theme",
        theme
    );

}


/* PRODUCT IMAGE */

function productImage(product){

    const clothing =
        product.type === "Clothing"
        ? "clothing"
        : "";

    return `
        <div class="product-image ${clothing}">
            <span>
                ${product.type === "Clothing"
                    ? "FIT"
                    : "MOVE"}
            </span>
        </div>
    `;

}


/* PRODUCT CARD */

function productCard(product){

    const isWishlisted =
        wishlist.includes(product.id);

    return `

        <article class="product-card">

            ${
                product.new
                ? `<span class="badge">NEW</span>`
                : ""
            }

            <button
                class="wish ${
                    isWishlisted ? "active" : ""
                }"
                data-wishlist="${product.id}"
            >
                ${isWishlisted ? "♥" : "♡"}
            </button>

            ${productImage(product)}

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="category">
                    ${product.gender} ·
                    ${product.category}
                </div>

                <div class="rating">
                    ★ ${product.rating}
                </div>

                <div class="price">

                    <strong>
                        ${money(product.price)}
                    </strong>

                    <span class="old">
                        ${money(product.originalPrice)}
                    </span>

                    <span class="discount">
                        -${product.discount}%
                    </span>

                </div>

                <div class="card-actions">

                    <button
                        class="small-btn primary"
                        data-cart="${product.id}"
                    >
                        ADD TO CART
                    </button>

                    <button
                        class="small-btn"
                        data-quick="${product.id}"
                    >
                        QUICK VIEW
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* RENDER PRODUCTS */

function renderProducts(){

    let filtered =
        products.filter(product => {

            const matchesFilter =
                activeFilter === "All" ||
                product.gender === activeFilter ||
                product.category === activeFilter ||
                product.type === activeFilter;

            const text =
                `${product.name}
                 ${product.category}
                 ${product.gender}
                 ${product.type}`.toLowerCase();

            const matchesSearch =
                text.includes(
                    searchTerm.toLowerCase()
                );

            return matchesFilter &&
                   matchesSearch;

        });


    const sort =
        $("#sortSelect").value;


    if(sort === "low"){

        filtered.sort(
            (a,b) => a.price - b.price
        );

    }

    if(sort === "high"){

        filtered.sort(
            (a,b) => b.price - a.price
        );

    }

    if(sort === "rating"){

        filtered.sort(
            (a,b) => b.rating - a.rating
        );

    }

    if(sort === "newest"){

        filtered.sort(
            (a,b) => Number(b.new) - Number(a.new)
        );

    }


    $("#productGrid").innerHTML =
        filtered.map(productCard).join("");


    $("#emptyState")
        .classList.toggle(
            "hidden",
            filtered.length > 0
        );

}


/* NEW PRODUCTS */

function renderNewProducts(){

    const newProducts =
        products.filter(product =>
            product.new
        );

    $("#newGrid").innerHTML =
        newProducts
        .slice(0,6)
        .map(productCard)
        .join("");

}


/* FILTER */

$("#filterBar").addEventListener(
    "click",
    function(event){

        const button =
            event.target.closest(".filter");

        if(!button) return;

        activeFilter =
            button.dataset.filter;

        document
            .querySelectorAll(".filter")
            .forEach(filter =>
                filter.classList.remove("active")
            );

        button.classList.add("active");

        renderProducts();

    }
);


/* SEARCH */

$("#searchInput").addEventListener(
    "input",
    function(event){

        searchTerm =
            event.target.value;

        renderProducts();

    }
);


/* CLEAR SEARCH */

$("#clearSearch").addEventListener(
    "click",
    function(){

        $("#searchInput").value = "";

        searchTerm = "";

        renderProducts();

    }
);


/* SORT */

$("#sortSelect").addEventListener(
    "change",
    renderProducts
);


/* RESET */

$("#resetBtn").addEventListener(
    "click",
    function(){

        activeFilter = "All";

        searchTerm = "";

        $("#searchInput").value = "";

        document
            .querySelectorAll(".filter")
            .forEach(filter => {

                filter.classList.toggle(
                    "active",
                    filter.dataset.filter === "All"
                );

            });

        renderProducts();

    }
);


/* TOAST */

function showToast(message){

    const toast =
        $("#toast");

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(
            () => toast.classList.remove("show"),
            2500
        );

}


/* WISHLIST */

function toggleWishlist(id){

    if(wishlist.includes(id)){

        wishlist =
            wishlist.filter(
                productId => productId !== id
            );

        showToast(
            "Removed from wishlist"
        );

    }else{

        wishlist.push(id);

        showToast(
            "Added to wishlist"
        );

    }

    saveData();

    updateWishlistCount();

    renderProducts();

    renderNewProducts();

}


/* WISHLIST COUNT */

function updateWishlistCount(){

    $("#wishlistCount").textContent =
        wishlist.length;

}


/* ADD CART */

function addToCart(
    id,
    size = null,
    quantity = 1
){

    const product =
        getProduct(id);


    if(
        product.sizes.length > 0 &&
        !size
    ){

        openQuickView(id);

        showToast(
            "Please select a size"
        );

        return;

    }


    const existing =
        cart.find(item =>
            item.id === id &&
            item.size === size
        );


    if(existing){

        existing.quantity +=
            quantity;

    }else{

        cart.push({

            id:id,

            size:size || "ONE",

            quantity:quantity

        });

    }


    saveData();

    renderCart();

    showToast(
        "Added to cart"
    );

}


/* RENDER CART */

function renderCart(){

    const cartItems =
        $("#cartItems");


    if(cart.length === 0){

        cartItems.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🛍
                </div>

                <h3>
                    Your cart is empty.
                </h3>

                <p>
                    Add something you love.
                </p>

            </div>

        `;

    }else{

        cartItems.innerHTML =
            cart.map(item => {

                const product =
                    getProduct(item.id);

                return `

                    <div class="cart-row">

                        <div class="cart-thumb">
                            MOVE
                        </div>

                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <small>
                                ${
                                    item.size !== "ONE"
                                    ? "Size: " + item.size
                                    : "One size"
                                }
                            </small>

                            <div class="qty">

                                <button
                                    data-quantity="${product.id}|${item.size}|-1"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    data-quantity="${product.id}|${item.size}|1"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                        <div>

                            <strong>
                                ${
                                    money(
                                        product.price *
                                        item.quantity
                                    )
                                }
                            </strong>

                            <br>

                            <button
                                class="remove"
                                data-remove="${product.id}|${item.size}"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                `;

            }).join("");

    }


    let subtotal = 0;


    cart.forEach(item => {

        const product =
            getProduct(item.id);

        subtotal +=
            product.price *
            item.quantity;

    });


    $("#subtotal").textContent =
        money(subtotal);

    $("#total").textContent =
        money(subtotal);

    $("#checkoutTotal").textContent =
        money(subtotal);


    const count =
        cart.reduce(
            (total,item) =>
                total + item.quantity,
            0
        );

    $("#cartCount").textContent =
        count;

}


/* CART QUANTITY */

document.addEventListener(
    "click",
    function(event){

        const quantityButton =
            event.target.closest(
                "[data-quantity]"
            );

        if(!quantityButton) return;


        const [
            id,
            size,
            change
        ] =
            quantityButton
            .dataset
            .quantity
            .split("|");


        const item =
            cart.find(cartItem =>
                cartItem.id === Number(id) &&
                cartItem.size === size
            );


        if(!item) return;


        item.quantity +=
            Number(change);


        if(item.quantity <= 0){

            cart =
                cart.filter(
                    cartItem =>
                        cartItem !== item
                );

        }


        saveData();

        renderCart();

    }
);


/* REMOVE CART ITEM */

document.addEventListener(
    "click",
    function(event){

        const removeButton =
            event.target.closest(
                "[data-remove]"
            );

        if(!removeButton) return;


        const [
            id,
            size
        ] =
            removeButton
            .dataset
            .remove
            .split("|");


        cart =
            cart.filter(item =>
                !(
                    item.id === Number(id) &&
                    item.size === size
                )
            );


        saveData();

        renderCart();

        showToast(
            "Product removed from cart"
        );

    }
);


/* PRODUCT BUTTONS */

document.addEventListener(
    "click",
    function(event){

        const cartButton =
            event.target.closest(
                "[data-cart]"
            );

        if(cartButton){

            addToCart(
                Number(
                    cartButton.dataset.cart
                )
            );

            return;

        }


        const wishButton =
            event.target.closest(
                "[data-wishlist]"
            );

        if(wishButton){

            toggleWishlist(
                Number(
                    wishButton.dataset.wishlist
                )
            );

            return;

        }


        const quickButton =
            event.target.closest(
                "[data-quick]"
            );

        if(quickButton){

            openQuickView(
                Number(
                    quickButton.dataset.quick
                )
            );

        }

    }
);


/* QUICK VIEW */

function openQuickView(id){

    selectedProduct =
        getProduct(id);

    selectedSize = null;

    quickQuantity = 1;


    const product =
        selectedProduct;


    $("#quickContent").innerHTML = `

        <div class="quick-layout">

            <div class="quick-image">

                ${product.type === "Clothing"
                    ? "FIT"
                    : "MOVE"}

            </div>

            <div class="quick-info">

                <p class="eyebrow">
                    ${product.gender}
                    ·
                    ${product.category}
                </p>

                <h2>
                    ${product.name}
                </h2>

                <div>
                    ★ ${product.rating}
                </div>

                <div
                    class="price"
                    style="margin-top:15px"
                >

                    <strong>
                        ${money(product.price)}
                    </strong>

                    <span class="old">
                        ${money(product.originalPrice)}
                    </span>

                    <span class="discount">
                        -${product.discount}%
                    </span>

                </div>

                <p>
                    ${product.description}
                </p>

                ${
                    product.sizes.length
                    ?
                    `

                    <strong>
                        Select Size
                    </strong>

                    <div class="sizes">

                        ${
                            product.sizes
                            .map(size =>
                                `
                                <button
                                    class="size"
                                    data-size="${size}"
                                >
                                    ${size}
                                </button>
                                `
                            )
                            .join("")
                        }

                    </div>

                    `
                    :
                    ""
                }

                <div class="quantity">

                    <button
                        data-quick-quantity="-1"
                    >
                        −
                    </button>

                    <span id="quickQuantity">
                        1
                    </span>

                    <button
                        data-quick-quantity="1"
                    >
                        +
                    </button>

                </div>

                <button
                    class="btn dark-btn full"
                    id="quickAdd"
                >
                    ADD TO CART
                </button>

            </div>

        </div>

    `;


    $("#quickModal")
        .classList.add("open");

}


/* SIZE */

document.addEventListener(
    "click",
    function(event){

        const sizeButton =
            event.target.closest(
                "[data-size]"
            );

        if(!sizeButton) return;


        selectedSize =
            sizeButton.dataset.size;


        document
            .querySelectorAll(".size")
            .forEach(button =>
                button.classList.remove(
                    "selected"
                )
            );


        sizeButton.classList.add(
            "selected"
        );

    }
);


/* QUICK QUANTITY */

document.addEventListener(
    "click",
    function(event){

        const button =
            event.target.closest(
                "[data-quick-quantity]"
            );

        if(!button) return;


        quickQuantity =
            Math.max(
                1,
                quickQuantity +
                Number(
                    button.dataset.quickQuantity
                )
            );


        $("#quickQuantity")
            .textContent =
            quickQuantity;

    }
);


/* QUICK ADD */

document.addEventListener(
    "click",
    function(event){

        if(event.target.id !== "quickAdd")
            return;


        addToCart(
            selectedProduct.id,
            selectedSize,
            quickQuantity
        );


        closeModals();

    }
);


/* CART OPEN */

$("#cartBtn").addEventListener(
    "click",
    function(){

        $("#cart")
            .classList.add("open");

        $("#overlay")
            .classList.add("open");

    }
);


/* CART CLOSE */

function closeCart(){

    $("#cart")
        .classList.remove("open");

    $("#overlay")
        .classList.remove("open");

}

$("#closeCart")
    .addEventListener(
        "click",
        closeCart
    );

$("#overlay")
    .addEventListener(
        "click",
        closeCart
    );


/* MODALS */

function closeModals(){

    $("#quickModal")
        .classList.remove("open");

    $("#checkoutModal")
        .classList.remove("open");

}

$("#closeQuick")
    .addEventListener(
        "click",
        closeModals
    );

$("#closeCheckout")
    .addEventListener(
        "click",
        closeModals
    );


/* CHECKOUT */

$("#checkoutBtn")
    .addEventListener(
        "click",
        function(){

            if(cart.length === 0){

                showToast(
                    "Your cart is empty"
                );

                return;

            }


            closeCart();

            $("#checkoutModal")
                .classList.add("open");

        }
    );


/* CHECKOUT FORM */

$("#checkoutForm")
    .addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const orderNumber =
                "VEL-" +
                Date.now()
                .toString()
                .slice(-8);


            cart = [];

            saveData();

            renderCart();

            closeModals();


            showToast(
                "Order placed successfully! " +
                orderNumber
            );

        }
    );


/* THEME */

function setTheme(){

    document.body
        .classList
        .toggle(
            "dark",
            theme === "dark"
        );


    $("#themeBtn").textContent =
        theme === "dark"
        ? "☀"
        : "☾";


    saveData();

}


$("#themeBtn")
    .addEventListener(
        "click",
        function(){

            theme =
                theme === "dark"
                ? "light"
                : "dark";

            setTheme();

            showToast(
                "Theme changed"
            );

        }
    );


/* SEARCH BUTTON */

$("#searchBtn")
    .addEventListener(
        "click",
        function(){

            $("#products")
                .scrollIntoView();

            $("#searchInput")
                .focus();

        }
    );


/* WISHLIST BUTTON */

$("#wishlistBtn")
    .addEventListener(
        "click",
        function(){

            if(wishlist.length === 0){

                showToast(
                    "Your wishlist is empty"
                );

                return;

            }


            $("#products")
                .scrollIntoView();

            showToast(
                "Wishlist items are highlighted"
            );

        }
    );


/* SALE */

$("#saleBtn")
    .addEventListener(
        "click",
        function(){

            activeFilter = "All";

            searchTerm = "";

            $("#searchInput").value = "";

            renderProducts();

            $("#products")
                .scrollIntoView();

            showToast(
                "Showing sale collection"
            );

        }
    );


/* MOBILE MENU */

$("#menuBtn")
    .addEventListener(
        "click",
        function(){

            $("#nav")
                .classList
                .toggle("open");

        }
    );


document
    .querySelectorAll("#nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function(){

                $("#nav")
                    .classList
                    .remove("open");

            }
        );

    });


/* ESCAPE KEY */

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Escape"){

            closeCart();

            closeModals();

            $("#nav")
                .classList
                .remove("open");

        }

    }
);


/* CLOSE MODAL BY CLICKING OUTSIDE */

$("#quickModal")
    .addEventListener(
        "click",
        function(event){

            if(
                event.target ===
                $("#quickModal")
            ){

                closeModals();

            }

        }
    );


$("#checkoutModal")
    .addEventListener(
        "click",
        function(event){

            if(
                event.target ===
                $("#checkoutModal")
            ){

                closeModals();

            }

        }
    );


/* START APPLICATION */

setTheme();

renderProducts();

renderNewProducts();

renderCart();

updateWishlistCount();
```
