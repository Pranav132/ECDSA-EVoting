from flask_restful import reqparse

#creating reqparser for student
create_student_parser = reqparse.RequestParser()
create_student_parser.add_argument('roll_number')
create_student_parser.add_argument('first_name')
create_student_parser.add_argument('last_name')

#Parser for User
userParser = reqparse.RequestParser()
userParser.add_argument('user_name')
userParser.add_argument('user_username')
userParser.add_argument('user_public_key')

#Parser for Candidate
candidateParser = reqparse.RequestParser()
candidateParser.add_argument('candidate_id')

#Parser for Vote
voteParser = reqparse.RequestParser()
voteParser.add_argument('vote_id')
voteParser.add_argument('candidate_id')
voteParser.add_argument('user_id')

#Parser for Login
loginParser = reqparse.RequestParser()
loginParser.add_argument('user_signature')
loginParser.add_argument('user_username')
loginParser.add_argument('message')