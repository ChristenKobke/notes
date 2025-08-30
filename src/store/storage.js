// src/store/storage.js

// Get all notes from localStorage
export function getNotes() {
    const data = localStorage.getItem('notes');
    return data ? JSON.parse(data) : [];
}

// Save all notes to localStorage
export function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}
