from fastapi import APIRouter
from fastapi.responses import JSONResponse, Response

from models.event import Event
from controller import new_event_process

event_router = APIRouter(prefix="/event")

@event_router.post("/")
def create_event(event: Event):
    try:
        response = new_event_process.new_event_process(event)
        http_status_code = response.get("http_code", 200)

        if http_status_code == 204:
            return Response(status_code=204) 
        
        return JSONResponse(
            status_code=response.get("http_code", 200),
            content={
                "error": response.get("body_response", "")
            }
        )
    
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "error": e
            }
        )