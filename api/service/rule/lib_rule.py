import logging
from bson import ObjectId

from core.db import DB

class LibRule:
    def get_rules(
            self,
            page:int=1, 
            limit:int=25,
            id=None):
        
        rules = []
        query = {}
        
        try:
            if id:
                query["_id"] = ObjectId(id)  
                page = 1
                limit = 1
                skip = 0

            else:
                skip = (page - 1) * limit

            rules = list(DB.rules
                .find(query)
                .sort([("eventTime", 1)])
                .skip(skip)
                .limit(limit))
        
        except Exception as e:
            logging.error (f"Failed to get rules. {e}")
            raise ValueError("Failed to get rules")
        
        return rules
    
    def new_rule(self, rule):
        try:
            rule["action"] = {"type": "block"}
            rule["active"] = True if rule["active"] == 1 else False
            DB.rules.insert_one(rule)

        except Exception as e:
            raise ValueError("Failed to insert new rule")    

    def update_rule(self, rule):
        try:
            rule["action"] = {"type": "block"}
            rule["active"] = True if rule["active"] == 1 else False
            rule_id = rule["id"]

            del rule["id"]

            DB.rules.update_one({"_id": ObjectId(rule_id)}, {"$set": rule})

        except Exception as e:
            raise ValueError("Failed to insert new rule")         
