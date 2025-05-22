from pydantic import BaseModel, Field, validator
from typing import Optional

from core.variables import RULE_TYPES

class Rules(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    condition_type: str
    field: str
    blacklist: Optional[list[str]] = []
    priority: int
    active: int
    description: Optional[str] = None

    @validator("condition_type")
    def validate_event_type(cls, v):
        if v not in RULE_TYPES:
            raise ValueError(f"Invalid condition_type")
        return v
