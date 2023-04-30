from flask_restful import reqparse


#Parser for Register
registerParser = reqparse.RequestParser()
registerParser.add_argument('user_name')
registerParser.add_argument('user_username')
registerParser.add_argument('user_public_key')

#Parser for Vote
voteParser = reqparse.RequestParser()
voteParser.add_argument('candidate_id')
voteParser.add_argument('message')
voteParser.add_argument('user_signature')

#Parser for Login
loginParser = reqparse.RequestParser()
loginParser.add_argument('user_signature')
loginParser.add_argument('user_username')
loginParser.add_argument('message')