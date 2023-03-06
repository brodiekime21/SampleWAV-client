import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { useEffect } from 'react';
import { post } from '../services/authService'
import CreateSocialLinks from '../components/CreateSocialLinks';


const EditProfile = () => {
  const { id } = useParams();
  const [artistName, setArtistName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const { user, setUser } = useContext(LoadingContext);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');





  useEffect(() => {
    if (user) {
      setArtistName(user.artist_name);
      setProfileImage(user.profile_image);
      setCity(user.city);
      setCountry(user.country);
      setBio(user.bio);

    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post(`/users/edit-profile/${id}`, { 
        artist_name: artistName, 
        profile_image: profileImage,
        city: city,
        country: country,
        bio: bio
      });
      console.log(res.data);
      setUser(res.data)
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileUpload = (e) => {

    console.log("Uploading photo...")

      const uploadData = new FormData()
      uploadData.append('profileImage', e.target.files[0])
      console.log("Upload data" , uploadData, e.target.files)
      post('/users/new-profile-photo', uploadData)
        .then((result) => {
          setProfileImage(result.data.profileImage)
          console.log("This is photo", result.data)
        })
        .catch((err) => {
          console.log("Upload error", err)
        })
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      {user && (
        <form onSubmit={handleSubmit}>
          <label>
            Artist Name:
            <input type="text" name="artistName" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
          </label>
          <label>
            Profile Picture:
            <input type="file" name="profileImage" 
            onChange={(e) => handleFileUpload(e)}
            // onChange={(e) => setProfileImage(e.target.value)}
             />
          </label>
          <label>
            Bio:
            <input type="text" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <label>
            City:
            <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>
          <button type="submit">Save</button>
        </form>
      )}
      <CreateSocialLinks />
    </div>
  );
}

export default EditProfile;
