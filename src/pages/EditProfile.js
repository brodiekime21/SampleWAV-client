import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { useEffect } from 'react';
import { post } from '../services/authService'


const EditProfile = () => {
  const { id } = useParams();
  const [artistName, setArtistName] = useState('');
  const { user, setUser } = useContext(LoadingContext);


  useEffect(() => {
    if (user) {
      setArtistName(user.artist_name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post(`/users/edit-profile/${id}`, { artist_name: artistName });
      console.log(res.data);
      setUser(res.data)
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
            <input type="text" name="artistName" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
          </label>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default EditProfile;
