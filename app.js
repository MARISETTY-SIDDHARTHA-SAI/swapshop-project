// Items data
let items = [
  { name: "Old Books", condition: "Fair" },
  { name: "Winter Jacket", condition: "Good" },
  { name: "Study Lamp", condition: "Like New" },
];

// DOM elements
const itemsList = document.getElementById("itemsList");
const searchInput = document.getElementById("searchInput");
const conditionFilter = document.getElementById("conditionFilter");
const addItemForm = document.getElementById("addItemForm");
const contactForm = document.getElementById("contactForm");
const emailStatus = document.getElementById("emailStatus");

// Render item list
function renderItems(list) {
  itemsList.innerHTML = "";

  if (list.length === 0) {
    itemsList.innerHTML = `<p style="text-align:center; color:#666; font-style:italic;">No items found.</p>`;
    return;
  }

  list.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item-row";
    div.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div class="item-condition">${item.condition}</div>
    `;
    itemsList.appendChild(div);
  });
}

// Filter items on search and condition
function filterItems() {
  const keyword = searchInput.value.toLowerCase();
  const condition = conditionFilter.value;

  const filtered = items.filter((item) => {
    const matchName = item.name.toLowerCase().includes(keyword);
    const matchCondition = !condition || item.condition === condition;
    return matchName && matchCondition;
  });

  renderItems(filtered);
}

// Add item handler
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const condition = document.getElementById("itemCondition").value;

  if (name && condition) {
    items.push({ name, condition });
    filterItems();
    addItemForm.reset();
  }
});

// Search and filter listeners
searchInput.addEventListener("input", filterItems);
conditionFilter.addEventListener("change", filterItems);

// EmailJS config
const serviceID = "swapshop06";       // Your EmailJS service ID
const templateID = "template_8rnhim7"; // Your EmailJS template ID

// Email send handler
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  emailStatus.style.color = "#0077cc";
  emailStatus.textContent = "Sending message...";

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      emailStatus.style.color = "green";
      emailStatus.textContent = "Message sent successfully!";
      contactForm.reset();
    }, (err) => {
      emailStatus.style.color = "red";
      emailStatus.textContent = "Failed to send message, please try again later.";
      console.error("EmailJS error:", err);
    });
});

// Initial render
renderItems(items);



