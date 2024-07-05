#!/usr/bin/env node
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();

const countStudents = (database) => {
  return new Promise((resolve, reject) => {
    const students = {};
    let totalStudents = 0;

    fs.createReadStream(database)
      .pipe(csv())
      .on('data', (row) => {
        const field = row.field;
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(row.firstname);
        totalStudents += 1;
      })
      .on('end', () => {
        let result = `Number of students: ${totalStudents}\n`;
        for (const [field, names] of Object.entries(students)) {
          result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        }
        resolve(result.trim());
      })
      .on('error', () => {
        reject(new Error('Cannot load the database'));
      });
  });
};

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const database = process.argv[2];

  if (!database) {
    res.status(500).send('Database path must be provided');
    return;
  }

  countStudents(database)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((error) => {
      res.status(500).send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
