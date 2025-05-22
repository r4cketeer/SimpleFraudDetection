import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Get URI & DB name from .env
mongo_uri = os.getenv("MONGO_URI")
mongo_db_name = os.getenv("MONGO_DB_NAME")

# Create client and db reference
client = MongoClient(mongo_uri)
DB = client[mongo_db_name]