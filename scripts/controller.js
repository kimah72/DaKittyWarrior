// logic flow that is the base application for the journal
import { addNewEntry, readData } from './dataModel.js';
import { updateEntries, clearInputFields } from './view.js';

export function init() {
    readData();
    updateEntries();
    setupEventListeners();
}

function setupEventListeners() {
    const entryForm = document.querySelector("#entry-form");
    entryForm.addEventListener("submit", onEntrySubmit);
}

function onEntrySubmit(event) {
    event.preventDefault();
    const title = document.querySelector(".entry-title").value;
    const description = document.querySelector(".entry-textbox").value;
    
    addNewEntry(title, description, updateEntries); // Pass updateEntries here
    clearInputFields();
}