import { PieChart } from "../../components/PieChart/PieChart";
import { StandingsTable } from "../../components/StandingsTable/StandingsTable";
import { StandingsHero } from "../../components/Heroes/StandingsHero/StandingsHero";
import { useEffect, useState } from "react";
import { backendURL } from "../../Globals/constants";
import axios from "axios";

export const Standings = () => {

    const [ loading, setLoading ] = useState(false);
    const [ votes, setVotes ] = useState([0,0,0,0]);

    const getVotes = async () => {
        try{
            setLoading(true);
            await axios.get(`${backendURL}/api/votes`)
            .then(
                response => {
                    const data = Object.values(JSON.parse(response.data))
                    setVotes(data);
                    setLoading(false)
                }
            )
        }
        catch(err){
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
                  <progress className="progress w-56"></progress> 
            ) : (
                <> 
                <StandingsHero />
                <div className="flex justify-center align-center py-12">
                    <StandingsTable votes={votes} />
                </div>
                <PieChart votes={votes}/>
                </>
            )}
        </>
    )
}