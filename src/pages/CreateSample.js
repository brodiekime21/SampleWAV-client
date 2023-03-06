import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { post } from "../services/authService"
// import { LoadingContext } from "../context/loading.context"

const CreateSample = () => { 


    const [ newSample, setSample ] = useState(
        {
            sample_file: '',
            sample_name: '',
            music_tags: '',
            instrument: '',
            genres: '',
            key: '',
            bpm: '',
            type: '',
            artist_name: '',
            sample_image: '',
            pack: '',
        }
    )

    const navigate = useNavigate()

    const handleChange = (e) => {
        setSample((recent)=>({...recent, [e.target.name]: e.target.value}))
        console.log("Creating sample", newSample)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/create-sample', newSample)
            .then((results) => {
                console.log("Created User", results.data)
                navigate(`/profile/:id`)                
            })
            .catch((err) => {
                console.log(err)
            })
    } 

    return (
        <div>
            <h1>Signup</h1>
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