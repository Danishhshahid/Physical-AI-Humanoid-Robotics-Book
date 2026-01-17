import os
from qdrant_client import QdrantClient
from dotenv import load_dotenv

load_dotenv()
# Try without port
url = "https://17b20767-4f6f-4658-9281-bb8da2c51092.us-east4-0.gcp.cloud.qdrant.io"
api_key = os.getenv("QDRANT_API_KEY")

print(f"Testing Qdrant at: {url}")
try:
    client = QdrantClient(url=url, api_key=api_key)
    collections = client.get_collections()
    print("Successfully connected to Qdrant!")
    print("Collections:", collections)
except Exception as e:
    print(f"Error connecting to Qdrant: {e}")
