const grid = document.getElementById("grid");
const orderList = document.getElementById("orderList");
const totalCostElement = document.getElementById("totalCost");

const vegetables = [
  { name: "Tomato", category: "Fruit", cost: 20, image: "image/tomatoo.jpg" },
  { name: "Carrot", category: "Root", cost: 25, image: "image/carrot.jpg" },
  { name: "Spinach", category: "Leafy", cost: 15, image: "image/spinach.jpg" },
  { name: "Onion", category: "Root", cost: 18, image: "image/onion.jpg" },
  { name: "Capsicum", category: "Fruit", cost: 30, image: "image/caps.jpg" },
  { name: "Cabbage", category: "Leafy", cost: 22, image: "image/cabbage.jpg" },
  { name: "Beetroot", category: "Root", cost: 20, image: "image/beetroot.jpg" },
  { name: "Chilli", category: "Fruit", cost: 10, image: "image/chili.jpg" },
  { name: "Lettuce", category: "Leafy", cost: 28, image: "image/let.jpg" },
  { name: "Potato", category: "Root", cost: 15, image: "image/potato.jpg" },
  { name: "Cauliflower", category: "Flower",cost: 30, image: "image/cauli.jpg" },
  { name: "Broccoli", category: "Flower", cost: 35,image: "image/brocoli.jpg" },
  { name: "Ginger", category: "Root",cost: 80, image: "image/ginger.jpg" }
];

const selectedItems = {};

function displayCards(filterText = "", category = "") {
  grid.innerHTML = "";
  vegetables
    .filter(v =>
      v.name.toLowerCase().includes(filterText.toLowerCase()) &&
      (category === "" || v.category === category)
    )
    .forEach(veg => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${veg.image}" alt="${veg.name}" class="veg-img" />
        <h4>${veg.name}</h4>
        <p>Category: ${veg.category}</p>
        <p>Cost: ₹${veg.cost}</p>
        <div>
          <button onclick="updateQuantity('${veg.name}', -1)">-</button>
          <span id="qty-${veg.name}">${selectedItems[veg.name]?.qty || 0}</span>
          <button onclick="updateQuantity('${veg.name}', 1)">+</button>
        </div>
      `;
      grid.appendChild(card);
    });
}

function scrollGrid(direction) {
  const container = document.getElementById("gridScroll");
  const scrollAmount = 250;
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

function updateQuantity(name, delta) {
  const veg = vegetables.find(v => v.name === name);
  if (!selectedItems[name]) {
    selectedItems[name] = { qty: 0, cost: veg.cost };
  }
  selectedItems[name].qty += delta;
  if (selectedItems[name].qty < 0) selectedItems[name].qty = 0;
  document.getElementById(`qty-${name}`).textContent = selectedItems[name].qty;
  updateOrderSummary();
}

function updateOrderSummary() {
  orderList.innerHTML = "";
  let total = 0;
  for (const [name, { qty, cost }] of Object.entries(selectedItems)) {
    if (qty > 0) {
      const itemCost = qty * cost;
      total += itemCost;
      const li = document.createElement("li");
      li.textContent = `${name} x${qty} = ₹${itemCost}`;
      orderList.appendChild(li);
    }
  }
  totalCostElement.textContent = `Total Cost: ₹${total}`;
}

function resetOrder() {
  for (const name in selectedItems) {
    selectedItems[name].qty = 0;
    const qtyElement = document.getElementById(`qty-${name}`);
    if (qtyElement) qtyElement.textContent = 0;
  }
  updateOrderSummary();
}

document.getElementById("searchInput").addEventListener("input", e => {
  const text = e.target.value;
  const category = document.getElementById("categoryFilter").value;
  displayCards(text, category);
});

document.getElementById("categoryFilter").addEventListener("change", e => {
  const category = e.target.value;
  const text = document.getElementById("searchInput").value;
  displayCards(text, category);
});


displayCards();