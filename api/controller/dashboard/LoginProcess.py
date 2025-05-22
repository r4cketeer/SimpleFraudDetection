from models.userLogin import UserLogin
from service.user import lib_user

class LoginProcess:
    def __init__(self):
        self.user_service = lib_user.lib_user()

    def login_process(self, user: UserLogin) -> dict:
        user_dict = user.dict()

        user = self.user_service.get_user_by_username_and_password(
            username = user_dict.get("username"),
            password = user_dict.get("password")
        )
        if user:            
            session_key = self.user_service.save_session(
                user_pkey = user.get("_id")
            )
            
            return {
                "http_code": 200,
                "body_response": {
                    "session": session_key,
                    "user_id": str(user.get("_id", ""))
                }
            }
        
        return {
            "http_code": 422,
            "body_response": {
                "error": "Invalid user or password"
            }
        }