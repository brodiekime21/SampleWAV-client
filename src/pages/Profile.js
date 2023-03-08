import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from 'react-avatar';
// import styled from "styled-components";


const Profile = () => {
  const { user, setUser  } = useContext(LoadingContext);
  const { userId } = useParams();

  // let newUser = setUser(user)
  // const joinDate = new Date(user.created_at).toLocaleDateString();

  // const [mySamples, setMySamples] = useState(null);
  // useEffect(() => {
  //   get(`/samples/browse-samples?userId=${userId}`).then((response) => {
  //     console.log(response.data);
  //     setMySamples(response.data);
  //     console.log("THIS IS THE USER LINE 25",user)
  //   });
  // }, [userId]);

  const navigate = useNavigate()

  const handleDelete = (id) => {
    get(`/samples/delete/${id}`)
    .then((result) => {
      console.log("after delete", result.data)
      setUser(result.data)
      navigate(`/profile/${id}`)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }

return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>{user.artist_name}</p>
          <p>Location: {user.city}, {user.country}</p>
          <Avatar round="true" id="profile_image" src={user.profile_image} alt="Profile"/>
          <div>
            <p>Bio: {user.bio}</p>
            <p>Social Links: </p>
          </div>
          
          {/* <p>Member Since: {joinDate}</p> */}
        </div>
      )}
    
     <ProfileNavbar />
     {user &&
        user.samples.map((samp) => {
          console.log(samp.sample_file);
          return (
            <>
            <audio src={samp.sample_file} controls></audio>
            
            <button onClick={()=>handleDelete(samp._id)}>Delete</button>
            

            </>
          );
        })}

    </div>
  );
};

export default Profile;