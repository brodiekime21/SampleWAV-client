import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar';
import PackDetails from "./PackDetails";
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

  const handleSampleDelete = (id) => {
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

  const handlePackDelete = (id) => {
    get(`/packs/delete/${id}`)
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
      <h1>Your Profile</h1>
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

     <h2>Your Samples</h2>
     {user &&
        user.samples.map((samp) => {
          console.log(samp.sample_file);
          return (
            <>
            <img id="sample_image" src={samp.sample_image} alt="Sample"/>

            <audio src={samp.sample_file} controls></audio>
            
            <button onClick={()=>handleSampleDelete(samp._id)}>Delete</button>
            

            </>
          );
        })}
        <h2>Your Packs</h2>
      {user &&
        user.packs.map((pack) => {
          console.log(pack);

          return (
            <>
            <h3>{pack.pack_name}</h3>
            <img id="pack_image" src={pack.pack_image} alt="Pack"/>
            
            <button onClick={()=>handlePackDelete(pack._id)}>Delete</button>
            {user && <Link to={`/pack-details/${pack._id}`}>Open pack</Link>}
 
            </>
          );
        })}
    </div>
  );
};

export default Profile;