import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../context/loading.context"

const Navbar = () => {

    const getToken = () => {
        return localStorage.getItem("authToken")
      }

    const { user } = useContext(LoadingContext)  //   eventually change to const { user, getSamples } = useContext(LoadingContext)


    return (
        <nav>



            {
                getToken() ? 
                <>

                    {user && <Link to={`/edit-profile/${user._id}`}>Edit Profile</Link>}
                    {user && <Link to={`/create-sample/`}>Create A Sample</Link>}


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