// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext, useState, useEffect } from "react";
// import { LoadingContext } from "../context/loading.context";
// import { post } from '../services/authService'
// import CreateSocialLinks from '../components/CreateSocialLinks';

// const EditProfile = () => {
//   const { id } = useParams();
//   const { user, setUser } = useContext(LoadingContext);
//   const [artistName, setArtistName] = useState('');
//   const [profileImage, setProfileImage] = useState('');
//   const [oldProfileImage, setOldProfileImage] = useState('')
//   const [city, setCity] = useState('');
//   const [country, setCountry] = useState('');
//   const [bio, setBio] = useState('');

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (user) {
//       setArtistName(user.artist_name);
//       setOldProfileImage(user.profile_image);
//       setCity(user.city);
//       setCountry(user.country);
//       setBio(user.bio);
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await post(`/users/edit-profile/${id}`, { 
//         artist_name: artistName, 
//         profile_image: profileImage || oldProfileImage,
//         city: city,
//         country: country,
//         bio: bio
//       });
//       console.log(res.data);
//       setUser(res.data)
//       navigate(`/profile/${id}`)

      
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setProfileImage('')
//     }
//   }

//   const handleFileUpload = (e) => {

//     console.log("Uploading photo...")

//       const uploadData = new FormData()
//       uploadData.append('profileImage', e.target.files[0])

//       console.log("FILE LIST", e.target.files.length)

//       if (e.target.files.length){
//       post('/users/new-profile-photo', uploadData)
//         .then((result) => {
//           setProfileImage(result.data.profileImage)
//           console.log("This is photo", result.data)
//         })
//         .catch((err) => {
//           console.log("Upload error", err)
//         })}
//   }

//   return (
//     <div>
//       <h1>Edit Profile</h1>
//       {user && (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Profile Picture:
//             <input type="file" name="profileImage" 
//             onChange={(e) => handleFileUpload(e)}
//              />
//           </label>
//           <button type="submit">Save</button>
//         </form>
//       )}
//       <CreateSocialLinks />
//     </div>
//   );
// }

// export default EditProfile;


import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import { post } from '../services/authService'
import CreateSocialLinks from '../components/CreateSocialLinks';
import { get } from '../services/authService';

const EditProfile = () => {
  const { id } = useParams();
  const { user, setUser, setSample } = useContext(LoadingContext);
  const [artistName, setArtistName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [oldProfileImage, setOldProfileImage] = useState('')
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [isUploading, setIsUploading] = useState(false); // new state variable

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setArtistName(user.artist_name);
      setOldProfileImage(user.profile_image);
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
        profile_image: profileImage || oldProfileImage,
        city: city,
        country: country,
        bio: bio
      });
      console.log(res.data);
      setSample(previous => [...previous])
      navigate(`/profile/${id}`)

      
    } catch (err) {
      console.log(err);
    } finally {
      setProfileImage('')
    }
  }

  const handleFileUpload = (e) => {
    setIsUploading(true); // set isUploading to true
    console.log("Uploading photo...")
    const uploadData = new FormData()
    uploadData.append('profileImage', e.target.files[0])
    console.log("FILE LIST", e.target.files.length)
    if (e.target.files.length){
      post('/users/new-profile-photo', uploadData)
        .then((result) => {
          setProfileImage(result.data.profileImage)
          console.log("This is photo", result.data)
        })
        .catch((err) => {
          console.log("Upload error", err)
        })
        .finally(() => {
          setIsUploading(false); // set isUploading to false after the upload is complete
        });
    }
  }

  const handleUserDelete = (id) => {
    get(`/users/delete/${id}`)
    localStorage.clear();
    setUser(null)
    navigate(`/`)
    // .then((result) => {
    //   console.log("after delete", result.data)
    //   setUser(null)
    //   navigate(`/`)
    // })
    .catch((err) => {
      console.log(err)
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
          <label>
            Profile Picture:
            <input type="file" name="profileImage" 
            onChange={(e) => handleFileUpload(e)}
             />
          </label>
          {isUploading ? (
            <p>Uploading photo...</p>
          ) : (
            <button type="submit">Save</button>
          )}
        </form>
      )}
      {/* <CreateSocialLinks /> */}

      <button onClick={()=>handleUserDelete(user._id)}>Delete Profile</button>

    </div>
  );
}

export default EditProfile;