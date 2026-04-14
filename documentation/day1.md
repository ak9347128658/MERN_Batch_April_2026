# 📅 Day 1: RAG Basics + Embeddings + PostgreSQL Vector Setup

**Duration:** 1 to 1.5 hours  
**Prerequisites:** Basic SQL, Node.js fundamentals  

---

## 1. Introduction

Hello students 👋

Welcome to Day 1 of our RAG (Retrieval-Augmented Generation) module!

Today we're going to learn something that every modern AI application uses behind the scenes — from ChatGPT's browsing feature, to customer support bots, to smart document search engines.

### What we will learn today:

- What is RAG and why it exists
- What are embeddings (the secret sauce of AI search)
- How to set up PostgreSQL with pgvector for storing AI data
- How to generate and store embeddings using Node.js
- How to perform similarity search (finding "related" content)

### Why does this matter?

Imagine you're building a **customer support bot** for a company. The company has 500 FAQ documents. You can't feed all 500 documents to ChatGPT every time someone asks a question — that's expensive and slow.

**RAG solves this.** It finds only the 3-5 most relevant documents first, then sends those to the AI. Smart, fast, and cheap.

> 💡 Companies like Notion, Slack, and GitHub Copilot all use RAG-style pipelines.

---

## 2. Concept Explanation

### What is RAG?

**RAG = Retrieval-Augmented Generation**

Let's break this down:

| Word | Meaning |
|------|---------|
| **Retrieval** | Find relevant information from your database |
| **Augmented** | Add that information to the AI's prompt |
| **Generation** | Let the AI generate an answer using that context |

### Real-World Analogy: The Open-Book Exam 📖

Think about two types of exams:

1. **Closed-book exam** — You answer from memory only. Sometimes you remember wrong things. *(This is like using an LLM directly — it can hallucinate)*

2. **Open-book exam** — You can look up your notes, find the right page, and then write your answer. *(This is RAG — the AI looks up relevant documents first, then answers)*

**Question for you:** When a doctor checks a patient, do they rely only on memory, or do they also look at test reports? That's RAG in real life!

### Why not just use an LLM directly?

Great question. Here's why:

| Problem | Without RAG | With RAG |
|---------|------------|----------|
| **Outdated info** | LLM only knows training data (cutoff date) | Retrieves latest documents |
| **Hallucination** | LLM may make up facts | LLM answers based on real data |
| **Cost** | Sending all docs = expensive | Sending only relevant docs = cheap |
| **Privacy** | Your data isn't in the LLM | Your data stays in YOUR database |
| **Accuracy** | General answers | Specific, sourced answers |

### What are Embeddings?

An **embedding** is a way to convert text into numbers (a list of numbers called a "vector") so that a computer can understand meaning.

**Analogy: GPS Coordinates 🗺️**

- "Mumbai" and "Pune" are just words. A computer doesn't know they're close.
- But if you convert them to GPS coordinates: Mumbai (19.07, 72.87) and Pune (18.52, 73.85) — now the computer can calculate they're close!

**Embeddings do the same thing for text:**

```
"How to reset my password" → [0.12, -0.45, 0.78, ..., 0.33]  (1536 numbers)
"I forgot my password"     → [0.11, -0.44, 0.77, ..., 0.34]  (1536 numbers)
"What's the weather today" → [0.89, 0.23, -0.56, ..., -0.12] (1536 numbers)
```

Notice how the first two are very similar numbers? That's because they have similar **meaning**!

### How Similarity Search Works

Once text is converted to vectors (embeddings), we can measure how "close" two pieces of text are.

**Think of it like WhatsApp search** — when you search "meeting tomorrow", WhatsApp doesn't just look for exact words. Smart search understands that "let's meet tmrw" is also relevant. That's similarity search.

The most common method is **cosine similarity** — it measures the angle between two vectors:

- **1.0** = Exactly the same meaning
- **0.0** = Completely unrelated
- Values between 0.5-1.0 usually indicate relevance

---

## 3. Architecture Flow

### The RAG Pipeline (Big Picture)

```mermaid id="ragflow1"
flowchart LR
    A[User asks a Question] --> B[Convert Question to Embedding]
    B --> C[Search Vector Database]
    C --> D[Get Top K Relevant Documents]
    D --> E[Build Prompt with Context]
    E --> F[Send to LLM]
    F --> G[AI Response with Sources]
```

### Today's Focus: The Left Half (Storage + Retrieval)

```mermaid id="day1focus"
flowchart TD
    subgraph Storage Phase
        A[Raw Documents] --> B[Generate Embeddings via OpenAI]
        B --> C[Store in PostgreSQL + pgvector]
    end

    subgraph Retrieval Phase
        D[User Query] --> E[Convert Query to Embedding]
        E --> F[Similarity Search in pgvector]
        F --> G[Return Top K Documents]
    end
```

### How Embedding + Storage Works

```mermaid id="embeddingflow"
flowchart LR
    subgraph Input
        A["How do I reset my password?"]
    end

    subgraph OpenAI API
        B[Embedding Model]
    end

    subgraph Output
        C["[0.12, -0.45, 0.78, ..., 0.33]"]
    end

    subgraph PostgreSQL
        D[(documents table with vector column)]
    end

    A --> B --> C --> D
```

---

## 4. Hands-on Code

### Step 1: Install PostgreSQL + Enable pgvector

#### Option A: Local Installation

1. **Install PostgreSQL** (version 15+ recommended)
   - Download from: https://www.postgresql.org/download/
   - During installation, note your password and port (default: 5432)

2. **Install pgvector extension**

On Windows (using pgAdmin or psql):

```sql id="installpgvector"
-- First, you may need to install pgvector
-- For Windows: Download from https://github.com/pgvector/pgvector
-- For Ubuntu: 
-- sudo apt install postgresql-15-pgvector

-- Then in your database:
CREATE EXTENSION IF NOT EXISTS vector;
```

#### Option B: Using Docker (Recommended for quick setup)

```bash id="dockersetup"
# Pull PostgreSQL with pgvector pre-installed
docker run --name pgvector-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=ragdb \
  -p 5432:5432 \
  -d pgvector/pgvector:pg16
```

### Step 2: Create the Database Schema

Connect to your PostgreSQL and run:

```sql id="sqlvec1"
-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create our documents table
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  embedding VECTOR(1536),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create an index for faster similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Quick question:** Why do we use `VECTOR(1536)`? Because OpenAI's `text-embedding-ada-002` model produces vectors with 1536 dimensions!

### Step 3: Set Up Node.js Project

```bash id="projectsetup"
# Create project directory
mkdir rag-pgvector-app
cd rag-pgvector-app

# Initialize Node.js project
npm init -y

# Install dependencies
npm install openai pg dotenv
```

### Step 4: Environment Configuration

Create a `.env` file:

```env id="envfile"
OPENAI_API_KEY=sk-your-api-key-here
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/ragdb
```

### Step 5: Database Connection Setup

Create `db.js`:

```js id="dbsetup"
// db.js - PostgreSQL connection setup
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
  }
});

module.exports = pool;
```

### Step 6: Generate Embeddings using OpenAI

Create `embedding.js`:

```js id="embeddings"
// embedding.js - Generate embeddings using OpenAI
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Convert text into a vector embedding
 * Think of this as converting words into GPS coordinates
 * 
 * @param {string} text - The text to convert
 * @returns {number[]} - Array of 1536 numbers representing meaning
 */
async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  return response.data[0].embedding;
}

module.exports = { generateEmbedding };
```

**What's happening here?**
- We send text to OpenAI's embedding model
- It returns an array of 1536 numbers
- These numbers capture the *meaning* of the text

### Step 7: Store Documents with Embeddings

Create `store.js`:

```js id="storeDocuments"
// store.js - Store documents with their embeddings in PostgreSQL
const pool = require("./db");
const { generateEmbedding } = require("./embedding");

/**
 * Store a single document with its embedding
 */
async function storeDocument(title, content, source) {
  // Step 1: Generate embedding for the content
  const embedding = await generateEmbedding(content);

  // Step 2: Convert array to pgvector format: '[0.1, 0.2, ...]'
  const embeddingStr = `[${embedding.join(",")}]`;

  // Step 3: Insert into PostgreSQL
  const query = `
    INSERT INTO documents (title, content, source, embedding)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title
  `;

  const result = await pool.query(query, [title, content, source, embeddingStr]);
  console.log(`✅ Stored: "${result.rows[0].title}" (ID: ${result.rows[0].id})`);
  return result.rows[0];
}

/**
 * Store multiple documents at once
 */
async function storeMultipleDocuments(documents) {
  console.log(`📦 Storing ${documents.length} documents...\n`);

  for (const doc of documents) {
    await storeDocument(doc.title, doc.content, doc.source);
  }

  console.log(`\n✅ All ${documents.length} documents stored successfully!`);
}

module.exports = { storeDocument, storeMultipleDocuments };
```

### Step 8: Seed Sample Data

Create `seed.js`:

```js id="seedData"
// seed.js - Load sample FAQ documents into the database
const { storeMultipleDocuments } = require("./store");
const pool = require("./db");

const faqDocuments = [
  {
    title: "Password Reset",
    content:
      "To reset your password, go to the login page and click 'Forgot Password'. Enter your registered email address. You will receive a password reset link within 5 minutes. Click the link and set a new password. The password must be at least 8 characters with one uppercase letter and one number.",
    source: "help-center/account",
  },
  {
    title: "Refund Policy",
    content:
      "We offer a full refund within 30 days of purchase. To request a refund, go to your Order History, select the order, and click 'Request Refund'. Refunds are processed within 5-7 business days. Digital products are non-refundable once downloaded. Subscription refunds are prorated based on remaining days.",
    source: "help-center/billing",
  },
  {
    title: "Account Deletion",
    content:
      "To delete your account, go to Settings > Privacy > Delete Account. You will need to enter your password for confirmation. Once deleted, all your data will be permanently removed within 30 days. You can download your data before deletion from Settings > Privacy > Download My Data.",
    source: "help-center/account",
  },
  {
    title: "Shipping Information",
    content:
      "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International shipping takes 10-15 business days. Free shipping is available on orders above $50. You can track your order using the tracking number sent to your email after dispatch.",
    source: "help-center/orders",
  },
  {
    title: "Two-Factor Authentication",
    content:
      "To enable two-factor authentication (2FA), go to Settings > Security > Enable 2FA. You can use an authenticator app like Google Authenticator or receive SMS codes. We recommend using an authenticator app for better security. Backup codes are provided during setup — store them safely.",
    source: "help-center/security",
  },
];

async function seed() {
  try {
    // Clear existing data
    await pool.query("DELETE FROM documents");
    console.log("🗑️  Cleared existing documents\n");

    // Store all FAQ documents
    await storeMultipleDocuments(faqDocuments);

    console.log("\n🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    await pool.end();
  }
}

seed();
```

Run it:

```bash id="runseed"
node seed.js
```

Expected output:

```
🗑️  Cleared existing documents

📦 Storing 5 documents...

✅ Stored: "Password Reset" (ID: 1)
✅ Stored: "Refund Policy" (ID: 2)
✅ Stored: "Account Deletion" (ID: 3)
✅ Stored: "Shipping Information" (ID: 4)
✅ Stored: "Two-Factor Authentication" (ID: 5)

✅ All 5 documents stored successfully!

🎉 Seeding complete!
```

### Step 9: Similarity Search (The Magic Part!)

Create `search.js`:

```js id="searchDocs"
// search.js - Find similar documents using vector similarity search
const pool = require("./db");
const { generateEmbedding } = require("./embedding");

/**
 * Search for documents similar to the given query
 * 
 * @param {string} query - User's question
 * @param {number} topK - Number of results to return (default: 3)
 * @returns {Array} - Most similar documents with their similarity scores
 */
async function searchSimilarDocuments(query, topK = 3) {
  // Step 1: Convert the user's query into an embedding
  console.log(`🔍 Searching for: "${query}"\n`);
  const queryEmbedding = await generateEmbedding(query);
  const embeddingStr = `[${queryEmbedding.join(",")}]`;

  // Step 2: Use cosine distance to find similar documents
  // The <=> operator computes cosine distance (lower = more similar)
  const result = await pool.query(
    `
    SELECT 
      id,
      title,
      content,
      source,
      1 - (embedding <=> $1::vector) AS similarity
    FROM documents
    ORDER BY embedding <=> $1::vector
    LIMIT $2
    `,
    [embeddingStr, topK]
  );

  return result.rows;
}

// Run a test search
async function main() {
  try {
    // Test Query 1
    const results1 = await searchSimilarDocuments("I forgot my password, help!");
    console.log("📄 Results:");
    results1.forEach((doc, i) => {
      console.log(`\n  ${i + 1}. ${doc.title} (similarity: ${(doc.similarity * 100).toFixed(1)}%)`);
      console.log(`     Source: ${doc.source}`);
      console.log(`     Content: ${doc.content.substring(0, 100)}...`);
    });

    console.log("\n" + "=".repeat(60) + "\n");

    // Test Query 2
    const results2 = await searchSimilarDocuments("Can I get my money back?");
    console.log("📄 Results:");
    results2.forEach((doc, i) => {
      console.log(`\n  ${i + 1}. ${doc.title} (similarity: ${(doc.similarity * 100).toFixed(1)}%)`);
      console.log(`     Source: ${doc.source}`);
    });
  } catch (error) {
    console.error("❌ Search failed:", error.message);
  } finally {
    await pool.end();
  }
}

main();
```

Run it:

```bash id="runsearch"
node search.js
```

Expected output:

```
🔍 Searching for: "I forgot my password, help!"

📄 Results:

  1. Password Reset (similarity: 91.2%)
     Source: help-center/account
     Content: To reset your password, go to the login page and click 'Forgot Password'. Enter your registered ...

  2. Two-Factor Authentication (similarity: 78.5%)
     Source: help-center/security

  3. Account Deletion (similarity: 72.1%)
     Source: help-center/account
```

**Notice something amazing?** The user said "I forgot my password" — those exact words don't appear in our FAQ document. But embeddings understand the *meaning*, not just the words!

---

## 5. Understanding the SQL: Vector Operations

Let's understand the pgvector operators:

```sql id="sqlvec2"
-- Cosine distance (most common for text similarity)
-- Lower value = more similar
SELECT * FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;

-- L2 (Euclidean) distance
SELECT * FROM documents
ORDER BY embedding <-> '[0.1, 0.2, ...]'::vector
LIMIT 5;

-- Inner product (negative, for max inner product search)
SELECT * FROM documents
ORDER BY embedding <#> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

**Which one to use?**

| Operator | Name | Best For |
|----------|------|----------|
| `<=>` | Cosine distance | Text similarity (normalized) |
| `<->` | L2 distance | When magnitude matters |
| `<#>` | Inner product | Recommendation systems |

> 💡 **For RAG, always use cosine distance (`<=>`)** — it focuses on meaning direction, not vector length.

### Useful SQL Queries for Debugging

```sql id="debugsql"
-- Check how many documents you have
SELECT COUNT(*) FROM documents;

-- Check the vector dimensions
SELECT id, title, vector_dims(embedding) AS dimensions 
FROM documents 
LIMIT 5;

-- Find documents from a specific source
SELECT id, title, source FROM documents
WHERE source LIKE '%account%';

-- Check similarity between two specific documents
SELECT 
  a.title AS doc1,
  b.title AS doc2,
  1 - (a.embedding <=> b.embedding) AS similarity
FROM documents a, documents b
WHERE a.id = 1 AND b.id = 3;
```

---

## 6. JSON Response Preview

While we'll fully implement JSON responses tomorrow, here's a preview of what our search function will eventually return:

```json id="airesponse1"
{
  "query": "I forgot my password",
  "results": [
    {
      "id": 1,
      "title": "Password Reset",
      "content": "To reset your password, go to the login page...",
      "source": "help-center/account",
      "similarity": 0.912
    },
    {
      "id": 5,
      "title": "Two-Factor Authentication",
      "content": "To enable two-factor authentication...",
      "source": "help-center/security",
      "similarity": 0.785
    }
  ],
  "metadata": {
    "total_documents_searched": 5,
    "results_returned": 2,
    "similarity_threshold": 0.7,
    "search_time_ms": 45
  }
}
```

---

## 7. 🧪 Practice Tasks

### Task 1: Add More Documents
Add 5 more FAQ documents to `seed.js` about topics like:
- Login issues
- Subscription plans
- Contact support
- App installation
- Payment methods

Re-run `seed.js` and test search with related queries.

### Task 2: Similarity Threshold
Modify `search.js` to only return documents with similarity > 0.75 (75%). Hint: Add a `WHERE` clause to your SQL query.

```sql
WHERE 1 - (embedding <=> $1::vector) > 0.75
```

### Task 3: Search with Category Filter
Modify the search function to accept an optional `source` filter. For example, search only within "help-center/account" documents.

### Task 4: Embedding Explorer
Write a small script that:
1. Takes two sentences as input
2. Generates embeddings for both
3. Calculates their cosine similarity
4. Prints whether they are related or not

```js id="task4hint"
// Hint: Cosine similarity formula
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

### Task 5: Batch Embedding Performance
Modify the `storeDocument` function to batch multiple texts in a single OpenAI API call instead of one at a time. The OpenAI embedding API supports arrays of strings as input.

---

## 8. ⚠️ Common Mistakes

### Mistake 1: Wrong Vector Dimensions
```
❌ ERROR: expected 1536 dimensions, not 768
```
**Why:** You used a different embedding model. `text-embedding-ada-002` outputs 1536 dimensions. If you use `text-embedding-3-small`, it outputs 1536 by default but can be customized. Always match your `VECTOR(n)` column size with your model's output dimensions.

### Mistake 2: Not Normalizing Text Before Embedding
```js
// ❌ Bad - inconsistent text
await generateEmbedding("  HOW DO I RESET MY PASSWORD???  ");

// ✅ Good - clean, normalized text  
const cleanText = text.trim().toLowerCase().replace(/\s+/g, " ");
await generateEmbedding(cleanText);
```

### Mistake 3: Forgetting the pgvector Extension
```sql
-- ❌ This will fail if extension is not enabled
CREATE TABLE documents (embedding VECTOR(1536));

-- ✅ Always enable extension first
CREATE EXTENSION IF NOT EXISTS vector;
```

### Mistake 4: No Index on Vector Column
Without an index, similarity search scans ALL rows (slow on large datasets):
```sql
-- ✅ Add an IVFFlat index for faster search
CREATE INDEX ON documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Rule of thumb:** `lists` should be roughly `sqrt(total_rows)`. For 10,000 documents, use `lists = 100`.

### Mistake 5: Storing Empty or Null Embeddings
Always validate before inserting:
```js
const embedding = await generateEmbedding(content);
if (!embedding || embedding.length !== 1536) {
  throw new Error("Invalid embedding generated");
}
```

---

## 9. 🔁 Recap

Let's review what we learned today:

| Concept | What You Learned |
|---------|-----------------|
| **RAG** | Retrieve → Augment → Generate. Find relevant docs first, then ask AI. |
| **Embeddings** | Text converted to numbers (vectors) that capture meaning |
| **pgvector** | PostgreSQL extension that stores and searches vectors |
| **Similarity Search** | Finding documents with similar meaning using cosine distance |
| **OpenAI Embeddings API** | Converts any text to a 1536-dimension vector |
| **Cosine Distance (`<=>`)** | Measures how similar two vectors are |

### Files we created today:

```
rag-pgvector-app/
├── .env                 # API keys and database URL
├── db.js                # PostgreSQL connection
├── embedding.js         # OpenAI embedding generation
├── store.js             # Store documents with embeddings
├── seed.js              # Load sample data
└── search.js            # Similarity search
```

### Key Takeaway:

> RAG is like giving an AI a **relevant cheat sheet** before asking it a question, instead of hoping it remembers everything from training.

---

### 🔮 Tomorrow's Preview (Day 2):

- Build the complete RAG pipeline
- Connect retrieval → prompt → LLM
- Return structured JSON responses
- Build a working FAQ chatbot!

**Homework:** Make sure your PostgreSQL + pgvector setup is working and `seed.js` runs successfully. Tomorrow we build on top of this!

---

*Happy coding! See you tomorrow! 🚀*
