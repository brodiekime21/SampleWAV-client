import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../context/loading.context"
import { NavLink } from "react-router-dom"


const ProfileNavbar = ({setIsLoading}) => {

    const getToken = () => {
        return localStorage.getItem("authToken")
      }

    const { user } = useContext(LoadingContext)  //   eventually change to const { user, getSamples } = useContext(LoadingContext)


    return (
        <nav className="bg-black flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center">
                {
                    getToken() ? 
                    <>
                        <div className="flex items-center justify-center font-bold">
                            {user && <NavLink to={`/create-sample/`} activeClassName="text-white" className="mr-6 text-xl text-purple-600 hover:text-white">Create A Sample</NavLink>}
                            {user && <NavLink to={`/create-pack/`} activeClassName="text-white" className="mr-6 text-xl text-purple-600 hover:text-white">Create A Pack</NavLink>}
                        </div>
                        <div className="ml-auto font-bold">
                            {user && <NavLink to={`/edit-profile/${user._id}`} activeClassName="text-white" className="mr-6 text-xl text-purple-600 hover:text-white">Edit Profile</NavLink>}
                        </div>
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

export default ProfileNavbar