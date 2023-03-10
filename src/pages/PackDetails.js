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
    <div>
      {packDetail && (
        <div>
            <h1>{packDetail.pack_name} Details</h1>
            <img id="pack_image" src={packDetail.pack_image} alt="Pack"/>
          
        </div>
      )}

     <h2>The Samples</h2>

     { packDetail && 
        
        <>
        {console.log(pack)}
     {


      packDetail.samples ? 

        
     
      packDetail.samples.map((sample) => {
       return (
           <>
           <div className="samples">
           <p>{sample.sample_name}</p>
           <p>BPM: {sample.bpm}</p>
           <p>Type: {sample.type}</p>

           <p>Key: {sample.key}</p>
           <p>instrument: {sample.instrument}</p>
           <p>genres:</p>
           {
            sample.genres.map((genre)=>{
              return(
                <>
                    <p>{genre}</p>
                </>
              )
            })
           }
           <audio src={sample.sample_file} controls></audio>
           <a href={`${baseUrl}/samples/${sample._id}/download`} download>Download</a>
           </div>

       
           {/* <button onClick={()=>handleSampleDelete(pack._id)}>Delete</button> */}
       
     
           </>
      );
     })

     : <h4>Loading...</h4>




     }

        </>



     }
        
    
    </div>
  );
};

export default PackDetails;