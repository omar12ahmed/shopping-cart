// A container to hold the items in the cart
// A function to add items to the cart
// A function to remove items from the cart
// A function to calculate the total cost of the items in the cart
// An event listener to add items to the cart when the user clicks the 'Add to Cart' button
// An event listener to remove items from the cart when the user clicks the 'Remove' button
// A display of the number of items in the cart and the total cost
// The ability to save the cart data to the local storage or a cookie
class item {
    constructor(productName, price, catogeroy, image) {
        this.productName = productName;
        this.price = price;
        this.catogeroy = catogeroy;
        this.image= image
        this.quantity= 1;
    }
    

}
let shoppingCartDiv = document.getElementById("shoppingcart");
var airJordan4 = new item("Air Jordan 4", 140.00, "shoes","img/airjordan4.jpg");
var ducatiPanigaleV4 = new item("Ducati Panigale V4", 31498, "Motorcyle","img/ducatiPanigaleV4.jpg");
var Airpods = new item("Airpods", 69.99, "headphones","img/airpods.jpg");
var Macbook = new item("MacBook", 825.00, "Laptop","img/macbook.jpg");
var iphone = new item("iphone", 650.00, "Phone","img/iphone.jpg");
var products = [airJordan4, ducatiPanigaleV4, Airpods, Macbook, iphone]
var shoppingCart = [];




function showAllproducts() {
    
    let productDiv = document.getElementById("products")

    for (let i = 0; i < products.length; i++) { //Going through all the availible products
        let product = products[i]; //Grabs the current product


        
        
        let productElement = document.createElement('div'); //Creating the product
        productElement.id = product.productName;
        productElement.innerHTML = `<p>${product.productName}, $${product.price},${product.catogeroy}</p>    <img class="images" src="${product.image}" alt="${product.productName}"/>`;

        let addToCartButton = document.createElement('button'); //Creating the button for the product
        addToCartButton.classList.add('add-to-cart-button');
        addToCartButton.textContent = 'Add to Cart';
        productElement.appendChild(addToCartButton)

        var inputFieldelement = document.createElement("input");
        inputFieldelement.setAttribute("type", "number");
        inputFieldelement.value = 1; 
        inputFieldelement.classList.add("numberInput")
        inputFieldelement.id = `quantity-${product.productName}`;
        productElement.appendChild(inputFieldelement)


        productDiv.appendChild(productElement);


        inputFieldelement.addEventListener('input', function () {
            product.quantity = parseInt(this.value); 
        });

        addToCartButton.addEventListener('click', addToCart);

    }

}

///condition if the shopping cart has the product we change quanitty if it doesnt we add the product 
    //rewite this code so that when clicked add cart buttons it increases the quantity same as increasing the numbers in my inputfield and displaying in quantity  
    function addToCart(event) {
        let chosenProductName = this.closest('div').id;


        let quantityInput = document.getElementById(`quantity-${chosenProductName}`);
        let quantity = parseInt(quantityInput.value);




        // Check if the chosen product is already in the shopping cart
        let productInCart = shoppingCart.find(item => item.productName === chosenProductName);
    
        if (productInCart) {
            
            // If it's already in the cart, increase its quantity
            productInCart.quantity += quantity;
        } else {
            // If it's not in the cart, find the product in the products array and add it to the cart
            let productToAdd = products.find(item => item.productName === chosenProductName);
            
            if (productToAdd) {
                productToAdd.quantity = quantity; // Initialize the quantity to 1 for the new product
                shoppingCart.push(productToAdd);
            }
        }
    
        updateShoppingCart();
    }
    
   

function updateShoppingCart() {

    var modalContainer = document.getElementById("modal-body");
    modalContainer.innerHTML = '';

    shoppingCartDiv.innerHTML = '';

    let quantityCart = document.getElementsByTagName("input");
    quantityCart.value=1; // attempted but not correct need help 
    let total= 0;
    for (let i = 0; i < shoppingCart.length; i++) {
        let cartItem = shoppingCart[i];
        
        let itemTotal = cartItem.quantity * cartItem.price;
        total += itemTotal;
       
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        let cardDivModal = document.createElement('div');
        cardDivModal.classList.add('card');



        let cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = 
        `<p class="cartProducttext">${cartItem.productName}, $${cartItem.price}, ${cartItem.catogeroy} </p> 
        <img class="images" src="${cartItem.image}" alt="${cartItem.productName}"/> 
        <p class="cartQuantity"> Quantity: ${cartItem.quantity}</p> 
        <p class="cartTotal"> Total: $${itemTotal.toFixed(2)}</p>`;
        
        let cartItemDivModal = document.createElement('div');
        cartItemDivModal.innerHTML = `<p class="cartProducttext">${cartItem.productName}, $${cartItem.price}, ${cartItem.catogeroy} </p> <img class="images" src="${cartItem.image}" alt="${cartItem.productName}"/> <p class="cartQuantity"> Quantity: ${cartItem.quantity}</p> <p class="cartTotal"> Total: $${itemTotal.toFixed(2)}</p>`;




        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => confirmRemoveProduct(cartItem));
        
        let removeButtonModal = document.createElement('button');
        removeButtonModal.classList.add('remove-button');
        removeButtonModal.textContent = 'Remove';
        removeButtonModal.addEventListener('click', () => confirmRemoveProductModal(cartItem));

        
        let increaseButton = document.createElement('button');
        increaseButton.classList.add('quantity-button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(cartItem));

        let increaseButtonModal = document.createElement('button');
        increaseButtonModal.classList.add('quantity-button');
        increaseButtonModal.textContent = '+';
        increaseButtonModal.addEventListener('click', () => increaseQuantityModal(cartItem));


        let decreaseButton = document.createElement('button');
        decreaseButton.classList.add('quantity-button');
        decreaseButton.textContent='-';
        decreaseButton.addEventListener('click',() => decreaseQuantity(cartItem));

        let decreaseButtonModal = document.createElement('button');
        decreaseButtonModal.classList.add('quantity-button');
        decreaseButtonModal.textContent='-';
        decreaseButtonModal.addEventListener('click',() => decreaseQuantityModal(cartItem));




        cartItemDiv.appendChild(increaseButton);
        cartItemDivModal.appendChild(increaseButtonModal)
        cartItemDiv.appendChild(decreaseButton);
        cartItemDivModal.appendChild(decreaseButtonModal)
        cartItemDiv.appendChild(removeButton);
        cartItemDivModal.appendChild(removeButtonModal)
        cardDiv.appendChild(cartItemDiv);
        shoppingCartDiv.appendChild(cardDiv);
        cardDivModal.appendChild(cartItemDivModal)
        modalContainer.appendChild(cardDivModal);

        

        
    }
}

function confirmRemoveProduct(cartItem) {
    var confirmMessage = `Are you sure you want to remove ${cartItem.productName} from the cart?`;
    var isConfirmed = window.confirm(confirmMessage);

    if (isConfirmed) {
        removeProductFromCart(cartItem);
    }
}

function confirmRemoveProductModal(cartItem) {
    var confirmMessage = `Are you sure you want to remove ${cartItem.productName} from the cart?`;
    var isConfirmed = window.confirm(confirmMessage);

    if (isConfirmed) {
        removeProductFromCartModal(cartItem);
    }
}





function removeProductFromCart(product) {
    // Find the index of the product in the shopping cart
    const index = shoppingCart.findIndex(item => item.productName === product.productName);

    if (index !== -1) {
        // Remove the product from the shopping cart
        shoppingCart.splice(index, 1);
        // Update the cart display
        updateShoppingCart();
        
    }
}

function removeProductFromCartModal(product) {
    // Find the index of the product in the shopping cart
    const index = shoppingCart.findIndex(item => item.productName === product.productName);

    if (index !== -1) {
        // Remove the product from the shopping cart
        shoppingCart.splice(index, 1);
        // Update the cart display
        updateShoppingCart();
        
    }
}

function increaseQuantity(product) {
    product.quantity += 1;
    updateShoppingCart();
}

function increaseQuantityModal(product) {
    product.quantity += 1;
    updateShoppingCart();
}


function decreaseQuantity(product) {
    if (product.quantity > 1) {
        product.quantity -= 1;
        updateShoppingCart();
    }
}

function decreaseQuantityModal(product) {
    if (product.quantity > 1) {
        product.quantity -= 1;
        updateShoppingCart();
    }
}

//------------------------My Modal --------------------------------//

var modal = document.getElementById("myModal")
let checkoutButton = document.getElementById("checkOut");
let ModalX = document.getElementById("close");
let cancelButton = document.getElementById("cancel")
let addtoCartModal = document.getElementById("modalCart")

checkoutButton.onclick= function(){
    modal.style.display= "block";
}

ModalX.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  cancelButton.onclick = function() {
    modal.style.display = "none";
    console.log("cancel")
  }
///---- open a new window with a form validation when the add to cart button in my modal is clicked------/////
addtoCartModal.addEventListener('click', () => {
    var queryString = buildCartQueryString(shoppingCart);
    
    window.location.href = `checkout.html${queryString}`;
});
    function buildCartQueryString(cart) {
        const params = new URLSearchParams();

        cart.forEach((item, index) => {
            params.append(`product${index + 1}`, item.productName);
            params.append(`quantity${index + 1}`, item.quantity);
            params.append(`price${index + 1}`, item.price)
            params.append(`catogeroy${index + 1}`, item.catogeroy)
            params.append(`image${index + 1}`, item.image)

        });

        return `?${params.toString()}`;
    }


  

window.addEventListener("load", showAllproducts);







