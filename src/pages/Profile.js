import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams, Link } from "react-router-dom";
import Avatar from "react-avatar";
import PackDetails from "./PackDetails";

const Profile = () => {
  const { user, setUser, setPack, setSample } = useContext(LoadingContext);

  // const { id } = useParams();

  // const joinDate = new Date(user.created_at).toLocaleDateString();

  const navigate = useNavigate();

  const handleSampleDelete = (id) => {
    get(`/samples/delete/${id}`)
      .then((result) => {
        console.log("after delete", result.data);
        setPack((previous) => [...previous]);
        navigate(`/profile/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePackDelete = (id) => {
    get(`/packs/delete/${id}`)
      .then((result) => {
        console.log("after delete", result.data);
        setSample((previous) => [...previous]);

        // setUser(result.data)
        navigate(`/profile/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        {user && (
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Avatar
                round="true"
                id="profile_image"
                size="100"
                src={user.profile_image}
                alt="Profile"
              />
              <div className="ml-4">
                <p className="text-3xl font-bold">{user.artist_name}</p>
                <p className="text-lg">
                  {user.city}, {user.country}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg">{user.bio}</p>
              {/* <p>Social Links: </p> */}
            </div>
            {/* <p>Member Since: {joinDate}</p> */}
          </div>
        )}
      </div>

      <ProfileNavbar />

      <h3 className="text-3xl font-bold">Your Samples</h3>

      {user &&
        user.samples.map((samp) => {
          console.log(samp.sample_file);
          return (
            <>
              <div className="flex items-center bg-gray-100 mb-4 p-4 rounded-md shadow-md ">
                <img
                  src={samp.sample_image}
                  alt="Sample"
                  className="w-1/6 h-20 w-20 mr-4"
                />
                <div className="w-4/5">
                  <h3 className="text-2xl font-medium">{samp.sample_name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p>BPM: {samp.bpm}</p>
                    <p>Key: {samp.key}</p>
                    <p>Instrument: {samp.instrument}</p>
                    <p>Type: {samp.type}</p>
                    <div className="flex flex-wrap">
                      {samp.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <audio
                      src={samp.sample_file}
                      controls
                      style={{ width: "80%" }}
                    ></audio>
                    <button
                      className="mr-2 bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700"
                      onClick={() => handleSampleDelete(samp._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      <h3 className="text-3xl font-bold">Your Packs</h3>
      {user &&
        user.packs.map((pack) => {
          console.log(pack);

          return (
            <>
              <div className="flex items-center bg-gray-100 mb-4 p-4 rounded-md shadow-md">
                <img
                  src={pack.pack_image}
                  alt="Pack"
                  className="w-1/6 h-20 w-20 mr-4"
                />
                <div className="w-4/5">
                  <h3 className="text-2xl font-medium">{pack.pack_name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p>Genres: </p>
                    <div className="flex flex-wrap">
                      {pack.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p>Instruments: </p>
                    <div className="flex flex-wrap">
                      {pack.instruments.map((instrument, index) => (
                        <span
                          key={index}
                          className="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm"
                        >
                          {instrument}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link
                      to={`/pack-details/${pack._id}`}
                      className="mr-2 bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700"
                    >
                      Open pack
                    </Link>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handlePackDelete(pack._id)}
                      className="mr-2 bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
