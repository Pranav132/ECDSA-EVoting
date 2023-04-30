import { ec } from "./constants";

function generateRandomHexString(length) {
    const bytes = new Uint8Array(length / 2);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const getKeyPair = () => {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic("hex");
    const privateKey = keyPair.getPrivate("hex");
    return { publicKey, privateKey };
}

export function signMessage(privateKey) {
    const message = generateRandomHexString(12);
    const keyPair = ec.keyFromPrivate(privateKey, "hex");
    var msgHash = ec.hash().update(message).digest();
    var signature = keyPair.sign(msgHash);
    signature = signature.toDER("hex");
    // Return the original message instead of the hash
    return { signature, message };
  }