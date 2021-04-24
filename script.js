let myLibrary = [];
myLibrary.push(new Book("Hunger Games", "Suzanne Collins", 374, "Fiction", true))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, "History", false))


// constructor
function Book(title, author, pages, genre, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.genre = genre
}

Book.prototype.dateEntered = function() {
    const newDate = new Date();
    const monthName = newDate.toLocaleString("default", { month: "long" });
    return `${monthName} ${newDate.getDate()}, ${newDate.getFullYear()}`;
}

Book.prototype.info = function() {
    return `${title} by ${author}, ${pages} pages, ${isRead ? 'read already' : 'not read yet'}.`
}

function addBookToLibrary() {
    let title = prompt("What is the title?");
    let author = prompt("Who is the author?");
    let pages = Number(prompt("How many pages?"));
    let isRead = prompt("True or false: I have read the book.")
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
 }

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        // create elements and assign classes/src
        const author = document.createElement('p');
        author.textContent = myLibrary[i].author;
        author.className = "author";
        
        const title = document.createElement('p');
        title.textContent = myLibrary[i].title;
        title.className = "title";

        const pages = document.createElement('p');
        pages.textContent = `${myLibrary[i].pages} p.`;
        pages.className = "pages";

        const genre = document.createElement('p');
        genre.textContent = myLibrary[i].genre;
        genre.className = "genre";

        const main = document.querySelector('#card-main');
        const cardDiv = document.createElement('div');
        cardDiv.className = "card";
        cardDiv.dataset.index = myLibrary[i].title;
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
        dateDiv.textContent = myLibrary[i].dateEntered();
        const readDiv = document.createElement('div');
        readDiv.className = "read";

        const deleteImage = document.createElement('img');
        deleteImage.className = "delete-img";
        deleteImage.dataset.index = myLibrary[i].title;
        deleteImage.addEventListener('click', deleteBook);
        deleteImage.setAttribute('src', "images/delete.png");

        const imageElement = document.createElement('img');
        imageElement.className = "check";
        imageElement.dataset.index = myLibrary[i].title;
        imageElement.addEventListener('click', updateReadStatus);
        console.log(imageElement);
        if (myLibrary[i].isRead === false) {
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
}

//addBookToLibrary();

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
}

function deleteBook(e) {
    const title = e.target.dataset.index;
    const book = myLibrary.find(book => book.title === title);
    const index = myLibrary.indexOf(book);
    if (confirm(`Do you want to delete ${book.title}?`)) {
        myLibrary.splice(index, 1);
        const card = document.querySelector(`.card[data-index="${title}"]`);
        card.style.animationPlayState ='running';
        card.addEventListener('animationend', () => {
            card.remove();
            console.log(myLibrary);
        })
        console.log(myLibrary);
    } 
}

const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', function(e) {
    if (e.target.textContent === "Add Book") {
        e.target.textContent = "See Books";
        document.querySelector("#card-main").style.display = "none";
        document.querySelector('#form-main').style.display = "flex";
    } else {
        e.target.textContent = "Add Book";
        document.querySelector("#card-main").style.display = "flex";
        document.querySelector('#form-main').style.display = "none";
    }
})

displayLibrary();