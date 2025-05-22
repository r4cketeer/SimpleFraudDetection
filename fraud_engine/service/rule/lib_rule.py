from core.db import DB

class lib_rule:
    def get_active_rules(self):
        rules = DB.rules.find({
                "active": True
            }).sort({"priority": 1})
        
        return list(rules)