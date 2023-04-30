from base import db, app, api
from flask_restful import Resource
from models import User, Candidate, Vote
from errors import APIValidationError
from parsers import userParser, candidateParser, voteParser, loginParser
import json
from fastecdsa import keys, curve, ecdsa
from sqlalchemy import text
from functions import verify_signature

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

        args = userParser.parse_args()
        user_name = args.get("user_name", None)
        user_username = args.get("user_username", None)
        user_public_key = args.get("user_public_key", None)

        if user_name is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User's Name must be provided.")

        if user_public_key is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User's public key must be provided.")
        
        if user_username is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User's username must be provided.")

        userCheck = db.session.query(User).filter(User.user_public_key == user_public_key).first()

        if userCheck:
            return APIValidationError(status_code=409, error_code="Resource Conflict", error_message="Public Key must be unique.")
        

        userCheck = db.session.query(User).filter(User.user_username == user_username).first()

        if userCheck:
            return APIValidationError(status_code=409, error_code="Resource Conflict", error_message="Username must be unique.")

        try:
            newUser = User(user_name=user_name, user_username = user_username, user_public_key=user_public_key)
        except Exception as e:
            return APIValidationError(status_code=500, error_code="Internal Server Error", error_message=str(e))

        db.session.add(newUser)
        db.session.commit()
        
        return "User added", 200
     

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
            vote_counts = {}
            for vote in allVotes:
                candidate_id = vote.candidate_id
                if candidate_id in vote_counts:
                    vote_counts[candidate_id] += 1
                else:
                    vote_counts[candidate_id] = 1
            return json.dumps(vote_counts)
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

        args = userParser.parse_args()
        candidate_id = args.get("candidate_id", None)
        user_signature = args.get("user_signature", None)
        message=args.get("message", None)
        user_id = args.get("user_id", None)

        if candidate_id is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "Candidate to vote for must be provided.")

        if user_signature is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User signature must be provided.")
        
        if user_id is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "User ID must be provided.")
        
        if message is None:
            return APIValidationError(status_code=400, error_code = "Client Error", error_message = "Message must be provided.")

        userCheck = db.session.query(User).filter(User.user_id == user_id).first()

        if not userCheck:
            return APIValidationError(status_code=404, error_code="Resource Not Found", error_message="User not found.")

        try:
            # logic for voting
            # verify that user has not already voted - Resource Conflict
            user_has_voted = userCheck.user_has_voted
            if not user_has_voted:
                return APIValidationError(status_code=409, error_code="Resource Conflict", error_message="User Has already Voted")
            # verify signature - Unauthorized 401
            x, y = userCheck.user_public_key
            pub_key = keys.ECPoint(curve.P256, x, y)
            user_verified = ecdsa.verify(user_signature, message.encode('utf-8'), pub_key, curve.P256, hashfunc=None)
            if not user_verified:
                return APIValidationError(status_code=401, error_code="Unauthorized", error_message="Could not verify user through signature")
            # verify that candidate id is 1,2,3 or 4 - Resource Conflict
            if candidate_id not in [1,2,3,4]:
                return APIValidationError(status_code=409, error_code="Resource Code", error_message="Candidate not Found")
            # if all verified, then register vote
            newVote = Vote(candidate_id = candidate_id, user_id = user_id)
        except Exception as e:
            return APIValidationError(status_code=500, error_code="Internal Server Error", error_message=str(e))

        db.session.add(newVote)
        db.session.commit()
        
        return "Vote added", 200

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

        try:
            queriedUser = db.session.query(User).filter(User.user_username == user_username).first()
        except Exception as e:
            return APIValidationError(status_code=500, error_code="Internal Server Error", error_message=str(e))
        
        # If User found
        if queriedUser:
            user_verified = verify_signature(queriedUser.user_public_key, message, user_signature)
            if user_verified:
                data = {
                    "user_id": queriedUser.user_id,
                    "user_name": queriedUser.user_name,
                    "user_public_key": queriedUser.user_public_key,
                    "user_has_voted": queriedUser.user_has_voted,
                    "user_username": queriedUser.user_username
                }
                message = {"user": data, "status_code": 200}
                return message, 200
            else:
                return APIValidationError(status_code=401, error_code="Unauthorized", error_message="Unable to verify through signature")
        else:
            return APIValidationError(status_code=404, error_code="Resource not Found", error_message="User with given public key does not exist")


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