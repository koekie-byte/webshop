const cartLink = document.getElementById('cart-link');
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cartItemsCount = localStorage.getItem('cartItemsCount') || 0;
cartItemsCount = parseInt(cartItemsCount, 10);

function updateCartCount() {
    cartCount.textContent = cartItemsCount;
}

document.addEventListener("DOMContentLoaded", function () {
    const jsonData = [
        {
            "id": 0,
            "name": "Hondenvoer",
            "price": "29.99",
            "image": "https://i5.walmartimages.com/asr/832ae97d-149a-4295-ab55-2496d9b264b8_1.67b261ea5ba6202c4ee603c6b53765d7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
        },
    ];

    // Plaats de JSON-gegevens in de lokale opslag
    localStorage.setItem("jsonData", JSON.stringify(jsonData));
    console.log("JSON data saved to local storage.");

    // Roep de functie aan om de producten op de website weer te geven
    loadProductsFromLocalStorage();
});

// Nu, laad de JSON-gegevens uit de lokale opslag en toon ze op de website:
function loadProductsFromLocalStorage() {
    const jsonData = JSON.parse(localStorage.getItem("jsonData"));

    if (!jsonData) {
        console.log("JSON data not found in local storage.");
        return;
    }

    const productsContainer = document.getElementById('products');

    jsonData.forEach(function (product) {
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

// Roep de functie aan om de producten van de lokale opslag op de website weer te geven
loadProductsFromLocalStorage();

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

const productsContainer = document.getElementById('products');

fetch('product.json')
    .then(response => response.json())
    .then(data => {
        const products = data;

        products.forEach(function (product) {
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

        const addToCartButton = document.querySelectorAll('.add-to-cart');

        addToCartButton.forEach((button) => {
            button.addEventListener('click', () => {
                cartItemsCount++;
                updateCartCount();

                const product = getProductFromButton(button);
                saveProductToCart(product);

                localStorage.setItem('cartItemsCount', cartItemsCount);
            });
        });
    })
    .catch(error => console.log(error));

updateCartCount();
