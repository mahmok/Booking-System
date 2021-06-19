import unittest
import json

from flask import Flask

from utils.standard_response import StandardResponse


class TestStandardResponse(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)

    def test_json_response(self):
        with self.app.app_context():
            response, code = StandardResponse("example_value", 200).to_json()
            json_res = json.loads(response.get_data())
            self.assertIn('data', json_res)
            self.assertEqual(json_res['data'], 'example_value')
            self.assertEqual(code, 200)

            response, code = StandardResponse("example_value", 204).to_json()
            self.assertEqual(response, '')
            self.assertEqual(code, 204)

            response, code = StandardResponse("example_error", 500).to_json()
            json_res = json.loads(response.get_data())
            self.assertEqual(code, 500)
            self.assertIn('error', json_res)
            self.assertEqual(json_res['error'], 'example_error')