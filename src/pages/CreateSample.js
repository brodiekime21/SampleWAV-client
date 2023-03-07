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
    const [genres, setGenres] = useState([]);
    const [key, setKey] = useState('');
    const [bpm, setBpm] = useState('');
    const [type, setType] = useState('');
    const [sampleImage, setSampleImage] = useState('');

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
            const res = await post(`/samples/create-sample`, { 
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
            setSampleFile(res.data)
            navigate(`/profile/${id}`)
            
          } catch (err) {
            console.log(err);
          }
        }

      const handleSampleUpload = (e) => {

        console.log("Uploading sample...")
    
          const uploadData = new FormData()
          uploadData.append('sampleFile', e.target.files[0])
          console.log("Upload data" , uploadData, e.target.files)
          post('/samples/new-sample-file', uploadData)
            .then((result) => {
              setSampleFile(result.data.sampleFile)
              console.log("This is sample", result.data)
            })
            .catch((err) => {
              console.log("Upload error", err)
            })
      }

      const handleSampleImageUpload = (e) => {

        console.log("Uploading sample image...")
    
          const uploadData = new FormData()
          uploadData.append('sampleImage', e.target.files[0])
          console.log("Upload data" , uploadData, e.target.files)
          post('/samples/new-sample-image', uploadData)
            .then((result) => {
              setSampleImage(result.data.sampleFile)
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

          <label>
            Sample Image:
            <input type="file" name="sample_image" 
            onChange={(e) => handleSampleImageUpload(e)}
            // onChange={(e) => setProfileImage(e.target.value)}
             />
          </label>

                <label>Sample Name
                <input type='text' name="sample_name" onChange={(e) => setSampleName(e.target.value)} />
                </label>

                <label>BPM
                <input type='number' name="bpm" onChange= {(e) => setBpm(e.target.value)}/>
                </label>






                  <label htmlFor="key">Choose the key:</label>
                  <select name="key" id="key" onChange={(e) => setKey(e.target.value)}>
                  <option value="A">A</option>
                  <option value="Amaj">A Major</option>
                  <option value="Amin">A Minor</option>
                  <option value="A#">A#</option>
                  <option value="A#maj">A# Major</option>
                  <option value="A#min">A# Minor</option>
                  <option value="Ab">Ab</option>
                  <option value="Abmaj">Ab Major</option>
                  <option value="Abmin">Ab Minor</option>
                  <option value="B">B</option>
                  <option value="Bmaj">B Major</option>
                  <option value="Bmin">B Minor</option>
                  <option value="B#">B#</option>
                  <option value="B#maj">B# Major</option>
                  <option value="B#min">B# Minor</option>
                  <option value="Bb">Bb</option>
                  <option value="Bbmaj">Bb Major</option>
                  <option value="Bbmin">Bb Minor</option>
                  <option value="C">C</option>
                  <option value="Cmaj">C Major</option>
                  <option value="Cmin">C Minor</option>
                  <option value="C#">C#</option>
                  <option value="C#maj">C# Major</option>
                  <option value="C#min">C# Minor</option>
                  <option value="Cb">Cb</option>
                  <option value="Cbmaj">Cb Major</option>
                  <option value="Cbmin">Cb Minor</option>
                  <option value="C">C</option>
                  <option value="Dmaj">D Major</option>
                  <option value="Dmin">D Minor</option>
                  <option value="D#">D#</option>
                  <option value="D#maj">D# Major</option>
                  <option value="D#min">D# Minor</option>
                  <option value="Db">Db</option>
                  <option value="Dbmaj">Db Major</option>
                  <option value="Dbmin">Db Minor</option>
                  <option value="E">E</option>
                  <option value="Emaj">E Major</option>
                  <option value="Emin">E Minor</option>
                  <option value="E#">E#</option>
                  <option value="E#maj">E# Major</option>
                  <option value="E#min">E# Minor</option>
                  <option value="Eb">Eb</option>
                  <option value="Ebmaj">Eb Major</option>
                  <option value="Ebmin">Eb Minor</option>
                  <option value="F">F</option>
                  <option value="Fmaj">F Major</option>
                  <option value="Fmin">F Minor</option>
                  <option value="F#">F#</option>
                  <option value="F#maj">F# Major</option>
                  <option value="F#min">F# Minor</option>
                  <option value="Fb">Fb</option>
                  <option value="Fbmaj">Fb Major</option>
                  <option value="Fbmin">Fb Minor</option>
                  <option value="G">G</option>
                  <option value="Gmaj">G Major</option>
                  <option value="Gmin">G Minor</option>
                  <option value="G#">G#</option>
                  <option value="G#maj">G# Major</option>
                  <option value="G#min">G# Minor</option>
                  <option value="Gb">Gb</option>
                  <option value="Gbmaj">Gb Major</option>
                  <option value="Gbmin">Gb Minor</option>
                  </select>


                <label htmlFor="type">Choose the type:</label>
                  <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                <option value="oneShot">One-shot</option>
                <option value="Loop">Loop</option>
                  </select>


                <label htmlFor="instrument">Choose the instrument:</label>
                  <select name="instrument" id="instrument" onChange={(e) => setInstrument(e.target.value)}>
                <option value="drums">drums</option>
                <option value="percussion">percussion</option>
                <option value="fx">fx</option>
                <option value="synth">synth</option>
                <option value="vocal">vocal</option>
                <option value="bass">bass</option>
                <option value="brass">brass</option>
                <option value="woodwinds">woodwinds</option>
                <option value="keys">keys</option>
                <option value="guitar">guitar</option>
                  </select>



                <label htmlFor="genres">Choose the genres (hold ctrl for windows or command for mac to select multiple)</label>
                  <select name="genres"  id="genres" multiple onChange={(e) => setGenres(e.target.value)}>
                <option value="house">house</option>
                <option value="trap">trap</option>
                <option value="hipHop">hip hop</option>
                <option value="pop">pop</option>
                <option value="edm">edm</option>
                <option value="techno">techno</option>
                <option value="funk">funk</option>
                <option value="rnb">rnb</option>
                <option value="soul">soul</option>
                <option value="nuDisco/Disco">nu disco / disco</option>
                <option value="dubstep">dubstep</option>
                <option value="electro">electro</option>
                <option value="drumstep">drumstep</option>
                <option value="downtempo">downtempo</option>
                <option value="reggaeton">reggaeton</option>
                <option value="synthwave">synthwave</option>
                <option value="deepDubstep/Grime">deep dubstep / grime</option>
                <option value="afroHouse">afro house</option>
                <option value="amapiano">amapiano</option>
                <option value="bass/Club">bass / club</option>
                <option value="bassHouse">bass house</option>
                <option value="breaks/Breakbeat/UkBass">breaks / breakbeat / uk bass</option>
                <option value="dance/ElectroPop">dance / electro pop</option>
                <option value="deepHouse">deep house</option>
                <option value="drum&Bass">drum & bass</option>
                <option value="electronica">electronica</option>
                <option value="funkyHouse">funkyHouse</option>
                <option value="hardDance/Hardcore">hard dance / hardcore</option>
                <option value="hardTechno">hard techno</option>
                <option value="indieDance">indieDance</option>
                <option value="jackinHouse">jackin house</option>
                <option value="mainstage">mainstage</option>
                <option value="melodicHouse">melodic house</option>
                <option value="minimal/DeepTech">minimal / deep tech</option>
                <option value="progressiveHouse">progressiveHouse</option>
                <option value="psy-Trance">psy-trance</option>
                <option value="trance">trance</option>
                <option value="ukGarage/Bassline">uk garage / bassline</option>
                <option value="alternativeRock">alternative rock</option>
                <option value="ambient">ambient</option>
                <option value="classical">classical</option>
                <option value="country">country</option>
                <option value="folk">folk</option>
                <option value="rap">rap</option>
                <option value="indie">indie</option>
                <option value="jazz&Blues">jazz & blues</option>
                <option value="latin">latin</option>
                <option value="metal">metal</option>
                <option value="rock">rock</option>
                <option value="triphop">triphop</option>
                <option value="world">world</option>
                  </select>

                <button type="submit">Create Sample</button>

            </form>
            )}
        </div>
    )
}

export default CreateSample