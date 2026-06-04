# PostgreSQL Indexing 

## What is an Index?

An **Index** is a special database object that improves the speed of data retrieval operations (`SELECT` queries).

Think of it like a **book index**.

### Without Index

Suppose a book has 1000 pages.

To find:

```text
Chapter: PostgreSQL Triggers
```

You may need to search page by page.

Time consuming.

---

### With Index

You directly check:

```text
Index
PostgreSQL Triggers → Page 525
```

Immediately found.

---

# Why Use Indexes?

Benefits:

✅ Faster SELECT Queries

✅ Faster JOINs

✅ Faster WHERE Conditions

✅ Faster ORDER BY

✅ Faster GROUP BY

---

# Drawback of Indexes

Indexes are not free.

Every INSERT, UPDATE, DELETE must also update indexes.

| Operation | Impact          |
| --------- | --------------- |
| SELECT    | Faster          |
| INSERT    | Slightly Slower |
| UPDATE    | Slightly Slower |
| DELETE    | Slightly Slower |

---

# Setup Table

```sql
CREATE DATABASE indexing_demo;
```

Connect

```sql
\c indexing_demo
```

Create Table

```sql
CREATE TABLE employees(
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(100),
    email VARCHAR(255),
    department VARCHAR(50),
    salary NUMERIC(10,2),
    city VARCHAR(50)
);
```

---

# Bulk Insert Data

```sql
INSERT INTO employees
(emp_name,email,department,salary,city)
VALUES
('John','john@gmail.com','IT',50000,'Hyderabad'),
('David','david@gmail.com','HR',60000,'Delhi'),
('Emma','emma@gmail.com','Finance',70000,'Mumbai'),
('Sophia','sophia@gmail.com','IT',80000,'Pune'),
('Michael','michael@gmail.com','Sales',90000,'Chennai'),
('William','william@gmail.com','HR',55000,'Hyderabad'),
('Olivia','olivia@gmail.com','Marketing',75000,'Delhi'),
('James','james@gmail.com','Finance',85000,'Mumbai'),
('Charlotte','charlotte@gmail.com','Sales',65000,'Pune'),
('Benjamin','benjamin@gmail.com','IT',95000,'Chennai');
```

Read

```sql
SELECT * FROM employees;
```

---

# How PostgreSQL Searches Without Index

Query:

```sql
SELECT *
FROM employees
WHERE email='john@gmail.com';
```

Without Index:

```text
Row 1 → Check
Row 2 → Check
Row 3 → Check
...
Row N → Check
```

Called:

## Sequential Scan

```text
Seq Scan
```

Time Complexity:

```text
O(n)
```

---

# Create Index

## Syntax

```sql
CREATE INDEX index_name
ON table_name(column_name);
```

Example

```sql
CREATE INDEX idx_email
ON employees(email);
```

Now PostgreSQL can locate data much faster.

---

# Check Query Execution Plan

## EXPLAIN

```sql
EXPLAIN
SELECT *
FROM employees
WHERE email='john@gmail.com';
```

Without Index:

```text
Seq Scan on employees
```

With Index:

```text
Index Scan using idx_email
```

---

# Most Important Command

## EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT *
FROM employees
WHERE email='john@gmail.com';
```

Shows:

* Execution Plan
* Actual Time
* Rows Processed

Used heavily in production.

---

# CRUD with Indexes

---

## CREATE Index

```sql
CREATE INDEX idx_department
ON employees(department);
```

---

## READ Using Index

```sql
SELECT *
FROM employees
WHERE department='IT';
```

Uses index.

---

## UPDATE

```sql
UPDATE employees
SET department='Engineering'
WHERE department='IT';
```

Index automatically updated.

---

## DELETE

```sql
DELETE FROM employees
WHERE department='HR';
```

Index automatically updated.

---

# List All Indexes

```sql
SELECT *
FROM pg_indexes
WHERE tablename='employees';
```

Output

```text
employees_pkey
idx_email
idx_department
```

---

# Drop Index

```sql
DROP INDEX idx_department;
```

Verify

```sql
SELECT *
FROM pg_indexes
WHERE tablename='employees';
```

---

# Unique Index

## Purpose

Prevents duplicate values.

### Create

```sql
CREATE UNIQUE INDEX idx_unique_email
ON employees(email);
```

---

## Test

```sql
INSERT INTO employees
(
 emp_name,
 email,
 department,
 salary,
 city
)
VALUES
(
 'Alex',
 'john@gmail.com',
 'IT',
 50000,
 'Delhi'
);
```

Output

```text
ERROR:
duplicate key value
```

---

# Composite Index

## Definition

Index on multiple columns.

### Example

```sql
CREATE INDEX idx_dept_city
ON employees(department,city);
```

---

Query

```sql
SELECT *
FROM employees
WHERE department='IT'
AND city='Hyderabad';
```

Uses composite index.

---

# Single vs Composite Index

Single

```sql
CREATE INDEX idx_dept
ON employees(department);
```

Composite

```sql
CREATE INDEX idx_dept_city
ON employees(department,city);
```

---

# B-Tree Index

Default PostgreSQL Index.

```sql
CREATE INDEX idx_salary
ON employees(salary);
```

Internally

```text
B-TREE
```

Best for:

```sql
=
>
<
>=
<=
BETWEEN
ORDER BY
```

---

# Hash Index

Good for equality search.

```sql
CREATE INDEX idx_hash_email
ON employees
USING HASH(email);
```

Best for:

```sql
WHERE email='abc@gmail.com'
```

Not useful for:

```sql
>
<
BETWEEN
```

---

# Partial Index

Index only some rows.

Example:

```sql
CREATE INDEX idx_high_salary
ON employees(salary)
WHERE salary > 70000;
```

Query

```sql
SELECT *
FROM employees
WHERE salary > 70000;
```

Very efficient.

---

# Expression Index

Index on calculation.

Example

```sql
CREATE INDEX idx_lower_email
ON employees(LOWER(email));
```

Query

```sql
SELECT *
FROM employees
WHERE LOWER(email)='john@gmail.com';
```

Uses index.

---

# Primary Key Index

When you create:

```sql
CREATE TABLE employees(
   emp_id SERIAL PRIMARY KEY
);
```

PostgreSQL automatically creates:

```text
employees_pkey
```

No need to create another index.

---

# Foreign Key Index

Not automatically created.

Example

```sql
CREATE TABLE orders(
   order_id SERIAL PRIMARY KEY,
   customer_id INT REFERENCES customers(id)
);
```

Create manually:

```sql
CREATE INDEX idx_customer
ON orders(customer_id);
```

---

# Reindex

Rebuild index.

```sql
REINDEX INDEX idx_email;
```

Entire table

```sql
REINDEX TABLE employees;
```

Database

```sql
REINDEX DATABASE indexing_demo;
```

---

# Index Size

Check size

```sql
SELECT
indexrelname,
pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes;
```

---

# When NOT To Create Index

Avoid on:

### Small Tables

```text
10 rows
50 rows
100 rows
```

Sequential scan faster.

---

### Frequently Updated Columns

Example

```sql
last_login
```

Updated every second.

Index maintenance becomes expensive.

---

### Low Cardinality Columns

Example

```sql
gender
```

Only:

```text
Male
Female
```

Poor index performance.

---

# Real Production Example

## Users Table

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    mobile VARCHAR(20),
    created_at TIMESTAMP
);
```

Indexes

```sql
CREATE UNIQUE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_mobile
ON users(mobile);

CREATE INDEX idx_users_created
ON users(created_at);
```

---

# Performance Testing

Without Index

```sql
EXPLAIN ANALYZE
SELECT *
FROM employees
WHERE email='john@gmail.com';
```

Output

```text
Seq Scan
Execution Time: 500ms
```

---

With Index

```sql
EXPLAIN ANALYZE
SELECT *
FROM employees
WHERE email='john@gmail.com';
```

Output

```text
Index Scan
Execution Time: 5ms
```

Huge improvement.

---

# Interview Questions

### What is an Index?

A database object used to speed up data retrieval.

---

### Does Index Improve INSERT?

No.

It slightly slows INSERT because indexes must be updated.

---

### Which Index Type is Default?

```text
B-TREE
```

---

### Difference Between Clustered and Non-Clustered?

PostgreSQL mainly uses non-clustered indexes. Physical row order is generally independent of indexes.

---

### Does PRIMARY KEY Create Index?

Yes.

Automatically.

---

### Does FOREIGN KEY Create Index?

No.

Must create manually if needed.

---

### How to Check Query Performance?

```sql
EXPLAIN ANALYZE
```

---

# Most Important Commands

```sql
CREATE INDEX

CREATE UNIQUE INDEX

CREATE INDEX ... USING HASH

CREATE INDEX ... WHERE

CREATE INDEX ... (LOWER(column))

DROP INDEX

REINDEX INDEX

REINDEX TABLE

REINDEX DATABASE

EXPLAIN

EXPLAIN ANALYZE
```

# Summary

Types of Indexes:

```text
1. B-Tree Index
2. Unique Index
3. Composite Index
4. Hash Index
5. Partial Index
6. Expression Index
7. Primary Key Index
8. Foreign Key Index
```

# PostgreSQL JSON & JSONB - Complete Introduction

## What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight format used to store and exchange data.

Example:

```json
{
  "name": "Asif Khan",
  "age": 25,
  "city": "Hyderabad"
}
```

Instead of creating many columns, you can store flexible data in a single column.

---

# Why JSON in PostgreSQL?

Suppose you're building a job portal.

Traditional table:

```sql
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    skill1 VARCHAR(50),
    skill2 VARCHAR(50),
    skill3 VARCHAR(50)
);
```

Problem:

* Some candidates have 2 skills
* Some have 10 skills
* Schema changes frequently

Using JSON:

```sql
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    profile JSONB
);
```

Insert:

```sql
INSERT INTO candidates(profile)
VALUES (
'{
  "name":"Asif Khan",
  "skills":["Node.js","React","PostgreSQL"],
  "experience":4
}');
```

Much more flexible.

---

# JSON vs JSONB

PostgreSQL provides two types:

| JSON                 | JSONB                       |
| -------------------- | --------------------------- |
| Stores text          | Stores binary format        |
| Slower search        | Faster search               |
| Preserves formatting | Doesn't preserve formatting |
| Less efficient       | More efficient              |

### Recommendation

In real projects use:

```sql
JSONB
```

about 95% of the time.

---

# Create Table

```sql
CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    details JSONB
);
```

---

# Bulk Insert Data

```sql
INSERT INTO employees(details)
VALUES
('{
  "name":"John",
  "age":30,
  "city":"Hyderabad",
  "salary":50000
}'),

('{
  "name":"David",
  "age":28,
  "city":"Delhi",
  "salary":60000
}'),

('{
  "name":"Emma",
  "age":32,
  "city":"Mumbai",
  "salary":70000
}');
```

---

# Read JSON Data

```sql
SELECT * FROM employees;
```

Output

```json
{
  "name":"John",
  "age":30,
  "city":"Hyderabad",
  "salary":50000
}
```

---

# Extract JSON Values

## -> Operator

Returns JSON object.

```sql
SELECT details->'name'
FROM employees;
```

Output

```json
"John"
```

---

## ->> Operator

Returns text.

```sql
SELECT details->>'name'
FROM employees;
```

Output

```text
John
```

Most commonly used:

```sql
->
->>
```

---

# WHERE Condition on JSON

Find Hyderabad employees:

```sql
SELECT *
FROM employees
WHERE details->>'city'='Hyderabad';
```

---

# Get Multiple Fields

```sql
SELECT
details->>'name' AS name,
details->>'city' AS city
FROM employees;
```

Output

```text
John    Hyderabad
David   Delhi
Emma    Mumbai
```

---

# Nested JSON

Insert:

```sql
INSERT INTO employees(details)
VALUES
('{
   "name":"Asif",
   "address":{
      "city":"Hyderabad",
      "state":"Telangana"
   }
}');
```

---

Read Nested Value

```sql
SELECT details->'address'
FROM employees;
```

Output

```json
{
  "city":"Hyderabad",
  "state":"Telangana"
}
```

---

Specific Field

```sql
SELECT details->'address'->>'city'
FROM employees;
```

Output

```text
Hyderabad
```

---

# JSON Arrays

Insert

```sql
INSERT INTO employees(details)
VALUES
('{
   "name":"Asif",
   "skills":[
      "Node.js",
      "React",
      "PostgreSQL"
   ]
}');
```

---

Read Array

```sql
SELECT details->'skills'
FROM employees;
```

Output

```json
["Node.js","React","PostgreSQL"]
```

---

Get First Skill

```sql
SELECT details->'skills'->>0
FROM employees;
```

Output

```text
Node.js
```

---

Get Second Skill

```sql
SELECT details->'skills'->>1
FROM employees;
```

Output

```text
React
```

---

# Update JSON Value

Existing JSON:

```json
{
  "name":"John",
  "salary":50000
}
```

Update salary:

```sql
UPDATE employees
SET details =
jsonb_set(
    details,
    '{salary}',
    '60000'
)
WHERE id=1;
```

---

Check

```sql
SELECT * FROM employees;
```

Output

```json
{
  "name":"John",
  "salary":60000
}
```

---

# Add New Field

Add Department

```sql
UPDATE employees
SET details =
jsonb_set(
   details,
   '{department}',
   '"IT"'
)
WHERE id=1;
```

Result

```json
{
  "name":"John",
  "salary":60000,
  "department":"IT"
}
```

---

# Remove JSON Key

Remove salary:

```sql
UPDATE employees
SET details = details - 'salary'
WHERE id=1;
```

---

Result

```json
{
  "name":"John",
  "department":"IT"
}
```

---

# JSON CRUD Operations

## CREATE

```sql
INSERT INTO employees(details)
VALUES
('{
  "name":"Rahul",
  "city":"Pune"
}');
```

---

## READ

```sql
SELECT details->>'name'
FROM employees;
```

---

## UPDATE

```sql
UPDATE employees
SET details =
jsonb_set(
 details,
 '{city}',
 '"Mumbai"'
)
WHERE id=1;
```

---

## DELETE

Delete key:

```sql
UPDATE employees
SET details = details - 'city'
WHERE id=1;
```

Delete row:

```sql
DELETE
FROM employees
WHERE id=1;
```

---

# Search JSON Data

Find employees with age 30:

```sql
SELECT *
FROM employees
WHERE details->>'age'='30';
```

---

Find salary greater than 50000:

```sql
SELECT *
FROM employees
WHERE (details->>'salary')::INT > 50000;
```

Notice:

```sql
::INT
```

Type casting is often required.

---

# JSONB Containment Operator

## @>

Find matching JSON

```sql
SELECT *
FROM employees
WHERE details @>
'{"city":"Hyderabad"}';
```

Very powerful.

---

# JSONB Indexing

For large JSON data create GIN index.

```sql
CREATE INDEX idx_employee_json
ON employees
USING GIN(details);
```

Benefits:

```text
Fast JSON Searches
Fast @> Queries
Fast Nested Searches
```

Example

```sql
SELECT *
FROM employees
WHERE details @>
'{"city":"Hyderabad"}';
```

Uses index.

---

# Real-World Examples

## E-Commerce Product

```json
{
  "name":"iPhone 15",
  "price":80000,
  "specifications":{
      "ram":"8GB",
      "storage":"256GB"
  }
}
```

---

## Job Portal Resume

```json
{
  "name":"Asif Khan",
  "skills":["Node.js","React","AWS"],
  "experience":4
}
```

---

## User Preferences

```json
{
  "theme":"dark",
  "language":"English",
  "notifications":true
}
```

---

# Interview Questions

### Difference Between JSON and JSONB?

| JSON             | JSONB              |
| ---------------- | ------------------ |
| Text             | Binary             |
| Slower           | Faster             |
| No Index Support | Supports GIN Index |

---

### Which One Should We Use?

```text
JSONB
```

in almost all production applications.

---

### Operators Used Most?

```sql
->
->>
@>
```

---

### How to Update JSON?

```sql
jsonb_set()
```

---

### How to Remove Key?

```sql
details - 'key'
```

---

### How to Index JSONB?

```sql
CREATE INDEX
USING GIN(...)
```

---

# Summary

Most Important JSON Commands:

```sql
CREATE TABLE ... JSONB

->

->>

jsonb_set()

@>

details - 'key'

CREATE INDEX USING GIN
```

### When to Use JSONB?

Use JSONB when:

* Data structure changes frequently
* User preferences
* Resume data
* Product attributes
* API request/response storage
* Dynamic forms

For fixed data (name, email, salary), normal columns are usually better. For flexible or changing structures, JSONB is an excellent choice.
