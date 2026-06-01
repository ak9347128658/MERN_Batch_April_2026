# PostgreSQL ALTER Command - Complete Live Class

## 1. What is ALTER?

The **ALTER** command is used to **modify the structure of an existing database object** such as:

* Table
* Column
* Constraint
* Index
* Schema

### Real-world Example

Suppose your company has a `users` table.

Initially:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```

Later business says:

> "We also need email and phone number."

Instead of deleting and recreating the table, we use **ALTER**.

```sql
ALTER TABLE users
ADD COLUMN email VARCHAR(255);
```

---

# Why ALTER is Important

Without ALTER:

❌ Backup data

❌ Drop table

❌ Create again

❌ Insert data again

With ALTER:

✅ Change structure without losing data

---

# Setup for Practice

Create database:

```sql
CREATE DATABASE alter_demo;
```

Connect:

```sql
\c alter_demo
```

Create table:

```sql
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(100),
    salary NUMERIC(10,2)
);
```

---

# Bulk Insert Data

```sql
INSERT INTO employees(emp_name,salary)
VALUES
('John',50000),
('David',60000),
('Emma',70000),
('Sophia',80000),
('Michael',90000),
('William',55000),
('Olivia',75000),
('James',85000),
('Charlotte',65000),
('Benjamin',95000);
```

Read:

```sql
SELECT * FROM employees;
```

---

# ALTER Operation 1: ADD COLUMN

## Definition

Adds a new column to an existing table.

### Syntax

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype;
```

### Example

### Before

| emp_id | emp_name | salary |
| ------ | -------- | ------ |
| 1      | John     | 50000  |

Add email column:

```sql
ALTER TABLE employees
ADD COLUMN email VARCHAR(255);
```

### Update Existing Records

```sql
UPDATE employees
SET email = LOWER(emp_name) || '@gmail.com';
```

### Read

```sql
SELECT * FROM employees;
```

---

# ALTER Operation 2: ADD Multiple Columns

```sql
ALTER TABLE employees
ADD COLUMN phone VARCHAR(15),
ADD COLUMN city VARCHAR(50);
```

### Update

```sql
UPDATE employees
SET city='Hyderabad',
    phone='9999999999';
```

### Read

```sql
SELECT * FROM employees;
```

---

# ALTER Operation 3: DROP COLUMN

## Definition

Removes a column permanently.

### Syntax

```sql
ALTER TABLE employees
DROP COLUMN city;
```

### Verify

```sql
SELECT * FROM employees;
```

Column disappears.

---

# ALTER Operation 4: RENAME COLUMN

### Before

```sql
email
```

Rename to:

```sql
ALTER TABLE employees
RENAME COLUMN email TO employee_email;
```

### Verify

```sql
SELECT * FROM employees;
```

---

# ALTER Operation 5: Change Data Type

## Definition

Changes column datatype.

### Current

```sql
phone VARCHAR(15)
```

### Change

```sql
ALTER TABLE employees
ALTER COLUMN phone TYPE BIGINT
USING phone::BIGINT;
```

### Verify

```sql
\d employees
```

---

# ALTER Operation 6: SET DEFAULT Value

## Definition

Automatically inserts a value if none provided.

### Add Department

```sql
ALTER TABLE employees
ADD COLUMN department VARCHAR(50);
```

Set default:

```sql
ALTER TABLE employees
ALTER COLUMN department
SET DEFAULT 'IT';
```

Insert:

```sql
INSERT INTO employees(emp_name,salary)
VALUES('Robert',65000);
```

Read:

```sql
SELECT * FROM employees;
```

Department becomes IT automatically.

---

# ALTER Operation 7: DROP DEFAULT

```sql
ALTER TABLE employees
ALTER COLUMN department
DROP DEFAULT;
```

---

# ALTER Operation 8: SET NOT NULL

## Definition

Column cannot contain NULL.

First update NULL values:

```sql
UPDATE employees
SET department='IT'
WHERE department IS NULL;
```

Add constraint:

```sql
ALTER TABLE employees
ALTER COLUMN department
SET NOT NULL;
```

### Test

```sql
INSERT INTO employees(emp_name,salary,department)
VALUES('Alex',50000,NULL);
```

Result:

```text
ERROR: null value violates not-null constraint
```

---

# ALTER Operation 9: DROP NOT NULL

```sql
ALTER TABLE employees
ALTER COLUMN department
DROP NOT NULL;
```

---

# ALTER Operation 10: Add UNIQUE Constraint

Add new column:

```sql
ALTER TABLE employees
ADD COLUMN aadhaar VARCHAR(12);
```

Populate data:

```sql
UPDATE employees
SET aadhaar = emp_id::text || '12345678901';
```

Add constraint:

```sql
ALTER TABLE employees
ADD CONSTRAINT unique_aadhaar
UNIQUE(aadhaar);
```

### Test

```sql
INSERT INTO employees
(emp_name,salary,aadhaar)
VALUES
('Rahul',50000,'112345678901');
```

Error because duplicate.

---

# ALTER Operation 11: Drop Constraint

Find constraint:

```sql
\d employees
```

Drop:

```sql
ALTER TABLE employees
DROP CONSTRAINT unique_aadhaar;
```

---

# ALTER Operation 12: Add CHECK Constraint

```sql
ALTER TABLE employees
ADD CONSTRAINT salary_check
CHECK(salary > 0);
```

### Test

```sql
INSERT INTO employees
(emp_name,salary)
VALUES
('Test',-5000);
```

Error generated.

---

# ALTER Operation 13: Add PRIMARY KEY

Create table:

```sql
CREATE TABLE students(
    student_id INT,
    name VARCHAR(100)
);
```

Insert data:

```sql
INSERT INTO students VALUES
(1,'John'),
(2,'David'),
(3,'Emma');
```

Add PK:

```sql
ALTER TABLE students
ADD CONSTRAINT pk_students
PRIMARY KEY(student_id);
```

---

# ALTER Operation 14: Add Foreign Key

Create Departments:

```sql
CREATE TABLE departments(
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100)
);
```

Bulk Insert:

```sql
INSERT INTO departments(dept_name)
VALUES
('IT'),
('HR'),
('Finance'),
('Sales'),
('Marketing');
```

Add Column:

```sql
ALTER TABLE employees
ADD COLUMN dept_id INT;
```

Add FK:

```sql
ALTER TABLE employees
ADD CONSTRAINT fk_department
FOREIGN KEY(dept_id)
REFERENCES departments(dept_id);
```

---

# ALTER Operation 15: Rename Table

```sql
ALTER TABLE employees
RENAME TO company_employees;
```

Read:

```sql
SELECT * FROM company_employees;
```

---

# ALTER Operation 16: Change Table Owner

```sql
ALTER TABLE company_employees
OWNER TO postgres;
```

---

# ALTER Operation 17: Move Table to Another Schema

Create schema:

```sql
CREATE SCHEMA company;
```

Move:

```sql
ALTER TABLE company_employees
SET SCHEMA company;
```

Access:

```sql
SELECT * FROM company.company_employees;
```

---

# Complete CRUD Example Using ALTER

## CREATE

```sql
ALTER TABLE employees
ADD COLUMN joining_date DATE;
```

---

## READ

```sql
SELECT * FROM employees;
```

---

## UPDATE

```sql
ALTER TABLE employees
RENAME COLUMN joining_date TO hire_date;
```

---

## DELETE

```sql
ALTER TABLE employees
DROP COLUMN hire_date;
```

---

# Interview Questions

### Q1 Why ALTER is used?

To modify existing database objects without recreating them.

### Q2 Difference between ALTER and UPDATE?

| ALTER             | UPDATE       |
| ----------------- | ------------ |
| Changes structure | Changes data |
| DDL               | DML          |

Example:

```sql
ALTER TABLE employees
ADD COLUMN age INT;
```

```sql
UPDATE employees
SET age=25;
```

### Q3 Does ALTER delete data?

Usually No.

Only when using:

```sql
DROP COLUMN
```

or

```sql
DROP TABLE
```

data may be lost.

---

## Summary

Most Used ALTER Commands:

```sql
ADD COLUMN
DROP COLUMN
RENAME COLUMN
ALTER COLUMN TYPE
SET DEFAULT
DROP DEFAULT
SET NOT NULL
DROP NOT NULL
ADD CONSTRAINT
DROP CONSTRAINT
RENAME TABLE
ADD PRIMARY KEY
ADD FOREIGN KEY
ADD UNIQUE
ADD CHECK
SET SCHEMA
OWNER TO
```

These are the ALTER operations used in almost every production PostgreSQL application.
