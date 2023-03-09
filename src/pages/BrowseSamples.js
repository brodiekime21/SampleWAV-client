import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar'
// import styled from "styled-components";
import { baseUrl } from "../services/baseUrl";


const BrowseSamples = () => {
  const { sample, setSample  } = useContext(LoadingContext);

//   const { user  } = useContext(LoadingContext);
//   const { userId } = useParams();

  // const [samples, setSamples] = useState(null);
  // useEffect(() => {
  //   get(`/samples/browse-samples`).then((response) => {
  //     console.log(response.data);
  //     setSamples(response.data);
  //     console.log("THIS IS THE LINE 22",samples)
  //   });
  // }, [samples]);

  useEffect(() => {
    get(`/samples/browse-samples`).then((response) => {
      console.log(response.data);
      setSample(response.data);
    });
  }, [sample]);


  return (
    <div>
        <h2>All Samples</h2>
      {sample && (
        sample.map((sample) => {
          console.log(sample);

          return (
            <>
            <h3>{sample.sample_name}</h3>
            <img id="sample_image" src={sample.sample_image} alt="Sample"/>
            <audio src={sample.sample_file} controls></audio>
            <a href={`${baseUrl}/samples/${sample._id}/download`} download>Download</a>

 
            </>
          );
        }))}
    </div>
  );
};

export default BrowseSamples;