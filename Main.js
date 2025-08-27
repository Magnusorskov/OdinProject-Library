/*
========================================
GLOBAL VARIABLES & STATE
========================================
*/

/** The container where book cards will be displayed. */
const bookContainer = document.querySelector(".book-section");

/** An array to hold all the book objects in the library. */
let library = [];

/** An array of pre-defined book suggestions. */
const bookSuggestions = [...createBookSuggestions()];


/*
========================================
INITIALIZATION & HELPER FUNCTIONS
========================================
*/

/**
 * Creates an array of default book suggestions on script startup.
 * @returns {Book[]} An array of Book objects.
 */
function createBookSuggestions() {
    const bookSuggestions = [];
    const defaultBooks = [
        {title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, hasRead: false},
        {title: "Dune", author: "Frank Herbert", pages: 412, hasRead: false},
        {title: "1984", author: "George Orwell", pages: 328, hasRead: false},
        {title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", pages: 215, hasRead: false},
        {title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, hasRead: false},
        {title: "Pride and Prejudice", author: "Jane Austen", pages: 279, hasRead: false},
        {title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, hasRead: false},
        {title: "Moby Dick", author: "Herman Melville", pages: 635, hasRead: false},
        {title: "War and Peace", author: "Leo Tolstoy", pages: 1225, hasRead: false},
        {title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224, hasRead: false}
    ];
    for (const bookData of defaultBooks) {
        // Assumes a 'Book' constructor is available from another file.
        const newBook = new Book(bookData.title, bookData.author, bookData.pages, bookData.hasRead);
        bookSuggestions.push(newBook);
    }
    return bookSuggestions;
}

/**
 * Clears all input fields in the document.
 */
function clearInputs() {
    const inputs = document.querySelectorAll("input");
    for (const input of inputs) {
        if (input.type === "checkbox") {
            input.checked = false;
        } else {
            input.value = "";
        }
    }
}


/*
========================================
LIBRARY MANAGEMENT FUNCTIONS
========================================
*/

/**
 * Creates a new Book instance and adds it to the library array.
 */
function addBookToLibrary(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead)
    library.push(book);
    return book;
}

/**
 * Finds the index of a book in the library array by its ID.
 */
function findBookIndexById(idNumber) {
    return library.findIndex(book => book.id === idNumber);
}

/**
 * Finds the book object in the library by its ID.
 */
function findBookOnId(idNumber) {
    return library[findBookIndexById(idNumber)];
}

/**
 * Removes a book from the library array using its ID.
 */
function removeBook(idNumber) {
    library.splice(findBookIndexById(idNumber), 1);
}

/**
 * Toggles the 'hasRead' property of a book object.
 */
function toggleReadOnBookObject(idNumber) {
    const bookToManipulate = findBookOnId(idNumber);
    bookToManipulate.hasRead = bookToManipulate.hasRead ? "has read" : "has not read yet";
}


/*
========================================
DOM RENDERING FUNCTIONS
========================================
*/

/**
 * Renders all books currently in the library to the DOM.
 */
function updateLibraryAllBooks() {
    for (const book of library) {
        bookContainer.appendChild(createHtml(book));
    }
}

/**
 * Appends a single new book card to the DOM.
 */
function updateLibrarySingleBook(book) {
    bookContainer.appendChild(createHtml(book));
}

/**
 * Creates the HTML element structure for a single book card.
 * @param {Book} book The book object to create a card for.
 * @returns {HTMLDivElement} The complete card element with its event listeners.
 */
function createHtml(book) {
    // Create the main card container
    const newDiv = document.createElement("div");
    newDiv.classList.add("card")
    newDiv.setAttribute("data-book-id", book.id);

    // Add the book title
    const bookName = document.createElement("h2");
    bookName.textContent = book.title;
    newDiv.appendChild(bookName);

    // Create the definition list for book details
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

    // Create a container for the buttons
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("button-row");

    // --- Create 'Read toggle' button and its event listener ---
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read toggle"
    readBtn.classList.add("read-button");
    readBtn.addEventListener("click", () => {
        toggleReadOnBookObject(book.id);
        const readStatusElement = newDiv.querySelector(".reading-status");
        readStatusElement.textContent = readStatusElement.textContent === "has read" ? "has not read yet" : "has read";
    })

    // --- Create 'Remove book' button and its event listener ---
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove book";
    removeBookBtn.classList.add("remove-book");
    removeBookBtn.addEventListener("click", () => {
        removeBook(book.id);
        newDiv.remove();
    })

    // Add buttons to the button row and the row to the card
    buttonRow.appendChild(readBtn);
    buttonRow.appendChild(removeBookBtn);
    newDiv.appendChild(buttonRow);

    return newDiv;
}


/*
========================================
EVENT LISTENERS
========================================
*/

// --- Modal open/close events ---
const addButton = document.querySelector(".add-book");
const closeButton = document.querySelector("dialog button") // Note: This selects the first button in the dialog
const dialog = document.querySelector("dialog");

addButton.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    dialog.close();
})

// --- Remove all books event ---
const removeAllBtn = document.querySelector(".remove-all")
removeAllBtn.addEventListener("click", () => {
    let books = document.querySelectorAll(".card");
    for (const book of books) {
        book.remove()
    }
    library = [];
})

// --- Suggest book event ---
const suggestBookBtn = document.querySelector(".suggest-book");
suggestBookBtn.addEventListener("click", () => {
    if (bookSuggestions.length !== 0) {
        let book = bookSuggestions.pop();
        library.push(book);
        updateLibrarySingleBook(book);
    }
})

// --- Add book from form event ---
const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", () => {
    const title = document.querySelector("input#title").value;
    const author = document.querySelector("input#author").value;
    const pages = document.querySelector("input#pages").value;
    const hasRead = document.querySelector("input#hasRead").checked;

    const book = addBookToLibrary(title, author, pages, hasRead);
    updateLibrarySingleBook(book);
    clearInputs();
})

// --- Clear inputs on close event ---
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
    clearInputs();
})