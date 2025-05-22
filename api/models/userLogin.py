from pydantic import BaseModel

class UserLogin(BaseModel):
    username: str
    password: str

class UserSession(BaseModel):
    userId: str
    session: str

class UserId(BaseModel):
    userId: str