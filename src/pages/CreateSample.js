import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post } from "../services/authService"
import { LoadingContext } from "../context/loading.context";
import { useContext } from "react";



const CreateSample = () => { 
    const { id } = useParams();
    const { user } = useContext(LoadingContext);
    const {sample} = useContext(LoadingContext)

    const [sampleFile, setSampleFile] = useState('');
    const [sampleName, setSampleName] = useState('');
    const [musicTags, setMusicTags] = useState([]);
    const [instrument, setInstrument] = useState('');
    const [genres, setGenres] = useState('');
    const [key, setKey] = useState('');
    const [bpm, setBpm] = useState('');
    const [type, setType] = useState('');
    const [sampleImage, setSampleImage] = useState('');


    const [ newSample, setSample ] = useState([]
        // {
        //     sample_file: '',
        //     sample_name: '',
        //     music_tags: '',
        //     instrument: '',
        //     genres: '',
        //     key: '',
        //     bpm: '',
        //     type: '',
        //     artist_name: '',
        //     sample_image: '',
        // }
    )

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

    const handleChange = (e) => {
        setSample((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Creating sample", newSample)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/samples/create-sample', newSample)
            .then((results) => {
                console.log("Created Sample", results.data)
                navigate(`/profile/:id`)                
            })
            .catch((err) => {
                console.log(err)
            })
    } 

    return (
        <div>
            <h1>Create Your Sample</h1>
            <form onSubmit={handleSubmit}>

                <label>Sample File</label>
                <input type='file' name="sample_file" value={newSample.sample_file} onChange={handleChange}></input>

                <label>Sample Name</label>
                <input type='text' name="sample_name" value={newSample.sample_name} onChange={handleChange}></input>

                <label>bpm</label>
                <input type='number' name="bpm" value={newSample.bpm} onChange={handleChange}></input>

                <button type="submit">Create Sample</button>

            </form>

        </div>
    )
}

export default CreateSample