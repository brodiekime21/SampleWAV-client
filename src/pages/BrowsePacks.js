import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar'

// import styled from "styled-components";


const BrowsePacks = () => {
    const { pack, setPack  } = useContext(LoadingContext);


//   const { user  } = useContext(LoadingContext);
//   const { userId } = useParams();

//   const [samples, setSamples] = useState(null);
//   useEffect(() => {
//     get(`/samples/browse-samples`).then((response) => {
//       console.log(response.data);
//       setSamples(response.data);
//       console.log("THIS IS THE LINE 22",samples)
//     });
//   }, [samples]);

useEffect(() => {
    get(`/packs/browse-packs`).then((response) => {
      console.log(response.data);
      setPack(response.data);
    });
  }, []);

return (
    <div>
        <h2>All Packs</h2>
      {pack &&
        pack.map((pack) => {
          console.log(pack);

          return (
            <>
            <h3>{pack.pack_name}</h3>
            <img id="pack_image" src={pack.pack_image} alt="Pack"/>
            
            <Link to={`/pack-details/${pack._id}`}>Open pack</Link>

            </>
          );
        })}
    </div>
  );
};

export default BrowsePacks;