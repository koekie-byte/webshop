function getProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('jsonData');
    return JSON.parse(storedProducts) || [];
}

function getProductsFromJSON(callback) {
    fetch('/home/product.json')
        .then((response) => response.json())
        .then((data) => callback(data))
        .catch((error) => console.error('Fout bij laden van JSON-bestand: ', error));
}

function removeItem(id) {
    const products = getProductsFromLocalStorage();
    const filteredProducts = products.filter((item) => item.id != id);
    localStorage.setItem('jsonData', JSON.stringify(filteredProducts));
}

function displayProducts() {
    const products = getProductsFromLocalStorage();
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = product.name;
        listItem.id = product.id;
        listItem.addEventListener('click', (event) => {
            removeItem(event.target.id);
            displayProducts();
        });
        productList.appendChild(listItem);
    });
}

const localProducts = getProductsFromLocalStorage();

if (localProducts.length > 0) {
    displayProducts();
} else {
    getProductsFromJSON((products) => {
        localStorage.setItem('jsonData', JSON.stringify(products));
        displayProducts();
    });
}
