from fastecdsa.point import Point
import ecdsa
from hashlib import sha256
from fastecdsa import curve

def hex_to_point(hex_string, curve_name):
    x = int(hex_string[2:66], 16)
    y = int(hex_string[66:], 16)
    return Point(x, y, curve_name)

message="c384120fbca07b3b5073494c59df5f8ac105192737131fad693df0a5ef54adf036dd8ea3d2835a9cd17716c4a836eeb6a26485e8f98fb23ef500f53b6d8d2de3391dd418f1d4a0ccf97d9cd90c0a4ff213ee9ba3db4044eb7d889e73de39303aaee9c7f687d09edb153ae75753e8801a522bdd173f3fede6a0025e3b641daa37"
signature_hex = '3045022100dc9c4ebff820d508b5af5ad01d25d98a33ec29845d3658e6f673493fee6f76ef02207ea13138570ceee19239c208ddd5fd28b54c137cba84f1b7297b9f3079622ca2'
public_key = "0425f06fc2793c4950b31059b4e099905c797750adaa62aa3f278908dfaf1dabec5296948ab557125ae7b5351d696d66b5eed4cb53fe1f6b588647387d0821f04b"
vk = ecdsa.VerifyingKey.from_string(bytes.fromhex(public_key), curve=ecdsa.SECP256k1, hashfunc=sha256) 
print(vk.verify(bytes.fromhex(signature_hex), message))