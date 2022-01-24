const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
var uniqid = require('uniqid'); 

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for submitting a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in adding note');
  }
});

// DELETE Route for deleting a note
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received for current note`);
  const noteId = req.params.id;

  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one we are deleting
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result);
      res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = notes;