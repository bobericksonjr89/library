let myLibrary = [];
myLibrary.push(new Book("Hunger Games", "Suzanne Collins", 374, true))
myLibrary.push(new Book ("Passages from Antiquity to Feudalism", "Perry Anderson", 304, false))


// constructor
function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.dateEntered = function() {
        const newDate = new Date();
        const monthName = newDate.toLocaleString("default", { month: "long" });
        return `${monthName} ${newDate.getDate()}, ${newDate.getFullYear()}`;
    }
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
        // create elements and assign classes/src
        let author = document.createElement('p');
        author.textContent = myLibrary[i].author;
        author.className = "author";
        
        let title = document.createElement('p');
        title.textContent = myLibrary[i].title;
        title.className = "title";

        let pages = document.createElement('p');
        pages.textContent = `${myLibrary[i].pages} p.`;
        pages.className = "pages";

        let body = document.querySelector('body');
        let cardDiv = document.createElement('div')
        cardDiv.className = "card";
        let textAreaDiv = document.createElement('div')
        textAreaDiv.className = "text-area";
        let stampsAreaDiv = document.createElement('div')
        stampsAreaDiv.className = "stamps-area";
        let subFieldDiv = document.createElement('div')
        subFieldDiv.className = "sub-field";
        let dateDiv = document.createElement('div')
        dateDiv.className = "date";
        dateDiv.textContent = myLibrary[i].dateEntered();
        let readDiv = document.createElement('div')
        readDiv.className = "read";

        let imageElement = document.createElement('img')
        imageElement.className = "check";
        console.log(imageElement);
        if (myLibrary[i].isRead === false) {
            imageElement.setAttribute('src', "images/unchecked.png");
        } else {
            imageElement.setAttribute('src', "images/check.png");
        }   
        
        // throw it all together
        body.appendChild(cardDiv);
        cardDiv.appendChild(textAreaDiv);
        cardDiv.appendChild(stampsAreaDiv);
        textAreaDiv.appendChild(author);
        textAreaDiv.appendChild(subFieldDiv);
        subFieldDiv.appendChild(title);
        subFieldDiv.appendChild(pages);
        stampsAreaDiv.appendChild(dateDiv);
        stampsAreaDiv.appendChild(readDiv);
        readDiv.appendChild(imageElement);
    }
}

//addBookToLibrary();
displayLibrary();






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