from pydantic import BaseModel, validator, Extra
import datetime

from core.variables import EVENT_TYPES
from service.event import lib_event

EVENT_TIME_FORMAT = "%Y-%m-%dT%H:%M:%S%z"

class Event(BaseModel):
    eventId: str
    eventTime: str
    eventType: str

    class Config:
        extra = Extra.allow

    @validator("eventTime")
    def validate_event_time(cls, v):
        try:
            datetime.datetime.strptime(v, EVENT_TIME_FORMAT)
        except ValueError:
            raise ValueError(f"Invalid datetime format. Expected format is {EVENT_TIME_FORMAT}")
        return v

    @validator("eventType")
    def validate_event_type(cls, v):
        if v not in EVENT_TYPES:
            raise ValueError(f"Invalid eventType")
        return v

    @validator("eventId")
    def validate_event_id(cls, v):
        lib_event_proc = lib_event.lib_event()
        if lib_event_proc.check_duplicated_eventId(v):
            raise ValueError(f"eventId duplicated")
        return v
