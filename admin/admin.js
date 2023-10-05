function saveJSONToFile() {
    var jsonData = JSON.stringify(products);
    console.log('JSON-bestand opgeslagen:', jsonData);
}

function changeProductPrice(productId, newPrice) {
    var product = products.find(function (p) {
        return p.id === productId;
    });

    if (product) {
        product.price = newPrice;
        console.log('Prijs gewijzigd:', product);
    } else {
        console.log('Product niet gevonden');
    }
}

function addProduct(newProduct) {
    products.push(newProduct);
    console.log('Product toegevoegd:', newProduct);
}

function removeProduct(productId) {
    var index = products.findIndex(function (p) {
        return p.id === productId;
    });

    if (index !== -1) {
        var removedProduct = products.splice(index, 1);
        console.log('Product verwijderd:', removedProduct);
    } else {
        console.log('Product niet gevonden');
    }
}

changeProductPrice(2, 25);
addProduct({ id: 4, name: 'Product 4', price: 40 });
removeProduct(1);
saveJSONToFile();
