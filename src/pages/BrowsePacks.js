import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import ProfileNavbar from "../components/ProfileNavbar";
import { get } from "../services/authService";
import { useParams, Link } from "react-router-dom";
import Avatar from 'react-avatar'
import { genreOptions, keyOptions, instrumentOptions, typeOptions } from "../services/options";
import Select from 'react-select';
import axios from "axios";
import { baseUrl } from "../services/baseUrl";




const BrowsePacks = () => {
    const { pack, setPack  } = useContext(LoadingContext);
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");



useEffect(() => {
    get(`/packs/browse-packs`).then((response) => {
      console.log(response.data);
      setPack(response.data);
    });
  }, []);

  const handleGenresChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions.map(option => option.value));
  };

  const handleInstrumentsChange = (selectedOptions) => {
    setSelectedInstruments(selectedOptions.map(option => option.value));
  };

  const filteredPacks = pack.filter((pack) =>
  pack.pack_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
  selectedGenres.every(genre => pack.genres.includes(genre)) &&
  selectedInstruments.every(instrument => pack.instrument.includes(instrument)) 
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

<div className="relative mr-2 mb-2">
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
    name="instruments"
    options={instrumentOptions}
    id="instruments"
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
      {filteredPacks.length > 0 ? (
        filteredPacks.map((pack) => {
          console.log(pack);

          return (
            <>
              <div className="flex items-center bg-gray-100 mb-4 p-4 rounded-md">
                <img src={pack.pack_image} alt="Pack" className="w-1/6 h-20 w-20 mr-4" />
                <div className="w-4/5">
                  <h3 className="text-2xl font-medium">{pack.pack_name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p>Genres: </p>
                    <div className="flex flex-wrap">
                      {pack.genres.map((genre, index) => (
                        <span key={index} className="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm">{genre}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p>Instruments: </p>
                    <div className="flex flex-wrap">
                      {pack.instruments.map((instrument, index) => (
                        <span key={index} className="mr-2 mb-1 bg-gray-200 rounded-md py-1 px-2 text-sm">{instrument}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link to={`/pack-details/${pack._id}`} className="mr-2 bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700">
                      Open pack
                    </Link>
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

export default BrowsePacks;
