const bookContainer = document.querySelector(".book-section");
let library = [];
const bookSuggestions = [...createBookSuggestions()];

function createBookSuggestions() {
    const bookSuggestions = [];
    const defaultBooks = [
        { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, hasRead: false },
        { title: "Dune", author: "Frank Herbert", pages: 412, hasRead: false },
        { title: "1984", author: "George Orwell", pages: 328, hasRead: false },
        { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", pages: 215, hasRead: false },
        { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, hasRead: false },
        { title: "Pride and Prejudice", author: "Jane Austen", pages: 279, hasRead: false },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, hasRead: false },
        { title: "Moby Dick", author: "Herman Melville", pages: 635, hasRead: false },
        { title: "War and Peace", author: "Leo Tolstoy", pages: 1225, hasRead: false },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224, hasRead: false }
    ];
    for (const bookData of defaultBooks) {
        const newBook = new Book(bookData.title, bookData.author, bookData.pages, bookData.hasRead);
        bookSuggestions.push(newBook);
    }
    return bookSuggestions;
}

function addBookToLibrary(title, author, pages, hasRead) {
    library.push(new Book(title, author, pages, hasRead));
}

function findBookOnId (idNumber) {
    return library[library.findIndex(book => book.id === idNumber)];

}
function removeBook(idNumber) {
    library = library.splice(findBookOnId(idNumber), 1);
}

function toggleReadOnBookObject(idNumber) {
    const bookToManipulate = findBookOnId(idNumber);
    bookToManipulate.hasRead = bookToManipulate.hasRead ? "has read" : "has not read yet";
}



function updateLibrary() {
    for (const book of library) {
        bookContainer.appendChild(createHtml(book));
    }
}

function createHtml(book) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card")
    newDiv.setAttribute("data-book-id", book.id);

    const bookName = document.createElement("h2");
    bookName.textContent = book.title;
    newDiv.appendChild(bookName);

    const newDl = document.createElement("dl");

    for (let i = 0; i < 4; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("dl-row");

        const newDt = document.createElement("dt");
        const newDd = document.createElement("dd");

        switch (i) {
            case 0:
                newDt.textContent = "Author";
                newDd.textContent = book.author;
                break;
            case 1:
                newDt.textContent = "Pages count";
                newDd.textContent = book.pages;
                break;
            case 2:
                newDt.textContent = "Reading status";
                newDd.textContent = book.hasRead ? "has read" : "has not read yet";
                newDd.classList.add("reading-status");
                break;
            case 3:
                newDt.textContent = "ID";
                newDd.textContent = book.id;
                break;
        }

        rowDiv.appendChild(newDt);
        rowDiv.appendChild(newDd);
        newDl.appendChild(rowDiv);

    }
    newDiv.appendChild(newDl);

    const buttonRow = document.createElement("div");
    buttonRow.classList.add("button-row");


    // Read toggle ---------------
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read toggle"
    readBtn.classList.add("read-button");

    readBtn.addEventListener("click", () => {
        toggleReadOnBookObject(book.id);
        const readStatusElement = newDiv.querySelector(".reading-status");
        readStatusElement.textContent = readStatusElement.textContent === "has read" ? "has not read yet" : "has read";
    })


    // Remove book ----------------
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove book";
    removeBookBtn.classList.add("remove-book");

    removeBookBtn.addEventListener("click", () => {
        removeBook(book.id);
        newDiv.remove();
    })
    // ------------------


    buttonRow.appendChild(readBtn);
    buttonRow.appendChild(removeBookBtn);
    newDiv.appendChild(buttonRow);


    return newDiv;
}


// MODAL -------------------
const addButton = document.querySelector(".add-book");
const closeButton = document.querySelector("dialog button")
const dialog = document.querySelector("dialog");

addButton.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    dialog.close();
})
// ---------------------------


// REMOVE ALL -----------------
const removeAllBtn = document.querySelector(".remove-all")

removeAllBtn.addEventListener("click", () => {
    let books = document.querySelectorAll(".card");
    for (const book of books) {
        book.remove()
    }
    library = [];
})
// -----------------------


// READ TOGGLE

// ---------



















// TEST -----------------------
document.querySelector("button").addEventListener("click", () => {
    addBookToLibrary("Test", "Magnus Dammeyer", 360, false);
    updateLibrary();
})

addBookToLibrary("Test", "Magnus Dammeyer", 360, false);
updateLibrary();
// ----------------------