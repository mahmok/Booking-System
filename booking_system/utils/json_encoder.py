import enum
import json

'''
This class extends JSON serialization to serialize complex non-primitive objects
any complex objects can be added here so it is global throughout the app
'''

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, enum.Enum):
            return obj.value
        return super(JSONEncoder, self).default(obj)