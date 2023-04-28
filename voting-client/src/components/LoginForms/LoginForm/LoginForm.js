import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { backendURL, ec, generateRandomHexString } from "../../../global";


export const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        secretKey: '',
    });
    const [loading, setLoading] = useState(false);
    const [show, setShow] =  useState(false);
    const message = generateRandomHexString(256);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const jKey = ec.keyFromPrivate(formData.secretKey);
        const signature = jKey.sign(message).toDER('hex');
        let requestData = { username: formData.username, signature: signature, message: message}
        try{
            setLoading(true)
            await axios.post(`${backendURL}/api/login`, {
                user_username: requestData.username,
                user_signature: requestData.signature,
                message: requestData.message,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            .then(
                responseData =>{
                    setLoading(false);
                    console.log(responseData)
                    if(responseData.data === "User added"){
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