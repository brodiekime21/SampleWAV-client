import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar';
import PackDetails from "./PackDetails";

const Profile = () => {
  const { user, setUser, setPack, setSample  } = useContext(LoadingContext);

  // const { id } = useParams();

  // const joinDate = new Date(user.created_at).toLocaleDateString();

  const navigate = useNavigate()

  const handleSampleDelete = (id) => {
    get(`/samples/delete/${id}`)
    .then((result) => {
      console.log("after delete", result.data)
      setPack(previous => [...previous])
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
      setSample(previous => [...previous])

      // setUser(result.data)
      navigate(`/profile/${id}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }


return (
    <div>
      {user && (
        <div>
          <p>{user.artist_name}</p>
          <p>Location: {user.city}, {user.country}</p>
          <Avatar round="true" id="profile_image" src={user.profile_image} alt="Profile"/>
          <div>
            <p>Bio: {user.bio}</p>
            {/* <p>Social Links: </p> */}
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
            
            <button onClick={()=>handleSampleDelete(samp._id)}>Delete</button>
            
            </div>
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

// import { useContext, useState, useEffect } from "react";
// import { LoadingContext } from "../context/loading.context";
// import ProfileNavbar from "../components/ProfileNavbar";
// import { get } from "../services/authService";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Avatar from 'react-avatar';
// import PackDetails from "./PackDetails";

// const Profile = () => {
//   const { user, setUser, setPack, setSample  } = useContext(LoadingContext);

//   // const { id } = useParams();

//   // const joinDate = new Date(user.created_at).toLocaleDateString();

//   const navigate = useNavigate()

//   const handleSampleDelete = (id) => {
//     get(`/samples/delete/${id}`)
//     .then((result) => {
//       console.log("after delete", result.data)
//       setPack(previous => [...previous])
//       navigate(`/profile/${id}`)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }

//   const handlePackDelete = (id) => {
//     get(`/packs/delete/${id}`)
//     .then((result) => {
//       console.log("after delete", result.data)
//       setSample(previous => [...previous])

//       // setUser(result.data)
//       navigate(`/profile/${id}`)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }


// return (
//     <div>
//       <h1>Your Profile</h1>
//       {user && (
//         <div>
//           <p>{user.artist_name}</p>
//           <p>Location: {user.city}, {user.country}</p>
//           <Avatar round="true" id="profile_image" src={user.profile_image} alt="Profile"/>
//           <div>
//             <p>Bio: {user.bio}</p>
//             {/* <p>Social Links: </p> */}
//           </div>
          
//           {/* <p>Member Since: {joinDate}</p> */}
//         </div>
//       )}
    
//      <ProfileNavbar />

//      {user.samples.length > 0 && (
//         <>
//           <h2>Your Samples</h2>
//           {user.samples.map((samp) => {
//             console.log(samp.sample_file);
//             return (
//               <>
//               <div className="samples">
//              <p>{samp.sample_name}</p>
//              <p>BPM: {samp.bpm}</p>
//              <p>Type: {samp.type}</p>

//              <p>Key: {samp.key}</p>
//              <p>Instrument: {samp.instrument}</p>
//              <p>Genres:</p>
//              {
//               samp.genres.map((genre)=>{
//                 return(
//                   <>
//                       <p>{genre}</p>
//                   </>
//                 )
//               })
//              }
//               <img id="sample_image" src={samp.sample_image} alt="Sample"/>

//               <audio src={samp.sample_file} controls></audio>
              
//               <button onClick={()=>handleSampleDelete(samp._id)}>Delete</button>
              
//               </div>
//               </>
//             );
//           })}
//         </>
//       )}

//       {user.packs.length > 0 && (
//         <>

//         <h2>Your Packs</h2>
//       {user &&
//         user.packs.map((pack) => {
//           console.log(pack);

//           return (
//             <>
//             <h3>{pack.pack_name}</h3>
//             <img id="pack_image" src={pack.pack_image} alt="Pack"/>
            
//             <button onClick={()=>handlePackDelete(pack._id)}>Delete</button>
//             {user && <Link to={`/pack-details/${pack._id}`}>Open pack</Link>}
 
//             </>
//           );
//         })}
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;