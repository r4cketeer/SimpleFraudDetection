from service.rule.lib_rule import LibRule

class SaveRuleProcess:
    def __init__(self):
        self.rule_service = LibRule()

    def save_rule(self, rule):
        try:
            dict_rule = rule.dict()
            if not dict_rule.get("id", ""):
                self.rule_service.new_rule(dict_rule)
            
            else:
                self.rule_service.update_rule(dict_rule)
            
            return {
                "http_code": 204,
                "body_response": {}
            }
        
        except Exception as e:
            return {
                "http_code": 422,
                "body_response": {
                    "error": str(e)
                }
            }
        