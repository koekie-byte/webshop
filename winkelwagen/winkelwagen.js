document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;

    const productQuantities = {};

    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            const productName = product.name;
            const productPrice = parseFloat(product.price);

            if (productQuantities.hasOwnProperty(productName)) {
                productQuantities[productName].quantity += 1;
                productQuantities[productName].totalPrice += productPrice;
            } else {
                productQuantities[productName] = {
                    name: productName,
                    quantity: 1,
                    totalPrice: productPrice,
                };
            }
        });

        for (const productName in productQuantities) {
            if (productQuantities.hasOwnProperty(productName)) {
                const product = productQuantities[productName];

                const productElement = document.createElement('div');
                productElement.className = 'product-info';

                const nameElement = document.createElement('p');
                nameElement.textContent = product.name;
                productElement.appendChild(nameElement);

                const quantityElement = document.createElement('p');
                quantityElement.textContent = `Quantity: ${product.quantity}`;
                productElement.appendChild(quantityElement);

                const priceElement = document.createElement('p');
                const price = parseFloat(product.totalPrice / product.quantity);
                priceElement.textContent = `Price per item: €${price.toFixed(2)}`;
                productElement.appendChild(priceElement);

                const totalPriceElement = document.createElement('p');
                totalPriceElement.textContent = `Total price: €${product.totalPrice.toFixed(2)}`;
                productElement.appendChild(totalPriceElement);

                cartItemsContainer.appendChild(productElement);

                totalPrice += product.totalPrice;
            }
        }
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'The shopping cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
    }

    totalPriceContainer.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
});
function clearStorageAndRefresh() {
    localStorage.clear();
    window.location.reload();
}

