import datetime
from core.db import DB

class lib_queue:
    def get_queue(self):
        queues = DB.queues.find().sort({"timestamp":1}).limit(100)
        return list(queues)
    
    def move_to_event(self, queue, is_block: bool):
        try:
            event = queue
            event["evaluate_timestamp"] = datetime.datetime.now()

            if is_block:
                event["action"] = {
                    "block": is_block
                }

            DB.events.insert_one(event)
            DB.queues.delete_one({
                "_id": queue.get("_id")
            })
        
        except Exception as e:
            return {"error": str(e)}
        