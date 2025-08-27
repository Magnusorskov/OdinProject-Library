let library = [];

function addBookToLibrary(title, author, pages, hasRead) {
    library.push(new Book(title, author, pages, hasRead));
}

const bookContainer = document.querySelector(".book-section");

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
                newDt.textContent = "Reading status"
                newDd.textContent = book.hasRead ? "has read" : "has not read";
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
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read toggle"
    readBtn.classList.add("read-button");
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove book";
    removeBookBtn.classList.add("remove-book");
    buttonRow.appendChild(readBtn);
    buttonRow.appendChild(removeBookBtn);

    newDiv.appendChild(buttonRow);


    return newDiv;
}

// TEST -----------------------
document.querySelector("button").addEventListener("click", () => {
    addBookToLibrary("Test", "Magnus Dammeyer", 360, true);
    updateLibrary();
})
// ----------------------

const addButton = document.querySelector(".add-book");
const closeButton = document.querySelector("dialog button")
const dialog = document.querySelector("dialog");

addButton.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    dialog.close();
})

addBookToLibrary("Test", "Magnus Dammeyer", 360, true);
updateLibrary();

const removeAllBtn = document.querySelector(".remove-all")

removeAllBtn.addEventListener("click", () => {
    let books = document.querySelectorAll(".card");
    for (const book of books) {
        book.remove()
    }
    library = [];
})

