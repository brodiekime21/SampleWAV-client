import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";

const Profile = () => {
  const { user } = useContext(LoadingContext);

//   const joinDate = new Date(user.created_at).toLocaleDateString();
//   console.log("this is created at:" , user.created_at)
//   console.log(joinDate)

  return (
    <div>
      <h1>Profile</h1>
      {/* <p>Email: {user.email}</p>
      <p>Artist Name: {user.artist_name}</p>
      <p>Member Since: {joinDate}</p> */}
    </div>
  );
};

export default Profile;