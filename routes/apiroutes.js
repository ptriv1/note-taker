/*
TODO:
Step One:
Write your route.  I'd advise testing the route alone before adding code to it.  When you have written the route properly you will see the console log in your terminal.  

notes.get('/notes', (req, res) => {
  console.log('it works!')
});

Step Two:
Write getNotes() function

getNotes() {
   // getNotes will do the following 2 things
   // 1 - read db json file: for this use `readFileAsync` : learn more here - https://www.geeksforgeeks.org/node-js-fs-readfile-method/
   // 2 - return the promise for your notes so that other functions can call .then from getNotes() 
}

Step Three:
Update your route to return the actual notes.
notes.get('/notes', (req, res) => {
  // call the getNotes() function you wrote
  // parse it as JSON
  // send as a response

  // as a reminder, these functions are async and so you should use either async/await or .then
  .then((notes) => {
    return res.json(notes);
  })
});
(edited)



GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
*/

const express = require('express');
const fs = require('fs');
const notes = require('express').Router();
const util = require('util');
const router = express.Router();
const app = express();
const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

notes.get('/notes', (req, res) => {
  console.log('it works!')
});

notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
      ? res.json(result)
      : res.json('No note with that ID');
    });
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, note } = req.body;

  if (req.body) {
    const newNote = {
      title, note, note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note added successfully');
  } else {
    res.error('Error in adding note');
  }
});



module.exports = notes;