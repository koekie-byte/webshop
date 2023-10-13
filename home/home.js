const cartLink = document.getElementById('cart-link');
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cartItemsCount = localStorage.getItem('cartItemsCount') || 0;
cartItemsCount = parseInt(cartItemsCount, 10);

function updateCartCount() {
    cartCount.textContent = cartItemsCount;
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('jsonData') == null) {
        // Plaats de JSON-gegevens in de lokale opslag
        fetch('product.json')
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('jsonData', JSON.stringify(data));
                console.log('JSON data saved to local storage.');
                loadProductsFromLocalStorage();
            });
    } else {
        // Roep de functie aan om de producten op de website weer te geven
        loadProductsFromLocalStorage();
    }
});

// Nu, laad de JSON-gegevens uit de lokale opslag en toon ze op de website:
function loadProductsFromLocalStorage() {
    const jsonData = JSON.parse(localStorage.getItem('jsonData'));

    if (!jsonData) {
        console.log('JSON data not found in local storage.');
        return;
    }

    const productsContainer = document.getElementById('products');

    jsonData.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'card';

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        productCard.appendChild(imageElement);

        const nameElement = document.createElement('h3');
        nameElement.textContent = product.name;
        productCard.appendChild(nameElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = 'Price: $';
        productCard.appendChild(priceElement);

        const priceValueElement = document.createElement('span');
        priceValueElement.textContent = product.price;
        priceElement.appendChild(priceValueElement);

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.className = 'add-to-cart';
        productCard.appendChild(addToCartButton);

        productsContainer.appendChild(productCard);
    });
}

function getProductFromButton(button) {
    const productCard = button.closest('.card');
    const imageElement = productCard.querySelector('img');
    const nameElement = productCard.querySelector('h3');
    const priceElement = productCard.querySelector('span');

    const product = {
        image: imageElement.src,
        name: nameElement.textContent,
        price: priceElement.textContent,
    };

    return product;
}

function saveProductToCart(product) {
    let cartItems = localStorage.getItem('cartItems');

    if (!cartItems) {
        cartItems = [];
    } else {
        cartItems = JSON.parse(cartItems);
    }

    cartItems.push(product);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        cartItemsCount++;
        updateCartCount();

        const product = getProductFromButton(button);
        saveProductToCart(product);

        localStorage.setItem('cartItemsCount', cartItemsCount);
    });
});

updateCartCount();
