import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";

const Profile = () => {
  const { user  } = useContext(LoadingContext);

  // let newUser = setUser(user)
  // const joinDate = new Date(user.created_at).toLocaleDateString();


return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          {/* <p>Email: {user.email}</p> */}
          <p>{user.artist_name}</p>
          <p>Location: {user.city}, {user.country}</p>
          <img id="profile_image" src={user.profile_image} alt="Profile"/>
          <div>
            <p>Bio: {user.bio}</p>
            <p>Social Links: </p>
          </div>
          
          {/* <p>Member Since: {joinDate}</p> */}
        </div>
      )}
     <ProfileNavbar />
    </div>
  );
};

export default Profile;