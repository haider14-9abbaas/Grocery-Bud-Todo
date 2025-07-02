const groceryForm = document.getElementById('grocery-form');
const groceryInput = document.getElementById('grocery-input');
const grocerySubmit = document.getElementById('grocery-submit');
const groceryList = document.getElementById('grocery-list');
const clearBtn = document.getElementById('clear-items');

let groceries = [];
let editIndex = null;

// Render grocery list
function renderGroceries() {
  groceryList.innerHTML = groceries.map((item, idx) => `
    <li class="grocery-item">
      <span class="grocery-name">${item}</span>
      <span class="grocery-actions">
        <button class="action-btn edit" title="Edit" onclick="editItem(${idx})">&#9998;</button>
        <button class="action-btn delete" title="Delete" onclick="deleteItem(${idx})">&#128465;</button>
      </span>
    </li>
  `).join('');
  clearBtn.style.display = groceries.length > 0 ? 'inline-block' : 'none';
}
window.editItem = function(idx) {
  groceryInput.value = groceries[idx];
  editIndex = idx;
  grocerySubmit.textContent = "Edit";
  groceryInput.focus();
};
window.deleteItem = function(idx) {
  groceries.splice(idx, 1);
  renderGroceries();
  groceryForm.reset();
  editIndex = null;
  grocerySubmit.textContent = "Add";
};
groceryForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const value = groceryInput.value.trim();
  if (!value) return;
  if (editIndex !== null) {
    groceries[editIndex] = value;
    editIndex = null;
    grocerySubmit.textContent = "Add";
  } else {
    groceries.push(value);
  }
  renderGroceries();
  groceryForm.reset();
});
clearBtn.addEventListener('click', function() {
  groceries = [];
  renderGroceries();
  groceryForm.reset();
  grocerySubmit.textContent = "Add";
});
window.addEventListener('DOMContentLoaded', () => {
  renderGroceries();
});
