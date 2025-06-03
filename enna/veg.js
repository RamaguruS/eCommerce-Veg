const grid = document.getElementById("grid");

const vegetables = [
  { name: "Tomato", category: "Fruit", image: "image/tomatoo.jpg" },
  { name: "Carrot", category: "Root", image: "image/carrot.jpg" },
  { name: "Spinach", category: "Leafy", image: "image/spinach.jpg" },
  { name: "Onion", category: "Root", image: "image/onion.jpg" },
  { name: "Capsicum", category: "Fruit", image: "image/caps.jpg" },
  { name: "Cabbage", category: "Leafy", image: "image/cabbage.jpg" },
  { name: "Beetroot", category: "Root", image: "image/beetroot.jpg" },
  { name: "Chilli", category: "Fruit", image: "image/chili.jpg" },
  { name: "Lettuce", category: "Leafy", image: "image/let.jpg" },
  { name: "Potato", category: "Root", image: "image/potato.jpg" },
  { name: "Cauliflower", category: "Flower", image: "image/cauli.jpg" },
  { name: "Broccoli", category: "Flower", image: "image/brocoli.jpg" },
  { name: "Ginger", category: "Root", image: "image/ginger.jpg" }
];

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
      `;
      grid.appendChild(card);
    });
}

function scrollGrid(direction) {
  const container = document.getElementById("gridScroll");
  const scrollAmount = 250;
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
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
