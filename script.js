const newSubmit = document.getElementById('newSubmit');
const newInput = document.getElementById('newInput');
const parenth = document.getElementById('parenth');

let TodoItems = [];
let id = 0;

// listen new submit
newSubmit.addEventListener('click', addingNewItem);
newSubmit.addEventListener('click', addToLocalStorage);

function addingNewItem() {
	renderSomeItem(newInput.value);
}

function renderSomeItem(itemText) {
	
	const item = document.createElement('LI');
	const textNode = document.createTextNode(itemText);

	parenth.appendChild(item).appendChild(textNode);
}

function renderItemFromObject(obj) {
	
	const item = document.createElement('LI');
	const textNode = document.createTextNode(obj.description);

	parenth.appendChild(item).appendChild(textNode);
}

function addToLocalStorage() {
	id++;
	TodoItems.push({
		'id': id,
		'description': newInput.value,
		'isDone' : false
	});
	localStorage.setItem('TodoItems', JSON.stringify(TodoItems));
}

function loadItemFromLocalStorage() {
	TodoItems = JSON.parse(localStorage.getItem('TodoItems'));
	//console.log(TodoItems);
	TodoItems.forEach(renderItemFromObject);
}

function deleteItem(event) {
	event.target.parentElement.remove();
}