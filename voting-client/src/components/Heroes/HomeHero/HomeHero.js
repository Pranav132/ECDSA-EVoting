import { Link } from "react-router-dom"

export const HomeHero = () => {
    return(
        <section className="py-24 flex items-center min-h-[85vh] justify-center">
            <div className="mx-auto max-w-[43rem]">
                <div className="text-center">
                    <p className="text-lg font-medium leading-8 text-indigo-600/95">Zero Knowledge Proof E-Voting</p>
                    <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">Vote using the Schnorr Protocol.</h1>
                    <p className="mt-3 text-lg leading-relaxed text-slate-400">Vote for your favourite programming language using the Schnorr Protocol.</p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <Link to="/vote"><button className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700">Vote</button></Link>
                    <Link to="/candidates"><button className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50">Candidates</button></Link>
                </div>
            </div>
        </section>
    )
}