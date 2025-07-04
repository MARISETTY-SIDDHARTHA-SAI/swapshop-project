const itemsGrid = document.querySelector('.items-grid');
const searchInput = document.getElementById('searchInput');
const conditionFilter = document.getElementById('conditionFilter');
const addItemForm = document.getElementById('addItemForm');

const chatModal = document.getElementById('chatModal');
const openChatBtn = document.getElementById('openChatBtn');
const closeChatBtn = document.querySelector('.close');
const emailForm = document.getElementById('emailForm');

let items = [
  { name: 'Old Books', cond: 'Fair' },
  { name: 'Winter Jacket', cond: 'Good' },
  { name: 'Study Lamp', cond: 'Like New' }
];

function renderItems(filteredItems = items) {
  itemsGrid.innerHTML = '';
  filteredItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Condition: ${item.cond}</p>
    `;
    itemsGrid.appendChild(card);
  });
}

function filterItems() {
  const keyword = searchInput.value.toLowerCase();
  const cond = conditionFilter.value;
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(keyword) &&
    (!cond || item.cond === cond)
  );
  renderItems(filtered);
}

addItemForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('itemName').value.trim();
  const cond = document.getElementById('itemCondition').value;
  if (name && cond) {
    items.push({ name, cond });
    filterItems();
    addItemForm.reset();
  }
});

searchInput.addEventListener('input', filterItems);
conditionFilter.addEventListener('change', filterItems);

openChatBtn.onclick = () => {
  chatModal.style.display = 'flex';
};

closeChatBtn.onclick = () => {
  chatModal.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === chatModal) {
    chatModal

