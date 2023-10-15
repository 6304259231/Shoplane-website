const clothingContainer = document.getElementById("clothing-container");
        const accessoriesContainer = document.getElementById("accessories-container");

        function createProductCard(product) {
            const productCard = document.createElement("div");
            productCard.className = "product-card";

            const productLink = document.createElement("a");
            productLink.href = `product-details.html?id=${product.id}`;

            const productImage = document.createElement("img");
            productImage.className = "product-image";
            productImage.src = product.preview;
            productImage.alt = product.name;

            productLink.appendChild(productImage);
            productCard.appendChild(productLink);

            const productName = document.createElement("h3");
            productName.textContent = product.name;
            productCard.appendChild(productName);

            const productDescription = document.createElement("p");
            productDescription.textContent = product.brand;
            productCard.appendChild(productDescription);

            const productPrice = document.createElement("p");
            productPrice.className = 'product-price';
            productPrice.textContent = `RS ${product.price}`;
            productCard.appendChild(productPrice);

            return productCard;
        }

        fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    const productCard = createProductCard(product);
                    if (product.isAccessory) {
                        accessoriesContainer.appendChild(productCard);
                    } else {
                        clothingContainer.appendChild(productCard);
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching product data: ", error);
            });