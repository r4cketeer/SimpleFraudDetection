from models.userLogin import UserSession
from service.user import lib_user

class VerifySession:
    def __init__(self):
        self.user_service = lib_user.lib_user()

    def verify_session_process(self, user: UserSession) -> dict:
        user_dict = user.dict()
        logined_username = self.user_service.get_user_by_session_and_userid(
            userId = user_dict.get("userId"),
            session = user_dict.get("session")
        )        
        if logined_username:
            return {
                "http_code": 200,
                "body_response": {
                    "username": logined_username
                }
            }
        
        return {
            "http_code": 422,
            "body_response": {
                "error": "Bad parameters"
            }
        }