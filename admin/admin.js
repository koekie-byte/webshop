function getProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    return JSON.parse(storedProducts) || [];
}

function getProductsFromJSON(callback) {
    fetch('product.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Fout bij laden van JSON-bestand: ', error));
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = product.name;
        productList.appendChild(listItem);
    });
}

const localProducts = getProductsFromLocalStorage();

if (localProducts.length > 0) {
    displayProducts(localProducts);
} else {
    getProductsFromJSON(products => {
        displayProducts(products);

        localStorage.setItem('products', JSON.stringify(products));
    });
}
