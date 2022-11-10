
// Au début et à chaque fois qu'un ajout ou retrait est fait sur la bibliotèque,
// on la réaffiche avec displayBooks. Ça n'est pas très optimisé mais dans le cadre
// de l'exercice on s'en fout.

// On ne va avoir qu'une seule librairie, donc faire un constructeur de librairie 
// ne fait pas vraiment sens. Toutes les fonctions du contexte général gèrent les
// fonctionnalités de la librairie

// ----- CLASSES 

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        let result = `${this.title} by ${this.author}, ${this.pages} pages, `
        return (read) ? result + "read" : result + "not read yet";
    }
}

// ----- FUNCTIONS

function addBookToLibrary(book) {
    books.push(book);
}

function addBookDisplay(book) {
    
}

function removeBook() {

}

function displayBooks() {
    for (let book in books)
        displayBook(book); 
} 

function updateBooks() {
    for (let book in books) 
        displayBook(book);
}

// ----- CONSTANTS

const books = [];
const addBookButton = document.querySelector("header button.add-book");
console.log(addBookButton);
const bookStatusButton = document.querySelector("button.book-status");
const submitBookButton = document.querySelector("button[type=\"submit\"]");
const bookModal = document.querySelector(".add-book-modal");

// ----- MAIN EXECUTION

function main() {

    addBookButton.addEventListener("click", (e) => {
        bookModal.style.display = "flex"; 
    })
}

main();
