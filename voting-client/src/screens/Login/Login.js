import { LoginForm } from "../../components/LoginForms/LoginForm/LoginForm"
import { generateRandomHexString } from "../../global";
import { ec as EC } from "elliptic";

export const Login = () => {
    const ec = new EC('p256');
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate()
    const publicKey = keyPair.getPublic()
    const message = generateRandomHexString(256);
    const signature = keyPair.sign(message).toDER('hex');
    return (
        <>
            <LoginForm />
        </>
    )
}