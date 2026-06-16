# Day 1: TypeScript Fundamentals

## What is TypeScript?

TypeScript is a statically typed superset of JavaScript developed by Microsoft. Every valid JavaScript file is also a valid TypeScript file, but TypeScript adds optional type annotations that catch errors at compile time rather than runtime.

But **why does this matter?** Consider a large JavaScript codebase where a function expects a number but sometimes receives a string. In JavaScript, this bug hides until a user triggers it in production. TypeScript catches it the moment you write the code --- before it ever ships.

TypeScript compiles (or more precisely, *transpiles*) down to plain JavaScript. The types exist only during development and are completely erased at runtime. This means there is **zero runtime overhead** --- you get safety during development and the same JavaScript performance in production.

**Why TypeScript?**

- **Catches bugs before your code runs** --- entire categories of errors (typos, null references, wrong argument types) disappear
- **Self-documenting code** --- type annotations serve as living documentation that never goes stale
- **Superior IDE support** --- autocompletion, inline errors, safe refactoring, and jump-to-definition all become dramatically better
- **Scales to large codebases and teams** --- types act as contracts between modules, making it safe for one developer to change code another developer depends on
- **Industry standard** --- Angular, React (with TSX), Vue 3, Next.js, Deno, and most modern frameworks are built with or strongly encourage TypeScript

> **Did you know?** According to the Stack Overflow Developer Survey, TypeScript consistently ranks among the most loved and wanted programming languages. Major codebases like VS Code, Slack, Airbnb, and Stripe are written in TypeScript.

---

## 1. Setting Up Your Environment

### Install TypeScript

```bash
# Global install
npm install -g typescript

# Verify
tsc --version
```

> **Tip:** For production projects, prefer installing TypeScript as a dev dependency (`npm install -D typescript`) so every team member uses the same version.

### Project Setup

```bash
mkdir typescript-learning
cd typescript-learning
npm init -y
tsc --init
```

The `tsc --init` command creates a `tsconfig.json` file --- this is the **brain of your TypeScript project**. It tells the compiler how to behave. Let's understand the key options:

### Understanding tsconfig.json

```json
{
  "compilerOptions": {
    // --- Language & Environment ---
    "target": "ES2020",             // What JS version to compile down to
    "lib": ["ES2020", "DOM"],       // Which built-in type definitions to include
    "module": "commonjs",           // Module system: commonjs for Node, ES2020/ESNext for browsers

    // --- Strictness (the most important section!) ---
    "strict": true,                 // Enables ALL strict checks below as a group:
    //   "strictNullChecks": true,    - null/undefined are their own types
    //   "strictFunctionTypes": true, - stricter function type checking
    //   "strictBindCallApply": true, - check bind/call/apply arguments
    //   "noImplicitAny": true,       - error when type would be 'any'
    //   "noImplicitThis": true,      - error when 'this' has implicit 'any' type
    //   "alwaysStrict": true,        - emit "use strict" in every file

    // --- Additional Checks ---
    "noUnusedLocals": true,          // Error on unused local variables
    "noUnusedParameters": true,      // Error on unused function parameters
    "noImplicitReturns": true,       // Error if not all code paths return a value
    "noFallthroughCasesInSwitch": true, // Error on fallthrough in switch

    // --- Module Resolution ---
    "moduleResolution": "node",      // How to find modules (use "node" for most projects)
    "esModuleInterop": true,         // Allows default imports from CommonJS modules
    "resolveJsonModule": true,       // Allows importing .json files

    // --- Output ---
    "outDir": "./dist",              // Where compiled JS files go
    "rootDir": "./src",              // Where your TS source files live
    "sourceMap": true,               // Generate .map files for debugging
    "declaration": true,             // Generate .d.ts type declaration files

    // --- Advanced ---
    "skipLibCheck": true,            // Skip type checking of .d.ts files (faster builds)
    "forceConsistentCasingInFileNames": true // Disallow inconsistent file name casing
  },
  "include": ["src/**/*"],           // Which files to compile
  "exclude": ["node_modules", "dist"] // Which files to skip
}
```

> **Important:** Always use `"strict": true` in new projects. It enables a bundle of checks that catch the most common bugs. Starting without strict mode and adding it later is painful because you will have hundreds of errors to fix at once.

| Option | What It Does | Recommended |
|---|---|---|
| `strict` | Enables all strict type checking | `true` (always) |
| `target` | JS version to emit | `ES2020` or later |
| `outDir` | Output directory for compiled JS | `./dist` |
| `sourceMap` | Enables debugging in original TS | `true` |
| `esModuleInterop` | Fixes import compatibility | `true` |
| `skipLibCheck` | Faster builds by skipping .d.ts checks | `true` |

### Your First TypeScript File

Create `src/hello.ts`:

```typescript
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

Compile and run:

```bash
tsc hello.ts
node hello.js
```

**What just happened?** The TypeScript compiler read your `.ts` file, checked all the types, stripped out the type annotations, and produced a plain `.js` file that Node.js can run. If you open `hello.js`, you will see it looks almost identical --- just without the `: string` annotation.

### Using ts-node for Quick Execution

During development, compiling and running separately is tedious. `ts-node` does both in one step:

```bash
npm install -g ts-node
ts-node hello.ts
```

> **Tip:** For even faster iteration, use `tsx` (`npm install -g tsx`), which is built on esbuild and starts almost instantly --- great for scripts and experimentation.

### Common Mistakes When Setting Up

> **Gotcha:** If you see `Cannot find module` errors when importing local files, check that `moduleResolution` is set to `"node"` (or `"node16"` / `"bundler"` for newer setups) in your `tsconfig.json`.

> **Gotcha:** Never mix `"type": "module"` in `package.json` with `"module": "commonjs"` in `tsconfig.json`. They must agree, or you will get confusing runtime errors about `require` vs `import`.

---

## 2. Basic Types

TypeScript provides several primitive types that map directly to JavaScript values. Understanding these is the foundation for everything else.

### String

Strings represent textual data. TypeScript supports single quotes, double quotes, and template literals --- just like JavaScript.

```typescript
let firstName: string = "Alice";
let lastName: string = 'Bob';
let fullName: string = `${firstName} ${lastName}`;  // template literals work
```

**Real-world examples:**

```typescript
// API endpoint construction
let baseUrl: string = "https://api.example.com";
let endpoint: string = `${baseUrl}/users/${userId}`;

// User-facing messages
let errorMessage: string = "Invalid email address. Please try again.";

// HTML templating
let html: string = `
  <div class="card">
    <h2>${userName}</h2>
    <p>${userBio}</p>
  </div>
`;
```

### Number

TypeScript has a single `number` type for all numeric values --- integers, floats, hex, binary, and octal. There is no separate `int` or `float` type (unlike languages like Java or C#).

```typescript
let age: number = 30;
let price: number = 19.99;
let hex: number = 0xff;
let binary: number = 0b1010;
let octal: number = 0o744;
```

**Real-world examples:**

```typescript
// E-commerce calculations
let subtotal: number = 49.99;
let taxRate: number = 0.08;
let total: number = subtotal * (1 + taxRate);  // 53.9892

// Pagination
let currentPage: number = 1;
let itemsPerPage: number = 25;
let totalItems: number = 250;
let totalPages: number = Math.ceil(totalItems / itemsPerPage);  // 10

// Geolocation
let latitude: number = 40.7128;
let longitude: number = -74.0060;
```

> **Gotcha:** JavaScript (and therefore TypeScript) uses IEEE 754 floating-point arithmetic. This means `0.1 + 0.2 !== 0.3`. For financial calculations, work in cents (integers) or use a library like `decimal.js`.

### Boolean

Booleans represent `true` or `false`. They are the backbone of conditional logic.

```typescript
let isActive: boolean = true;
let hasPermission: boolean = false;
```

**Real-world examples:**

```typescript
// Feature flags
let isFeatureEnabled: boolean = true;
let isDarkMode: boolean = false;
let isMaintenanceMode: boolean = false;

// Form validation state
let isFormValid: boolean = true;
let hasAcceptedTerms: boolean = false;
let isSubmitting: boolean = false;

// Access control
let isAdmin: boolean = user.role === "admin";
let canEdit: boolean = isAdmin || user.id === document.ownerId;
```

### Null and Undefined

These two types represent the *absence* of a value, but they have subtly different meanings:

- **`undefined`** means a variable has been declared but not yet assigned a value
- **`null`** means a variable has been explicitly set to "no value"

```typescript
let nothing: null = null;
let notDefined: undefined = undefined;

// With strictNullChecks (recommended), these are distinct types
let name: string = null;      // Error!
let name: string | null = null; // OK - explicit union
```

**Why does `strictNullChecks` matter?** Without it, `null` and `undefined` are assignable to every type, which is the source of the infamous "Cannot read property of null" runtime errors. With `strictNullChecks`, TypeScript forces you to handle the possibility of `null` explicitly.

**Real-world examples:**

```typescript
// Database query that might not find a result
function findUserById(id: number): User | null {
  const user = database.query(`SELECT * FROM users WHERE id = ${id}`);
  return user ?? null;
}

// Optional configuration with defaults
function createServer(port: number | undefined) {
  const actualPort = port ?? 3000;  // Default to 3000 if undefined
  console.log(`Server running on port ${actualPort}`);
}

// Clearing a value explicitly
let selectedItem: string | null = "item-1";
selectedItem = null;  // User deselected - intentionally empty
```

### BigInt and Symbol

These are less common but important for specific use cases:

```typescript
// BigInt: for numbers larger than Number.MAX_SAFE_INTEGER (2^53 - 1)
let bigNumber: bigint = 100n;
let reallyBig: bigint = 9007199254740993n;  // Too large for 'number'

// Symbol: guaranteed unique identifiers
let uniqueKey: symbol = Symbol("key");
let anotherKey: symbol = Symbol("key");
// uniqueKey === anotherKey is false! Each Symbol is unique.
```

**When to use BigInt:** Financial systems dealing with large monetary values in minor currency units, cryptography, or working with database IDs that exceed JavaScript's safe integer range.

**When to use Symbol:** Creating truly private object keys, defining unique constants for protocols, or implementing iterator patterns.

### Type Comparison Table

| Type | Example Values | Use For |
|---|---|---|
| `string` | `"hello"`, `'world'`, `` `template` `` | Text, messages, IDs |
| `number` | `42`, `3.14`, `0xFF` | Counts, measurements, calculations |
| `boolean` | `true`, `false` | Flags, conditions, toggles |
| `null` | `null` | Intentional absence of value |
| `undefined` | `undefined` | Uninitialized or missing values |
| `bigint` | `100n`, `9007199254740993n` | Very large integers |
| `symbol` | `Symbol("id")` | Unique identifiers |

---

## 3. Type Inference

TypeScript is smart. You don't always need to write types explicitly --- the compiler can figure them out. This feature is called **type inference**, and it is one of TypeScript's greatest strengths. It gives you type safety without the verbosity of languages like Java.

```typescript
// TypeScript infers the type from the assigned value
let city = "New York";       // inferred as string
let count = 42;              // inferred as number
let isValid = true;          // inferred as boolean

// city = 100;  // Error: Type 'number' is not assignable to type 'string'
```

**How does it work?** When you assign a value to a variable, TypeScript looks at the *right-hand side* of the assignment and determines the type. From that point on, the variable is locked to that type.

### When Inference Works Well

```typescript
// Simple assignments - inference is obvious and correct
let score = 100;                          // number
let items = ["apple", "banana"];          // string[]
let user = { name: "Alice", age: 30 };   // { name: string; age: number }

// Return types - inferred from the return statement
function double(n: number) {
  return n * 2;  // return type inferred as number
}

// Array methods - types flow through the chain
let lengths = ["hello", "world"].map(s => s.length);  // number[]

// Ternary expressions
let label = count > 0 ? "positive" : "non-positive";  // string

// Destructuring
let { name, age } = user;  // name: string, age: number
```

### When Inference Fails or Gets It Wrong

```typescript
// Empty arrays - TypeScript infers 'any[]' (or 'never[]' in strict mode)
let items = [];          // any[] --- not useful!
let items: string[] = []; // Annotate to fix

// Variables declared without initial value
let result;              // 'any' --- no value to infer from
let result: number;      // Annotate to fix

// Callbacks with complex return types
let handler = (event: Event) => {
  // Without annotation, complex logic may produce overly wide types
};

// Constants vs let - inference differs!
const status = "active";  // type is literally "active" (string literal type)
let status2 = "active";   // type is string (because it could change)

// Functions that could return multiple types
function parse(input: string) {
  if (input === "true") return true;
  if (input === "false") return false;
  return input;
}
// Inferred return: string | boolean --- might not be what you want
```

### When to Annotate vs. When to Infer

```typescript
// LET TypeScript infer - the type is obvious from context
let score = 100;
let items = ["apple", "banana"];
const isReady = true;
let doubled = [1, 2, 3].map(n => n * 2);

// ANNOTATE when the type isn't obvious from the value
let response: ApiResponse;
let config: DatabaseConfig;

// ANNOTATE function parameters - TypeScript can NEVER infer these
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ANNOTATE return types for public API functions
// (helps catch bugs when the implementation changes)
function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

// ANNOTATE when you want a wider type than what inference gives
let id: string | number = 42;  // Inference would give just 'number'
```

> **Rule of thumb:** Annotate function parameters and return types. Let inference handle local variables. If you hover over a variable in your IDE and the inferred type looks correct, you don't need an annotation.

---

## 4. Arrays

Arrays in TypeScript are typed collections --- every element must conform to the declared type. This prevents a whole class of bugs where unexpected values sneak into your arrays.

```typescript
// Two equivalent syntaxes
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// TypeScript enforces element types
numbers.push(4);       // OK
numbers.push("five");  // Error!

// Mixed arrays with union types
let mixed: (string | number)[] = [1, "two", 3];

// Read-only arrays
let frozen: readonly number[] = [1, 2, 3];
frozen.push(4);  // Error: Property 'push' does not exist on type 'readonly number[]'
```

> **Which syntax should you use?** `number[]` is more common and concise. `Array<number>` (generic syntax) is useful when the element type is complex, like `Array<{ id: number; name: string }>`, where `{ id: number; name: string }[]` can be harder to read.

### Array Manipulation with Type Safety

TypeScript ensures that every array operation respects the element type:

```typescript
let scores: number[] = [85, 92, 78, 95, 88];

// map - transforms each element, returns new typed array
let doubled: number[] = scores.map(s => s * 2);
let labels: string[] = scores.map(s => `Score: ${s}`);  // number[] -> string[]

// filter - returns same type array
let highScores: number[] = scores.filter(s => s >= 90);  // [92, 95]

// reduce - accumulator type is inferred from initial value
let total: number = scores.reduce((sum, s) => sum + s, 0);
let average: number = total / scores.length;

// find - returns element type | undefined (it might not find anything!)
let first90: number | undefined = scores.find(s => s >= 90);
if (first90 !== undefined) {
  console.log(`First 90+ score: ${first90}`);
}

// sort - in-place, same type
scores.sort((a, b) => a - b);

// includes - type-safe membership check
let has100: boolean = scores.includes(100);  // false
```

### Typing Complex Arrays

```typescript
// Array of objects
type User = { id: number; name: string; active: boolean };

let users: User[] = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
];

// Chaining operations with full type safety
let activeUserNames: string[] = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort();
// ["Alice", "Charlie"]

// Nested arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Flat operations
let flat: number[] = matrix.flat();  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ReadonlyArray prevents ALL mutations
let config: ReadonlyArray<string> = ["dev", "staging", "prod"];
// config.push("test");  // Error
// config[0] = "local";  // Error
```

### Common Mistakes with Arrays

> **Gotcha:** `Array.prototype.find()` returns `T | undefined`, not `T`. Always check for `undefined` before using the result.

> **Gotcha:** `const arr = [1, 2, 3]` does **not** make the array immutable --- `const` only prevents reassigning the variable. The array contents can still be modified. Use `readonly number[]` or `as const` for true immutability.

```typescript
const nums = [1, 2, 3];
nums.push(4);        // This works! const doesn't freeze the array.
// nums = [5, 6, 7]; // THIS fails - can't reassign the variable.

const frozenNums = [1, 2, 3] as const;  // readonly [1, 2, 3]
// frozenNums.push(4);  // Error!
```

---

## 5. Tuples

Tuples are fixed-length arrays where each position has a specific type. While arrays say "a list of things of the same type," tuples say "a fixed group of things where each position means something specific."

**Why use tuples?** They are useful when you want to return multiple values from a function, represent a small fixed-structure record, or work with CSV-like data where each column has a known type.

```typescript
// A tuple with exactly two elements
let coordinate: [number, number] = [10, 20];

// Each position has its own type
let user: [string, number, boolean] = ["Alice", 30, true];

// Accessing elements
let name = user[0];    // type is string
let age = user[1];     // type is number

// Error: wrong type at wrong position
let bad: [string, number] = [42, "hello"]; // Error!

// Named tuples (TypeScript 4.0+) for documentation
type Point = [x: number, y: number];
let origin: Point = [0, 0];

// Tuple with optional elements
type FlexPoint = [number, number, number?];
let point2D: FlexPoint = [1, 2];
let point3D: FlexPoint = [1, 2, 3];
```

### Tuple Destructuring

Destructuring tuples is one of their most powerful uses --- it lets you give meaningful names to each position:

```typescript
// Basic destructuring
let rgb: [number, number, number] = [255, 128, 0];
let [red, green, blue] = rgb;
console.log(`Red: ${red}, Green: ${green}, Blue: ${blue}`);

// Skipping elements with _
let record: [string, number, string, boolean] = ["Alice", 30, "Engineer", true];
let [name, , job] = record;  // Skip age, skip active

// Rest elements in tuples
type LogEntry = [string, ...string[]];
let entry: LogEntry = ["2024-01-15", "ERROR", "Connection failed", "Retrying..."];
let [date, ...messages] = entry;  // date: string, messages: string[]

// React's useState is a famous tuple example
// function useState<T>(initial: T): [T, (value: T) => void]
let [count, setCount] = useState(0);  // Destructured tuple!
```

### Tuples as Function Return Types

```typescript
// Returning multiple values without creating a full object
function getMinMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)];
}
let [min, max] = getMinMax([3, 1, 4, 1, 5, 9]);

// Parsing operation that returns success status and result
function tryParseInt(input: string): [boolean, number] {
  const result = parseInt(input, 10);
  return [!isNaN(result), result];
}
let [success, value] = tryParseInt("42");  // [true, 42]
let [ok, val] = tryParseInt("abc");        // [false, NaN]

// Coordinate transformation
function toPolar(x: number, y: number): [radius: number, angle: number] {
  return [Math.sqrt(x * x + y * y), Math.atan2(y, x)];
}
let [radius, angle] = toPolar(3, 4);
```

### When to Use Tuples vs. Objects

| Criteria | Tuple | Object |
|---|---|---|
| Number of fields | 2--3 (small) | 3+ or growing |
| Field meanings | Obvious from context | Need named properties |
| Destructuring | Positional (`[a, b]`) | Named (`{ a, b }`) |
| Readability at call site | Lower | Higher |
| Use case | Coordinates, pairs, quick returns | Data models, configs |

```typescript
// Tuple: fine for a pair --- meaning is clear
let point: [number, number] = [10, 20];

// Object: better when you have many fields or names matter
let point2 = { x: 10, y: 20, z: 30, label: "origin" };
```

> **Rule of thumb:** If you find yourself forgetting which position means what, switch to an object. If the tuple would have more than 3--4 elements, use an object instead.

### Common Mistakes with Tuples

> **Gotcha:** TypeScript tuples are **not** truly fixed-length at runtime. You can `push()` extra elements onto a tuple, and TypeScript won't stop you (this is a known limitation).

```typescript
let pair: [string, number] = ["Alice", 30];
pair.push("extra");  // No compile error! TypeScript allows this.
console.log(pair);   // ["Alice", 30, "extra"]
// pair[2]           // Error: Tuple type has no element at index '2'
```

> **Gotcha:** Tuple type inference requires explicit annotation. Without it, TypeScript infers a regular array.

```typescript
let inferred = [1, "hello"];           // (string | number)[] --- NOT a tuple
let tuple: [number, string] = [1, "hello"];  // Correctly typed as tuple
let constTuple = [1, "hello"] as const;      // readonly [1, "hello"] --- also a tuple
```

---

## 6. Objects

Objects are the most fundamental compound type in TypeScript. Almost everything in a TypeScript application --- API responses, database records, configuration, component props --- is modeled as an object type.

```typescript
// Inline object type
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30,
};

// Optional properties with ?
let config: { host: string; port?: number } = {
  host: "localhost",
  // port is optional
};

// Readonly properties
let point: { readonly x: number; readonly y: number } = { x: 10, y: 20 };
point.x = 30; // Error: Cannot assign to 'x' because it is a read-only property

// Nested objects
let employee: {
  name: string;
  address: {
    street: string;
    city: string;
  };
} = {
  name: "Bob",
  address: {
    street: "123 Main St",
    city: "Springfield",
  },
};
```

### Excess Property Checking

One of TypeScript's most helpful (and sometimes surprising) features is **excess property checking**. When you assign an object literal directly to a typed variable, TypeScript checks that you haven't included extra properties:

```typescript
type User = { name: string; age: number };

// Direct assignment: excess properties are ERRORS
let user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",  // Error! 'email' does not exist in type 'User'
};

// But assigning from a variable: excess properties are ALLOWED
let data = { name: "Alice", age: 30, email: "alice@example.com" };
let user2: User = data;  // No error! This is called "structural compatibility"
```

**Why does this exist?** Object literals are usually written right at the assignment, so a typo or extra property likely indicates a mistake. But when assigning from a variable, the extra data might be intentionally present for use elsewhere.

> **Gotcha:** This is the most common source of confusion for TypeScript beginners. Remember: excess property checking only applies to *object literals assigned directly* to a typed target.

### Index Signatures (Preview)

Sometimes you don't know all property names ahead of time. Index signatures let you describe the *shape* of dynamic properties:

```typescript
// A dictionary/map-like object
type StringMap = {
  [key: string]: number;
};

let wordCounts: StringMap = {};
wordCounts["hello"] = 5;
wordCounts["world"] = 3;
// wordCounts["oops"] = "not a number";  // Error: string is not assignable to number

// Mixing known and dynamic properties
type ApiResponse = {
  status: number;
  message: string;
  [key: string]: unknown;  // Allow any additional properties
};
```

> **Note:** Index signatures are covered in depth in Day 2. This is just a preview of the concept.

### Real-World Object Patterns

```typescript
// API Response modeling
type ApiError = {
  code: number;
  message: string;
  details?: string;
  timestamp: string;
};

// Configuration with defaults
type ServerConfig = {
  host: string;
  port: number;
  ssl: boolean;
  maxConnections?: number;
  timeout?: number;
};

const defaultConfig: ServerConfig = {
  host: "localhost",
  port: 3000,
  ssl: false,
};

function createServer(overrides: Partial<ServerConfig>): ServerConfig {
  return { ...defaultConfig, ...overrides };
}

// Deeply nested real-world structure
type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "shipped" | "delivered";
};
```

---

## 7. Special Types

TypeScript has several special types that don't correspond to JavaScript values but play critical roles in the type system.

### `any` - Escape Hatch (Use Sparingly)

`any` tells TypeScript: "stop checking this value entirely." It effectively turns off the type system for that variable.

```typescript
let value: any = 42;
value = "now a string";  // No error
value = true;            // No error
value.nonExistentMethod(); // No error at compile time - crashes at runtime!

// 'any' disables ALL type checking. Avoid it.
```

**When `any` is acceptable:**
- Migrating a large JavaScript codebase to TypeScript incrementally
- Working with a third-party library that has no type definitions
- Prototyping quickly (but add types before committing)

**When `any` is NOT acceptable:**
- As a "fix" for type errors you don't understand --- this just hides bugs
- In production code when `unknown` would work instead
- On function parameters in public APIs

> **Tip:** Enable `noImplicitAny` in your `tsconfig.json` (it's part of `strict`). This forces you to explicitly write `any` when you mean it, rather than accidentally getting it from missing annotations.

### `unknown` - Safe Alternative to `any`

`unknown` is the type-safe counterpart to `any`. You can assign anything to `unknown`, but you **cannot use it** until you verify what it is. This is the key difference.

```typescript
let value: unknown = 42;
value = "now a string";  // OK to assign anything

// But you CAN'T use it without checking first
// value.toUpperCase(); // Error!

// You must narrow the type
if (typeof value === "string") {
  console.log(value.toUpperCase()); // OK - TypeScript knows it's a string here
}
```

**Real-world example --- safely handling JSON:**

```typescript
function parseJSON(jsonString: string): unknown {
  return JSON.parse(jsonString);  // Could be anything!
}

const data = parseJSON('{"name": "Alice", "age": 30}');

// Can't access data.name directly --- must check first
if (
  typeof data === "object" &&
  data !== null &&
  "name" in data &&
  typeof (data as Record<string, unknown>).name === "string"
) {
  console.log((data as Record<string, unknown>).name); // Safe!
}
```

### `any` vs `unknown` Comparison

| Behavior | `any` | `unknown` |
|---|---|---|
| Assign anything to it | Yes | Yes |
| Assign it to other types | Yes (unsafe!) | No (must narrow first) |
| Access properties | Yes (unsafe!) | No (must narrow first) |
| Call methods | Yes (unsafe!) | No (must narrow first) |
| Type checking | Disabled | Enforced |

> **Rule:** Default to `unknown`. Only use `any` as a last resort.

### `void` - No Return Value

`void` means a function does not return a meaningful value. This is different from returning `undefined` --- it signals *intent*.

```typescript
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement
}

// void is also useful for callback types
type EventHandler = (event: Event) => void;

// Interesting subtlety: void in callbacks allows returning values
// (they're just ignored)
let handlers: EventHandler[] = [];
handlers.push((e) => {
  return true;  // No error! Return value is simply discarded.
});
```

### `never` - Function Never Returns

`never` represents a value that **never occurs**. It is the "bottom type" in TypeScript's type hierarchy --- it is a subtype of every other type, but no type is a subtype of `never`.

```typescript
// Throws an error - never returns normally
function throwError(message: string): never {
  throw new Error(message);
}

// Infinite loop - never returns
function infiniteLoop(): never {
  while (true) {}
}
```

#### Exhaustive Checks with `never`

The most powerful use of `never` is ensuring you handle every possible case. If TypeScript narrows a value down to `never`, it means all cases have been handled. If a new case is added later, the code won't compile until you handle it:

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // If all cases are handled, shape is 'never' here.
      // If someone adds a new shape kind and forgets to handle it,
      // this line will produce a compile error.
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
```

**Why is this valuable?** Imagine a teammate adds `{ kind: "rectangle"; width: number; height: number }` to the `Shape` type. Without the exhaustive check, the function silently returns `undefined`. With the exhaustive check, the compiler immediately flags the unhandled case.

#### `never` in Conditional Types (Preview)

```typescript
// never is used to "remove" types from unions
type NonString<T> = T extends string ? never : T;

type Example = NonString<string | number | boolean>;
// Result: number | boolean (string was replaced with never and disappears)
```

---

## 8. Type Assertions

Sometimes you know more about a type than TypeScript does. Type assertions let you tell the compiler "trust me, I know what this is."

```typescript
// Angle-bracket syntax
let someValue: unknown = "hello";
let strLength: number = (<string>someValue).length;

// 'as' syntax (preferred, required in JSX/TSX files)
let strLength2: number = (someValue as string).length;

// Real-world example: DOM elements
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Alice";

// Non-null assertion with !
function getElement(id: string) {
  const el = document.getElementById(id)!; // Assert it's not null
  return el;
}
```

> **Warning:** Type assertions don't perform runtime checks. If you assert the wrong type, you'll get runtime errors. They are a promise to the compiler that you know what you're doing.

### `as const` --- Const Assertions

`as const` tells TypeScript to infer the *narrowest possible type* for a value. Instead of `string`, it infers the literal `"hello"`. Instead of `number[]`, it infers `readonly [1, 2, 3]`.

```typescript
// Without as const
let config = {
  endpoint: "https://api.example.com",
  retries: 3,
};
// Type: { endpoint: string; retries: number }

// With as const
let config2 = {
  endpoint: "https://api.example.com",
  retries: 3,
} as const;
// Type: { readonly endpoint: "https://api.example.com"; readonly retries: 3 }

// Extremely useful for defining constants
const DIRECTIONS = ["north", "south", "east", "west"] as const;
// Type: readonly ["north", "south", "east", "west"]
type Direction = typeof DIRECTIONS[number];  // "north" | "south" | "east" | "west"

// Useful for action types in state management
const INCREMENT = "INCREMENT" as const;
const DECREMENT = "DECREMENT" as const;
```

### Double Assertions

Sometimes TypeScript won't let you assert directly from type A to type B because they are too different. In rare cases, you can assert through `unknown` first:

```typescript
// Direct assertion fails --- types are too different
// let x = "hello" as number;  // Error!

// Double assertion via unknown (escape hatch of last resort)
let x = "hello" as unknown as number;  // Works, but extremely dangerous!
```

> **Warning:** If you find yourself needing a double assertion, it almost always means your types are wrong somewhere upstream. Fix the root cause instead.

### When NOT to Use Assertions

```typescript
// BAD: Using assertion to silence a legitimate error
let user = {} as User;  // user.name is undefined at runtime!

// GOOD: Actually provide the data
let user: User = { name: "Alice", age: 30 };

// BAD: Asserting API response without validation
let data = await fetch("/api/user").then(r => r.json()) as User;

// GOOD: Validate the response shape at runtime
let raw: unknown = await fetch("/api/user").then(r => r.json());
if (isUser(raw)) {
  let data: User = raw;  // Safe!
}

// BAD: Non-null assertion to skip error handling
let el = document.getElementById("app")!;  // Crashes if element doesn't exist

// GOOD: Handle the null case
let el = document.getElementById("app");
if (!el) {
  throw new Error("Missing #app element --- check your HTML");
}
// el is now narrowed to HTMLElement (not null)
```

> **Rule of thumb:** Type assertions are a *code smell*. Prefer type narrowing (`typeof`, `instanceof`, `in`, custom type guards) whenever possible. Use assertions only when you genuinely have information the compiler cannot infer.

---

## 9. TypeScript Type Hierarchy

Understanding how types relate to each other helps you reason about assignability, narrowing, and why certain operations are allowed or rejected.

```
                        unknown
                  (top type - all types are subtypes of unknown)
                           |
         +-----------------+-----------------+
         |                 |                 |
       string           number            boolean   ... (all primitive & object types)
         |                 |                 |
    "hello"             42               true        ... (literal types)
         |                 |                 |
         +-----------------+-----------------+
                           |
                         never
                  (bottom type - subtype of all types)
```

**Key relationships:**

- **`unknown`** is the *top type*. Every type is assignable to `unknown`. You can put anything into an `unknown` variable.
- **`never`** is the *bottom type*. `never` is assignable to every type, but nothing (except `never`) is assignable to `never`.
- **`any`** breaks the rules. It is both assignable to and from every type, which is why it is unsafe --- it bypasses the hierarchy entirely.
- **Literal types** (like `"hello"` or `42`) are subtypes of their corresponding primitive types (`string`, `number`).
- **Union types** (`A | B`) are supertypes of both `A` and `B`.
- **Intersection types** (`A & B`) are subtypes of both `A` and `B`.

```typescript
// Assignability flows downward: wider types accept narrower types
let a: unknown = "hello";    // OK: string is assignable to unknown
let b: string = "hello";     // OK: literal "hello" is assignable to string
// let c: "hello" = b;       // Error: string is NOT assignable to literal "hello"

// never is assignable to everything
function fail(): never { throw new Error(); }
let x: number = fail();      // OK: never is assignable to number
let y: string = fail();      // OK: never is assignable to string
```

---

## 10. Practical Example: Building a Simple Contact Book

```typescript
// Define the shape of a contact
type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string; // optional
};

// Our "database"
const contacts: Contact[] = [];
let nextId = 1;

// Add a contact
function addContact(name: string, email: string, phone?: string): Contact {
  const contact: Contact = {
    id: nextId++,
    name,
    email,
    phone,
  };
  contacts.push(contact);
  return contact;
}

// Find a contact by name
function findContact(name: string): Contact | undefined {
  return contacts.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

// List all contacts
function listContacts(): void {
  if (contacts.length === 0) {
    console.log("No contacts found.");
    return;
  }
  contacts.forEach((c) => {
    console.log(`${c.id}. ${c.name} - ${c.email}${c.phone ? ` (${c.phone})` : ""}`);
  });
}

// Usage
addContact("Alice", "alice@example.com", "555-0101");
addContact("Bob", "bob@example.com");

listContacts();
// 1. Alice - alice@example.com (555-0101)
// 2. Bob - bob@example.com

const found = findContact("alice");
if (found) {
  console.log(`Found: ${found.name}`);
}
```

### Extended Example: Task Tracker

Here is a more complex example combining many Day 1 concepts:

```typescript
// --- Types ---
type Priority = "low" | "medium" | "high";
type Status = "todo" | "in-progress" | "done";

type Task = {
  readonly id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  tags: readonly string[];
  createdAt: string;
};

type TaskSummary = [id: number, title: string, status: Status];

// --- State ---
const tasks: Task[] = [];
let nextTaskId = 1;

// --- Functions ---
function createTask(
  title: string,
  priority: Priority,
  description?: string,
  tags: string[] = []
): Task {
  const task: Task = {
    id: nextTaskId++,
    title,
    description,
    priority,
    status: "todo",
    tags,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function updateStatus(taskId: number, newStatus: Status): boolean {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return false;
  task.status = newStatus;
  return true;
}

function getTasksByPriority(priority: Priority): Task[] {
  return tasks.filter(t => t.priority === priority);
}

function getTaskSummaries(): TaskSummary[] {
  return tasks.map(t => [t.id, t.title, t.status]);
}

function getStatistics(): { total: number; byStatus: Record<Status, number> } {
  return {
    total: tasks.length,
    byStatus: {
      "todo": tasks.filter(t => t.status === "todo").length,
      "in-progress": tasks.filter(t => t.status === "in-progress").length,
      "done": tasks.filter(t => t.status === "done").length,
    },
  };
}

// --- Usage ---
createTask("Set up project", "high", "Initialize the TypeScript project", ["setup"]);
createTask("Write tests", "medium", undefined, ["testing"]);
createTask("Update README", "low");

updateStatus(1, "done");
updateStatus(2, "in-progress");

console.log(getTaskSummaries());
// [[1, "Set up project", "done"], [2, "Write tests", "in-progress"], [3, "Update README", "todo"]]

console.log(getStatistics());
// { total: 3, byStatus: { todo: 1, "in-progress": 1, done: 1 } }
```

---

## Exercises

### Exercise 1: Variable Declarations
Declare variables with appropriate types for the following:
- A user's username (text)
- A product price (decimal number)
- Whether a user is logged in
- A list of scores (numbers)
- A coordinate pair (x, y) using a tuple

### Exercise 2: Type Narrowing
Write a function `processValue(value: unknown): string` that:
- If value is a string, returns it in uppercase
- If value is a number, returns it as a string with 2 decimal places
- If value is a boolean, returns "yes" or "no"
- Otherwise, returns "unsupported type"

### Exercise 3: Object Types
Create a `Product` type with `name`, `price`, `category`, and optional `description`. Write functions to:
- Create a product
- Apply a discount (percentage)
- Format the product as a display string

### Exercise 4: Array Operations
Given an array of `Student` objects (with `name: string`, `grade: number`, and `subject: string`):
- Write a function to find all students with a grade above 90
- Write a function to calculate the average grade per subject (return a `Map<string, number>` or plain object)
- Write a function to sort students by grade descending and return only their names
- Write a function to find the student with the highest grade (handle the empty array case!)

### Exercise 5: Tuple Practice
Create a function `parseCSVLine(line: string): [string, number, boolean]` that:
- Takes a CSV line like `"Alice,30,true"`
- Splits it and converts each part to the correct type
- Returns a typed tuple
- Handles invalid input by throwing a descriptive error

### Exercise 6: Exhaustive Type Checking
Define a `PaymentMethod` type that is a union of objects with a `type` property (`"credit-card"`, `"paypal"`, `"bank-transfer"`, `"crypto"`). Each variant should have type-specific fields. Write a `processPayment` function that:
- Uses a switch statement to handle each payment method
- Uses the `never` trick for exhaustive checking
- Returns a confirmation string specific to the payment method

### Exercise 7: Type Assertions and Safety
You receive JSON data from an API as `unknown`. Write a type guard function `isUser(data: unknown): data is User` that checks all required fields exist and have the correct types. Then write a `fetchUser` function that uses it to safely parse API responses without using `as` assertions.

---

## Key Takeaways

1. **TypeScript adds static types to JavaScript** --- errors are caught at compile time, not in production
2. **Use type inference for local variables**, explicit annotations for function signatures
3. **Prefer `unknown` over `any`** --- it forces you to check types before use
4. **Tuples give you fixed-length, typed arrays** --- great for function returns and pairs
5. **`readonly` prevents mutation** of properties and arrays --- use it for data that shouldn't change
6. **Type assertions are a last resort** --- prefer type narrowing with `typeof`, `instanceof`, and `in`
7. **`as const` is your friend** --- use it for literal types, constant arrays, and configuration objects
8. **The `never` type enables exhaustive checking** --- add it to switch defaults to catch unhandled cases at compile time
9. **`tsconfig.json` with `strict: true`** is the single most impactful thing you can do for type safety

---
