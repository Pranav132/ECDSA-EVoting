import json

#creating validation errors 
def APIValidationError(status_code, error_code, error_message):
        message = {"error_code": error_code, "error_message": error_message, "status_code": status_code}
        return message

