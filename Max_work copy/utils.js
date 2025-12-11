// utils.js
document.addEventListener('DOMContentLoaded', ()=>{
  // on confirmation page show receipt if available
  if(document.getElementById('receiptArea')){
    // cart.js stores last_order in localStorage; use same global
    if(window.renderConfirmation) window.renderConfirmation();
  }
});
