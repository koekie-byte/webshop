const cartLink = document.getElementById('cart-link');
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cartItemsCount = localStorage.getItem('cartItemsCount') || 0;
cartItemsCount = parseInt(cartItemsCount, 10);

function updateCartCount() {
    cartCount.textContent = cartItemsCount;
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('products') == null) {
        fetch('product.json')
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('products', JSON.stringify(data));
                console.log('JSON data saved to local storage.');
                loadProductsFromLocalStorage();
            });
    } else {
        loadProductsFromLocalStorage();
    }
});

function loadProductsFromLocalStorage() {
    console.log('loadproducts');
    const jsonData = JSON.parse(localStorage.getItem('products'));

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

        addToCartButton.addEventListener('click', () => {
            console.log('dag');
            cartItemsCount++;
            updateCartCount();

            let data = getProductFromButton(addToCartButton);
            saveProductToCart(data);

            localStorage.setItem('cartItemsCount', cartItemsCount);
        });

        productsContainer.appendChild(productCard);
    });
}

updateCartCount();

function getProductFromButton(button) {
    const productCard = button.parentElement;
    const imageElement = productCard.querySelector('img');
    const nameElement = productCard.querySelector('h3');
    const priceValueElement = productCard.querySelector('span');

    const product = {
        image: imageElement.src,
        name: nameElement.textContent,
        price: priceValueElement.textContent,
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
