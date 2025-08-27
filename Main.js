const library = [];

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

    const bookName = document.createElement("h2");
    bookName.textContent = book.title;
    newDiv.appendChild(bookName);

    const newDl = document.createElement("dl");

    const dlRowArray = [];
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
        dlRowArray.push(rowDiv);
    }

    for (const bookDlRows of dlRowArray) {
        newDl.appendChild(bookDlRows);
    }
    newDiv.appendChild(newDl);
    return newDiv
}


document.querySelector("button").addEventListener("click", () => {
    addBookToLibrary("Test", "Magnus Dammeyer", 360, true);
    updateLibrary();
})

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

