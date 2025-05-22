import hashlib
import uuid
from bson import ObjectId
import datetime

def md5_hash(password: str) -> str:
    return hashlib.md5(password.encode()).hexdigest()

def generate_session_key() -> str:
    raw_session = str(uuid.uuid4())
    session_key = hashlib.md5(raw_session.encode()).hexdigest()
    
    return session_key

def clean_bson(doc):
    if isinstance(doc, list):
        return [clean_bson(d) for d in doc]
    elif isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if isinstance(v, ObjectId):
                new_doc[k] = str(v)
            elif isinstance(v, datetime.datetime):
                new_doc[k] = v.isoformat()
            elif isinstance(v, dict) or isinstance(v, list):
                new_doc[k] = clean_bson(v)
            else:
                new_doc[k] = v
        return new_doc
    else:
        return doc