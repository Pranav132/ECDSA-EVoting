from base import db

# User Model
class User(db.Model):
    """
    User Model\n
    ID - Primary Key Unique ID of the user\n
    User Name - Name of the user\n
    User Public Key - Public Key of the user for ECDSA Protocol\n
    User has voted - Has the user voted\n
    """
    __tablename__ = 'Users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_username = db.Column(db.String(255), nullable=False, unique=True)
    user_name =  db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<User user_id={self.user_id} user_username='{self.user_username}' user_name='{self.user_name}'>"


# Candidate Model
class Candidate(db.Model):
    """
    NOT REQUIRED WRITTEN IF NEEDED.\n
    Candidate Model\n
    ID - Primary Key Unique ID of the Candidate\n
    Data of Candidates being stored in frontend for easier access - only IDs stored here for voting purposes\n
    """
    __tablename__ = 'Candidates'
    candidate_id = db.Column(db.Integer, primary_key=True, autoincrement=True)


# Votes Model
class Vote(db.Model):
    """
    Vote Model\n
    ID - Primary Key for Vote to store number of votes in database\n
    Candidate ID - Foreign Key to Candidate Database to see which candidate voted for\n
    User ID - Foreign Key to User Database to see which user voted\n
    """
    __tablename__ = 'Votes'
    vote_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('Candidates.candidate_id'))
    user_public_key = db.Column(db.String(255), nullable=False, unique=True)
    signature = db.Column(db.String(255), nullable=False)


class PublicKey(db.Model):
    """
    Public key model for public key registry
    """
    __tablename__ = 'PublicKeys'
    public_key_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_key = db.Column(db.String(255), nullable=False, unique=True)