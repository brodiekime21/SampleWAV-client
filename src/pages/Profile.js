import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";

const Profile = () => {
  const { user } = useContext(LoadingContext);

//   let newUser = setUser(user)
//   const joinDate = new Date(newUser.created_at).toLocaleDateString();


return (
    <div>
     <ProfileNavbar />
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Artist Name: {user.artist_name}</p>
          {/* <img id="profile_image" src={user.profile_image} alt="Profile Image"> */}
          
          {/* <p>Member Since: {joinDate}</p> */}
        </div>
      )}
    </div>
  );
};

export default Profile;