// this controls the storage for the journal
let entries = [];

export function readData() {
    let parsedEntries = JSON.parse(localStorage.getItem("entries"));
    if (parsedEntries) {
        entries = parsedEntries;
    }
    return entries;
}

export function saveData() {
    localStorage.setItem("entries", JSON.stringify(entries));
    localStorage.setItem("lastChangedDate", JSON.stringify(getCurrentDateTime()));
}

export function addNewEntry(title, description, callback) {
    let entry = {
        entryTitle: title,
        entryDescription: description,
        entryDate: getCurrentDateTime(),
    };
    entries.push(entry);
    saveData();
    callback && callback();
}

export function deleteAtIndex(index, callback) {
    console.log("Deleting at index: " + index);
    if (index >= 0 && index < entries.length) {
        entries.splice(index, 1);
        saveData();
        callback && callback();
    }
}

export function getCurrentDateTime() {
    let nowDate = new Date();
    nowDate.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
    });
    return nowDate.toLocaleString();
}

export function getEntries() {
    return entries;
}