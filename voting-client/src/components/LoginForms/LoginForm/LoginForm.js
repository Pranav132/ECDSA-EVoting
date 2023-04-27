import { Link } from "react-router-dom"

export const LoginForm = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
                <p className="text-xl text-center text-gray-700 py-4">We will not store your secret key. It will simply be used to sign your message.</p>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Username" required className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Secret Key</span>
                        </label>
                        <input type="text" placeholder="Secret Key" required className="w-full input input-bordered" />
                    </div>
                    <Link to="/register" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Haven't Registered?</Link>
                    <div>
                        <button className="btn btn-block">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}