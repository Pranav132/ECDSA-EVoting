import { Link } from "react-router-dom"
import { getKeyPair } from "../../../global"
import { useState } from "react"
import axios from "axios";
import { backendURL } from "../../../global";

export const RegisterForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
    });

    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [publicKey, setPublicKey] = useState("");
    const [secretKey, setSecretKey] = useState("")
    const [show, setShow] =  useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async (event) => {
        event.preventDefault();
        const keys = getKeyPair();
        let requestData = { ...formData, publicKey: keys.publicKey}
        try{
            setLoading(true)
            await axios.post(`${backendURL}/api/user`, {
                user_name: requestData.name,
                user_username: requestData.username,
                user_public_key: requestData.publicKey
            })
            .then(
                responseData =>{
                    setLoading(false);
                    if(responseData.data === "User added"){
                        setPublicKey(keys.publicKey)
                        setSecretKey(keys.privateKey)
                        setRegistered(true);
                        setShow(false);
                    }
                    else{
                        setShow(true);
                    }
                }
            );
        }
        catch(err) {       
            setShow(true);
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden w-full">
              <div className="toast toast-top toast-center w-1/2 mt-[6vh]">
                    {show && 
                        <div className="alert alert-error">
                            <div>
                                <span>User could not be registered. Please try again.</span>
                            </div>
                        </div>
                    }
            </div>
            {!loading ? (
            <div>
                {!registered ? (
                    <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                        <h1 className="text-3xl font-semibold text-center text-gray-700">Register</h1>
                        <form className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Name</span>
                                </label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Username</span>
                                </label>
                                <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="w-full input input-bordered" />
                            </div>
                            <Link to="/login" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Already Registered?</Link>
                            <div>
                                <button type="submit" className="btn btn-block" onClick={handleRegistration}>Register</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>Secret Key : {secretKey}</h1>
                        <h1>Public Key : {publicKey}</h1>
                        <p>Please store your secret key safely for future use. It will not be stored by us.</p>
                        <p>You can process to login.</p>
                        <Link to ="/login"><button class = "btn btn-primary">Login</button></Link>
                    </div>
                )}
            </div>
            ) : (
                <progress className="progress w-56"></progress> 
            )}
      </div>
    )
}