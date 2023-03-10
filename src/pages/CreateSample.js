import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post } from "../services/authService"
import { LoadingContext } from "../context/loading.context";
import { useContext } from "react";
import Select from 'react-select';
import { genreOptions, keyOptions, instrumentOptions, typeOptions } from "../services/options";



const CreateSample = () => { 
  const { id } = useParams();
  const { user, setUser } = useContext(LoadingContext);
  const {sample, setSample} = useContext(LoadingContext)


  const [sampleFile, setSampleFile] = useState('');
  const [sampleName, setSampleName] = useState('');
  const [instrument, setInstrument] = useState('');
  const [genres, setGenres] = useState([]);
  const [key, setKey] = useState('');
  const [bpm, setBpm] = useState('');
  const [type, setType] = useState('');
  const [sampleImage, setSampleImage] = useState('');
  const [oldSampleFile, setOldSampleFile] = useState('');
  const [oldSampleImage, setOldSampleImage] = useState('');
  const [isUploadingFile, setIsUploadingFile] = useState(false); // new state variable
  const [isUploadingImage, setIsUploadingImage] = useState(false); // new state variable


  const navigate = useNavigate()

  useEffect(() => {
    if (sample) {
        setOldSampleFile(sample.sample_file);
        setSampleName(sample.sample_name);
        setInstrument(sample.instrument)
        setGenres(sample.genres);
        setKey(sample.key);
        setBpm(sample.bpm);
        setType(sample.type);
        setOldSampleImage(sample.sample_image)
    }
  }, [sample]);

  const handleSubmit = async (e) => {
          e.preventDefault();

          try {
            const res = await post(`/samples/create-sample`, { 
              sample_file: sampleFile || oldSampleFile, 
              sample_name: sampleName,
              instrument: instrument,
              genres: genres || [],
              key: key,
              bpm: bpm,
              type: type,
              sample_image: sampleImage || oldSampleImage,
            });
            console.log("NEW SAMPLE line 60", res.data);
            setSample(res.data.samples);
            navigate(`/profile/${user._id}`);
            
          } catch (err) {
            console.log(err);
          }
  }

  const handleGenresChange = (e)=>{
    setGenres(e.map((curr) => curr.value))
  }

  const handleSampleUpload = (e) => {
    setIsUploadingFile(true); // set isUploading to true


        console.log("Uploading sample...")
    
          const uploadData = new FormData()
          uploadData.append('sampleFile', e.target.files[0])

          if (e.target.files.length){          
          console.log("Upload data" , uploadData, e.target.files)
          post('/samples/new-sample-file', uploadData)
            .then((result) => {
              setSampleFile(result.data.sampleFile)
              console.log("This is sample", result.data)
            })
            .catch((err) => {
              console.log("Upload error", err)
            })
            .finally(() => {
              setIsUploadingFile(false); // set isUploading to false after the upload is complete
            });
          }
  }

  const handleSampleImageUpload = (e) => {
    setIsUploadingImage(true); // set isUploading to true

        console.log("Uploading sample image...")
    
          const uploadData = new FormData()
          uploadData.append('sampleImage', e.target.files[0])

          if (e.target.files.length){  
          console.log("Upload data" , uploadData, e.target.files)
          post('/samples/new-sample-image', uploadData)
            .then((result) => {
              setSampleImage(result.data.sampleImage)
              console.log("This is sample", result.data)
            })
            .catch((err) => {
              console.log("Upload error", err)
            })
            .finally(() => {
              setIsUploadingImage(false); // set isUploading to false after the upload is complete
            });
          }
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

                  />
                </label>

                <label>
                  Sample Image:
                  <input type="file" name="sample_image" 
                  onChange={(e) => handleSampleImageUpload(e)}

                  />
                </label>

                <label>Sample Name
                  <input type='text' name="sample_name" onChange={(e) => setSampleName(e.target.value)} />
                </label>

                <label>BPM
                  <input type='number' name="bpm" onChange= {(e) => setBpm(e.target.value)}/>
                </label>

                <label htmlFor="key">Choose the key:</label>
                  <Select name="key" id="key" options={keyOptions} onChange={(e) => setKey(e.value)}>
                </Select>

                <label htmlFor="type">Choose the type:</label>
                  <Select name="type" id="type" options={typeOptions} onChange={(e) => setType(e.value)}>
                </Select>

                <label htmlFor="instrument">Choose the instrument:</label>
                  <Select name="instrument" id="instrument" options={instrumentOptions} onChange={(e) => setInstrument(e.value)}>
                </Select>

                <label htmlFor="genres">Choose the genres:</label>
                  <Select name="genres" options={genreOptions} id="genres" isMulti onChange={
                    (e) =>  handleGenresChange(e)
                    }>
                  </Select>

                  {isUploadingFile || isUploadingImage ? (
            <p>Uploading file or photo...</p>
          ) : (
                <button type="submit">Create Sample</button>

          )}

              </form>
            )}
        </div>
  )
}



export default CreateSample