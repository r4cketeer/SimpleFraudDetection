from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse, Response

from models.rules import Rules
from service.router.get_current_user import get_current_user

from controller.dashboard.get_rules import GetRules
from controller.dashboard.save_rule_process import SaveRuleProcess

router = APIRouter(prefix="/rules")

@router.get("/")
def dashboard_get_rules(
    username=Depends(get_current_user),
    page: int = Query(1, ge=1)):
    response = GetRules().get_rules(page=page)
    return JSONResponse(
        status_code=200,
        content=response.get("body_response", {})
    )

@router.post("/save")
def dashboard_save_rules(
    rule: Rules,
    username=Depends(get_current_user)):
    response = SaveRuleProcess().save_rule(rule)
    http_status_code = response.get("http_code", 200)

    if http_status_code == 204:
        return Response(status_code=204) 
    
    return JSONResponse(
        status_code=response.get("http_code", 200),
        content={
            "error": response.get("body_response", "")
        }
    )

@router.get("/detail")
def dashboard_get_rules(
    username=Depends(get_current_user),
    id: str = Query(...)):
    response = GetRules().get_rules(page=1, id=id)
    return JSONResponse(
        status_code=200,
        content=response.get("body_response", {})
    )