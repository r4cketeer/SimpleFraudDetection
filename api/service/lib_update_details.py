import os
import json
from dateutil import parser
from jsonschema import validate, ValidationError

from service.event import lib_event
import core.config

class lib_update_details:
    
    def load_schema(self):
        base_dir = core.config.BASE_DIR
        schema_path = os.path.join(base_dir, "../schemas", "update_detail.json")

        with open(schema_path, "r") as file:
            schema = json.load(file)
            return schema            
        
    def update_details(self, event: dict):
        schema = self.load_schema()

        try:
            validate(instance = event, 
                schema = schema)
            
        except ValidationError as e:
            return {
                "http_code": 400,
                "body_response": f"Validation error: {e.message}"
            }
        
        event["eventTime"] = parser.isoparse(event["eventTime"]) 

        lib_event_proc = lib_event.lib_event()
        lib_event_proc.insert_queue(event)

        return {
            "http_code": 204,
            "body_response": ""
        }