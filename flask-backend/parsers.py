from flask_restful import reqparse

#creating reqparser for student
create_student_parser = reqparse.RequestParser()
create_student_parser.add_argument('roll_number')
create_student_parser.add_argument('first_name')
create_student_parser.add_argument('last_name')
