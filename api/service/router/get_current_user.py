import base64
import logging

from fastapi import APIRouter, Header, HTTPException, Depends, Query
from fastapi.responses import JSONResponse
from typing import Optional

from service.user import lib_user

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Basic "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.split(" ")[1]
    username = validate_token(token)
    if not username:
        raise HTTPException(
            status_code=401, 
            detail="Invalid or expired token"
        )

    return True

def validate_token(token: str) -> Optional[str]:
    try:
        lib_user_process = lib_user.lib_user()

        decoded_token = base64.b64decode(token).decode('utf-8')
        userId, session_key = decoded_token.split(":")

        username = lib_user_process.get_user_by_session_and_userid(
            userId = userId, 
            session = session_key
        )
        if username:
            return username
        
    except Exception as e:
        logging.error(e)
        pass

    return None