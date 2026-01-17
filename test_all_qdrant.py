import requests
from qdrant_client import QdrantClient
import os
from dotenv import load_dotenv

load_dotenv()

host = "17b20767-4f6f-4658-9281-bb8da2c51092.us-east4-0.gcp.cloud.qdrant.io"
api_key = os.getenv("QDRANT_API_KEY")

tests = [
    f"https://{host}:6333/collections",
    f"https://{host}/collections",
    f"http://{host}:6333/collections",
    f"http://{host}/collections",
]

for url in tests:
    print(f"Testing URL: {url}")
    try:
        r = requests.get(url, headers={"api-key": api_key}, timeout=5)
        print(f"  Status: {r.status_code}")
        print(f"  Text: {r.text[:50]}...")
    except Exception as e:
        print(f"  Error: {e}")
    print("-" * 20)

print("\nTesting with QdrantClient...")
client_tests = [
    {"url": f"https://{host}:6333"},
    {"url": f"https://{host}"},
    {"host": host, "port": 6333, "https": True},
    {"host": host, "https": True},
]

for kwargs in client_tests:
    print(f"Testing QdrantClient with: {kwargs}")
    try:
        client = QdrantClient(**kwargs, api_key=api_key)
        cols = client.get_collections()
        print(f"  SUCCESS! Found {len(cols.collections)} collections")
    except Exception as e:
        print(f"  Failure: {e}")
    print("-" * 20)
