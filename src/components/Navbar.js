import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"
import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom"

const Navbar = () => {

    const getToken = () => {
        return localStorage.getItem("authToken")
      }

    const { user } = useContext(LoadingContext)  //   eventually change to const { user, getSamples } = useContext(LoadingContext)

    const { logout } = useContext(AuthContext)

    return (
        <nav className="bg-black flex items-center justify-between flex-wrap p-6">
            <Link to={'/'} className="flex items-center mr-6">
                <img className="logoNavBar h-8" src={require('../logoColor.png')} alt="SampleWAV logo"/>
            </Link>

            <div className="flex items-center">
                <NavLink to={'/'} exact activeClassName="text-white" className="mr-6 hover:text-white">Home</NavLink>
                <NavLink to={'/browse-samples'} activeClassName="text-white" className="mr-6 hover:text-white">Browse Samples</NavLink>
                <NavLink to={'/browse-packs'} activeClassName="text-white" className="mr-6 hover:text-white">Browse Packs</NavLink>
                {/* <SearchBar /> */}

                {/* add search bar here for users and samples based on their name for each */}
                {/* <Link onClick={getCountries} to={'/countries'}>Countries</Link>
                <Link to={'/posts'}>Posts</Link> */}
            </div>

            <div className="flex items-center">
                {
                    getToken() ? 
                    <>
                        {user && <NavLink to={`/profile/${user._id}`} activeClassName="text-white" className="mr-6 hover:text-white">Profile</NavLink>}

                        <button onClick={logout} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                    </>

                    : 

                    <>
                        <NavLink to={'/signup'} activeClassName="text-white" className="mr-6 hover:text-white">Signup</NavLink>
                        <NavLink to={'/login'} activeClassName="text-white" className="mr-6 hover:text-white">Login</NavLink>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar