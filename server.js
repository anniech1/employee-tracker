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
        console.log('Here are the employees!');
        console.table(rows)
    })};

    if (choice === 'Add a department') {
        addDepartment();
      
    };

    if (choice === 'Add a role') {
      addRole();
    };

    if (choice === 'Add an employee') {
      addEmployee();
    }});
   // if (choices === 'Update an employee role') {
      
    // };

  // 

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addDepartment',
        message: "What is the name of this department?"
      },
  ])
  .then(answer => {
    db.query('INSERT INTO department (name) VALUES (?)', answer.addDepartment, (err, rows)=> {
      console.log('Here is an updated list of departments!');
      db.query('SELECT * FROM department', (err,rows) => {
        console.table(rows)})
    })
  })};

addRole = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'addRoleTitle',
          message: "What is the title of this role?"
        },
        {
          type: 'input',
          name: 'addRoleSalary',
          message: "What is the salary for this role?"
        },
        {
          type: 'input',
          name: 'addRoleDepartment',
          message: "What department is this role part of?"
        }
    ])
    .then(answer => {
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?)', answer.addRoleTitle, answer.addRoleSalary, answer.addRoleDepartment, (err, rows)=> {
        console.log('Here is an updated list of roles!');
        db.query('SELECT * FROM role', (err,rows) => {
          console.table(rows)})
      })
    })};  