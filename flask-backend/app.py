from base import db, app, api
from flask_restful import Resource
from models import student

class StudentApi(Resource):
    def get(self, student_id):
        #getting student from database
        # if valid, return student data, else return 404 error
        try:
            studentQueried = db.session.query(student).filter(student.student_id == student_id).first()
        except:
            return '', 500
        if studentQueried:
            return{
                "student_id": studentQueried.student_id,
                "first_name": studentQueried.first_name,
                "last_name": studentQueried.last_name,
                "roll_number": studentQueried.roll_number
            }, 200
        else:
            return '', 404
    
    def put(self, student_id):
        #implementing put method
        #putting student information 
        #initializing student parser 
        args = create_student_parser.parse_args()
        roll_number = args.get("roll_number", None)
        first_name = args.get("first_name", None)
        last_name = args.get("last_name", None)

        if roll_number is None:
            raise APIValidationError(status_code=400, error_code = "STUDENT001", error_message = "Roll Number required and should be String")

        if first_name is None:
            raise APIValidationError(status_code=400, error_code = "STUDENT002", error_message = "First Name is required and should be String")

        if last_name is None:
            raise APIValidationError(status_code=400, error_code = "STUDENT003", error_message = "Last Name is String")

        stud1 = db.session.query(student).filter(student.student_id == student_id).first()

        if not stud1:
            return '', 500

        stud1.first_name = first_name
        stud1.last_name = last_name
        stud1.roll_number = roll_number
        db.session.add(stud1)
        db.session.commit()
        
        return "", 201

    def delete(self, student_id):
        # if enrollments are there for this student, deleting student and enrollments
        #first checking if student exists in database
        stud = db.session.query(student).filter(student.student_id == student_id).first()

        if not stud:
            return '', 404

        enrolled = db.session.query(enrollment).filter(enrollment.student_id == student_id).all()
        #first deleting all enrollments
        try:
            for enrolls in enrolled:
                db.session.delete(enrolls)
                db.session.commit()
        except:
            return '', 500

        try:
            db.session.delete(stud)
            #deleting student
        except:
            return '', 500

        db.session.commit()
        return '', 200

    def post(self):

        #implementing post method 
        #posting student information 
        #initializing student parser 
        args = create_student_parser.parse_args()
        roll_number = args.get("roll_number", None)
        first_name = args.get("first_name", None)
        last_name = args.get("last_name", None)

        if roll_number is None:
            raise APIValidationError(status_code=400, error_code = "STUDENT001", error_message = "Roll Number required and should be String")

        if first_name is None:
            raise APIValidationError(status_code=400, error_code = "STUDENT002", error_message = "First Name is required and should be String")

        if not isinstance(last_name, str):
            raise APIValidationError(status_code=400, error_code = "STUDENT003", error_message = "Last Name is String")

        stud = db.session.query(student).filter(student.roll_number == roll_number).first()

        if stud:
            raise APIValidationError(status_code=409, error_code="STUDENT004", error_message="Roll number must be unique.")

        try:
            new_student = student(roll_number=roll_number, first_name=first_name,last_name=last_name)
        except:
            return '',500

        db.session.add(new_student)
        db.session.commit()
        
        return "", 200

api.add_resource(StudentApi, '/api/student', '/api/student/<string:student_id>')

if __name__ == '__main__':
    app.run()