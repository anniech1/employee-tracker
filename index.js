const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`you have connected to the employees_db database!`)
);


inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
  ])
  .then((answers) => {
    const { choices } = answers; 

    if (choices === 'View all departments') {
      db.query("SELECT * FROM employees",(err,data)=>{
        if(err){
            throw err
        }
        console.log(data);
    })
  }})
  

app.listen(PORT, () => {
    console.log(`server is currently at ${PORT} !`);
  });