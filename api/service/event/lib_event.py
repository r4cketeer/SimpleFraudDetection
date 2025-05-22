import logging
from datetime import date, datetime, time

from core.db import DB

class lib_event:
    def check_duplicated_eventId(self, eventId: str):
        return (
            DB.events.count_documents({"eventId": eventId}, limit=1) > 0
            or DB.queues.count_documents({"eventId": eventId}, limit=1) > 0
        )
    
    def insert_queue(self, event: dict):
        try:
            DB.queues.insert_one(event)
        
        except Exception as e:
            return {"error": str(e)}

    def get_events(
            self, 
            start_date, 
            end_date, 
            page:int = 1, 
            limit:int = 25, 
            event_type:str = "all",
            search_query:str = ""):
        events = []
        skip = (page - 1) * limit

        start_date = datetime.strptime(start_date, "%Y-%m-%d").date() if start_date else date.today()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date() if end_date else date.today()

        start_date = datetime.combine(start_date, time.min)
        end_date = datetime.combine(end_date, time.max)

        query = {
            "eventTime": {
                "$gte": start_date,
                "$lte": end_date
            }
        }
        
        if event_type != "all":
            query["eventType"] = event_type
        
        if search_query:
            query["eventId"] = {"$regex": search_query, "$options": "i"}

        try:
            events = list(DB.events
                .find(query)
                .sort([("eventTime", 1)])
                .skip(skip)
                .limit(limit))
        
        except Exception as e:
            logging.error (f"Failed to get events. {e}")
        
        return events

    def get_queues(
        self, 
        page:int = 1, 
        limit:int = 25
    ):
        queues = []
        skip = (page - 1) * limit

        try:
            queues = list(DB.queues
                .find()
                .sort([("timestamp", 1)])
                .skip(skip)
                .limit(limit))
        
        except Exception as e:
            logging.error (f"Failed to get queues. {e}")
        
        return queues
