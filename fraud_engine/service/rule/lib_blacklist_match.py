class lib_blacklist_match:
    def evaluate_blacklist_rule(self, rule, transaction) -> bool:
        field = rule.get("field")
        if field in transaction:
            return transaction[field] in rule.get("blacklist", [])
        
        return False