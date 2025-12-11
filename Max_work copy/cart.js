let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Convert old items {name, price} to new format automatically
cart = cart.map(item => {
    if(!item.qty) item.qty = 1; // if missing qty, fix it
    return item;
});
function addToCart(name, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p=>p.name===name);

    if(item) item.qty++;
    else cart.push({name, price, qty:1});

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}

saveCart();

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart(){
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        cartContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty.</p>";
        document.getElementById("total").innerText = "Total: 0€";
        return;
    }

    cart.forEach((item, index) =>{
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div class="item-info">${item.name} — ${item.price}€</div>

            <div class="qty-controls">
                <button onclick="changeQty(${index},-1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${index},1)">+</button>
                <button class="remove" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    document.getElementById("total").innerText = `Total: ${total.toFixed(2)}€`;
}

function changeQty(i, num){
    cart[i].qty += num;
    if(cart[i].qty <= 0) removeItem(i);
    saveCart();
    updateCart();
}

function removeItem(i){
    cart.splice(i,1);
    saveCart();
    updateCart();
}

document.getElementById("back").onclick = ()=> location.href="shop.html";

updateCart();

 function calculateCarbon() {
  var carbonPerItem = parseFloat(document.getElementById("product").value);
  var quantity = parseInt(document.getElementById("quantity").value);
  var distance = parseInt(document.getElementById("country").value);

  // Product emissions
  var baseCarbon = carbonPerItem * quantity;

  // Shipping emissions
  // Ships: 0.0105 kg CO₂ per km per ton, average 0.3kg per clothing item
  var shippingPerItem = distance * 0.0105 * 0.0003;
  var totalShipping = shippingPerItem * quantity;

  // Total emissions
  var total = baseCarbon + totalShipping;

  // Equivalents
  var trees = (total / 21).toFixed(2);  // Tree absorbs 21kg of CO2 yearly
  var carKm = (total / 0.120).toFixed(1); // Petrol car emits 0.120kg CO2/km
  var bottles = (total / 0.082).toFixed(0); // Plastic bottle = 0.082kg CO2

  // Display final output
  document.getElementById("result").innerHTML =
    `Total Carbon Footprint: <strong>${total.toFixed(2)} kg CO₂e</strong>`;

  document.getElementById("extra").innerHTML =
    `<div class="equivalents">
      🛩️ Shipping impact included: <strong>${totalShipping.toFixed(2)} kg CO₂e</strong>
      <br>
      <br>
      🌳 Equivalent to planting <strong>${trees}</strong> trees for 1 year<br>
      🚗 Equivalent to driving <strong>${carKm}</strong> km by car<br>
      🥤 Equivalent to producing <strong>${bottles}</strong> plastic bottles
    </div>`;

    if (isNaN(carbonPerItem) || isNaN(quantity) || isNaN(distance)) {
    alert("Please enter valid numbers in all fields.");
    } 
}