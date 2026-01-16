# Render Deployment Guide - Environment Variables Setup

This guide will help you configure the required environment variables for your backend API on Render.

## Prerequisites

- You have already deployed your backend to Render (currently at `https://physical-ai-humanoid-robotics-book-rd2d.onrender.com`)
- You have your API keys available (from your local `.env` file)

## Required Environment Variables

Your backend needs these 3 environment variables to function:

| Variable Name | Description | Get Value From |
|---------------|-------------|----------------|
| `COHERE_API_KEY` | API key for Cohere LLM service | Your `.env` file (line 3) |
| `QDRANT_URL` | URL for Qdrant vector database | Your `.env` file (line 4) |
| `QDRANT_API_KEY` | API key for Qdrant database | Your `.env` file (line 5) |

> [!NOTE]
> The `GEMINI_API_KEY` in your `.env` file is **not** currently used by the deployed backend code. Only add it if you plan to use Gemini in the future.

## Step-by-Step Setup

### 1. Log into Render Dashboard

1. Go to [https://dashboard.render.com/](https://dashboard.render.com/)
2. Sign in with your account
3. You should see your service: `physical-ai-humanoid-robotics-book-rd2d`

### 2. Navigate to Environment Settings

1. Click on your backend service name
2. In the left sidebar, click **"Environment"**
3. You'll see a section called "Environment Variables"

### 3. Add Environment Variables

For each of the 3 required variables:

1. Click **"Add Environment Variable"**
2. Enter the **Key** (e.g., `COHERE_API_KEY`)
3. Enter the **Value** (copy from your local `.env` file)
4. Click **"Save Changes"** or move to the next variable

**Example:**
```
Key: COHERE_API_KEY
Value: jme2PFlPqBNaBq7sxXX9Q6ubM2mjsdcoWwJ9EvUw
```

> [!WARNING]
> **Important:** Keep your API keys secure! Never share them publicly or commit them to Git.

### 4. Trigger Redeploy

After adding all environment variables:

1. Render should automatically trigger a redeploy
2. If not, click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait 5-10 minutes for the deployment to complete
4. Check the **Logs** tab to ensure no errors during startup

### 5. Verify Deployment

Once deployment is complete, test your backend:

**Health Check:**
```bash
curl https://physical-ai-humanoid-robotics-book-rd2d.onrender.com/health
```

**Expected Response:**
```json
{"status":"ok","service":"RAG Chatbot API"}
```

**Test Query:**
```bash
curl -X POST https://physical-ai-humanoid-robotics-book-rd2d.onrender.com/ask \
  -H "Content-Type: application/json" \
  -d '{"query":"What is physical AI?","top_k":5}'
```

**Expected Response:**
```json
{
  "answer": "Physical AI refers to...",
  "sources": [...]
}
```

## Troubleshooting

### My backend is crashing on startup

**Check the Logs:**
1. Go to your service dashboard
2. Click **"Logs"** tab
3. Look for error messages like:
   - `ValueError: COHERE_API_KEY environment variable is required`
   - `ValueError: QDRANT_URL environment variable is required`

**Solution:** Ensure all 3 environment variables are added correctly

### I see "404 page not found" in the logs

This means the backend is trying to connect to an external service that doesn't exist or the API endpoint is incorrect.

**Solution:** Double-check your `QDRANT_URL` value - it should be the full URL with `https://` and the port number (`:6333`)

### Chatbot still shows "Failed to fetch" error

1. Verify backend is running: visit `/health` endpoint
2. Check browser console for exact error message
3. Ensure frontend is pointing to correct backend URL in [chatbotConfig.js](file:///e:/GIAIC/Quarter%204/Hackathon/hackathon/website/src/config/chatbotConfig.js#L37)

## Next Steps

After successfully configuring environment variables:

1. Test the chatbot on your deployed site
2. If issues persist, check the troubleshooting section above
3. Monitor Render logs for any runtime errors

## Security Best Practices

- ✅ **Never commit** `.env` files to Git
- ✅ **Never hardcode** API keys in source code
- ✅ **Use environment variables** for all sensitive configuration
- ✅ **Rotate API keys** periodically
- ✅ **Limit API key permissions** to only what's needed

---

**Need help?** After following these steps, let me know if you encounter any issues!
