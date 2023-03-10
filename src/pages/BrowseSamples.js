// import { useContext, useState, useEffect } from "react";
// import { LoadingContext } from "../context/loading.context";
// import ProfileNavbar from "../components/ProfileNavbar";
// import { get } from "../services/authService";
// import { useParams, Link } from "react-router-dom";
// import Avatar from 'react-avatar'
// import { baseUrl } from "../services/baseUrl";


// const BrowseSamples = () => {
//   const { sample, setSample  } = useContext(LoadingContext);


//   useEffect(() => {
//     get(`/samples/browse-samples`).then((response) => {
//       console.log("response", response.data);
//       setSample(response.data);
//     });
//   }, []);


//   return (
//     <div>
//         <h2>All Samples</h2>
//       {sample.length && (
//         sample.map((sample) => {
//           console.log(sample);

//           return (
//             <>
//             <h3>{sample.sample_name}</h3>
//             <img id="sample_image" src={sample.sample_image} alt="Sample"/>
//             <audio src={sample.sample_file} controls></audio>

            
//             <a href={`${baseUrl}/samples/${sample._id}/download`} download>Download</a>

 
//             </>
//           );
//         }))}
//     </div>
//   );
// };

// export default BrowseSamples;

// import { useContext, useState, useEffect } from "react";
// import { LoadingContext } from "../context/loading.context";
// import ProfileNavbar from "../components/ProfileNavbar";
// import { get } from "../services/authService";
// import { useParams, Link } from "react-router-dom";
// import Avatar from 'react-avatar'
// import { baseUrl } from "../services/baseUrl";
// import fileDownload from "js-file-download";
// import axios from "axios";


// const BrowseSamples = () => {
//   const { sample, setSample  } = useContext(LoadingContext);

//   const handleDownload = (url, sample_file) => {
//     axios
//       .get(url, {
//         responseType: "blob"
//       })
//       .then((res) => {
//         fileDownload(res.data, sample_file);
//       });
//   };

//   useEffect(() => {
//     get(`/samples/browse-samples`).then((response) => {
//       console.log("response", response.data);
//       setSample(response.data);
//     });
//   }, []);


//   return (
//     <div >
//     <h2>All Samples</h2>
//       {sample.length && (
//         sample.map((sample) => {
//           console.log(sample);

//           return (
//             <>
//             <div className="samples">
//             <h3>{sample.sample_name}</h3>
//             <p>{sample.bpm}</p>
//             <p>{sample.key}</p>
//             <p>{sample.instrument}</p>
//             {
//             sample.genres.map((genre)=>{
//               return(
//                 <>
//                     <p>{genre}</p>
//                 </>
//               )
//             })
//            }
//             <img id="sample_image" src={sample.sample_image} alt="Sample"/>
//             <audio src={sample.sample_file} controls></audio>

//             <button onClick={() => handleDownload(`${baseUrl}/samples/${sample._id}/download`, `${sample.sample_name}.mp3`)}>Download</button>
//             </div>
//             </>
//           );
//         }))}
//     </div>
//   );
// };

// export default BrowseSamples;

import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar'
import { baseUrl } from "../services/baseUrl";
import fileDownload from "js-file-download";
import axios from "axios";
import Select from 'react-select';
import { genreOptions, keyOptions, instrumentOptions, typeOptions } from "../services/options";

const BrowseSamples = () => {
  const { sample, setSample } = useContext(LoadingContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [bpmRange, setBpmRange] = useState({min: 0, max: Infinity});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  const handleDownload = (url, sample_file) => {
    axios
      .get(url, {
        responseType: "blob"
      })
      .then((res) => {
        fileDownload(res.data, sample_file);
      });
  };

  useEffect(() => {
    get(`/samples/browse-samples`).then((response) => {
      console.log("response", response.data);
      setSample(response.data);
    });
  }, []);


  const handleGenresChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions.map(option => option.value));
  };

  const handleKeysChange = (selectedOptions) => {
    setSelectedKeys(selectedOptions.map(option => option.value));
  };

  const handleTypesChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions.map(option => option.value));
  };

  const handleInstrumentsChange = (selectedOptions) => {
    setSelectedInstruments(selectedOptions.map(option => option.value));
  };

  const filteredSamples = sample.filter((sample) =>
  sample.sample_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
  sample.bpm >= bpmRange.min &&
  sample.bpm <= bpmRange.max &&
  selectedGenres.every(genre => sample.genres.includes(genre)) &&
  selectedKeys.every(key => sample.key.includes(key)) &&
  selectedTypes.every(type => sample.type.includes(type)) &&
  selectedInstruments.every(instrument => sample.instrument.includes(instrument)) 
);

  return (
    <div>
      <h2>All Samples</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
            <div>
        <label>BPM Range:</label>
        <input
          type="number"
          placeholder="Min"
          value={bpmRange.min}
          onChange={(event) => setBpmRange({ ...bpmRange, min: event.target.value })}
        />
        <input
          type="number"
          placeholder="Max"
          value={bpmRange.max}
          onChange={(event) => setBpmRange({ ...bpmRange, max: event.target.value })}
        />
      </div>

      <Select
          name="genres"
          options={genreOptions}
          id="genres"
          isMulti
          value={selectedGenres.map(genre => ({ value: genre, label: genre }))}
          onChange={handleGenresChange}
        />

      <Select
        name="key"
        options={keyOptions}
        id="key"
        isMulti
        value={selectedKeys.map(key => ({ value: key, label: key }))}
        onChange={handleKeysChange}
      />      

      <Select
          name="type"
          options={typeOptions}
          id="type"
          isMulti
          value={selectedTypes.map(type => ({ value: type, label: type }))}
          onChange={handleTypesChange}
        />

        <Select
          name="instrument"
          options={instrumentOptions}
          id="instrument"
          isMulti
          value={selectedInstruments.map(instrument => ({ value: instrument, label: instrument }))}
          onChange={handleInstrumentsChange}
        />
        
      {filteredSamples.length > 0 ? (
        filteredSamples.map((sample) => {
          console.log(sample);

          return (
            <>
              <div className="samples">
                <h3>{sample.sample_name}</h3>
                <p>{sample.bpm}</p>
                <p>{sample.key}</p>
                <p>{sample.instrument}</p>
                <p>{sample.type}</p>
                {sample.genres.map((genre) => {
                  return <p>{genre}</p>;
                })}
                <img id="sample_image" src={sample.sample_image} alt="Sample" />
                <audio src={sample.sample_file} controls></audio>

                <button
                  onClick={() =>
                    handleDownload(
                      `${baseUrl}/samples/${sample._id}/download`,
                      `${sample.sample_name}.mp3`)}>Download</button>
              </div>
            </>
          );
        })
      ) : (
        <p>No samples found.</p>
      )}
    </div>
  );
};

export default BrowseSamples;