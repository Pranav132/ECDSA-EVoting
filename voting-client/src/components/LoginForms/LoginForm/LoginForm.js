import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { signMessage } from "../../../Globals/functions";
import { backendURL, ec } from "../../../Globals/constants";
import { useAuth } from "../../../Globals/authContext";


export const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        secretKey: '',
    });
    const [loading, setLoading] = useState(false);
    const [show, setShow] =  useState(false);
    const authContext = useAuth();


    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (event) => {

        event.preventDefault();

        // converting private key and signing message
        const privKey = ec.keyFromPrivate(formData.secretKey, "hex");
        const returnData = signMessage(privKey)

        try{

            // verifying login with backend using Schnorr Protocol
            setLoading(true)
            await axios.post(`${backendURL}/api/login`, {
                user_username: formData.username,
                user_signature: returnData.signature,
                message: returnData.message,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            .then(
                responseData =>{
                    // Checking the response
                    setLoading(false);
                    if(responseData.data.status_code === 200){
                        // If login successful
                        const user = responseData.data.user;
                        authContext.login(user.user_username, user.user_name, user.user_has_voted)
                    }
                    else{
                        // Invalid Login
                        setShow(true);
                    }
                }
            );
        }
        catch(err) {      
            // Error Logging in
            setLoading(false); 
            setShow(true);
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
            <div className="toast toast-top toast-center w-1/2 mt-[6vh]">
                    {show && 
                        <div className="alert alert-error">
                            <div>
                                <span>Login Failed. Please try again.</span>
                            </div>
                        </div>
                    }
            </div>
            {!loading ? (
                           <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                           <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
                           <p className="text-xl text-center text-gray-700 py-4">We will not store your secret key. It will simply be used to sign your message.</p>
                           <form className="space-y-4">
                               <div>
                                   <label className="label">
                                       <span className="text-base label-text">Username</span>
                                   </label>
                                   <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="w-full input input-bordered" />
                               </div>
                               <div>
                                   <label className="label">
                                       <span className="text-base label-text">Secret Key</span>
                                   </label>
                                   <input type="text" name="secretKey" value={formData.secretKey} onChange={handleInputChange} required className="w-full input input-bordered" />
                               </div>
                               <Link to="/register" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Haven't Registered?</Link>
                               <div>
                                   <button className="btn btn-block" onClick={handleLogin}>Login</button>
                               </div>
                           </form>
                       </div>
            ) : (
                <progress className="progress w-56"></progress> 
            ) }
        </div>
    )
}