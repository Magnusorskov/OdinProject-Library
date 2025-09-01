class Book {
    title;
    author;
    pages;
    hasRead;
    id;

    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead ? "has read" : "has not read yet"
        this.id = crypto.randomUUID();
    }


    info() {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`);
    }

}







