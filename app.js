// DOM Elements
const itemsGrid = document.querySelector('.items-grid');
const searchInput = document.getElementById('searchInput');
const conditionFilter = document.getElementById('conditionFilter');
const addItemForm = document.getElementById('addItemForm');

const chatModal = document.getElementById('chatModal');
const openChatBtn = document.getElementById('openChatBtn');
const closeChatBtn = document.querySelector('.close');
const emailForm = document.getElementById('emailForm');

// Item data array
let items = [
  {
    name: '🎧 Headphones',
    cond: 'Good',
    img: 'https://cdn-icons-png.flaticon.com/512/727/727269.png',
  },
  {
    name: '📚 Book Set',
    cond: 'Like New',
    img: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
  },
  {
    name: '🎮 Game Controller',
    cond: 'Fair',
    img: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
  },
];

// Function to render items
function renderItems(filteredItems) {
  itemsGrid.innerHTML = '';

  filteredItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.img || 'https://via.placeholder.com/250x160'}" alt="${item.name}" />
      <div class="details">
        <h3>${item.name}</h3>
        <p>Condition: ${item.cond}</p>
        <div class="actions">
          <button class="swap">Swap</button>
          <button class="buy">Buy</button>
        </div>
      </div>
    `;

    itemsGrid.appendChild(card);
  });
}

// Filter logic
function filterItems() {
  const keyword = searchInput.value.toLowerCase();
  const condition = conditionFilter.value;

  const filtered = items.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(keyword);
    const matchesCond = condition ? item.cond === condition : true;
    return matchesName && matchesCond;
  });

  renderItems(filtered);
}

// Add new item to list
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('itemName').value.trim();
  const cond = document.getElementById('itemCondition').value;
  const img = document.getElementById('itemImage').value.trim();

  if (name && cond) {
    items.push({
      name,
      cond,
      img: img || 'https://via.placeholder.com/250x160',
    });

    addItemForm.reset();
    filterItems(); // re-render with new item
  }
});

// Search and filter events
searchInput.addEventListener('input', filterItems);
conditionFilter.addEventListener('change', filterItems);

// Open chat modal
openChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'flex';
});

// Close chat modal
closeChatBtn.addEventListener('click', () => {
  chatModal.style.display = 'none';
});

// Close modal if click outside of it
window.addEventListener('click', (e) => {
  if (e.target === chatModal) {
    chatModal.style.display = 'none';
  }
});

// Email form functionality
emailForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fromEmail = document.getElementById('toEmail').value.trim();
  const message = document.getElementById('emailMsg').value.trim();

  if (fromEmail && message) {
    // Opens user's default email app with prefilled message
    window.location.href = `mailto:marisiddharthasai@gmail.com?subject=Support Request from ${fromEmail}&body=${encodeURIComponent(message)}`;

    chatModal.style.display = 'none';
    emailForm.reset();
  }
});

// Initial load
renderItems(items);
