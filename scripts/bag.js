
const Convenience_fee=99;
let bagItemsObject; // Initialize bagItemsObject as an empty array

onLoad();

function onLoad() {
    loadBagItemsObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary()
{
    let totalItem=bagItemsObject.length;
let totalMRP=0;
let totalDiscount=0;
bagItemsObject.forEach(bagItems=>{
    totalMRP+=bagItems.original_price;
    totalDiscount+=bagItems.original_price-bagItems.current_price;
})
let finalPayment=totalMRP-totalDiscount+Convenience_fee;


    let bagSummaryElement=document.querySelector('.bag-summary');
    bagSummaryElement.innerHTML=`<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS Rs(${totalItem}) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
</div>
`;
}

function loadBagItemsObjects() {
    // Check if bagItemsObject is already initialized and not empty
    // if (bagItemsObject && bagItemsObject.length > 0) {
    //     // No need to reload bagItemsObject if it's already loaded
    //     return;
    // }

    // Assuming bagItems is an array of item IDs
    bagItemsObject = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });
}

function displayBagItems() {
    let containerElement = document.querySelector('.bag-items-container');
    containerElement.innerHTML = ''; // Corrected typo: innerHTML instead of innerHtml. Also, clearing the container correctly.

    bagItemsObject.forEach(item => {
        containerElement.innerHTML += generateItemHtml(item); // Corrected typo: bagitem to item
    });
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    // After removing the item, update the bagItemsObject and display the updated bag items
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemsObjects(); // Corrected function name
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHtml(item) {
    // Generate HTML for displaying item details
    return `<div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>
        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div> <!-- Corrected function name -->
    </div>`;
}
