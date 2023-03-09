import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"

const Navbar = () => {

    const getToken = () => {
        return localStorage.getItem("authToken")
      }

    const { user } = useContext(LoadingContext)  //   eventually change to const { user, getSamples } = useContext(LoadingContext)

    const { logout } = useContext(AuthContext)

    return (
        <nav>

            <Link to={'/'}>Home</Link>
            <Link to={'/browse-samples'}>Browse Samples</Link>
            <Link to={'/browse-packs'}>Browse Packs</Link>

            {/* add search bar here for users and samples based on their name for each */}
            {/* <Link onClick={getCountries} to={'/countries'}>Countries</Link>
            <Link to={'/posts'}>Posts</Link> */}

            {
                getToken() ? 
                <>
                    {user && <Link to={`/profile/${user._id}`}>Profile</Link>}

                    <button onClick={logout}>Logout</button>
                </>

                : 

                <>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </>
            }

        </nav>
    )
}

export default Navbar