import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";


const Profile = () => {
  const { user  } = useContext(LoadingContext);

  // let newUser = setUser(user)
  // const joinDate = new Date(user.created_at).toLocaleDateString();



  const [mySamples, setMySamples] = useState(null);
  useEffect(() => {
    get("/samples/browse-samples").then((response) => {
      console.log(response.data);
      setMySamples(response.data);
    });
  }, []);



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
     {mySamples &&
        mySamples.map((samp) => {
          console.log(samp.sample_file);
          return (
            <>
              <audio src={samp.sample_file} controls></audio>
            </>
          );
        })}

    </div>
  );
};

export default Profile;