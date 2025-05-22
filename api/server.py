import logging
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from core import setup
from core.logging import setup_logging
from router.event_router import event_router
from router.dashboard_router import router as dashboard_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_logging()

logging.info ("Setting up application...")
setup_process = setup.setup()
setup_process.init_setup()

# Exception handler RequestValidationError (422)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):    
    if request.url.path == "/event/":
        error_message = ""
        missing_fields = []
        invalid_fields = []
        
        for error in exc.errors():
            if error["type"] == "json_invalid":
                error_message = "Invalid JSON request"

            elif error['type'] == 'missing':
                missing_fields.append(error['loc'][-1])
            
            else:
                invalid_fields.append(f"{error['loc'][-1]} - {error['msg']}")

        if missing_fields:
            error_message = f"Required fields are missing: {missing_fields}"
        
        elif invalid_fields:
            error_message = f"Invalid type fields: {invalid_fields}"

        return JSONResponse(
            status_code=422,
            content={
                "error": error_message
            }
        )
    
    else:
        return JSONResponse(
            status_code=422,
            content={
                "error": "Bad parameters"
            }
        )

app.include_router(event_router)
app.include_router(dashboard_router)