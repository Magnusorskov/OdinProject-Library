const library = [];

function Book(title, author, pages, hasRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead ? "has read" : "has not read yet"
    this.id = crypto.randomUUID();


}

Book.prototype.info = function () {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`);
}



function addBookToLibrary(title, author, pages, hasRead) {
    library.push(new Book(title, author, pages, hasRead));
}



