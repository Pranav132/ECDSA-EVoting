export const StandingsTable = (props) => {

    // TODO: Change labels to Candidate Names

    const votes = {}

    for(var i = 1; i<5; i++){
        votes[i] = props.votes[i-1]
    }

    const sortedArray = Object.entries(votes)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => [key, value]);

    const sortedObj = Object.fromEntries(sortedArray);
    console.log(sortedObj)

    return(
        <div className="overflow-x-auto">
            <table className="table w-full border-2">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Language</th>
                    <th>Votes</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                </tr>
                {/* row 2 */}
                <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                </tr>
                <tr>
                    <th>4</th>
                    <td>lOl JoKes</td>
                    <td>qwewq</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}