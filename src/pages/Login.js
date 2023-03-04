import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { post } from "../services/authService"


const Login = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ thisUser, setthisUser ] = useState(
        {
            email: "",
            password: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setthisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Changing user", thisUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/login', thisUser)
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='email' name="email" value={thisUser.email} onChange={handleChange}></input>

                <label>Password</label>
                <input type='password' name="password" value={thisUser.password} onChange={handleChange}></input>

                <button type="submit">Login</button>

            </form>

        </div>
    )
}

export default Login