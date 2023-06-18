import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../services/authService";
import { LoadingContext } from "../context/loading.context";
import { useContext } from "react";
import Select from "react-select";
import { genreOptions, instrumentOptions } from "../services/options";

const CreatePack = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(LoadingContext);
  const { sample } = useContext(LoadingContext);
  const { pack, setPack } = useContext(LoadingContext);

  const [samples, setSamples] = useState("");
  const [packName, setPackName] = useState("");
  const [instruments, setInstruments] = useState("");
  const [genres, setGenres] = useState([]);
  const [packImage, setPackImage] = useState("");
  const [oldPackImage, setOldPackImage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // new state variable

  const navigate = useNavigate();

  useEffect(() => {
    if (pack) {
      setSamples(pack.samples);
      setPackName(pack.pack_name);
      setInstruments(pack.instruments);
      setGenres(pack.genres);
      setOldPackImage(pack.pack_image);
    }
  }, [pack]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("THIS IS samples", samples);
    console.log("THIS IS packName", packName);
    console.log("THIS IS instruments", instruments);
    console.log("THIS IS genres", genres);
    console.log("THIS IS packImage", packImage);
    console.log("THIS IS oldPackImage", oldPackImage);

    try {
      const res = await post(`/packs/create-pack`, {
        samples: samples || [],
        pack_name: packName,
        instruments: instruments || [],
        genres: genres || [],
        pack_image: packImage || oldPackImage,
      });
      console.log("NEW PACK", res.data);
      setPack(res.data);
      navigate(`/profile/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSampleChange = (e) => {
    setSamples(e.map((curr) => curr.value));
  };

  const handleInstrumentChange = (e) => {
    setInstruments(e.map((curr) => curr.value));
  };

  const handleGenresChange = (e) => {
    setGenres(e.map((curr) => curr.value));
  };

  const handlePackImageUpload = (e) => {
    setIsUploading(true); // set isUploading to true

    console.log("Uploading pack image...");

    const uploadData = new FormData();
    uploadData.append("packImage", e.target.files[0]);

    if (e.target.files.length) {
      console.log("Upload data", uploadData);
      post("/packs/new-pack-image", uploadData)
        .then((result) => {
          setPackImage(result.data.packImage);
          console.log("This is pack image", result.data);
        })
        .catch((err) => {
          console.log("Upload error", err);
        })
        .finally(() => {
          setIsUploading(false); // set isUploading to false after the upload is complete
        });
    }
  };

  const sampleOptions = (samples) => {
    return samples.map((sample) => {
      return { label: sample.sample_name, value: sample._id };
    });
  };

  return (
    <div class="bg-white p-4 mb-4 rounded-md shadow-md">
      <h1 class="text-3xl font-bold mb-4">Create Your Pack</h1>
      {user && (
        <>
          {user.samples.length ? (
            <form onSubmit={handleSubmit} class="flex flex-col gap-4">
              <label htmlFor="samples" class="flex flex-col gap-1">
                <span>Choose the samples from your library:</span>
                <Select
                  name="samples"
                  id="samples"
                  options={sampleOptions(user.samples)}
                  isMulti
                  onChange={(e) => handleSampleChange(e)}
                  class="border border-gray-300 rounded-md p-1"
                />
              </label>

              <label htmlFor="pack_image" class="flex flex-col gap-1">
                <span>Pack Image:</span>
                <input
                  type="file"
                  name="pack_image"
                  onChange={(e) => handlePackImageUpload(e)}
                  class="border border-gray-300 rounded-md p-1"
                />
              </label>

              <label htmlFor="pack_name" class="flex flex-col gap-1">
                <span>Pack Name:</span>
                <input
                  type="text"
                  name="pack_name"
                  onChange={(e) => setPackName(e.target.value)}
                  class="border border-gray-300 rounded-md p-1"
                />
              </label>

              <label htmlFor="instruments" class="flex flex-col gap-1">
                <span>Choose the instruments:</span>
                <Select
                  name="instruments"
                  id="instruments"
                  options={instrumentOptions}
                  isMulti
                  onChange={(e) => handleInstrumentChange(e)}
                  class="border border-gray-300 rounded-md p-1"
                />
              </label>

              <label htmlFor="genres" class="flex flex-col gap-1">
                <span>Choose the genres:</span>
                <Select
                  name="genres"
                  options={genreOptions}
                  id="genres"
                  isMulti
                  onChange={(e) => handleGenresChange(e)}
                  class="border border-gray-300 rounded-md p-1"
                />
              </label>

              {isUploading ? (
                <p>Uploading photo...</p>
              ) : (
                <button
                  type="submit"
                  class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Pack
                </button>
              )}
            </form>
          ) : (
            <p>Create samples first before you create your pack</p>
          )}
        </>
      )}
    </div>
  );
};

export default CreatePack;
