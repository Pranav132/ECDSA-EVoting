import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { signMessage } from "../../../Globals/functions";
import { backendURL, ec} from "../../../Globals/constants";
import { useAuth } from "../../../Globals/authContext";

export const VoteHero = () => {

    const [formData, setFormData] = useState({
        candidate: null,
        secretKey: null,
    });
    const [loading, setLoading] = useState(false);
    const [show, setShow] =  useState(false);
    const authContext=useAuth();

    const candidateOptions = [
        {name: "Javascript", value: 1},
        {name: "Python", value: 2},
        {name: "C", value: 3},
        {name: "Java", value: 4}
    ]

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVote = async (event) => {

        event.preventDefault();

        // converting private key and signing message
        const privKey = ec.keyFromPrivate(formData.secretKey, "hex");
        const returnData = signMessage(privKey)

        try{

            // verifying vote with backend using Schnorr Protocol
            setLoading(true)
            await axios.post(`${backendURL}/api/vote`, {
                candidate_id: formData.candidate,
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
                    console.log(responseData);
                    if(responseData.data.status_code === 200){
                        setShow(false);
                        authContext.setVoted();
                        window.location.reload();
                    }
                    else{
                        // Invalid Vote
                        setShow(true);
                    }
                }
            );
        }
        catch(err) {      
            // Error Voting
            setLoading(false); 
            setShow(true);
        }
    }

    const hasVoted = authContext.userData.has_voted;
    console.log(hasVoted);
    if(hasVoted !== 'false'){
        return(
            <div className="hero min-h-[85vh] bg-base-200 flex justify-center align-center flex-col">
                <h1 className="font-bold text-2xl py-4">You have already voted.</h1>
                <Link to="/standings"><button className="btn btn-primary">View Standings</button></Link>
            </div>
        )
    }

    return(
        <div className="hero min-h-[85vh] bg-base-200">

            <div className="toast toast-top toast-center w-1/2 mt-[6vh]">
                    {show && 
                        <div className="alert alert-error">
                            <div>
                                <span>Vote Failed to register. Please try again.</span>
                            </div>
                        </div>
                    }
            </div>

            <div className="hero-content flex-col">

                <div className="text-center text-left pl-12 py-12">
                    <h1 className="text-5xl font-bold">Vote now!</h1>
                    <p className="py-6 max-w-xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Link to="/candidates"><button className="btn btn-primary">View Candidates</button></Link>
                </div>

                {!loading ? (
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-12">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Candidates</span>
                            </label>
                            <select
                                name="candidate"
                                value={formData.candidate}
                                onChange={handleInputChange}
                                className="w-full input input-bordered"
                                >
                                <option value="">Select a Candidate</option>
                                {candidateOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Secret Key</span>
                            </label>
                            <input type="text" name="secretKey" value={formData.secretKey} onChange={handleInputChange} required className="w-full input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-24 m-auto" onClick={handleVote}>Vote</button>
                        </div>
                    </div>
                </div>
                ):
                (
                    <progress className="progress w-56"></progress> 
                )}
            </div>
        </div>
    )
}