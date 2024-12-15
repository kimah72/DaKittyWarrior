// this affects the DOM for the journal
import { getEntries, deleteAtIndex } from './dataModel.js';

function toggleDeleteButtons(visible = true) {
    const deleteButtons = document.querySelectorAll('.delete-entry-button');
    deleteButtons.forEach(button => button.style.display = visible ? 'inline-block' : 'none');
}

function toggleEntryVisibility(titleEl, textEl) {
    const isVisible = titleEl.style.display === 'block';
    titleEl.style.display = isVisible ? 'none' : 'block';
    textEl.style.display = isVisible ? 'none' : 'block';
    if (isVisible) {
        hideAllEntries();
    }
}

export function updateEntries() {
    const entriesList = document.querySelector(".entries-list");
    entriesList.innerHTML = "";

    getEntries().forEach((entry, index) => {
        const displayEntryBtn = createButton('display-entry-button', entry.entryDate);
        const deleteEntryBtn = createButton('delete-entry-button', 'Delete');
        const titleEl = createElement('h3', 'single-entry title', entry.entryTitle);
        const textEl = createElement('div', 'single-entry clear', entry.entryDescription);

        [displayEntryBtn, deleteEntryBtn, titleEl, textEl].forEach(el => entriesList.appendChild(el));

        displayEntryBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleEntryVisibility(titleEl, textEl);
        });

        [titleEl, textEl].forEach(el => {
            el.addEventListener("click", (event) => {
                event.stopPropagation();
                toggleEntryVisibility(titleEl, textEl);
            });
        });
        
        deleteEntryBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteAtIndex(index, updateEntries);
        });
    });

    toggleDeleteButtons(false);
}

export function showDeleteButtons() {
    toggleDeleteButtons(true);
}
export function hideDeleteButtons() {
    toggleDeleteButtons(false);
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

function hideAllEntries(except) {
    document.querySelectorAll(".single-entry").forEach(element => {
        if (element !== except && element.style.display === "block") {
            element.style.display = "none";
        }
    });
}