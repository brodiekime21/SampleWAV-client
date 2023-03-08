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
  const {pack, setPack} = useContext(LoadingContext)


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
          console.log("THIS IS samples",samples)
          console.log("THIS IS packName",packName)
          console.log("THIS IS instruments",instruments)
          console.log("THIS IS genres",genres)
          console.log("THIS IS packImage",packImage)
          console.log("THIS IS oldPackImage",oldPackImage)


          
          try {
            const res = await post(`/packs/create-pack`, { 
              samples: null || samples.map((curr) => curr.value) || [], 
              pack_name: packName,
              instruments: null || instruments.map((curr) => curr.value) || [],
              genres: null || genres.map((curr) => curr.value) || [],
              pack_image:  oldPackImage || packImage,
            });
            console.log("NEW PACK", res.data);
            setPack(res.data);
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
          console.log("Upload data" , uploadData)
          post('/packs/new-pack-image', uploadData)
            .then((result) => {
              setPackImage(result.data.packImage)
              console.log("This is pack image", result.data)
            })
            .catch((err) => {
              console.log("Upload error", err)
            })}
  }


  const sampleOptions = (samples) => {
    return samples.map((sample) => {
      return { label: sample.sample_name, value: sample._id}
    })
  }


  return (
        <div>
          <h1>Create Your Pack</h1>
            {user && 
            
            <> 
             
            {
              
              user.samples.length ? (

              <form onSubmit={handleSubmit}>

              {/* {console.log("This is user", user)} */}

              <label htmlFor="samples">Choose the samples from your library:</label>
                  <Select name="samples" id="samples" options={sampleOptions(user.samples)} isMulti onChange={(e) => setSamples(e)}>
                </Select>

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
                  <Select name="instruments" id="instruments" options={instrumentOptions} isMulti onChange={(e) => setInstruments(e)}>
                </Select>

                <label htmlFor="genres">Choose the genres:</label>
                  <Select name="genres" options={genreOptions} id="genres" isMulti onChange={(e) => {console.log(genres) ;setGenres(e)}}>
                  </Select>

                <button type="submit">Create Pack</button>

              </form>
              ) : (
          <p>Create samples first before you create your pack</p>
        )}
            </>
            }
        </div>
  )
}



export default CreatePack