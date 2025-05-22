from service.rule import lib_rule
from service.rule import lib_blacklist_match
from service.queue import lib_queue

class FraudEngine:
    def evaluate_rule(self, rule, transaction) -> bool:
        if not rule.get("active", True):
            return False
        
        rule_type = rule.get("condition_type")
        if rule_type == "blacklist_match":
            lib_blacklist_match_process = lib_blacklist_match.lib_blacklist_match()
            return lib_blacklist_match_process.evaluate_blacklist_rule(rule, transaction)
        
        else:
            print(f"Unknown rule type: {rule_type}")
            return False

    def run_rules(self):
        lib_queue_process = lib_queue.lib_queue()
        queues = lib_queue_process.get_queue()

        lib_rule_process = lib_rule.lib_rule()
        rules = lib_rule_process.get_active_rules()

        for queue in queues:
            for rule in rules:
                try:
                    evaluate_rule = self.evaluate_rule(rule, queue)
                    lib_queue_process.move_to_event(queue, evaluate_rule)

                except Exception as e:
                    print(f"Error evaluating rule {rule.get('_id')}: {e}")
                
                


if __name__ == "__main__":
    engine = FraudEngine()
    engine.run_rules()    