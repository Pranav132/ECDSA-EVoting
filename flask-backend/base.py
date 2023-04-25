from flask import *
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# configuring Flask app
app = Flask(__name__)

# configuring flask to use sql alchemy and url for databse
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config['SECRET_KEY'] = '8f42a73054b1749f8f58848be5e6502c'
db = SQLAlchemy(app)
api = Api(app)