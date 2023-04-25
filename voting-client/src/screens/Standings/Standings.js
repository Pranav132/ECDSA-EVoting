import { PieChart } from "../../components/PieChart/PieChart";
import { StandingsTable } from "../../components/StandingsTable/StandingsTable";
import { StandingsHero } from "../../components/Heroes/StandingsHero/StandingsHero";

export const Standings = () => {
    return(
        <>
            <StandingsHero />
            <div className="flex justify-center align-center py-20">
                <StandingsTable />
            </div>
            <PieChart />
        </>
    )
}