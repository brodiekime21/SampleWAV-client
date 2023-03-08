import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";


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

const { id } = useParams()


useEffect(() => {
    if (!pack) {
        get(`/packs/pack-details/${id}`)
        .then((results) => {
            // console.log("Found pack", results.data)
            
            setPack(results.data)
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
}, [])



return (
    <div>
      {pack && (
        <div>
            <h1>{pack.pack_name} Details</h1>
            <img id="pack_image" src={pack.pack_image} alt="Pack"/>
          
        </div>
      )}

     <h2>The Samples</h2>

     { pack && 
        
        <>
        {console.log(pack)}
     {


        pack.samples.length ?

        
     
       pack.samples.map((sample) => {
       return (
           <>
           <p>{sample.sample_name}</p>
           <p>{sample.bpm}</p>
           <p>{sample.genres}</p>
           <p>{sample.instrument}</p>
           {
            sample.genres.map((genre)=>{
              return(
                <>
                    <p>{genre.genres}</p>
                </>
              )
            })
           }
           <audio src={sample.sample_file} controls></audio>
       
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