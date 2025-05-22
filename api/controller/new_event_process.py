import datetime
from pydantic import BaseModel

from service import lib_update_details

def new_event_process(event: BaseModel) -> dict:
    response = {}

    event_dict = event.dict()
    event_dict["timestamp"] = datetime.datetime.now()

    if event.eventType == "updateDetails":
        update_detail_proc = lib_update_details.lib_update_details()
        response = update_detail_proc.update_details(event_dict)
        
    return response