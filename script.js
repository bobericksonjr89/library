let myLibrary = [];
myLibrary.push(new Book("Simulacra and Simulation", "Jean Baudrillard", 164, "Philosophy", true, "January 28, 2021"))
myLibrary.push(new Book("Pedagogy of the Oppressed", "Paulo Freire", 176, "Sociology", true, "February 28, 2021" ))
myLibrary.push(new Book("Ways of Seeing", "John Berger", 166, "Art", true, "March 23, 2021"))
myLibrary.push(new Book("Plato: Five Dialogues", "Plato", 168, "Philosophy", true, "April 6, 2021"))
myLibrary.push(new Book("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false, "April 25, 2021"))


// constructor
function Book(title, author, pages, genre, isRead, dateEntered) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.genre = genre
    this.dateEntered = dateEntered;

}

function getTodaysDate() {
    const newDate = new Date();
    const monthName = newDate.toLocaleString("default", { month: "long" });
    return `${monthName} ${newDate.getDate()}, ${newDate.getFullYear()}`;
}

Book.prototype.info = function() {
    return `${title} by ${author}, ${pages} pages, ${isRead ? 'read already' : 'not read yet'}.`
}

function readForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target[1].value;
        const author = e.target[0].value;
        const pages = Number(String(e.target[2].value).replace(/^0+/, ''));
        
        const genre = e.target[3].value;
        let isRead;
        if (e.target[4].checked === true) {
            isRead = true;
        } else {
            isRead = false;
        }
        const todaysDate = getTodaysDate()
        addBookToLibrary(title, author, pages, genre, isRead, todaysDate);
        form.reset();
        swapPages();
    });
}

function addBookToLibrary(title, author, pages, genre, isRead, todaysDate) {
    const newBook = new Book(title, author, pages, genre, isRead, todaysDate);
    myLibrary.push(newBook);
    displayBook(newBook);
    //save to local storage
    if (storageAvailable('localStorage')) {
        localStorage.setObj('myLibrary', JSON.stringify(myLibrary));
    }
 }

function displayLibrary() {
    if (storageAvailable('localStorage')) {
        const storedLibrary = JSON.parse(localStorage.getObj('myLibrary'));
        if (storedLibrary) {
            myLibrary = storedLibrary;
        }
    }
    myLibrary.forEach(book => displayBook(book));    
}

function displayBook(book) {
    const author = document.createElement('p');
    author.textContent = book.author;
    author.className = "author";
    
    const title = document.createElement('p');
    title.textContent = book.title;
    title.className = "title";

    const pages = document.createElement('p');
    pages.textContent = `${book.pages} p.`;
    pages.className = "pages";

    const genre = document.createElement('p');
    genre.textContent = book.genre;
    genre.className = "genre";

    const main = document.querySelector('#card-main');
    const cardDiv = document.createElement('div');
    cardDiv.className = "card";
    cardDiv.classList.add('book-card');
    cardDiv.dataset.index = book.title;
    const textAreaDiv = document.createElement('div');
    textAreaDiv.className = "text-area";
    const stampsAreaDiv = document.createElement('div');
    stampsAreaDiv.className = "stamps-area";
    const deleteDiv = document.createElement('div');
    deleteDiv.className = "delete";
    const subFieldDiv = document.createElement('div');
    subFieldDiv.className = "sub-field";
    const dateDiv = document.createElement('div');
    dateDiv.className = "date";
    if (book.dateManuallyEntered) {
        dateDiv.textContent = book.dateManuallyEntered;
    } else {
        dateDiv.textContent = book.dateEntered;
    }
    
    const readDiv = document.createElement('div');
    readDiv.className = "read";

    const deleteImage = document.createElement('img');
    deleteImage.className = "delete-img";
    deleteImage.dataset.index = book.title;
    deleteImage.addEventListener('click', deleteBook);
    deleteImage.setAttribute('src', "images/delete.png");

    const imageElement = document.createElement('img');
    imageElement.className = "check";
    imageElement.dataset.index = book.title;
    imageElement.addEventListener('click', updateReadStatus);

    if (book.isRead === false) {
        imageElement.setAttribute('src', "images/unchecked.png");
    } else {
        imageElement.setAttribute('src', "images/check.png");
    }   
    
    // throw it all together
    main.appendChild(cardDiv);
    cardDiv.appendChild(textAreaDiv);
    cardDiv.appendChild(stampsAreaDiv);
    textAreaDiv.appendChild(author);
    textAreaDiv.appendChild(subFieldDiv);
    subFieldDiv.appendChild(title);
    subFieldDiv.appendChild(pages);
    subFieldDiv.appendChild(genre);
    stampsAreaDiv.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteImage);
    stampsAreaDiv.appendChild(dateDiv);
    stampsAreaDiv.appendChild(readDiv);
    readDiv.appendChild(imageElement);
}



function updateReadStatus(e) {
    const title = e.target.dataset.index;
    const book = myLibrary.find(book => book.title === title)
    if (e.target.getAttribute('src') == "images/unchecked.png") {
        e.target.setAttribute('src', "images/check.png");
        book.isRead = true;
    } else {
        e.target.setAttribute('src', "images/unchecked.png");
        book.isRead = false;
    }

    if (storageAvailable('localStorage')) {
        localStorage.setObj('myLibrary', JSON.stringify(myLibrary));
    }
}

function deleteBook(e) {
    const title = e.target.dataset.index;
    const book = myLibrary.find(book => book.title === title);
    const index = myLibrary.indexOf(book);
    if (confirm(`Do you want to delete ${book.title}?`)) {
        myLibrary.splice(index, 1);
        if (storageAvailable('localStorage')) {
            localStorage.setObj('myLibrary', JSON.stringify(myLibrary));
        }
        const card = document.querySelector(`.card[data-index="${title}"]`);
        card.style.animationPlayState ='running';
        card.addEventListener('animationend', () => {
            card.remove();
        })
    } 
}

const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', swapPages);

function swapPages() {
    if (addButton.textContent === "Add Book") {
        addButton.textContent = "See Books";
        document.querySelector("#card-main").style.display = "none";
        document.querySelector('#form-main').style.display = "flex";
    } else {
        addButton.textContent = "Add Book";
        document.querySelector("#card-main").style.display = "flex";
        document.querySelector('#form-main').style.display = "none";
    }
}

// check button on form
const readLabel = document.querySelector('#read-label');
readLabel.addEventListener('click', (e) => {
    let readImg = readLabel.childNodes[1];
    if (readImg.getAttribute('src') == "images/unchecked.png") {
        readImg.setAttribute('src', "images/check.png");
    } else {
        readImg.setAttribute('src', "images/unchecked.png");
    }
})

//local storage
function storageAvailable(type) { // from Mozilla Web Docs
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


// add methods to Storage prototype to save arrays & objects
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

displayLibrary();
readForm();