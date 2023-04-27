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

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async (event) => {
        event.preventDefault();
        const keys = getKeyPair();
        let requestData = { ...formData, publicKey: keys.publicKey}
        console.log(requestData)
        try{
            const response = await axios.post(`${backendURL}/api/user`, {
                user_name: requestData.name,
                user_username: requestData.username,
                user_public_key: requestData.publicKey
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
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
        </div>
    )
}