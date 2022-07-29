const inquirer = require('inquirer');
const mysql = require('mysql2');
// const cTable = require('console.table');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  }
);

db.connect((err) => {
  if(err){
    console.log('you have not connected to the employees_db database :(');
    return;
  }
  console.log('you have connected to the employees_db database!');
});

module.exports = db;

inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role'],
    },
  ])
  .then((answers) => {
    const {choice} = answers; 

    if (choice === 'View all departments') {
      db.query('SELECT * FROM department', (err,rows) => {
        console.log('Here are the departments!');
        console.table(rows)
    })};

    if (choice === 'View all roles') {
      db.query('SELECT * FROM role', (err,rows) => {
        console.log('Here are the roles!');
        console.table(rows)
    })};

    if (choice === 'View all employees') {
      db.query('SELECT * FROM employee', (err,rows) => {
        console.log('Here are the employeed!');
        console.table(rows)
    })};

    // if (choices === 'Add a department') {
     
    // }});

    // if (choices === 'View all employees') {
      
    // };

    // if (choices === 'View all employees') {
      
    // }

  // 
  
app.listen(PORT, () => {
    console.log(`server is currently at ${PORT} !`);
  })})