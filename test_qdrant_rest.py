import requests
import os
from dotenv import load_dotenv

load_dotenv()

host = "17b20767-4f6f-4658-9281-bb8da2c51092.us-east4-0.gcp.cloud.qdrant.io"
api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.semax-0E_qLmg2bJpvmggx21gxOaveIFGvB38dpEU60"

# Qdrant Cloud typically listens on port 6333 for REST and 6334 for gRPC.
# However, sometimes it is served behind a proxy on 443.

endpoints = [
    f"https://{host}/v1/collections",
    f"https://{host}:6333/v1/collections",
]

for url in endpoints:
    print(f"Testing URL: {url}")
    try:
        headers = {"api-key": api_key}
        r = requests.get(url, headers=headers, timeout=10)
        print(f"  Status: {r.status_code}")
        print(f"  Headers: {r.headers}")
        print(f"  Text: {r.text[:200]}")
    except Exception as e:
        print(f"  Error: {e}")
    print("-" * 30)
