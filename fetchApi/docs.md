## 1. What is Fetch API?

**Definition:**
> The Fetch API is a modern, built-in JavaScript interface that allows you to make HTTP requests (GET, POST, PUT, DELETE) to servers — and it returns a **Promise**.

Before Fetch API, developers used `XMLHttpRequest (XHR)` which was verbose and ugly. Fetch API replaced that with clean, readable code.

**Real World Analogy:**
Think of Fetch like ordering food at a restaurant:
- You (browser) **place an order** (HTTP request)
- The waiter (Fetch) **goes to the kitchen** (server)
- Kitchen **prepares your food** (processes request)
- Waiter **brings back the food** (response)
- You **eat it** (use the data)

---

## 2. How Fetch API Works — The Big Picture

![How Fetch API Works](images/fetch_big_picture.svg)

---

## 3. Fetch API Syntax

```javascript
fetch(url, options)
  .then(response => response.json())   // Step 1: Parse response
  .then(data => console.log(data))     // Step 2: Use data
  .catch(error => console.error(error)); // Step 3: Handle errors
```

| Part | What it does |
|------|-------------|
| `fetch(url)` | Sends HTTP request to the URL |
| `.then(response => response.json())` | Converts raw response to JSON |
| `.then(data => ...)` | Use the actual data |
| `.catch(error => ...)` | Catch any network errors |

---

## 4. Step 1 — Simple GET Request

**Definition:** GET request means "give me data from the server" — you are only reading, not sending data.

```javascript
// Real Example: Get list of users from a free public API
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    console.log(response.status); // 200 means OK
    return response.json();       // convert to JSON
  })
  .then(users => {
    console.log(users);           // array of 10 users
    users.forEach(user => {
      console.log(user.name, user.email);
    });
  })
  .catch(error => {
    console.error("Something went wrong:", error);
  });
```

**Output:**
```
200
Leanne Graham   Sincere@april.biz
Ervin Howell    Shanna@melissa.tv
...
```

---

## 5. The Response Object — What Comes Back?

When fetch gets a response, you receive a **Response Object** first — NOT the data directly.

![Response Object Properties](images/fetch_response_object.svg)

```javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => {
    console.log(response.status);  // 200
    console.log(response.ok);      // true
    console.log(response.url);     // the URL used
    return response.json();        // MUST call .json() to extract body
  })
  .then(user => console.log(user.name));
```

---

## 6. Step 2 — POST Request (Send Data to Server)

**Definition:** POST request means "I want to SEND data to the server" — like submitting a form or creating a new record.

```javascript
// Real Example: Create a new blog post
const newPost = {
  title: "My First Blog",
  body:  "JavaScript is awesome!",
  userId: 1
};

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",                           // Tell server: this is a POST
  headers: {
    "Content-Type": "application/json"      // Tell server: I'm sending JSON
  },
  body: JSON.stringify(newPost)             // Convert object to JSON string
})
  .then(response => response.json())
  .then(data => {
    console.log("Post created! ID:", data.id); // 101
    console.log(data);
  })
  .catch(error => console.error(error));
```

---

## 7. All HTTP Methods with Fetch

![HTTP Methods](images/fetch_http_methods.svg)

---

## 8. PUT Request — Update Data

```javascript
// Real Example: Update a post completely
const updatedPost = {
  id: 1,
  title: "Updated Title",
  body:  "Updated content here",
  userId: 1
};

fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updatedPost)
})
  .then(res => res.json())
  .then(data => console.log("Updated:", data));
```

---

## 9. DELETE Request — Remove Data

```javascript
// Real Example: Delete post with ID 1
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE"
})
  .then(res => {
    if (res.ok) {
      console.log("Post deleted successfully!");
    }
  })
  .catch(err => console.error(err));
```

---

## 10. Async / Await with Fetch — Clean Modern Way

**Definition:** `async/await` is syntactic sugar over Promises — it makes asynchronous code look like synchronous code. Much easier to read.

![.then() vs async/await](images/fetch_async_await.svg)

```javascript
// Real Example: Fetch a single user using async/await
async function getUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const user = await response.json();
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("City:", user.address.city);

  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
}

getUser(1);
```

---

## 11. Error Handling — Very Important!

**Key Concept:** Fetch does NOT throw an error for 404 or 500 status codes. It only throws for **network failures** (no internet, DNS failure). So you must check `response.ok` manually.

```javascript
async function safeRequest(url) {
  try {
    const response = await fetch(url);

    // Fetch does NOT auto-throw on 404/500 — you must check!
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error — check your internet connection.");
    } else {
      console.error("Request failed:", error.message);
    }
  }
}

// Test with a bad URL
safeRequest("https://jsonplaceholder.typicode.com/posts/9999")
  .then(data => console.log(data));
```

---

## 12. Headers — Sending Extra Info with Request

**Definition:** Headers are key-value pairs sent alongside a request — they tell the server *how to handle your request* (format, auth token, etc.)

```javascript
// Real Example: Authenticated API request
async function getPrivateData() {
  const response = await fetch("https://api.example.com/profile", {
    method: "GET",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": "Bearer your-jwt-token-here",
      "Accept":        "application/json"
    }
  });

  const data = await response.json();
  console.log(data);
}
```

---

## 13. Fetch Options — Full Reference

```javascript
fetch(url, {
  method:  "POST",          // GET | POST | PUT | DELETE | PATCH
  headers: {
    "Content-Type": "application/json"
  },
  body:    JSON.stringify({ name: "Ali" }),  // only for POST/PUT/PATCH
  mode:    "cors",          // cors | no-cors | same-origin
  cache:   "no-cache",      // default | no-cache | reload | force-cache
  credentials: "include"    // omit | same-origin | include (for cookies)
});
```

---

## 14. Real World Example — User Registration Form

This is how you would use Fetch in a real project — connecting a registration form to a backend API.

```html
<!-- index.html -->
<form id="registerForm">
  <input type="text"     id="name"     placeholder="Your name" />
  <input type="email"    id="email"    placeholder="Your email" />
  <input type="password" id="password" placeholder="Password" />
  <button type="submit">Register</button>
</form>

<div id="message"></div>
```

```javascript
// app.js
document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // stop page reload

  const userData = {
    name:     document.getElementById("name").value,
    email:    document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const messageDiv = document.getElementById("message");

  try {
    const response = await fetch("https://api.example.com/register", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(userData)
    });

    if (!response.ok) {
      const err = await response.json();
      messageDiv.textContent = "Error: " + err.message;
      return;
    }

    const result = await response.json();
    messageDiv.textContent = "Welcome, " + result.name + "! Registration complete.";

  } catch (error) {
    messageDiv.textContent = "Network error. Please try again.";
  }
});
```

---

## 15. Fetch vs XMLHttpRequest

![Fetch API vs XHR](images/fetch_vs_xhr.svg)

---

## 16. Fetch Lifecycle — Promise States

![Fetch Lifecycle](images/fetch_lifecycle.svg)

---

## 17. Fetching Multiple APIs at Once — `Promise.all`

**Real scenario:** You need a user's profile AND their posts at the same time. Don't make them wait one by one — do both in parallel!

```javascript
async function loadDashboard(userId) {
  try {
    // Both requests fire at the SAME TIME — much faster!
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    ]);

    const user  = await userRes.json();
    const posts = await postsRes.json();

    console.log("User:", user.name);
    console.log("Total posts:", posts.length);

  } catch (error) {
    console.error("One of the requests failed:", error);
  }
}

loadDashboard(1);
```

---

## 18. Quick Summary Cheatsheet

![Fetch API Cheatsheet](images/fetch_cheatsheet.svg)

---

## 19. Practice Exercises

**Exercise 1 — Beginner:**
Fetch the list of todos from `https://jsonplaceholder.typicode.com/todos` and display only the first 5 completed ones in the console.

**Exercise 2 — Intermediate:**
Create a form with a `title` and `body` input. On submit, POST the data to `https://jsonplaceholder.typicode.com/posts` and show the created post's ID in a `<div>`.

**Exercise 3 — Advanced:**
Using `Promise.all`, fetch users and albums simultaneously from JSONPlaceholder. Map each album to its owner's name and log: `"Album: [title] — by [username]"`.

---
