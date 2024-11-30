// this affects the DOM for the journal
import { getEntries, deleteAtIndex } from './dataModel.js';

export function updateEntries() {
    const entriesList = document.querySelector(".entries-list");
    entriesList.innerHTML = "";

    getEntries().forEach((entry, index) => {
        const displayEntryBtn = createButton('display-entry-button', entry.entryDate);
        const deleteEntryBtn = createButton('delete-entry-button', 'Delete');
        const titleEl = createElement('h3', 'single-entry title', entry.entryTitle);
        const textEl = createElement('div', 'single-entry clear', entry.entryDescription);

        [displayEntryBtn, deleteEntryBtn, titleEl, textEl].forEach(el => entriesList.appendChild(el));

        displayEntryBtn.addEventListener("click", () => {
            hideAllEntries();
            showElement(titleEl, textEl);
        });

        deleteEntryBtn.addEventListener("click", () => deleteAtIndex(index, updateEntries));
    });
}

export function clearInputFields() {
    document.querySelector(".entry-title").value = "";
    document.querySelector(".entry-textbox").value = "";
}

function createButton(className, text) {
    const button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    return button;
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.innerText = text;
    element.style.display = "none";
    return element;
}

function hideAllEntries() {
    document.querySelectorAll(".single-entry").forEach(element => {
        element.style.display = "none";
    });
}

function showElement(titleEl, textEl) {
    titleEl.style.display = "block";
    textEl.style.display = "block";
}