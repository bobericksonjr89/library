let myLibrary = [];
myLibrary.push(new Book("Hunger Games", "Suzanne Collins", 374, true))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, false))


// constructor
function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${isRead ? 'read already' : 'not read yet'}.`
    }
    console.log(this.info());
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
        let para = document.createElement('p');
        let text = myLibrary[i].title;
        para.textContent = text;
        let body = document.querySelector('body');
        body.appendChild(para);

        
    }
}

//addBookToLibrary();
//displayLibrary();


const checkButtons = document.querySelectorAll('.check');
checkButtons.forEach(button => button.addEventListener('click', function(e) {
    console.log(e);
    console.log(e.target.getAttribute('src'));
    if (e.target.getAttribute('src') == "images/unchecked.png") {
        console.log("yup");
        e.target.setAttribute('src', "images/check.png");
    } else {
        e.target.setAttribute('src', "images/unchecked.png");
    }
}));