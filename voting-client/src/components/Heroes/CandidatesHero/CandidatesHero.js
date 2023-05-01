import { Link } from "react-router-dom"

export const CandidatesHero = () => {
    return (
        <div className="hero min-h-[50vh]" style={{ backgroundImage: `url("https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Candidates</h1>
                    <p className="mb-5">Which is your favorite programming langyage? Vote from these 4 options to help decide which is the most popular one.</p>
                    <Link to="/vote"><button className="btn btn-primary">Vote</button></Link>
                </div>
            </div>
        </div>
    )
}

