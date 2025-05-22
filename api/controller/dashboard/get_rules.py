from service.rule.lib_rule import LibRule
from core.helpers import clean_bson

class GetRules:
    def __init__(self):
        self.rule_service = LibRule()

    def get_rules(self, page=1, id=None) -> dict:
        try:
            rules = self.rule_service.get_rules(
                page=page, 
                id=id
            )
            cleaned_rules = clean_bson(rules)
                        
            return {
                "http_code": 200,
                "body_response": {
                    "rules": cleaned_rules
                }
            }
    
        except Exception as e:
            return {
                "http_code": 422,
                "body_response": {
                    "error": str(e)
                }
            }
        
        