# 🔧 CHATBOT ERROR FIX

## Problem
When you try to use the chatbot, you get a **500 Internal Server Error**.

The error in the backend terminal shows:
```
INFO: 127.0.0.1:xxxxx - "POST /ask HTTP/1.1" 500 Internal Server Error
```

## Root Cause
The Qdrant vector database collection `humanoid_ai_book` **doesn't exist yet**. 
The chatbot needs this collection to retrieve relevant information from your book.

## Solution

### Step 1: Run the Ingestion Script

In a **NEW terminal** (Terminal 3), run:

```bash
cd "E:\GIAIC\Quarter 4\Hackathon\hackathon\website"
.venv\Scripts\activate
python main.py
```

This script will:
- ✓ Create the Qdrant collection
- ✓ Download your website sitemap
- ✓ Extract text from all pages
- ✓ Generate embeddings using Cohere
- ✓ Upload everything to Qdrant

**⏱ This will take 5-15 minutes** depending on how many pages you have.

### Step 2: Wait for Completion

You'll see progress like:
```
Downloading sitemap...
Found 50 URLs

Processing pages:  20%|████      | 10/50 [01:30<06:00,  9.00s/it]

Embedding 150 chunks in batches of 96...
  Uploaded batch 1/2
  Uploaded batch 2/2

SUCCESS! 150 chunks stored in Qdrant collection 'humanoid_ai_book'
Qdrant now has 150 points.
```

### Step 3: Test the Chatbot

After the script completes:
1. Keep Terminal 1 (backend) and Terminal 2 (frontend) running
2. Go to your browser at `http://localhost:3000`
3. Click the purple chatbot button
4. Ask a question like "What is ROS2?"
5. You should now get a proper answer! ✅

## Quick Commands Summary

### Terminal 1 - Backend (Keep Running)
```bash
cd "E:\GIAIC\Quarter 4\Hackathon\hackathon\website"
.venv\Scripts\activate
python -m uvicorn api_server:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Frontend (Keep Running)
```bash
cd "E:\GIAIC\Quarter 4\Hackathon\hackathon\website"
npm start
```

### Terminal 3 - ONE-TIME Setup (Run Once)
```bash
cd "E:\GIAIC\Quarter 4\Hackathon\hackathon\website"
.venv\Scripts\activate
python main.py
```

## Verification

To verify the collection exists:
```bash
python test_qdrant.py
```

Expected output:
```
✓ Connection successful!
✓ Collection 'humanoid_ai_book' exists!
  Points count: 150
```

## Notes

- You only need to run `main.py` **once** (or when you update book content)
- The backend and frontend need to run **every time** you want to use the app
- After ingestion is complete, you can close Terminal 3
