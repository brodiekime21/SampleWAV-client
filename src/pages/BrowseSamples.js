import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useParams } from "react-router-dom";
import Avatar from 'react-avatar'
// import styled from "styled-components";


const BrowseSamples = () => {
//   const { user  } = useContext(LoadingContext);
//   const { userId } = useParams();

  // let newUser = setUser(user)
  // const joinDate = new Date(user.created_at).toLocaleDateString();

  const [samples, setSamples] = useState(null);
  useEffect(() => {
    get(`/samples/browse-samples`).then((response) => {
      console.log(response.data);
      setSamples(response.data);
      console.log("THIS IS THE LINE 22",samples)
    });
  }, [samples]);

return (
    <div>
      <h1>Browse Samples</h1>

     {samples.map((samp) => {
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

export default BrowseSamples;