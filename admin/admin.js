fetch("../home/product.json")
    .then((response) => response.json())
    .then((data) => {
        const resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", function () {
            localStorage.removeItem("products");
            localStorage.setItem("products", JSON.stringify(data));
            window.location.reload();
        });

        const tableBody = document.getElementById("winkelwagen-body");
        const productsTemplate = document.getElementById("products-template").content;

        if (localStorage.getItem("products")) {
            const products = JSON.parse(localStorage.getItem("products"));

            products.forEach(function (product) {
                const row = productsTemplate.cloneNode(true).querySelector("tr");

                row.querySelector(".id").textContent = product.id;
                row.querySelector(".name").textContent = product.name;
                row.querySelector(".price").textContent = product.price;
                row.querySelector(".afbeelding").innerHTML = product.foto;

                const editLink = row.querySelector(".edit-link");
                editLink.href = `../edit/index.html?id=${product.id}`;

                const removeCell = row.querySelector(".remove-cell");
                removeCell.addEventListener("click", function () {
                    row.remove();
                    const index = products.findIndex(function (item) {
                        return item.id === product.id;
                    });
                    if (index !== -1) {
                        products.splice(index, 1);
                        localStorage.setItem("products", JSON.stringify(products));
                    }
                });

                tableBody.appendChild(row);
            });
        }
    });
