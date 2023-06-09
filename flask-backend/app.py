from base import db, app, api
from flask_restful import Resource
from models import User, Vote, PublicKey
from errors import APIValidationError
from parsers import registerParser, voteParser, loginParser
import json
from sqlalchemy import text
from functions import verify_signature, getUsers, getAllKeys

class RegisterUser(Resource):
     """
    API Endpoint for Registration

    Methods:
        POST: POST User details. Accepts User Name and User Public Key and creates User instance in database
    """        
        
     def post(self):
        """
        POST USER DETAILS

        Returns 200 if User has been created\n
        Returns 400 if Client Error\n
        Returns 409 if Resource Conflict\n
        Returns 500 if Internal Server Error\n
        """

        args = registerParser.parse_args()
        user_name = args.get("user_name", None)
        user_username = args.get("user_username", None)
        user_public_key = args.get("user_public_key", None)

        if user_name is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User's Name must be provided.")

        if user_public_key is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User's public key must be provided.")
        
        if user_username is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User's username must be provided.")

        userCheck = db.session.query(User).filter(User.user_username == user_username).first()

        if userCheck:
            return APIValidationError(status_code=409, error_code="Resource Conflict", error_message="Username must be unique.")
        
        publicKeyRegistry = getAllKeys()
        
        publicKeyCheck = False
        
        for key in publicKeyRegistry:
            if (user_public_key == key):
                publicKeyCheck = True
                break

        if publicKeyCheck:
            return APIValidationError(status_code=409, error_code="Resource Conflict", error_message="Public Key must be unique.")
        
        userCheck = db.session.query(User).filter(User.user_username == user_username).first()

        if userCheck:
            return APIValidationError(status_code=409, error_code="Resource Conflict", error_message="Username must be unique.")

        try:
            newUser = User(user_name=user_name, user_username = user_username)
            newKey = PublicKey(public_key=user_public_key)
            db.session.add(newUser)
            db.session.add(newKey)
            db.session.commit()
            return "User added", 200
        except Exception as e:
            return APIValidationError(status_code=500, error_code="Internal Server Error", error_message=str(e))
     

class VoteAPI(Resource):
     """
    API Endpoint for Voting data

    Methods:
        GET: Get All Votes details. Returns a JSON with Candidate ID and corresponding number of votes per candidate
        POST: POST Vote details. Accepts User ID, User Signature and Candidate ID. If Signature is valid, registers vote and changes user to has voted.
    """
     
     def get(self):
        """
        GET Voting DETAILS

        Returns 200 with JSON if valid\n
        Returns 500 if Internal Server Error\n
        """

        try:
            allVotes = db.session.query(Vote).all()
        except Exception as e:
            return APIValidationError(status_code=500, error_code="Internal Server Error", error_message=str(e))
        
        # If User found
        if allVotes:
            vote_counts = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
            }
            parsedVotes = []
            for vote in allVotes:
                candidate_id = vote.candidate_id
                if candidate_id in vote_counts:
                    vote_counts[candidate_id] += 1
                else:
                    vote_counts[candidate_id] = 1
                parsedVotes.append({"Candidate_Voted" : vote.candidate_id, "signature": vote.signature, "public_key": vote.user_public_key})
            return {"voteCounts": json.dumps(vote_counts), "allVotes": parsedVotes}
        else:
            return APIValidationError(status_code=404, error_code="Resource not Found", error_message="Votes not found")
        
        
     def post(self):
        """
        POST USER DETAILS

        Returns 200 if Vote was verified and stored successfully\n
        Returns 400 if Client Error\n
        Returns 401 if Unauthorized\n
        Returns 404 if Resource Not Found\n
        Returns 409 if Resource Conflict\n
        Returns 500 if Internal Server Error\n
        """

        args = voteParser.parse_args()
        candidate_id = args.get("candidate_id", None)
        user_signature = args.get("user_signature", None)
        message = args.get("message", None)

        if candidate_id is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "Candidate to vote for must be provided.")

        if user_signature is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User signature must be provided.")
        
        if message is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "Message must be provided.")
        

        allKeys = getAllKeys()
        userFound = False
        verifiedKey = ""
        for key in allKeys:
            if verify_signature(key, message, user_signature):
                userFound = True
                verifiedKey = key

        # If User found
        if userFound:
            
            newVote = Vote(candidate_id = candidate_id, signature = user_signature, user_public_key = verifiedKey)
            db.session.add(newVote)
            deletedKey = db.session.query(PublicKey).filter(PublicKey.public_key == verifiedKey).first()
            db.session.delete(deletedKey)
            db.session.commit()
            message = {"response": "Vote added", "status_code": 200}
            return message, 200
        
        else:
            return APIValidationError(status_code=401, error_code="Unauthorized", error_message="Unable to verify through signature")
    

class LoginUser(Resource):

    """
    API Endpoint for User Login

    POST: Returns a JSON with User ID, User Name, User Public Key and User Voting Status
    """

    def post(self):
        """
        POST USER DETAILS

        Returns 200 with JSON if valid\n
        Returns 401 if Unauthorized\n
        Returns 404 if User not found\n
        Returns 500 if Internal Server Error\n
        """

        args = loginParser.parse_args()
        user_signature = args.get('user_signature')
        message = args.get('message')
        user_username = args.get('user_username')

        # Validating
        if user_signature is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User signature must be provided.")
        
        if user_username is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User Username must be provided.")
        
        if message is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "Message must be provided.")

        try:
            queriedUser = db.session.query(User).filter(User.user_username == user_username).first()
        except Exception as e:
            return APIValidationError(status_code=500, error_code="Internal Server Error", error_message=str(e))
        
        # If User found
        if queriedUser:
            allKeys = getAllKeys()
            user_verified = False
            for key in allKeys:
                if verify_signature(key, message, user_signature):
                    user_verified = True
                    break
            
            if user_verified:
                data = {
                    "user_id": queriedUser.user_id,
                    "user_name": queriedUser.user_name,
                    "user_username": queriedUser.user_username
                }
                message = {"user": data, "status_code": 200}
                return message, 200
            else:
                return APIValidationError(status_code=401, error_code="Unauthorized", error_message="Unable to verify through signature")
        else:
            return APIValidationError(status_code=404, error_code="Resource not Found", error_message="User with given username does not exist")


class TestAPI(Resource):
    def get(self):
        try:
            test = db.session.execute(text('SELECT * FROM Users;'))
            rows = test.fetchall()
            print('JSON data:', rows)
            return "Connected to database"
        except Exception as e:
            return str(e)


# adding api resources
api.add_resource(RegisterUser, '/api/user')
api.add_resource(LoginUser, '/api/login')
api.add_resource(VoteAPI, '/api/votes', '/api/vote')
api.add_resource(TestAPI, '/api/test', '/api/test')


if __name__ == '__main__':
    db.create_all()
    app.run()