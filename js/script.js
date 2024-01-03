/**
 * [
 *    {
 *      id: <int>
 *      title: <string>
 *      author: <string>
 *      year: <number>
 *      isComplete: <boolean>
 *    }
 * ]
 */
const books = [];

const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() /* boolean */ {
	if (typeof(Storage) === undefined) {
		alert('Browser kamu tidak mendukung local storage');
		return false;
	}
	return true;
}

function generateId() {
	return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
	return {
		id,
		title,
		author,
		year,
		isComplete
	}
}

function findBook(bookId) {
	for (const bookItem of books) {
		if (bookItem.id === bookId) {
			return bookItem;
		}
	}
	return null;
}

function findBookIndex(bookId) {
	for (const index in books) {
		if (books[index].id === bookId) {
			return index;
		}
	}
	return -1;
}

function makeBook(bookObject) {

	const {
		id,
		title,
		author,
		year,
		isComplete
	} = bookObject;

	const textTitle = document.createElement('h2');
	textTitle.innerText = title;

	const textAuthorYear = document.createElement('p');
	textAuthorYear.innerHTML = `Penulis: ${author}<br>Tahun: ${year}`;

	const textContainer = document.createElement('div');
	textContainer.classList.add('inner');
	textContainer.append(textTitle, textAuthorYear);

	const container = document.createElement('div');
	container.classList.add('item', 'shadow')
	container.append(textContainer);
	container.setAttribute('id', `book-${id}`);

	if (isComplete) {

		const undoButton = document.createElement('button');
		undoButton.classList.add('undo-button');
		undoButton.addEventListener('click', function() {
			undoBookFromCompleted(id);
		});

		const trashButton = document.createElement('button');
		trashButton.classList.add('trash-button');
		trashButton.addEventListener('click', function() {
			removeBookFromCompleted(id);
		});

		container.append(undoButton, trashButton);
	} else {

		const checkButton = document.createElement('button');
		checkButton.classList.add('check-button');
		checkButton.addEventListener('click', function() {
			addBookToCompleted(id);
		});

		const trashButton = document.createElement('button');
		trashButton.classList.add('trash-button');
		trashButton.addEventListener('click', function() {
			removeBookFromCompleted(id);
		});

		container.append(checkButton, trashButton);
	}
	return container;
}

function addBook() {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const year = parseInt(document.getElementById('year').value);
	const isComplete = document.getElementById('isComplete').checked;

	const generatedID = generateId();
	const bookObject = generateBookObject(generatedID, title, author, year, isComplete)
	books.push(bookObject);
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();

}

function addBookToCompleted(bookId /* HTMLELement */ ) {

	const bookTarget = findBook(bookId);
	if (bookTarget == null) return;

	bookTarget.isComplete = true;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function removeBookFromCompleted(bookId /* HTMLELement */ ) {
	const bookTarget = findBookIndex(bookId);

	if (bookTarget === -1) return;

	books.splice(bookTarget, 1);
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function undoBookFromCompleted(bookId /* HTMLELement */ ) {
	const bookTarget = findBook(bookId);

	if (bookTarget == null) return;

	bookTarget.isComplete = false;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

document.addEventListener('DOMContentLoaded', function() {
	const submitForm /* HTMLFormElement */ = document.getElementById('form');

	submitForm.addEventListener('submit', function(event) {
		event.preventDefault();
		addBook();
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}

	const header = document.getElementsByTagName('header');

	const trashButton = document.createElement('button');
	trashButton.classList.add('trash-button');
	trashButton.addEventListener('click', function() {

		let type = prompt("melakukan localStorage.clear();?");
		if (type != null) {
			localStorage.removeItem(STORAGE_KEY);
			localStorage.clear();
			books.length = 0;
			document.dispatchEvent(new Event(RENDER_EVENT));
		}

	});

	header[0].append(trashButton);

});


document.addEventListener(RENDER_EVENT, function() {
	const unreadedBOOKList = document.getElementById('books');
	const listCompleted = document.getElementById('completed-books');

	// clearing list item
	unreadedBOOKList.innerHTML = '';
	listCompleted.innerHTML = '';

	for (const bookItem of books) {
		const bookElement = makeBook(bookItem);
		if (bookItem.isComplete) {
			listCompleted.append(bookElement);
		} else {
			unreadedBOOKList.append(bookElement);
		}
	}
});

function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(books);
		localStorage.setItem(STORAGE_KEY, parsed);
		document.dispatchEvent(new Event(SAVED_EVENT));

	}
}

document.addEventListener(SAVED_EVENT, function() {
	//window.alert(localStorage.getItem(STORAGE_KEY));

});

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serializedData);

	if (data !== null) {
		for (const book of data) {
			books.push(book);
		}
	}

	document.dispatchEvent(new Event(RENDER_EVENT));
}