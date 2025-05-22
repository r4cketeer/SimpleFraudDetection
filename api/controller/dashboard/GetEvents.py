from service.event.lib_event import lib_event
from core.helpers import clean_bson

class GetEvents:
    def __init__(self):
        self.event_service = lib_event()

    def get_events(self, page, start_date, end_date, event_type, query) -> dict:
        events = self.event_service.get_events(
            page = page,
            start_date = start_date,
            end_date = end_date,
            event_type = event_type,
            search_query = query
        )
        cleaned_events = clean_bson(events)
                    
        return {
            "http_code": 200,
            "body_response": {
                "events": cleaned_events
            }
        }
        
        