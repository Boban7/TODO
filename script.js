const newSubmit = document.getElementById('newSubmit');
const newCancel = document.getElementById('newCancel');
const newInput = document.getElementById('newInput');
const parent = document.getElementById('parent');

let TodoItems = [];
let id = 1;

// listen new submit
newSubmit.addEventListener('click', addingNewItem);
newSubmit.addEventListener('click', addToLocalStorage);

function addingNewItem() {
	renderSomeItem(newInput.value);
}

function renderSomeItem(itemText, idLi = id, isDone = false) {
	const li = document.createElement('LI');
	const imgToDo = document.createElement('IMG');
	const span = document.createElement('SPAN');
	const textNode = document.createTextNode(itemText);
	const imgDelete = document.createElement('IMG');

	// add attrbute to nodes
	li.setAttribute('id', idLi);
	if(isDone) {
		imgToDo.setAttribute('src','img/done-s.png');
		imgToDo.setAttribute('alt','done');
	} else {
		imgToDo.setAttribute('src','img/todo-s.png');
		imgToDo.setAttribute('alt','todo');
	}
	imgDelete.setAttribute('src','img/remove-s.jpg');
	imgDelete.setAttribute('alt','remove');

	// add listener to image- button
	imgDelete.addEventListener('mousedown', deleteItem);
	imgToDo.addEventListener('mousedown', done);

	const readyLi = parent.appendChild(li);
	readyLi.appendChild(imgToDo);
	readyLi.appendChild(span).appendChild(textNode);
	readyLi.appendChild(imgDelete);

	if(isDone) {
		moveDown(readyLi);
	} else {
		moveUp(readyLi);
	}
}

function renderItemFromObject(obj) {
	renderSomeItem(obj.description, obj.id, obj.isDone);
}

function addToLocalStorage() {
	TodoItems.push({
		'id': id,
		'description': newInput.value,
		'isDone' : false
	});
	localStorage.setItem('TodoItems', JSON.stringify(TodoItems));
	id++;
}

function loadItemFromLocalStorage() {
	if(localStorage.getItem('TodoItems') == null) return;
	TodoItems = JSON.parse(localStorage.getItem('TodoItems'));
	console.log(TodoItems);
	TodoItems.forEach(renderItemFromObject);
	id = TodoItems[TodoItems.length - 1].id + 1;
}

function deleteItem(e) {
	// remove from local storage
	const idItemToDelete = Number(e.target.parentNode.id);

	TodoItems.forEach((item, index) => {
		if(item.id === idItemToDelete) {
			TodoItems.splice(index, 1);
		}
	});
	localStorage.setItem('TodoItems', JSON.stringify(TodoItems));

	// remove from document
	e.target.parentNode.remove();
}

function done(e) {
	// check done in local storage
	const li = e.target.parentNode;
	const idItemToDone = Number(e.target.parentNode.id);

	TodoItems.forEach((item, index) => {
		if(item.id === idItemToDone) {
			TodoItems[index].isDone = true;
		}
	});
	localStorage.setItem('TodoItems', JSON.stringify(TodoItems));

	// check done in document
	e.target.setAttribute('src', 'img/done-s.png');

	moveDown(li);
}

// move done down
function moveDown(li) {
	const ul = li.parentNode;

	ul.insertBefore(li, ul.lastChild);
	ul.insertBefore(ul.lastChild, li);
}

function moveUp(li) {
	const ul = li.parentNode;

	ul.insertBefore(li, ul.firstChild);
}

// to testing
function clearLocalStorage() {
	localStorage.removeItem('TodoItems');
}



// first attempt
//let todoItems = []; //{isDone: false, id: 12345, description: 'Todo 1'}
const add = document.getElementById('add');
const modify = document.getElementById('modify');
const main = document.getElementById('main');
const buttonAdd = document.getElementById('buttonAdd');
const saveNew = document.getElementById('saveNew');
const newItem = document.getElementById('newItem');

const cancelModify = document.getElementById('cancelModify');
const emptyComment = document.getElementById('emptyComment');

function hide(page) {
	page.classList.add('hide');
}
function show(page) {
	page.classList.remove('hide');
}
function change(pageToHide, pageToShow) {
	hide(pageToHide);
	show(pageToShow);
}

// get hash from URL
function getHashFromUrl(url) {
	console.log(String(url).slice(String(url).search('#') + 1));
	return String(url).slice(String(url).search('#') + 1);
}
// hide addPage & modifyPage on start
hide(add);
hide(modify);
//set start hash
window.location.hash = 'main';
//listen button Add
buttonAdd.addEventListener('click', () => {
	window.location.hash = 'add';
})
//listen button newSubmit
newSubmit.addEventListener('click', () => {
	window.location.hash = 'main';
})
newCancel.addEventListener('click', () => {
	window.location.hash = 'main';
})

// listen hash change
window.addEventListener('hashchange', (e) => {
	change(document.getElementById(getHashFromUrl(e.oldURL)), document.getElementById(getHashFromUrl(e.newURL)));
});

/*
// render item from Local storage
function render(item, index) {
	if(id === 2) {hide(emptyComment)};
	console.log(item.description);
	let parent = document.getElementById('parent');
	let node = document.createElement('P');
	let text = document.createTextNode(item.description);
	parent.appendChild(node).appendChild(text);
}

// listen save new item
saveNew.addEventListener('click', () => {
	todoItems.push({'isDone': false, 'id': id, 'description': newItem.value});
	id++;
	localStorage.setItem('todoItems', JSON.stringify(todoItems));
	const itemsToRender = localStorage.getItem('todoItems');
	const itemsToRenderJSON = JSON.parse(itemsToRender);
	itemsToRenderJSON.forEach(render);
});
*/
