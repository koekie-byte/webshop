document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;

    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-info';

            const nameElement = document.createElement('p');
            nameElement.textContent = product.name;
            productElement.appendChild(nameElement);

            const quantityElement = document.createElement('p');
            quantityElement.textContent = `Quantity: 1`;
            productElement.appendChild(quantityElement);

            const priceElement = document.createElement('p');
            const price = parseFloat(product.price);
            const totalProductPrice = price;
            priceElement.textContent = `Price per item: €${price.toFixed(2)}`;
            productElement.appendChild(priceElement);

            const totalPriceElement = document.createElement('p');
            totalPriceElement.textContent = `Total price: €${totalProductPrice.toFixed(2)}`;
            productElement.appendChild(totalPriceElement);

            cartItemsContainer.appendChild(productElement);

            totalPrice += totalProductPrice;
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'The shopping cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
    }

    totalPriceContainer.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
});
