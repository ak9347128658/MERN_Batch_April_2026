# PostgreSQL Transactions 

## What is a Transaction?

A **Transaction** is a group of one or more SQL statements that are executed as a **single unit of work**.

Either:

✅ All statements succeed → **COMMIT**

❌ Any statement fails → **ROLLBACK**

---

## Real-Life Example

Imagine you transfer ₹10,000 from Account A to Account B.

### Step 1

Deduct ₹10,000 from A

```text
A = 50000 → 40000
```

### Step 2

Add ₹10,000 to B

```text
B = 20000 → 30000
```

What if the server crashes after Step 1?

```text
A = 40000
B = 20000
```

₹10,000 is lost.

Transactions prevent this problem.

---

# ACID Properties

Every PostgreSQL transaction follows ACID.

## A – Atomicity

All operations succeed or none succeed.

```text
Withdraw Money
Deposit Money

Both happen OR neither happens.
```

---

## C – Consistency

Database remains valid before and after transaction.

Example:

```sql
salary > 0
```

Constraint should never be violated.

---

## I – Isolation

Multiple users can work simultaneously without corrupting data.

---

## D – Durability

After COMMIT, data is permanently saved.

Even if server crashes.

---

# Setup Example

Create Database

```sql
CREATE DATABASE transaction_demo;
```

Connect

```sql
\c transaction_demo
```

Create Table

```sql
CREATE TABLE bank_accounts(
    account_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    balance NUMERIC(12,2)
);
```

---

# Bulk Insert Data

```sql
INSERT INTO bank_accounts
(customer_name,balance)
VALUES
('John',50000),
('David',40000),
('Emma',30000),
('Sophia',60000),
('Michael',80000);
```

Read

```sql
SELECT * FROM bank_accounts;
```

Output

```text
1 John      50000
2 David     40000
3 Emma      30000
4 Sophia    60000
5 Michael   80000
```

---

# Transaction Syntax

```sql
BEGIN;

SQL Statement 1;
SQL Statement 2;
SQL Statement 3;

COMMIT;
```

---

# Example 1: Successful Transaction

Transfer ₹10,000 from John to David

```sql
BEGIN;

UPDATE bank_accounts
SET balance = balance - 10000
WHERE account_id = 1;

UPDATE bank_accounts
SET balance = balance + 10000
WHERE account_id = 2;

COMMIT;
```

Verify

```sql
SELECT * FROM bank_accounts;
```

Output

```text
John    40000
David   50000
```

---

# Example 2: Rollback Transaction

Transfer money but cancel it.

```sql
BEGIN;

UPDATE bank_accounts
SET balance = balance - 5000
WHERE account_id = 1;

UPDATE bank_accounts
SET balance = balance + 5000
WHERE account_id = 2;

ROLLBACK;
```

Verify

```sql
SELECT * FROM bank_accounts;
```

Balances remain unchanged.

---

# CRUD with Transactions

---

## CREATE Transaction

```sql
BEGIN;

INSERT INTO bank_accounts
(customer_name,balance)
VALUES
('Alex',25000);

COMMIT;
```

Read

```sql
SELECT * FROM bank_accounts;
```

---

## UPDATE Transaction

```sql
BEGIN;

UPDATE bank_accounts
SET balance = balance + 5000
WHERE account_id = 3;

COMMIT;
```

Read

```sql
SELECT * FROM bank_accounts;
```

---

## DELETE Transaction

```sql
BEGIN;

DELETE FROM bank_accounts
WHERE account_id = 6;

COMMIT;
```

---

# Example 3: Multiple Inserts

```sql
BEGIN;

INSERT INTO bank_accounts(customer_name,balance)
VALUES ('User1',10000);

INSERT INTO bank_accounts(customer_name,balance)
VALUES ('User2',20000);

INSERT INTO bank_accounts(customer_name,balance)
VALUES ('User3',30000);

COMMIT;
```

---

# Example 4: Error Causes Rollback

Create Table

```sql
CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE
);
```

Transaction

```sql
BEGIN;

INSERT INTO employees(email)
VALUES ('john@gmail.com');

INSERT INTO employees(email)
VALUES ('john@gmail.com');

COMMIT;
```

Output

```text
ERROR:
duplicate key value violates unique constraint
```

Transaction becomes failed.

Execute

```sql
ROLLBACK;
```

Verify

```sql
SELECT * FROM employees;
```

Output

```text
0 rows
```

Nothing inserted.

---

# SAVEPOINT

## What is SAVEPOINT?

A SAVEPOINT creates a checkpoint inside a transaction.

Instead of rolling back everything, rollback only part of transaction.

---

## Example

```sql
BEGIN;
```

Insert Data

```sql
INSERT INTO bank_accounts
(customer_name,balance)
VALUES('Test1',1000);
```

Create Savepoint

```sql
SAVEPOINT sp1;
```

Insert More Data

```sql
INSERT INTO bank_accounts
(customer_name,balance)
VALUES('Test2',2000);
```

Rollback to Savepoint

```sql
ROLLBACK TO sp1;
```

Commit

```sql
COMMIT;
```

Result

```text
Test1 inserted
Test2 removed
```

---

# Multiple Savepoints

```sql
BEGIN;

INSERT INTO bank_accounts VALUES(DEFAULT,'A',1000);

SAVEPOINT s1;

INSERT INTO bank_accounts VALUES(DEFAULT,'B',2000);

SAVEPOINT s2;

INSERT INTO bank_accounts VALUES(DEFAULT,'C',3000);

ROLLBACK TO s2;

COMMIT;
```

Result

```text
A inserted
B inserted
C removed
```

---

# Transaction Status Check

Current Transaction ID

```sql
SELECT txid_current();
```

Example Output

```text
725
```

---

# Auto Commit Mode

PostgreSQL automatically commits every statement.

Example

```sql
INSERT INTO bank_accounts
(customer_name,balance)
VALUES('AutoUser',5000);
```

Immediately committed.

No BEGIN required.

---

# Manual Transaction Mode

```sql
BEGIN;

INSERT ...
UPDATE ...
DELETE ...

COMMIT;
```

Everything committed together.

---

# Practical E-Commerce Example

Order Placement

```sql
BEGIN;
```

Reduce Product Quantity

```sql
UPDATE products
SET stock = stock - 1
WHERE id = 101;
```

Create Order

```sql
INSERT INTO orders
(user_id,product_id)
VALUES
(1,101);
```

Create Payment

```sql
INSERT INTO payments
(order_id,amount)
VALUES
(1001,500);
```

```sql
COMMIT;
```

If any step fails:

```sql
ROLLBACK;
```

---

# PostgreSQL Transaction Isolation Levels

PostgreSQL supports:

```text
READ UNCOMMITTED
READ COMMITTED (Default)
REPEATABLE READ
SERIALIZABLE
```

Set Isolation Level

```sql
BEGIN;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

COMMIT;
```

---

# Most Common Interview Questions

### What is Transaction?

A group of SQL statements executed as one unit.

---

### Difference Between COMMIT and ROLLBACK?

| COMMIT        | ROLLBACK        |
| ------------- | --------------- |
| Saves changes | Cancels changes |

---

### What is SAVEPOINT?

Partial rollback checkpoint inside transaction.

---

### What is ACID?

```text
A - Atomicity
C - Consistency
I - Isolation
D - Durability
```

---

### Can DDL be used in Transaction?

Yes.

```sql
BEGIN;

CREATE TABLE demo(
    id INT
);

ROLLBACK;
```

Table will not be created.

---

# Complete Transaction Flow

```sql
BEGIN;

INSERT INTO bank_accounts
(customer_name,balance)
VALUES ('Rahul',20000);

SAVEPOINT s1;

UPDATE bank_accounts
SET balance=balance+5000
WHERE customer_name='Rahul';

ROLLBACK TO s1;

COMMIT;
```

Result:

```text
INSERT saved
UPDATE cancelled
```

## Summary

Transaction Commands:

```sql
BEGIN;
COMMIT;
ROLLBACK;
SAVEPOINT savepoint_name;
ROLLBACK TO savepoint_name;
RELEASE SAVEPOINT savepoint_name;
SET TRANSACTION ISOLATION LEVEL;
SELECT txid_current();
```

These commands are heavily used in banking systems, payment gateways, e-commerce applications, payroll systems, and any application where data consistency is critical.

# PostgreSQL Triggers - Complete Live Class

## What is a Trigger?

A **Trigger** is a special database object that automatically executes a function when a specific event occurs on a table.

Events can be:

* INSERT
* UPDATE
* DELETE
* TRUNCATE

### Real-Life Example

Suppose an employee's salary changes.

Instead of manually storing history:

```sql
UPDATE employees
SET salary = 80000
WHERE emp_id = 1;
```

A trigger can automatically save the old salary into an audit table.

```text
Employee Salary Changed
      ↓
Trigger Fires
      ↓
Store Old Value
```

---

# Why Use Triggers?

Common use cases:

✅ Audit Logs

✅ Track Data Changes

✅ Automatic Timestamps

✅ Validation Rules

✅ Notifications

✅ History Tables

✅ Security Checks

---

# Trigger Architecture

```text
INSERT / UPDATE / DELETE
          ↓
       Trigger
          ↓
    Trigger Function
          ↓
      Executes Logic
```

---

# Trigger Syntax

### Step 1: Create Function

```sql
CREATE OR REPLACE FUNCTION function_name()
RETURNS TRIGGER
AS $$
BEGIN

   -- Logic

   RETURN NEW;

END;
$$ LANGUAGE plpgsql;
```

### Step 2: Create Trigger

```sql
CREATE TRIGGER trigger_name
BEFORE INSERT
ON table_name
FOR EACH ROW
EXECUTE FUNCTION function_name();
```

---

# Setup Tables

## Employees Table

```sql
CREATE TABLE employees(
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(100),
    salary NUMERIC(10,2),
    department VARCHAR(50)
);
```

## Bulk Insert

```sql
INSERT INTO employees(emp_name,salary,department)
VALUES
('John',50000,'IT'),
('David',60000,'HR'),
('Emma',70000,'Finance'),
('Sophia',80000,'Sales'),
('Michael',90000,'IT'),
('William',55000,'HR'),
('Olivia',75000,'Marketing'),
('James',85000,'Finance'),
('Charlotte',65000,'Sales'),
('Benjamin',95000,'IT');
```

---

# OLD and NEW Keywords

Triggers provide special records.

### NEW

Contains new data.

```sql
NEW.salary
```

---

### OLD

Contains old data.

```sql
OLD.salary
```

Example:

Before Update

```text
Salary = 50000
```

After Update

```text
Salary = 60000
```

Inside Trigger

```text
OLD.salary = 50000
NEW.salary = 60000
```

---

# Trigger Example 1: Auto Log INSERT

## Audit Table

```sql
CREATE TABLE employee_logs(
    log_id SERIAL PRIMARY KEY,
    action VARCHAR(50),
    employee_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Trigger Function

```sql
CREATE OR REPLACE FUNCTION log_employee_insert()
RETURNS TRIGGER
AS $$
BEGIN

   INSERT INTO employee_logs(action,employee_name)
   VALUES('INSERT',NEW.emp_name);

   RETURN NEW;

END;
$$ LANGUAGE plpgsql;
```

---

## Trigger

```sql
CREATE TRIGGER trg_employee_insert
AFTER INSERT
ON employees
FOR EACH ROW
EXECUTE FUNCTION log_employee_insert();
```

---

## Test

```sql
INSERT INTO employees
(emp_name,salary,department)
VALUES
('Alex',45000,'IT');
```

Check logs

```sql
SELECT * FROM employee_logs;
```

Output

```text
INSERT Alex
```

Automatically inserted.

---

# CRUD Using Trigger

---

## CREATE Trigger Event

```sql
INSERT INTO employees
(emp_name,salary,department)
VALUES
('Rahul',50000,'HR');
```

Trigger fires.

---

## READ

```sql
SELECT * FROM employee_logs;
```

---

## UPDATE

```sql
UPDATE employees
SET salary=75000
WHERE emp_name='Rahul';
```

---

## DELETE

```sql
DELETE FROM employees
WHERE emp_name='Rahul';
```

---

# Trigger Example 2: Salary Audit

## Audit Table

```sql
CREATE TABLE salary_audit(
    audit_id SERIAL PRIMARY KEY,
    emp_id INT,
    old_salary NUMERIC,
    new_salary NUMERIC,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Function

```sql
CREATE OR REPLACE FUNCTION track_salary_changes()
RETURNS TRIGGER
AS $$
BEGIN

   INSERT INTO salary_audit
   (
      emp_id,
      old_salary,
      new_salary
   )
   VALUES
   (
      OLD.emp_id,
      OLD.salary,
      NEW.salary
   );

   RETURN NEW;

END;
$$ LANGUAGE plpgsql;
```

---

## Trigger

```sql
CREATE TRIGGER trg_salary_update
AFTER UPDATE
ON employees
FOR EACH ROW
EXECUTE FUNCTION track_salary_changes();
```

---

## Test

```sql
UPDATE employees
SET salary = 100000
WHERE emp_id = 1;
```

Check Audit

```sql
SELECT * FROM salary_audit;
```

Output

```text
1 | 50000 | 100000
```

---

# BEFORE INSERT Trigger

Used before data is inserted.

---

## Example: Prevent Negative Salary

### Function

```sql
CREATE OR REPLACE FUNCTION validate_salary()
RETURNS TRIGGER
AS $$
BEGIN

   IF NEW.salary < 0 THEN
      RAISE EXCEPTION
      'Salary cannot be negative';
   END IF;

   RETURN NEW;

END;
$$ LANGUAGE plpgsql;
```

---

### Trigger

```sql
CREATE TRIGGER trg_validate_salary
BEFORE INSERT
ON employees
FOR EACH ROW
EXECUTE FUNCTION validate_salary();
```

---

### Test

```sql
INSERT INTO employees
(emp_name,salary,department)
VALUES
('BadUser',-5000,'IT');
```

Output

```text
ERROR:
Salary cannot be negative
```

---

# BEFORE UPDATE Trigger

```sql
CREATE OR REPLACE FUNCTION prevent_salary_reduction()
RETURNS TRIGGER
AS $$
BEGIN

   IF NEW.salary < OLD.salary THEN
      RAISE EXCEPTION
      'Salary reduction not allowed';
   END IF;

   RETURN NEW;

END;
$$ LANGUAGE plpgsql;
```

---

```sql
CREATE TRIGGER trg_no_salary_cut
BEFORE UPDATE
ON employees
FOR EACH ROW
EXECUTE FUNCTION prevent_salary_reduction();
```

---

Test

```sql
UPDATE employees
SET salary=1000
WHERE emp_id=1;
```

Error generated.

---

# AFTER DELETE Trigger

## Deleted Employees Table

```sql
CREATE TABLE deleted_employees(
    emp_id INT,
    emp_name VARCHAR(100),
    deleted_at TIMESTAMP
);
```

---

## Function

```sql
CREATE OR REPLACE FUNCTION log_deleted_employee()
RETURNS TRIGGER
AS $$
BEGIN

   INSERT INTO deleted_employees
   (
      emp_id,
      emp_name,
      deleted_at
   )
   VALUES
   (
      OLD.emp_id,
      OLD.emp_name,
      CURRENT_TIMESTAMP
   );

   RETURN OLD;

END;
$$ LANGUAGE plpgsql;
```

---

## Trigger

```sql
CREATE TRIGGER trg_delete_employee
AFTER DELETE
ON employees
FOR EACH ROW
EXECUTE FUNCTION log_deleted_employee();
```

---

## Test

```sql
DELETE FROM employees
WHERE emp_id=2;
```

Check

```sql
SELECT * FROM deleted_employees;
```

---

# Trigger Example 3: Auto Update Timestamp

## Table

```sql
CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    price NUMERIC,
    updated_at TIMESTAMP
);
```

---

## Function

```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER
AS $$
BEGIN

   NEW.updated_at = CURRENT_TIMESTAMP;

   RETURN NEW;

END;
$$ LANGUAGE plpgsql;
```

---

## Trigger

```sql
CREATE TRIGGER trg_product_update
BEFORE UPDATE
ON products
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

---

## Test

```sql
UPDATE products
SET price=500
WHERE product_id=1;
```

Timestamp automatically updated.

---

# Statement Level Trigger

### Row Level

Runs for every row.

```sql
FOR EACH ROW
```

Update 100 rows

```text
Trigger Executes 100 Times
```

---

### Statement Level

Runs once.

```sql
FOR EACH STATEMENT
```

Update 100 rows

```text
Trigger Executes 1 Time
```

---

# View Existing Triggers

```sql
SELECT trigger_name,
       event_object_table
FROM information_schema.triggers;
```

---

# Disable Trigger

```sql
ALTER TABLE employees
DISABLE TRIGGER trg_salary_update;
```

Enable

```sql
ALTER TABLE employees
ENABLE TRIGGER trg_salary_update;
```

---

# Drop Trigger

```sql
DROP TRIGGER trg_salary_update
ON employees;
```

---

# Drop Function

```sql
DROP FUNCTION track_salary_changes();
```

---

# Interview Questions

## What is a Trigger?

Automatically executes code when INSERT, UPDATE, DELETE occurs.

---

## Difference Between Trigger and Procedure?

| Trigger      | Procedure         |
| ------------ | ----------------- |
| Automatic    | Manual            |
| Event Driven | Called Explicitly |

---

## Difference Between BEFORE and AFTER Trigger?

| BEFORE                | AFTER                   |
| --------------------- | ----------------------- |
| Runs before operation | Runs after operation    |
| Can modify data       | Mostly used for logging |

---

## What are OLD and NEW?

```text
OLD = Existing Row
NEW = Updated/Inserted Row
```

---

## Types of Triggers

```text
BEFORE INSERT
AFTER INSERT

BEFORE UPDATE
AFTER UPDATE

BEFORE DELETE
AFTER DELETE

TRUNCATE
ROW LEVEL
STATEMENT LEVEL
```

---

# Production Use Cases

### Banking

```text
Account Updated
↓
Audit Trigger
↓
Store History
```

### E-Commerce

```text
Order Created
↓
Trigger
↓
Reduce Inventory
```

### HRMS

```text
Salary Changed
↓
Trigger
↓
Store Salary History
```

### Security

```text
User Deleted
↓
Trigger
↓
Store Audit Log
```

---

# Summary

Most Used Trigger Commands:

```sql
CREATE FUNCTION
RETURNS TRIGGER

CREATE TRIGGER

BEFORE INSERT
AFTER INSERT

BEFORE UPDATE
AFTER UPDATE

BEFORE DELETE
AFTER DELETE

NEW
OLD

DISABLE TRIGGER
ENABLE TRIGGER

DROP TRIGGER
DROP FUNCTION
```

In real-world applications, triggers are mainly used for **auditing, history tracking, automatic timestamps, validations, and security logging**.
