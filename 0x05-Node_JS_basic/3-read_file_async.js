#!/usr/bin/env node
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n').filter((line) => line !== '');
        const headers = lines.shift().split(',');
        const students = lines.map((line) => {
          const values = line.split(',');
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index];
            return acc;
          }, {});
        });

        console.log(`Number of students: ${students.length}`);

        const fields = students.reduce((acc, student) => {
          const { field, firstname } = student;
          if (!acc[field]) {
            acc[field] = [];
          }
          acc[field].push(firstname);
          return acc;
        }, {});

        for (const [field, names] of Object.entries(fields)) {
          console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        }

        resolve();
      }
    });
  });
}

module.exports = countStudents;
