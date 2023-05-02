from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.exceptions import InvalidSignature
from models import User, PublicKey

def verify_signature(public_key_hex, message, signature_hex):
    public_key_bytes = bytes.fromhex(public_key_hex)
    signature_bytes = bytes.fromhex(signature_hex)
    
    public_key = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256K1(), public_key_bytes)
    message_bytes = message.encode()

    signature = ec.ECDSA(hashes.SHA256())
    
    try:
        public_key.verify(signature_bytes, message_bytes, signature)
        return True
    except InvalidSignature:
        return False

def getUsers():
    users = User.query.all()
    allUsers = [{"key": user.user_public_key, "hasVoted": user.user_has_voted, "username": user.user_username} for user in users]
    return allUsers

def getAllKeys():
    publicKeys = PublicKey.query.all()
    public_keys = [key.public_key for key in publicKeys]
    return public_keys