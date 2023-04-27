from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

# configuring Flask app
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# configuring flask to use sql alchemy and url for databse
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config['SECRET_KEY'] = '8f42a73054b1749f8f58848be5e6502c'
db = SQLAlchemy(app)
api = Api(app)
    