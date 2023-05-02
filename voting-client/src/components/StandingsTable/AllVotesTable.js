export const AllVotesTable = (props) => {

    var votes = []
    const languages = ["Javascript", "Python", "C", "Java"]

    for (var i = 0; i < props.allVotes.length; i++) {
        var vote = props.allVotes[i]
        votes.push({
            candidate: languages[vote["Candidate_Voted"]-1],
            public_key: vote["public_key"],
            signature: vote["signature"]
        })
    }
    return(
        <div className="overflow-x-auto">
            <table className="table w-full border-2">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Candidate</th>
                        <th>Public Key</th>
                        <th>Signature</th>
                    </tr>
                </thead>
                <tbody>
                    { votes.map((subArray, index) => (
                        <tr>
                            <th>{index+1}</th>
                            <td>{subArray.candidate}</td>
                            <td>{subArray.public_key}</td>
                            <td>{subArray.signature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}