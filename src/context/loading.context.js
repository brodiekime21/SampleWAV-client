import { useState, createContext } from "react";
// import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const [samples, setSamples] = useState(null)

    // const [ countries, setCountries ] = useState(null);
    // const [ country, setCountry ] = useState(null);

    // const [ posts, setPosts ] = useState([])
    // const [ post, setPost ] = useState(null)

    const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }

//     const getSamples = () => {

//       if (!samples) {
//         console.log("Calling database")
//         axios.get('')  // find out what goes inside the quotes to call database
//         .then((response) => {
//           setSamples(response.data)
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//       }
//     }

//     const noSamples = (code) => {
//       axios.get('https://ih-countries-api.herokuapp.com/countries')
//       .then((response) => {
//         let foundSamples = response.data
//         setSamples(foundSamples)
//         let thisSample = foundSamples.find((sample) => sample.alpha2Code === code)
//         setSample(thisSample)
        
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//     }

//     const findSample = (code) => {

//       if (!samples) {
//         noSamples(code)
//       } else {
//         let thisSample = samples.find((sample) => sample.alpha2Code === code)
//         setSample(thisSample)
//       }
//   }

//   const getPosts = () => {
//     get('/posts')
//     .then((results) => {
//       setPosts(results.data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }

//   const getPost = (id) => {
//     get(`/posts/post-detail/${id}`)
//       .then((results) => {
//         setPost(results.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

    // return (
    //     <LoadingContext.Provider value={{ countries, country, posts, post, isLoading, message, setUser, user, setPost, setPosts, setCountries, setCountry, setIsLoading, setMessage, setTimedMessage, getCountries, findCountry, getPosts, getPost }}>
    //       {children}
    //     </LoadingContext.Provider>
    //   );



      return (
        <LoadingContext.Provider value={{ setUser, user, setIsLoading, setMessage, setTimedMessage }}>
          {children}
        </LoadingContext.Provider>
      );


}

export { LoadingContext, LoadingProvider }