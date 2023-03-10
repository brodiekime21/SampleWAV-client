import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../services/baseUrl";


const PackDetails = () => {
//   const { user, setUser  } = useContext(LoadingContext);
//   const { userId } = useParams();
//   const {pack, setPack} = useContext(LoadingContext);

  // let newUser = setUser(user)
  // const joinDate = new Date(user.created_at).toLocaleDateString();

  // const [mySamples, setMySamples] = useState(null);
  // useEffect(() => {
  //   get(`/samples/browse-samples?userId=${userId}`).then((response) => {
  //     console.log(response.data);
  //     setMySamples(response.data);
  //     console.log("THIS IS THE USER LINE 25",user)
  //   });
  // }, [userId]);

//   const navigate = useNavigate()

//   const handleSampleDelete = (id) => {
//     get(`/samples/delete/${id}`)
//     .then((result) => {
//       console.log("after delete", result.data)
//       setUser(result.data)
//       navigate(`/profile/${id}`)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
    
//   }

const { user, pack, setPack } = useContext(LoadingContext)

const [packDetail, setPackDetail]= useState([])

const { id } = useParams()


useEffect(() => {
    
        get(`/packs/pack-details/${id}`)
        .then((results) => {
            console.log("Found pack", results)
            
            setPackDetail(results.data)
            
        })
        .catch((err) => {
            console.log(err)
        })
    
}, [id])

return (
<div class="bg-white p-4 mb-4 rounded-md shadow-md">
    {packDetail && (
        <div>
            <h1 class="text-3xl font-bold mb-4">{packDetail.pack_name}</h1>
            <img id="pack_image" src={packDetail.pack_image} alt="Pack" class="w-30 mb-4"/>
            
        </div>
    )}
    <h2 class="text-2xl font-medium mb-4">The Samples</h2>
    {packDetail && (
        <>
            {console.log(pack)}
            {packDetail.samples ? (
                packDetail.samples.map((sample) => (
                    <div class="flex items-center bg-gray-100 mb-4 p-4 rounded-md shadow-md">
                        <img src={sample.sample_image} alt="Sample" class="w-1/6 h-20 w-20 mr-4"/>
                        <div class="w-4/5">
                            <h3 class="text-2xl font-medium">{sample.sample_name}</h3>
                            <div class="flex justify-between items-center mt-2">
                                <p class="mr-4">BPM: {sample.bpm}</p>
                                <p class="mr-4">Key: {sample.key}</p>
                                <p class="mr-4">Instrument: {sample.instrument}</p>
                                <p class="mr-4">Type: {sample.type}</p>
                                <div class="flex flex-wrap">
                                    {sample.genres.map((genre, index) => (
                                        <span key={index} class="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm">{genre}</span>
                                    ))}
                                </div>
                            </div>
                            <div class="flex justify-end mt-2">
                                <audio src={sample.sample_file} controls class="w-4/5 mr-4"></audio>
                                <a href={`${baseUrl}/samples/${sample._id}/download`} download class="mr-2 bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700">Download</a>
                                {/* <button onClick={()=>handleSampleDelete(pack._id)}>Delete</button> */}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h4>Loading...</h4>
            )}
        </>
    )}
</div>
  );
};

export default PackDetails;