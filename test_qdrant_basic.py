"""Test basic Qdrant connection"""
from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

print(f"Testing Qdrant connection...")
print(f"URL: {QDRANT_URL}\n")

try:
    # Connect without checking compatibility
    qdrant = QdrantClient(
        url=QDRANT_URL, 
        api_key=QDRANT_API_KEY,
        timeout=30
    )
    
    # Try to list all collections
    print("Attempting to list collections...")
    collections = qdrant.get_collections()
    
    print(f"✓ SUCCESS! Connection working!")
    print(f"Found {len(collections.collections)} collections:")
    for col in collections.collections:
        print(f"  - {col.name}")
    
    if len(collections.collections) == 0:
        print("\n⚠ No collections exist yet - we need to create one")
        
except Exception as e:
    print(f"✗ ERROR: {type(e).__name__}")
    print(f"Message: {str(e)}")
    
    if "404" in str(e):
        print("\n⚠ This means the Qdrant instance URL is wrong or the instance was deleted")
        print("Solutions:")
        print("1. Create a new Qdrant Cloud cluster at https://cloud.qdrant.io/")
        print("2. Update the QDRANT_URL and QDRANT_API_KEY in .env file")
    elif "401" in str(e) or "403" in str(e):
        print("\n⚠ Authentication failed - check your QDRANT_API_KEY")
    elif "timeout" in str(e).lower():
        print("\n⚠ Connection timeout - check your internet connection")
