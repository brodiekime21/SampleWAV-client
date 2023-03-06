import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post } from "../services/authService"
import { LoadingContext } from "../context/loading.context";
import { useContext } from "react";



const CreateSample = () => { 
    const { id } = useParams();
    const { user } = useContext(LoadingContext);
    const {sample, setSample} = useContext(LoadingContext)

    const [sampleFile, setSampleFile] = useState('');
    const [sampleName, setSampleName] = useState('');
    const [musicTags, setMusicTags] = useState([]);
    const [instrument, setInstrument] = useState('');
    const [genres, setGenres] = useState('');
    const [key, setKey] = useState('');
    const [bpm, setBpm] = useState('');
    const [type, setType] = useState('');
    const [sampleImage, setSampleImage] = useState('');


    // const [ sample, setSample ] = useState({}
    //     // {
    //     //     sample_file: '',
    //     //     sample_name: '',
    //     //     music_tags: '',
    //     //     instrument: '',
    //     //     genres: '',
    //     //     key: '',
    //     //     bpm: '',
    //     //     type: '',
    //     //     artist_name: '',
    //     //     sample_image: '',
    //     // }
    // )

    const navigate = useNavigate()

    useEffect(() => {
        if (sample) {
            setSampleFile(sample.sample_file);
            setSampleName(sample.sample_name);
            setMusicTags(sample.music_tags);
            setInstrument(sample.instrument)
            setGenres(sample.genres);
            setKey(sample.key);
            setBpm(sample.bpm);
            setType(sample.type);
            setSampleImage(sample.sample_image)
    
        }
      }, [sample]);


      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const res = await post(`/samples/create-sample/${id}`, { 
              sample_file: sampleFile, 
              sample_name: sampleName,
              music_tags: musicTags,
              instrument: instrument,
              genres: genres,
              key: key,
              bpm: bpm,
              type: type,
              sample_image: sampleImage
            });
            console.log(res.data);
            setSample(res.data)
            
          } catch (err) {
            console.log(err);
          }
        }

    // const handleChange = (e) => {
    //     setSample((recent)=>({...recent, [e.target.name]: e.target.value}))
    //     console.log("Creating sample", newSample)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     post('/samples/create-sample', newSample)
    //         .then((results) => {
    //             console.log("Created Sample", results.data)
    //             navigate(`/profile/:id`)                
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // } 


      const handleSampleUpload = (e) => {

        console.log("Uploading sample...")
    
          const uploadData = new FormData()
          uploadData.append('sample', e.target.files[0])
          console.log("Upload data" , uploadData, e.target.files)
          post('/samples/create-sample', uploadData)
            .then((result) => {
              setSample(result.data.sample)
              console.log("This is sample", result.data)
            })
            .catch((err) => {
              console.log("Upload error", err)
            })
      }

    return (
        <div>
            <h1>Create Your Sample</h1>
            {user && (
            <form onSubmit={handleSubmit}>

            <label>
            Sample file:
            <input type="file" name="sample_file" 
            onChange={(e) => handleSampleUpload(e)}
            // onChange={(e) => setProfileImage(e.target.value)}
             />
          </label>

                <label>Sample Name</label>
                <input type='text' name="sample_name" onChange={(e) => setSample(e.target.value)}></input>

                <label>bpm</label>
                <input type='number' name="bpm" onChange= {(e) => setSample(e.target.value)}></input>

                <button type="submit">Create Sample</button>

            </form>
            )}
        </div>
    )
}

export default CreateSample