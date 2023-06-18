import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { AuthContext } from "../context/auth.context";
// import { LoadingContext } from "../context/loading.context"

const Signup = () => {
  const { authenticateUser } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({
    artist_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
    console.log("Changin user", newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
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
      <h1 class="text-3xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit} class="flex flex-col gap-4">
        <label class="flex flex-col gap-1">
          <span>Artist Name:</span>
          <input
            type="text"
            name="artist_name"
            value={newUser.artist_name}
            onChange={handleChange}
            class="border border-gray-300 rounded-md p-1"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            class="border border-gray-300 rounded-md p-1"
          />
        </label>

        <label class="flex flex-col gap-1">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            class="border border-gray-300 rounded-md p-1"
          />
        </label>

        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
