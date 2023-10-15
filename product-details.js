let cartCount = 0;

function fetchProductData(productId) {
    const productUrl = `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`;
    fetch(productUrl)
        .then((response) => response.json())
        .then((productData) => {
            document.getElementById("prod-name").textContent = productData.name;
            document.getElementById("prod-name").classList.add('prod-namen')
            document.getElementById("prod-brand").textContent = productData.brand;
            document.getElementById("prod-brand").classList.add('prod-brandn')
            let price = document.getElementById("price");
            let sprs = document.getElementById("spanrs")
            
            let rs = document.createElement("b")
            rs.innerHTML = productData.price;
            sprs.appendChild(rs)

            let descrip = document.getElementById("description");
            let p = document.createElement("p")
            p.setAttribute("class","para-des")  
            p.innerHTML = productData.description;
            descrip.appendChild(p)

            var mainImage = document.getElementById("main-image");
            mainImage.src = productData.preview;

            var sImgSec = document.getElementById("s-img-sec");
            sImgSec.innerHTML = ""; 

            for (var i = 0; i < productData.photos.length; i++) {
                var img = document.createElement("img");
                img.src = productData.photos[i];
                sImgSec.appendChild(img);


                img.addEventListener("click", function () {
                    let clicked = this.src;
                    mainImage.src = clicked;
                });

                img.addEventListener("click", function () {
                    var images = sImgSec.getElementsByTagName("img");
                    for (var j = 0; j < images.length; j++) {
                        images[j].style.border = "none";
                    }
                    this.style.border = "3px solid rgba(12, 223, 103, 0.461)";
                    this.style.borderRadius = "5px";
                });

            }

            // Initial image selection
    var first = document.getElementById("s-img-sec").getElementsByTagName("img")[0];
    mainImage.src = first.src;
    first.style.border = "3px solid rgba(12, 223, 103, 0.461)";
    first.style.borderRadius = "9px";
    first.style.boxSizing = "border-box";
})

.catch((error) => {
    console.error("Error fetching product data: ", error);
});

}


function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount;
}

function addToCart() {
    cartCount++;
    updateCartCount();
}

const addToCartButton = document.getElementById("btn-add");
if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
}

window.onload = function () {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (productId) {
        fetchProductData(productId); 
    }
    updateCartCount(); 
};