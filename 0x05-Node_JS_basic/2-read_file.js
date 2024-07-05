#!/usr/bin/env node
const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8').trim();
    const lines = data.split('\n').filter((line) => line !== '');
    const headers = lines.shift().split(',');
    const students = lines.map((line) => {
      const values = line.split(',');
      return headers.reduce((student, header, index) => {
        student[header] = values[index];
        return student;
      }, {});
    });

    console.log(`Number of students: ${students.length}`);
    
    const fields = students.reduce((acc, student) => {
      const field = student.field;
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(student.firstname);
      return acc;
    }, {});

    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
