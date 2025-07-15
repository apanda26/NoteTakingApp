const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';

    // Default view mode
    noteEl.innerHTML = `
      <p id="note-text-${index}">${note}</p>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      <button onclick="editNote(${index})">Edit</button>
    `;

    notesList.appendChild(noteEl);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote(index) {
  const noteEl = notesList.children[index];
  const currentText = notes[index];

  noteEl.innerHTML = `
    <textarea id="edit-textarea-${index}">${currentText}</textarea>
    <button onclick="saveEdit(${index})">Save</button>
    <button onclick="cancelEdit(${index})">Cancel</button>
  `;
}

function saveEdit(index) {
  const editedText = document.getElementById(`edit-textarea-${index}`).value.trim();
  if (editedText !== '') {
    notes[index] = editedText;
    saveNotes();
    renderNotes();
  }
}

function cancelEdit(index) {
  renderNotes();
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (text !== '') {
    notes.unshift(text); // add to top
    saveNotes();
    renderNotes();
    noteInput.value = '';
  }
});

renderNotes();
