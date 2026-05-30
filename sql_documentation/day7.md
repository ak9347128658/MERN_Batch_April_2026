`UNIQUE` constraint in PostgreSQL 

### 1. Create Database

```sql
CREATE DATABASE company_db;
```

Connect to the database:

```sql
\c company_db
```

---

## 2. Create Table with UNIQUE Constraint

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_code VARCHAR(20) UNIQUE,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2)
);
```

Here:

* `employee_code` must be unique.
* `email` must be unique.
* Duplicate values are not allowed.

---

## 3. Bulk Insert Data

```sql
INSERT INTO employees
(employee_code, email, name, department, salary)
VALUES
('EMP001', 'rahul@gmail.com', 'Rahul Sharma', 'IT', 50000),
('EMP002', 'priya@gmail.com', 'Priya Patel', 'HR', 45000),
('EMP003', 'amit@gmail.com', 'Amit Kumar', 'Finance', 55000),
('EMP004', 'neha@gmail.com', 'Neha Singh', 'Marketing', 48000),
('EMP005', 'arjun@gmail.com', 'Arjun Verma', 'IT', 60000),
('EMP006', 'kiran@gmail.com', 'Kiran Rao', 'Sales', 42000),
('EMP007', 'pooja@gmail.com', 'Pooja Mehta', 'HR', 47000),
('EMP008', 'vikas@gmail.com', 'Vikas Gupta', 'IT', 52000),
('EMP009', 'anita@gmail.com', 'Anita Reddy', 'Finance', 58000),
('EMP010', 'suresh@gmail.com', 'Suresh Kumar', 'Operations', 49000);
```

---

## 4. CREATE (Insert Single Record)

```sql
INSERT INTO employees
(employee_code, email, name, department, salary)
VALUES
('EMP011', 'john@gmail.com', 'John Doe', 'IT', 65000);
```

---

## 5. READ (Select Data)

### Get All Employees

```sql
SELECT * FROM employees;
```

### Get Employees from IT Department

```sql
SELECT *
FROM employees
WHERE department = 'IT';
```

### Get Employee by Email

```sql
SELECT *
FROM employees
WHERE email = 'rahul@gmail.com';
```

---

## 6. UPDATE

### Update Salary

```sql
UPDATE employees
SET salary = 70000
WHERE employee_code = 'EMP001';
```

### Update Department

```sql
UPDATE employees
SET department = 'Engineering'
WHERE id = 1;
```

---

## 7. DELETE

### Delete One Employee

```sql
DELETE FROM employees
WHERE employee_code = 'EMP010';
```

### Delete All HR Employees

```sql
DELETE FROM employees
WHERE department = 'HR';
```

---

## 8. UNIQUE Constraint Violation Example

This will fail:

```sql
INSERT INTO employees
(employee_code, email, name, department, salary)
VALUES
('EMP001', 'new@gmail.com', 'Test User', 'IT', 50000);
```

Error:

```text
ERROR: duplicate key value violates unique constraint
```

Because `EMP001` already exists.

---

## 9. Check Constraints

```sql
SELECT
    conname AS constraint_name,
    contype AS constraint_type
FROM pg_constraint
WHERE conrelid = 'employees'::regclass;
```

---

## 10. UPSERT (Insert if not exists, otherwise update)

```sql
INSERT INTO employees
(employee_code, email, name, department, salary)
VALUES
('EMP001', 'rahul@gmail.com', 'Rahul Sharma', 'IT', 75000)
ON CONFLICT (employee_code)
DO UPDATE
SET salary = EXCLUDED.salary;
```

This uses the `UNIQUE` constraint to detect conflicts and update the existing row instead of throwing an error.


## PostgreSQL `NOT NULL` Constraint

The `NOT NULL` constraint ensures that a column cannot contain `NULL` values.

---

### Create Table with NOT NULL

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2) NOT NULL
);
```

---

## Bulk Insert Data

```sql
INSERT INTO employees
(employee_code, name, email, department, salary)
VALUES
('EMP001', 'Rahul Sharma', 'rahul@gmail.com', 'IT', 50000),
('EMP002', 'Priya Patel', 'priya@gmail.com', 'HR', 45000),
('EMP003', 'Amit Kumar', 'amit@gmail.com', 'Finance', 55000),
('EMP004', 'Neha Singh', 'neha@gmail.com', 'Marketing', 48000),
('EMP005', 'Arjun Verma', 'arjun@gmail.com', 'IT', 60000);
```

---

## CREATE

```sql
INSERT INTO employees
(employee_code, name, email, department, salary)
VALUES
('EMP006', 'Kiran Rao', 'kiran@gmail.com', 'Sales', 42000);
```

---

## READ

### Get All Employees

```sql
SELECT * FROM employees;
```

### Get Employee By ID

```sql
SELECT *
FROM employees
WHERE id = 1;
```

---

## UPDATE

### Update Salary

```sql
UPDATE employees
SET salary = 65000
WHERE employee_code = 'EMP001';
```

### Update Department

```sql
UPDATE employees
SET department = 'Engineering'
WHERE id = 1;
```

---

## DELETE

### Delete Employee

```sql
DELETE FROM employees
WHERE id = 5;
```

---

## NOT NULL Constraint Violation

This will fail because `name` is `NOT NULL`:

```sql
INSERT INTO employees
(employee_code, name, email, department, salary)
VALUES
('EMP007', NULL, 'test@gmail.com', 'IT', 50000);
```

Error:

```text
ERROR: null value in column "name" violates not-null constraint
```

Another example:

```sql
INSERT INTO employees
(employee_code, department)
VALUES
('EMP008', 'IT');
```

Error because `name`, `email`, and `salary` are required.

---

## Add NOT NULL to Existing Column

```sql
ALTER TABLE employees
ALTER COLUMN email SET NOT NULL;
```

---

## Remove NOT NULL Constraint

```sql
ALTER TABLE employees
ALTER COLUMN email DROP NOT NULL;
```

---

## Check NOT NULL Columns

```sql
SELECT column_name, is_nullable
FROM information_schema.columns
WHERE table_name = 'employees';
```

Columns with `is_nullable = NO` have the `NOT NULL` constraint applied.

## PostgreSQL `CHECK` Constraint

The `CHECK` constraint is used to enforce custom validation rules on column values.

---

## Create Table with CHECK Constraints

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,

    age INT CHECK (age >= 18),

    email VARCHAR(100) UNIQUE NOT NULL,

    salary DECIMAL(10,2)
        CHECK (salary > 0),

    department VARCHAR(50)
        CHECK (department IN ('IT', 'HR', 'Finance', 'Sales', 'Marketing'))
);
```

---

## Bulk Insert Data

```sql
INSERT INTO employees
(employee_code, name, age, email, salary, department)
VALUES
('EMP001', 'Rahul Sharma', 25, 'rahul@gmail.com', 50000, 'IT'),
('EMP002', 'Priya Patel', 28, 'priya@gmail.com', 45000, 'HR'),
('EMP003', 'Amit Kumar', 30, 'amit@gmail.com', 55000, 'Finance'),
('EMP004', 'Neha Singh', 24, 'neha@gmail.com', 48000, 'Marketing'),
('EMP005', 'Arjun Verma', 27, 'arjun@gmail.com', 60000, 'Sales');
```

---

# CRUD Operations

## CREATE

```sql
INSERT INTO employees
(employee_code, name, age, email, salary, department)
VALUES
('EMP006', 'Kiran Rao', 26, 'kiran@gmail.com', 52000, 'IT');
```

---

## READ

```sql
SELECT * FROM employees;
```

```sql
SELECT * FROM employees
WHERE department = 'IT';
```

---

## UPDATE

```sql
UPDATE employees
SET salary = 65000
WHERE employee_code = 'EMP001';
```

---

## DELETE

```sql
DELETE FROM employees
WHERE employee_code = 'EMP005';
```

---

# CHECK Constraint Violations

### Age less than 18

```sql
INSERT INTO employees
(employee_code, name, age, email, salary, department)
VALUES
('EMP007', 'Rohit', 16, 'rohit@gmail.com', 40000, 'IT');
```

Error:

```text
ERROR: new row violates check constraint
```

---

### Negative Salary

```sql
INSERT INTO employees
(employee_code, name, age, email, salary, department)
VALUES
('EMP008', 'John', 25, 'john@gmail.com', -1000, 'HR');
```

Error because salary must be greater than 0.

---

### Invalid Department

```sql
INSERT INTO employees
(employee_code, name, age, email, salary, department)
VALUES
('EMP009', 'David', 29, 'david@gmail.com', 45000, 'Testing');
```

Error because "Testing" is not in the allowed list.

---

## Named CHECK Constraints

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,

    age INT,
    CONSTRAINT chk_age
        CHECK (age >= 18),

    marks INT,
    CONSTRAINT chk_marks
        CHECK (marks BETWEEN 0 AND 100)
);
```

---

## Add CHECK Constraint to Existing Table

```sql
ALTER TABLE employees
ADD CONSTRAINT chk_salary
CHECK (salary > 0);
```

---

## Remove CHECK Constraint

```sql
ALTER TABLE employees
DROP CONSTRAINT chk_salary;
```

---

### Common CHECK Constraint Examples

```sql
CHECK (age >= 18)

CHECK (salary > 0)

CHECK (marks BETWEEN 0 AND 100)

CHECK (gender IN ('Male', 'Female', 'Other'))

CHECK (length(password) >= 8)

CHECK (start_date <= end_date)
```

`CHECK` is useful when you need business rules enforced directly by PostgreSQL, such as age limits, salary validation, allowed statuses, date ranges, or score limits.
