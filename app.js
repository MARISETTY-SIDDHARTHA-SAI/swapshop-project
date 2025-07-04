const itemsGrid = document.querySelector('.items-grid');
const searchInput = document.getElementById('searchInput');
const conditionFilter = document.getElementById('conditionFilter');

const chatModal = document.getElementById('chatModal');
const openChatBtn = document.querySelector('#openChatBtn') || document.createElement('button');
const closeChatBtn = chatModal.querySelector('.close');

// Dummy data
let items = [
  {name:'Vintage Camera', cond:'Good', img:'https://via.placeholder.com/150'}, 
  {name:'Board Game', cond:'Like New', img:'https://via.placeholder.com/150'},
  {name:'Old Vinyl', cond:'Fair', img:'https://via.placeholder.com/150'}
];

function renderItems(list) {
  itemsGrid.innerHTML = '';
  list.forEach(it => {
    const div = document.createElement('div'); div.className = 'card';
    div.innerHTML = `
      <img src="${it.img}" alt="${it.name}">
      <div class="details">
        <h3>${it.name}</h3>
        <p>Condition: ${it.cond}</p>
        <div class="actions">
          <button class="swap">Swap</button>
          <button class="buy">Buy</button>
        </div>
      </div>`;
    itemsGrid.append(div);
  });
}

function filterItems() {
  const term = searchInput.value.toLowerCase();
  const condVal = conditionFilter.value;
  renderItems(items.filter(i => i.name.toLowerCase().includes(term) && (!condVal || i.cond === condVal)));
}

searchInput.addEventListener('input', filterItems);
conditionFilter.addEventListener('change', filterItems);

// Modal events
document.body.addEventListener('click', e => {
  if(e.target.classList.contains('btn-primary') || e.target.id === 'openChatBtn') chatModal.style.display = 'flex';
});
closeChatBtn.onclick = () => chatModal.style.display = 'none';
window.onclick = e => { if(e.target === chatModal) chatModal.style.display = 'none'; };

renderItems(items);
