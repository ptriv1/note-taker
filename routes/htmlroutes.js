const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const util = require('util');

router.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

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

module.exports = { readFromFile, writeToFile, readAndAppend };


module.exports = router;
