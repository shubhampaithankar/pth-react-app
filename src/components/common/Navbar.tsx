import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/'

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/auth')
    }

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg">
                    <Link to="/">Pokémon Trainer Hub</Link>
                </div>
                <ul className="flex space-x-4 text-white">
                    <li>
                        <Link to="/home" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to={`/profile/${user?.username}`} className="hover:underline">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/pokemon" className="hover:underline">
                                    Pokémon
                                </Link>
                            </li>
                            <li>
                                <Link to="/battle" className="hover:underline">
                                    Battle
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline focus:outline-none"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/auth" className="hover:underline">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
