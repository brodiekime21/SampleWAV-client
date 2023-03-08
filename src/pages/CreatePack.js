import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post } from "../services/authService"
import { LoadingContext } from "../context/loading.context";
import { useContext } from "react";
import Select from 'react-select';
import { genreOptions, instrumentOptions } from "../services/options";



const CreatePack = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(LoadingContext);
  const {sample} = useContext(LoadingContext)
  const {pack} = useContext(LoadingContext)


  const [samples, setSamples] = useState('');
  const [packName, setPackName] = useState('');
  const [instruments, setInstruments] = useState('');
  const [genres, setGenres] = useState([]);
  const [packImage, setPackImage] = useState('');
  const [oldPackImage, setOldPackImage] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    if (pack) {
        setSamples(sample.samples);
        setPackName(sample.pack_name);
        setInstruments(sample.instruments)
        setGenres(sample.genres);
        setOldPackImage(sample.pack_image)
    }
  }, [pack]);


  const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const res = await post(`/packs/create-pack`, { 
              samples: samples, 
              pack_name: packName,
              instruments: [] || instruments.map((curr) => curr.value),
              genres: [] || genres.map((curr) => curr.value),
              pack_image: packImage || oldPackImage,
            });
            console.log("NEW PACK", res.data);
            setUser(res.data);
            navigate(`/profile/${id}`);
            
          } catch (err) {
            console.log(err);
          }
  }

  // const handleSampleUpload = (e) => {

  //       console.log("Uploading sample...")
    
  //         const uploadData = new FormData()
  //         uploadData.append('sampleFile', e.target.files[0])

  //         if (e.target.files.length){          
  //         console.log("Upload data" , uploadData, e.target.files)
  //         post('/samples/new-sample-file', uploadData)
  //           .then((result) => {
  //             setSampleFile(result.data.sampleFile)
  //             console.log("This is sample", result.data)
  //           })
  //           .catch((err) => {
  //             console.log("Upload error", err)
  //           })}
  // }

  const handlePackImageUpload = (e) => {

        console.log("Uploading pack image...")
    
          const uploadData = new FormData()
          uploadData.append('packImage', e.target.files[0])

          if (e.target.files.length){  
          console.log("Upload data" , uploadData, e.target.files)
          post('/packs/new-pack-image', uploadData)
            .then((result) => {
              setPackImage(result.data.packFile)
              console.log("This is pack", result.data)
            })
            .catch((err) => {
              console.log("Upload error", err)
            })}
  }

  return (
        <div>
          <h1>Create Your Pack</h1>
            {user && (
              <form onSubmit={handleSubmit}>

                <label>
                  Pack samples:

                </label>

                <label>
                  Pack Image:
                  <input type="file" name="pack_image" 
                  onChange={(e) => handlePackImageUpload(e)}

                  />
                </label>

                <label>Pack Name
                  <input type='text' name="pack_name" onChange={(e) => setPackName(e.target.value)} />
                </label>


                <label htmlFor="instruments">Choose the instruments:</label>
                  <Select name="instruments" id="instruments" options={instrumentOptions} isMulti onChange={(e) => setInstruments(e.value)}>
                </Select>

                <label htmlFor="genres">Choose the genres:</label>
                  <Select name="genres" options={genreOptions} id="genres" isMulti onChange={(e) => {console.log(genres) ;setGenres(e)}}>
                  </Select>

                <button type="submit">Create Sample</button>

              </form>
            )}
        </div>
  )
}



export default CreatePack