import base64
import logging
from datetime import date
from enum import Enum

from fastapi import APIRouter, Header, HTTPException, Depends, Query
from fastapi.responses import JSONResponse
from typing import Optional

from router.dashboard_rules_router import router as dashboard_router

from core import variables
from service.router.get_current_user import get_current_user

from models.userLogin import UserLogin, UserSession, UserId
from controller.dashboard import LoginProcess
from controller.dashboard import VerifySession
from controller.dashboard import LogoutProcess
from controller.dashboard.GetEvents import GetEvents
from controller.dashboard.GetQueues import GetQueues
from controller.dashboard.masterdata.GetMasterData import GetMasterData 

router = APIRouter(prefix="/dashboard")

@router.get("/masterdata")
def dashboard_get_masterdata(include: Optional[str] = Query(None)):    
    response = GetMasterData().get_master_data(include)
    return JSONResponse(
        status_code=200,
        content=response.get("body_response", {})
    )

@router.post("/auth/login")
def dashboard_login(user: UserLogin):
    process = LoginProcess.LoginProcess()
    response = process.login_process(user)

    return JSONResponse(
        status_code=response.get("http_code", 200),
        content=response.get("body_response", {})
    )

@router.post("/auth/verify_session")
def dashboard_verify_session(user: UserSession):
    process = VerifySession.VerifySession()
    response = process.verify_session_process(user)

    return JSONResponse(
        status_code=response.get("http_code", 200),
        content=response.get("body_response", {})
    )

@router.post("/auth/logout")
def dashboard_logout(user: UserId):
    process = LogoutProcess.LogoutProcess()
    response = process.logout_process(user)

    return JSONResponse(
        status_code=response.get("http_code", 200),
        content=response.get("body_response", {})
    )

EventTypeEnum = Enum(
    "EventTypeEnum",
    {v: v for v in variables.EVENT_TYPES + ("all",)},
    type=str,
)
@router.get("/events")
def dashboard_get_events(
    username=Depends(get_current_user),
    page: int = Query(1, ge=1),
    start_date: str = Query(date.today().isoformat()),
    end_date: str = Query(date.today().isoformat()),
    event_type: EventTypeEnum = Query(EventTypeEnum.all),
    query: str = Query("")
):
    response = GetEvents().get_events(
        page = page,
        start_date = start_date,
        end_date = end_date,
        event_type = event_type,
        query = query
    )    
    return JSONResponse(
        status_code=200,
        content=response.get("body_response", {})
    )

@router.get("/queues")
def dashboard_get_queues(
    username=Depends(get_current_user),
    page: int = Query(1, ge=1)):
    response = GetQueues().get_queues(
        page = page
    )
    return JSONResponse(
        status_code=200,
        content=response.get("body_response", {})
    )

router.include_router(dashboard_router)