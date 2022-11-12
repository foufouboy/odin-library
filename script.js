
// Au début et à chaque fois qu'un ajout ou retrait est fait sur la bibliotèque,
// on la réaffiche avec displayBooks. Ça n'est pas très optimisé mais dans le cadre
// de l'exercice on s'en fout.

// On ne va avoir qu'une seule librairie, donc faire un constructeur de librairie 
// ne fait pas vraiment sens. Toutes les fonctions du contexte général gèrent les
// fonctionnalités de la librairie

// ----- CLASSES 

function Book(title, author, pages, image, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.image = image;
    this.display = null;

    this.info = () => {
        let result = `${this.title} by ${this.author}, ${this.pages} pages, `
        return (read) ? result + "read" : result + "not read yet";
   }
}

// ----- FUNCTIONS

Book.prototype.getDisplay = function () {
    return this.display;
}

Book.prototype.setDisplay = function () {

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card"); 

    const bookImage = document.createElement("div");
    bookImage.classList.add("book-image");

    const bookDesc = document.createElement("div");
    bookDesc.classList.add("book-description");

    const bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");

    const bookDescriptionBottom = document.createElement("div")
    bookDescriptionBottom.classList.add("book-description-bottom");

    const bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = "Pages: ";

    const bookPagesNumber = document.createElement("span");
    bookPagesNumber.textContent = this.pages;

    const bookOptions = document.createElement("div");
    bookOptions.classList.add("options");

    const bookStatusButton = document.createElement("button");
    bookStatusButton.classList.add("book-status");

    const trashImg = document.createElement("img");
    trashImg.src = "assets/trash-can.png";
    trashImg.alt = "remove-book";

    bookTitle.textContent = this.title;
    bookAuthor.textContent = this.author;
    bookImage.style.backgroundImage = this.image;
    bookImage.style.backgroundSize = "cover";

    if (!this.image) {
        bookImage.style.flex = "initial";
    }

    if (this.read) {
        bookStatusButton.innerHTML = `<img src="assets/check-circle.png">Read`;
    } else {
        bookStatusButton.textContent = "Mark as read";
    }

    bookCard.appendChild(bookImage);
    bookCard.appendChild(bookDesc);

    bookDesc.appendChild(bookTitle);
    bookDesc.appendChild(bookAuthor);
    bookDesc.appendChild(bookDescriptionBottom);

    bookDescriptionBottom.appendChild(bookPages);
    bookPages.appendChild(bookPagesNumber);

    bookDescriptionBottom.appendChild(bookOptions);
    bookOptions.appendChild(bookStatusButton);
    bookOptions.appendChild(trashImg);

    this.display = bookCard;
}

function removeBook(e) {
    bookCard = e.currentTarget.bookCard;
    bookCard.parentElement.removeChild(bookCard);
    removeBookModal.style.display = "none";
}

function updateBooks(bookAdded) {
    newBookStatus = document.querySelector(".library .book-card:last-child button.book-status");
    newBookTrash = document.querySelector(".library .book-card:last-child .options > img");

    booksLibrary = Array.from(document.querySelectorAll(".book-card"));
    booksStatusButtons = document.querySelectorAll("button.book-status");
    removeBookButtons = document.querySelectorAll(".options > img");

    newBookStatus.addEventListener("click", (e) => {

        if (e.target.textContent === "Mark as read") {
            e.target.innerHTML = `<img src="assets/check-circle.png">Read`;
        } else {
            e.target.textContent = "Mark as read";
        }
    
    });

    newBookTrash.addEventListener("click", (e) => {
        removeBookModal.style.display = "flex";

        // Not really elegant
        
        const bookCard = newBookTrash.parentElement.parentElement.parentElement.parentElement;
        const yesButton = document.querySelector(".confirmation.yes");
        const noButton = document.querySelector(".confirmation.no");
        
        yesButton.bookCard = bookCard; 
        yesButton.addEventListener("click", removeBook);

        noButton.addEventListener("click", () => {
            removeBookModal.style.display = "none";
        })


    });

}

function appInit() {
    addBookButton.addEventListener("click", (e) => {
        bookModal.style.display = "flex"; 
    });
    
    bookModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-book-modal")) {
           bookModal.style.display = "none"; 
        }
    });

    removeBookModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-book-modal")) {
            removeBookModal.style.display = "none";
        }
    });

    for (let removeButton of removeBookButtons) {

        removeButton.addEventListener("click", (e) => {
            removeBookModal.style.display = "flex";

            // Not really elegant
            
            const bookCard = removeButton.parentElement.parentElement.parentElement.parentElement;
            const yesButton = document.querySelector(".confirmation.yes");
            const noButton = document.querySelector(".confirmation.no");
            
            yesButton.bookCard = bookCard; 
            yesButton.addEventListener("click", removeBook);

            noButton.addEventListener("click", () => {
                removeBookModal.style.display = "none";
                yesButton.removeEventListener("click", removeBook);
            })


        });
    }

    for (let statusButton of booksStatusButtons) {
        statusButton.addEventListener("click", (e) => {

            if (e.target.textContent === "Mark as read") {
                e.target.innerHTML = `<img src="assets/check-circle.png">Read`;
            } else {
                e.target.textContent = "Mark as read";
            }
        
        });
    }
}
// ----- GLOBAL VARIABLES

const bookModal = document.querySelector(".add-book-modal");
const bookForm = document.querySelector("form");
const libraryDisplay = document.querySelector("main.library");
const addBookButton = document.querySelector("header button.add-book");
const removeBookModal = document.querySelector(".remove-book-modal");

let booksLibrary = Array.from(document.querySelectorAll(".book-card"));
let booksStatusButtons = document.querySelectorAll("button.book-status");
let removeBookButtons = document.querySelectorAll(".options > img");

console.log({addBookButton, booksStatusButtons, bookForm, bookModal, booksLibrary});

// ----- MAIN EXECUTION

function main() {

    
    appInit();

    /* ---- BOOK ADDING */
    
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const bookTitle = document.querySelector("input#book-title").value;
        const bookAuthor = document.querySelector("input#book-author").value;
        const bookPages = document.querySelector("input#book-pages").value;
        const imageValue = document.querySelector("input#book-image").value;
        const bookImage = (imageValue.match(/.+\.(jpg|jpeg|gif|png)$/)) ? `url("${imageValue}")` : "";
        const bookRead = document.querySelector("input#book-read").checked;

        bookInfos = [bookTitle, bookAuthor, bookPages, bookImage, bookRead]
        console.table(bookInfos)

        newBook = new Book(bookTitle, bookAuthor, bookPages, bookImage, bookRead);

        newBook.setDisplay();
        booksLibrary.push(newBook.getDisplay());
        libraryDisplay.appendChild(newBook.getDisplay());

        bookModal.style.display = "none"; 

        bookForm.reset();
        updateBooks(newBook);

    });

}

main();
