USE employees_db;

INSERT INTO department(name)VALUES
("Administration"),
("Marketing"),
("Human Resources"),
("Finance");

INSERT INTO role(title,salary, department_id)VALUES
("Project Manager", 100000, 1),
("Advertisment Editor", 75000, 2),
("Copy Editor", 50000, 2),
("HR Coordinator", 75000, 3),
("Hiring Assistant", 60000, 3),
("Finanical Analyst", 55000, 4),
("Finanical Intern", 50000, 4),
("Payroll Clerk", 45000, 4),
("Chief Finacial Officer", 100000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES
("John", "Miller", 1, null),
("Beatrice", "Lee", 2, null),
("Selena", "Garcia", 3, 2),
("Ophelia", "Spear", 3, 3),
("Wendy", "Rove", 4, null),
("Kevin", "Nguyen", 4, 5),
("Emily", "Fisher", 4, 5),
("Fred", "Cook", 4, null);