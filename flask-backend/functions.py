from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.exceptions import InvalidSignature

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
