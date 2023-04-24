from werkzeug.exceptions import HTTPException
import json

#creating validation errors 
class APIValidationError(HTTPException):
    def __init__(self, status_code, error_code, error_message):
        message = {"error_code": error_code, "error_message": error_message}
        self.response = json.dumps(message), status_code

