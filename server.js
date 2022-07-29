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
  //console.log('you have connected to the employees_db database!');
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
    };

    if (choice === 'Update an employee role') {
      updateEmployeeRole();
    }
  });

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
          message: "What department is this role part of? Make sure to enter the corresponding number."
        }
    ])
    .then(answers => {
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', answers.addRoleTile, answers.addRoleSalary, answers.addRoleDepartment, (err, rows)=> {
        console.log('Here is an updated list of roles!');
        db.query('SELECT * FROM role', (err,rows) => {
          console.table(rows)})
      })
    })};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is this employee's first name?"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is their last name?"
      },
      {
        type: 'input',
        name: 'role',
        message: "What is their role?"
      },
      {
        type: 'input',
        name: 'manager',
        message: "Who is their manager? Answer with their id number."
      }
      ])
    .then(answers => {
      db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', answers.first_name, answers.last_name, answers.role_id, answers.manager_id, (err, rows)=> {
        console.log('Here is an updated list of departments!');
        db.query('SELECT * FROM employee', (err,rows) => {
          console.table(rows)})
      })
})};