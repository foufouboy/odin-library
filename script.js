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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());
