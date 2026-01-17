"""Test Qdrant connection with more detailed error handling"""
from qdrant_client import QdrantClient
from qdrant_client.http import models
import os
from dotenv import load_dotenv

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "humanoid_ai_book"

print(f"Connecting to Qdrant at: {QDRANT_URL}")
print(f"API Key: {QDRANT_API_KEY[:20]}...\n")

try:
    # Try with check_compatibility=False to avoid the warning
    qdrant = QdrantClient(
        url=QDRANT_URL, 
        api_key=QDRANT_API_KEY,
        timeout=10
    )
    
    print("Testing basic connection...")
    # Try a simple health check
    try:
        collections = qdrant.get_collections()
        print(f"✓ Connection successful!")
        print(f"Available collections: {[c.name for c in collections.collections]}\n")
        
        # Check if our collection exists
        collection_names = [c.name for c in collections.collections]
        if COLLECTION_NAME in collection_names:
            print(f"✓ Collection '{COLLECTION_NAME}' exists!")
            collection_info = qdrant.get_collection(COLLECTION_NAME)
            print(f"  Points count: {collection_info.points_count}")
        else:
            print(f"✗ Collection '{COLLECTION_NAME}' NOT FOUND!")
            print(f"\nNeed to create the collection? (Y/n)")
            
    except Exception as e:
        print(f"✗ Failed to get collections: {type(e).__name__}")
        print(f"  Error: {str(e)}")
        
        # Check if it's an auth issue
        if "401" in str(e) or "Unauthorized" in str(e):
            print("\n⚠ This looks like an authentication error!")
            print("  Check your QDRANT_API_KEY")
        elif "404" in str(e):
            print("\n⚠ This looks like the collection doesn't exist!")
            print("  You may need to create it first")
        
except Exception as e:
    print(f"✗ Connection failed: {type(e).__name__}")
    print(f"  Message: {str(e)}")
    
    if "timeout" in str(e).lower():
        print("\n⚠ This looks like a timeout - check your network or URL")
    elif "connection" in str(e).lower():
        print("\n⚠ Can't connect to the server - check the QDRANT_URL")
