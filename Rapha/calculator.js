

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