document.getElementById("payment-form").addEventListener("submit", function(e){
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Your cart is empty! Add items before paying.");
        return;
    }

    alert("Payment successful! Redirecting...");

    localStorage.removeItem("cart"); 

    window.location.href = "confirmation.html"; 
});
