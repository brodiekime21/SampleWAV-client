
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LoadingContext } from "../context/loading.context";
import { get } from "../services/authService";
import { Link } from 'react-router-dom';



function Home() {
  const { allUsers, setAllUsers  } = useContext(LoadingContext);


  useEffect(() => {
    get('/users').then(response => {
        console.log("response LINE @&!!!", response.data);

    setAllUsers(response.data);
    });
  }, []);

  return (

    <div>
        <img src={require('../logoColor.png')} alt="SampleWAV logo"/>
        <h2>Create your own wave or start browsing the samples of our top creators</h2>
      {allUsers.map(user => (
        <div key={user._id}>
          <Link to={`/browse-profile/${user._id}`}>
            <img src={user.profile_image} alt={user.artist_name} />
            <span>{user.artist_name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;





