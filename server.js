/*
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
*/

const express = require('express');
const path = require('path');
const notesData = require('db.json');

const PORT = 3001;

const app = express();

express.static(root, [options]);
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Read db.json file and return saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json({
        term: 'api'
    });
});

// Receive new note to save on request body, add it in db.json file, return new note to client  unique IDs
app.post('/api/notes', (req, res) => {

})
  
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
  