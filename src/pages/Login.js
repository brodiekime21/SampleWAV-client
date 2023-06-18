import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);

  const [thisUser, setthisUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setthisUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
    console.log("Changing user", thisUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", thisUser)
      .then((results) => {
        console.log("Created User", results.data);
        navigate(`/profile/${results.data._id}`);
        localStorage.setItem("authToken", results.data.token);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        authenticateUser();
      });
  };

  return (
    <div class="bg-white p-4 mb-4 rounded-md shadow-md">
      <h1 class="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} class="flex flex-col gap-4">
        <label class="flex flex-col gap-1">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={thisUser.email}
            onChange={handleChange}
            class="border border-gray-300 rounded-md p-1"
          />
        </label>

        <label class="flex flex-col gap-1">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={thisUser.password}
            onChange={handleChange}
            class="border border-gray-300 rounded-md p-1"
          />
        </label>

        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
