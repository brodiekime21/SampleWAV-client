import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
import { AuthContext } from "../context/auth.context"
// import { LoadingContext } from "../context/loading.context"

const Signup = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ newUser, setNewUser ] = useState(
        {
            artist_name: "",
            email: "",
            password: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((recent)=>({...recent, [e.target.artist_name]: e.target.value}))
        console.log("Changin user", newUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/signup', newUser)
            .then((results) => {
                console.log("Created User", results.data)
                navigate(`/profile/${results.data._id}`)
                localStorage.setItem('authToken', results.data.token )
                
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                authenticateUser()
            })
    } 

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>

                <label>Artist Name</label>
                <input type='text' name="artist_name" value={newUser.artist_name} onChange={handleChange}></input>

                <label>Email</label>
                <input type='email' name="email" value={newUser.email} onChange={handleChange}></input>

                <label>Password</label>
                <input type='password' name="password" value={newUser.password} onChange={handleChange}></input>

                <button type="submit">Sign Up</button>

            </form>

        </div>
    )
}

export default Signup