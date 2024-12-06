// logic flow that is the base application for the journal
import { addNewEntry, readData, } from './dataModel.js';
import { updateEntries, clearInputFields, showDeleteButtons, hideDeleteButtons } from './view.js';

export function init() {
    readData();
    updateEntries();
    setupEventListeners();
    setupToggleDeleteButton();
}

function setupEventListeners() {
    const entryForm = document.querySelector("#entry-form");
    entryForm.addEventListener("submit", onEntrySubmit);
}

function onEntrySubmit(event) {
    event.preventDefault();
    const title = document.querySelector(".entry-title").value;
    const description = document.querySelector(".entry-textbox").value;
    
    addNewEntry(title, description, updateEntries);
    clearInputFields();
}
function setupToggleDeleteButton() {
    const toggleBtn = document.getElementById('toggleDeleteBtn');
    let deleteButtonsVisible = false;

    toggleBtn.addEventListener('click', () => {
        deleteButtonsVisible = !deleteButtonsVisible;
        if (deleteButtonsVisible) {
            showDeleteButtons();
            toggleBtn.textContent = 'Turn OFF Delete';
        } else {
            hideDeleteButtons();
            toggleBtn.textContent = 'Turn ON Delete';
        }
    });
}