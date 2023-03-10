import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar';
import PackDetails from "./PackDetails";
import axios from "axios";

const BrowseProfile = () => {
const [profile, setProfile] = useState(null)
const { id } = useParams
  const navigate = useNavigate()

      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch(`/browse-profile/${id}`);
            const data = await response.json();
            setProfile(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchProfile();
      }, [id]);      
      
return (
    <div>
    <p></p>
      {profile && (
        <div>
          <p>{profile.artist_name}</p>
          <p>Location: {profile.city}, {profile.country}</p>
          <Avatar round="true" id="profile_image" src={profile.profile_image} alt="Profile"/>
          <div>
            <p>Bio: {profile.bio}</p>
            {/* <p>Social Links: </p> */}
          </div>
          
          {/* <p>Member Since: {joinDate}</p> */}
        </div>
      )}
    
     <h2>Your Samples</h2>
     {profile &&
        profile.samples.map((samp) => {
          console.log(samp.sample_file);
          return (
            <>
            <div className="samples">
           <p>{samp.sample_name}</p>
           <p>BPM: {samp.bpm}</p>
           <p>Type: {samp.type}</p>

           <p>Key: {samp.key}</p>
           <p>Instrument: {samp.instrument}</p>
           <p>Genres:</p>
           {
            samp.genres.map((genre)=>{
              return(
                <>
                    <p>{genre}</p>
                </>
              )
            })
           }
            <img id="sample_image" src={samp.sample_image} alt="Sample"/>

            <audio src={samp.sample_file} controls></audio>
                        
            </div>
            </>
          );
        })}
        <h2>Your Packs</h2>
      {profile &&
        profile.packs.map((pack) => {
          console.log(pack);

          return (
            <>
            <h3>{pack.pack_name}</h3>
            <img id="pack_image" src={pack.pack_image} alt="Pack"/>
            
            {profile && <Link to={`/pack-details/${pack._id}`}>Open pack</Link>}
 
            </>
          );
        })}
    </div>
  );
};

export default BrowseProfile;