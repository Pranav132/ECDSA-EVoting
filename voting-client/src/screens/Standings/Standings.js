import { PieChart } from "../../components/PieChart/PieChart";
import { StandingsTable } from "../../components/StandingsTable/StandingsTable";
import { AllVotesTable } from "../../components/StandingsTable/AllVotesTable";
import { StandingsHero } from "../../components/Heroes/StandingsHero/StandingsHero";
import { useEffect, useState } from "react";
import { backendURL } from "../../Globals/constants";
import axios from "axios";

export const Standings = () => {

    const [ loading, setLoading ] = useState(false);
    const [ votes, setVotes ] = useState([1,1,1,1]);
    const [ allVotes, setAllVotes ] = useState([
        {
            "Candidate_Voted": 2,
            "signature": "3045022010f141f927b220e1c9b9fe74b5a1e7174a666b91bbc8bd2abc7afdd2ac493291022100fa8d21c74f9c6d276a30eac69b4cbd97f2f16aeef12778048c323a9a1c35bcb1",
            "public_key": "04f3d787f13f1ef7e077ec95bdd7b342559a089982195e153394b6f2278c74e1f47ed977b04d789da08b44f7e52ef073864959deee3dc4429389976962f1897885"
        },
        {
            "Candidate_Voted": 1,
            "signature": "304402204789418be186b488598da73dc8bf6fa93c61ee10a7d9e6339f6af331881acb7102205649bef7a80307a8be09e3a36df5eca60ae603b695a4f47b16e9751f38bd6308",
            "public_key": "0456085a7cb8d18b295b353f4d2f42adf4f8555808863b3a724830caaed4d6189a75cc506ffcfd7ce538e1d2128fc289286ac64df2268ced48e712d60f80b7e01c"
        }
    ])

    const getVotes = async () => {
        try{
            setLoading(true);
            await axios.get(`${backendURL}/api/votes`)
            .then(
                response => {
                    const data = Object.values(JSON.parse(response.data.voteCounts))
                    setAllVotes(response.data.allVotes)
                    setVotes(data);
                    setLoading(false)
                }
            )
        }
        catch(err){
            console.log(err)
            setLoading(false);
        }
    }

    useEffect(() => {
        getVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {loading ? (
                <div className = "w-full min-h-[85vh] flex justify-center align-center">
                    <progress className="progress w-56"></progress> 
                </div>
            ) : (
                <> 
                <StandingsHero />
                <div className="flex justify-center align-center py-12">
                    <StandingsTable votes={votes} />
                </div>
                <PieChart votes={votes}/>
                <div className="flex justify-center align-center py-12">
                    <AllVotesTable allVotes={allVotes} />
                </div>
                </>
            )}
        </>
    )
}