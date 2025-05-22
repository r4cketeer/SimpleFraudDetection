from core import variables

class GetMasterData:
    def get_master_data(self, include) -> dict:
        result = {}

        if include:
            include_items = include.split(",")
            for item in include_items:
                key = item.strip()
                if key in variables.MASTERDATA:
                    result[key] = variables.MASTERDATA[key]

        return {
            "http_code": 200,
            "body_response": result
        }
        
        