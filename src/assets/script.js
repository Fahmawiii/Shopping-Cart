/* Create an array named products to hold product objects */
let products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties:
   - name: product name (string)
   - price: product price (number)
   - quantity: quantity in cart, starts at zero (number)
   - productId: unique identifier for the product (number)
   - image: URL string for product image
*/

// Add product objects to the products array
products.push({
    name: "Cherry",
    price: 10,
    quantity: 0,
    productId: 1,
    image: "images/cherry.jpg"
});

products.push({
    name: "Orange",
    price: 15,
    quantity: 0,
    productId: 2,
    image: "images/orange.jpg"
});

products.push({
    name: "Strawberry",
    price: 25,
    quantity: 0,
    productId: 3,
    image: "images/strawberry.jpg"
});

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* Create a function to retrieve a product by its ID */
function getProductById(id, list) {
    return list.find(product => product.productId === id);
}

/* Function to add a product to the cart by productId
   - Increases the product's quantity if already in the cart
   - Adds the product to the cart if not already present
*/
function addProductToCart(id) {
    const product = getProductById(id, products);
    const isProductInCart = cart.some(item => item.productId === id);

    if (isProductInCart) {
        product.quantity += 1; // Increase quantity if product is already in the cart
    } else {
        product.quantity = 1; // Set quantity to 1 if it's a new product in the cart
        cart.push(product); // Add product to the cart
    }
}

/* Function to increase the quantity of a product in the cart */
function increaseQuantity(id) {
    const product = getProductById(id, products);
    if (product) {
        product.quantity++; // Increment product quantity
    }
}

/* Function to decrease the quantity of a product in the cart
   - Removes product from cart if quantity reaches zero
*/
function decreaseQuantity(id) {
    const product = getProductById(id, products);
    if (product && product.quantity > 0) { // Check if product exists and quantity is > 0
        product.quantity--; // Decrement quantity
        if (product.quantity === 0) {
            removeProductFromCart(id); // Remove from cart if quantity is zero
        }
    }
}

/* Function to remove a product from the cart by productId
   - Sets the product's quantity to zero and removes it from the cart
*/
function removeProductFromCart(id) {
    const product = getProductById(id, products);
    if (product) {
        product.quantity = 0; // Set product quantity to 0
        const index = cart.findIndex(item => item.productId === id); // Find index of the product
        if (index !== -1) {
            cart.splice(index, 1); // Remove product from the cart
        }
    }
}

/* Function to calculate the total price of products in the cart */
function cartTotal() {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0); // Sum total price
}

/* Function to empty the cart by removing all products */
function emptyCart() {
    cart.forEach(product => removeProductFromCart(product.productId)); // Remove each product
    cart = []; // Reset cart to an empty array
}

/* Function to process payment and return remaining balance
   - Returns negative if there's a remaining balance, positive if change is owed
*/
let paidTotal = 0;
function pay(amount) {
    paidTotal += amount; // Add amount to total paid
    const remaining = paidTotal - cartTotal(); // Calculate remaining balance
    if (remaining >= 0) {
        paidTotal = 0; // Reset paid total if balance is cleared
        emptyCart(); // Empty the cart
    }
    return remaining; // Return remaining balance
}

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests: npm run test
*/

module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay,
    emptyCart,
    // Uncomment the following line if completing the currency converter bonus
    // currency
};