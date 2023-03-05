import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { useEffect } from 'react';


const EditProfile = () => {
  const { userId } = useParams();
  const [artistName, setArtistName] = useState('');
  const { user } = useContext(LoadingContext);


  useEffect(() => {
    if (user) {
      setArtistName(user.artist_name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/edit-profile/${userId}`, { artist_name: artistName });
      console.log(res.data);
      // do something with the updated user data, e.g. redirect to profile page
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      {user && (
        <form onSubmit={handleSubmit}>
          <label>
            Artist Name:
            <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
          </label>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default EditProfile;
