import os
import cohere
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("COHERE_API_KEY")

print(f"Testing Cohere...")
try:
    co = cohere.Client(api_key)
    response = co.chat(
        message="Hello",
        model="command-r-plus"
    )
    print("Successfully connected to Cohere!")
    print("Response:", response.text)
except Exception as e:
    print(f"Error connecting to Cohere: {e}")
