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
      <div className="flex flex-wrap items-center justify-center my-4">

  <div className="relative mr-2 mb-2">
    <input
      type="text"
      placeholder="Search by name"
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      className="bg-gray-100 rounded-full py-2 px-4 block w-80 leading-5 focus:outline-none focus:bg-white focus:shadow-outline-purple focus:border-purple-300 transition-colors duration-200 ease-in-out"
    />
  </div>
  <div className="flex items-center space-x-2 mr-2">
  <label className="text-gray-500">BPM Range</label>
  <input
    type="number"
    placeholder="Min"
    className="w-16 py-1 px-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    value={bpmRange.min}
    onChange={(event) => setBpmRange({ ...bpmRange, min: event.target.value })}
  />
  <span className="text-gray-500">-</span>
  <input
    type="number"
    placeholder="Max"
    className="w-16 py-1 px-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    value={bpmRange.max}
    onChange={(event) => setBpmRange({ ...bpmRange, max: event.target.value })}
  />
</div>

  <div className="flex items-center relative mr-2 mb-2">
  <label className="text-gray-500 mr-2">Genres</label>
    <Select
      name="genres"
      options={genreOptions}
      id="genres"
      isMulti
      value={selectedGenres.map(genre => ({ value: genre, label: genre }))}
      onChange={handleGenresChange}
      className="w-50"
      classNamePrefix="select"
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#8B5CF6",
        },
      })}
    />
  </div>

  {/* <div className="relative mr-2 mb-2">
    <Select
      name="key"
      options={keyOptions}
      id="key"
      isMulti
      value={selectedKeys.map(key => ({ value: key, label: key }))}
      onChange={handleKeysChange}
      className="w-50"
      classNamePrefix="select"
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#8B5CF6",
        },
      })}
    />
  </div>     */}

  {/* <div className="relative mr-2 mb-2">
    <Select
      name="type"
      options={typeOptions}
      id="type"
      isMulti
      value={selectedTypes.map(type => ({ value: type, label: type }))}
      onChange={handleTypesChange}
      className="w-50"
      classNamePrefix="select"
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#8B5CF6",
        },
      })}
    />
  </div> */}

  {/* <div className="relative mr-2 mb-2">
    <Select
      name="instrument"
      options={instrumentOptions}
      id="instrument"
      isMulti
      value={selectedInstruments.map(instrument => ({ value: instrument, label: instrument }))}
      onChange={handleInstrumentsChange}
      className="w-50"
      classNamePrefix="select"
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#8B5CF6",
        },
      })}
    />
  </div> */}


        </div>
        
      {filteredSamples.length > 0 ? (
        filteredSamples.map((sample) => {
          console.log(sample);

          return (
            <>
            <div className="flex items-center bg-gray-100 mb-4 p-4 rounded-md h-25">
      <img src={sample.sample_image} alt="Sample" className="w-1/6 h-20 w-20 mr-4" />
      <div className="w-4/5">
        <h3 className="text-2xl font-medium">{sample.sample_name}</h3>
        <div className="flex justify-between items-center mt-2">
          <p>BPM: {sample.bpm}</p>
          <p>Key: {sample.key}</p>
          <p>Instrument: {sample.instrument}</p>
          <p>Type: {sample.type}</p>
          <div className="flex flex-wrap">
            {sample.genres.map((genre, index) => (
              <span key={index} className="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm">{genre}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-2">
        <audio src={sample.sample_file} controls style={{ width: '80%' }}></audio>
          <button className="mr-2 bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700" onClick={() => handleDownload(`${baseUrl}/samples/${sample._id}/download`, `${sample.sample_name}.mp3`)}>
            Download
          </button>
        </div>
      </div>
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