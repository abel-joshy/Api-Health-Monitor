from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["api_health"]

services_collection = db["services"]

print("✅ MongoDB Connected Successfully")