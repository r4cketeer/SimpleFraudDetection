from models.userLogin import UserId
from service.user import lib_user

class LogoutProcess:
    def __init__(self):
        self.user_service = lib_user.lib_user()

    def logout_process(self, user: UserId) -> dict:
        user_dict = user.dict()

        success = self.user_service.destroy_session_by_userid(
            user_id = user_dict.get("userId")
        )
        
        if success:                    
            return {
                "http_code": 200,
                "body_response": {
                    "success": 1
                }
            }
        
        return {
            "http_code": 422,
            "body_response": {
                "error": "Failed to logout"
            }
        }
        
