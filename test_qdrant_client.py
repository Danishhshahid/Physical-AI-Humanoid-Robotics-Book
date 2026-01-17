from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv

load_dotenv()

host = "17b20767-4f6f-4658-9281-bb8da2c51092.us-east4-0.gcp.cloud.qdrant.io"
api_key = os.getenv("QDRANT_API_KEY")

print(f"Testing QdrantClient with host={host}, port=6333, https=True")
try:
    client = QdrantClient(host=host, port=6333, https=True, api_key=api_key)
    print(f"  Connection successful! Collections: {client.get_collections()}")
except Exception as e:
    print(f"  Port 6333 failed: {e}")

print(f"\nTesting QdrantClient with host={host}, port=443, https=True")
try:
    client = QdrantClient(host=host, port=443, https=True, api_key=api_key)
    print(f"  Connection successful! Collections: {client.get_collections()}")
except Exception as e:
    print(f"  Port 443 failed: {e}")

print(f"\nTesting QdrantClient with url=https://{host}")
try:
    client = QdrantClient(url=f"https://{host}", api_key=api_key)
    print(f"  Connection successful! Collections: {client.get_collections()}")
except Exception as e:
    print(f"  URL https failed: {e}")
