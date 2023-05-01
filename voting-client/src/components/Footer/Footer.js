import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <footer className="footer footer-center p-4 border-t-2 text-base-content">
            <div>
                <p>ECDSA ZKP E-voting. Built by <Link to="https://pranav132.github.io" target="_blank" className="underline hover:text-blue-600">Pranav Iyengar</Link></p>
            </div>
        </footer>
    )
}