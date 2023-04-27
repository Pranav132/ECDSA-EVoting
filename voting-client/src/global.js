import { ec as EC } from "elliptic";

export function generateRandomHexString(length) {
    const bytes = new Uint8Array(length / 2);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const backendURL = "http://localhost:8080"

export const getKeyPair = () => {
    const ec = new EC('p256');
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate('hex')
    const publicKey = keyPair.getPublic('hex')
    return { privateKey, publicKey }
}

// context