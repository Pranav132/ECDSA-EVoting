export const StandingsTable = (props) => {

    const votes = {}

    for(var i = 1; i<5; i++){
        votes[i] = props.votes[i-1]
    }

    const sortedArray = Object.entries(votes)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => [key, value]);
    const languages = ["Javascript", "Python", "C", "Java"]

    for(i = 0; i < sortedArray.length; i++){
        sortedArray[i][0] = languages[Number(sortedArray[i][0]) - 1];
    }

    console.log(sortedArray)

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
                    { sortedArray.map((subArray, index) => (
                        <tr>
                            <th>{index+1}</th>
                            <td>{subArray[0]}</td>
                            <td>{subArray[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}