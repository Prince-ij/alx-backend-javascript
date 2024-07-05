#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const countStudents = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1).map((line) => line.split(','));

      const csStudents = students.filter((student) => student[3] === 'CS');
      const sweStudents = students.filter((student) => student[3] === 'SWE');

      let output = `Number of students: ${students.length}\n`;
      output += `Number of students in CS: ${csStudents.length}. List: ${csStudents.map((s) => s[0]).join(', ')}\n`;
      output += `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map((s) => s[0]).join(', ')}`;

      resolve(output);
    });
  });
};

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const dbPath = process.argv[2];
    countStudents(dbPath)
      .then((output) => {
        res.end(`This is the list of our students\n${output}`);
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
  }
});

app.listen(1245);

module.exports = app;
