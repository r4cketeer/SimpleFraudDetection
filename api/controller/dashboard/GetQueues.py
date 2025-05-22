from service.event.lib_event import lib_event
from core.helpers import clean_bson

class GetQueues:
    def __init__(self):
        self.event_service = lib_event()

    def get_queues(self, page) -> dict:
        queues = self.event_service.get_queues(
            page = page
        )
        cleaned_queues = clean_bson(queues)
                    
        return {
            "http_code": 200,
            "body_response": {
                "events": cleaned_queues
            }
        }
        
        