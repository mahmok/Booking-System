import json

from flask import jsonify

'''
This class encapsulates the responses that can be returned from the app.
It should be used to update the global response and to add new return formats.
'''


class StandardResponse():
    def __init__(self, data, code):
        self.data = data
        self.code = code

    def to_json(self):
        if self.code == 204:
            return '', self.code
        elif 200 <= self.code < 300:
            return jsonify({'data': self.data}), self.code
        else:
            return jsonify({'error': self.data}), self.code
