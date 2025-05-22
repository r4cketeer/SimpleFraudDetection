import logging
import datetime
from bson import ObjectId

from core.db import DB
from core.helpers import md5_hash, generate_session_key

class lib_user:
    def get_user_by_username_and_password(self, username: str, password: str):
        if not username or not password:
            return False
        
        try:
            md5_password = md5_hash(password)
            user_record = DB.users.find_one({
                "username": username, 
                "password": md5_password, 
                "active": True
            })
            if user_record:
                return user_record
            
            else:
                logging.info(f"User {username} not found or inactive.")
        
        except Exception as e:
            logging.error(f"Error fetching user {username}: {str(e)}")
            return False
        
        return False
    
    def get_user_by_session_and_userid(self, userId: str, session: str):
        try:      
            pipeline = [
                {
                    "$match": {
                        "user_pkey": ObjectId(userId),
                        "session_key": session
                    }
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "user_pkey",
                        "foreignField": "_id",
                        "as": "user_info"
                    }
                },
                {
                    "$unwind": "$user_info"
                },
                {
                    "$match": {
                        "user_info.active": True
                    }
                },
                {
                    "$limit": 1 
                }
            ]      
            user_record = list(DB.sessions.aggregate(pipeline))
            if user_record:
                logined_user = user_record[0].get("user_info", {})                
                return logined_user.get("username")
        
        except Exception as e:
            logging.error(f"Error get session: {str(e)}")            
        
        return False

    def save_session(self, user_pkey: str):
        try:
            active_session = DB.sessions.find_one({
                "user_pkey": ObjectId(user_pkey)
            })
            if active_session:
                return active_session.get("session_key", "")
            
            session_key = generate_session_key()
        
            DB.sessions.insert_one({
                "user_pkey": user_pkey,
                "timestamp": datetime.datetime.now(),
                "session_key": session_key
            })
            return session_key
        
        except Exception as e:
            logging.error(f"Error save session: {str(e)}")
            return False
    
    def destroy_session_by_userid(self, user_id: str):
        if user_id:
            try:
                DB.sessions.delete_many({
                    "user_pkey": ObjectId(user_id)
                })

            except Exception as e:
                logging.error(f"Error delete session: {str(e)}")
                return False

        return True