import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from "../context/loading.context";
import { useContext } from 'react';


const SearchBar = ({ user, sample }) => {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const results = [];

    user.forEach((user) => {
      if (user.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ type: 'user', item: user });
      }
    });

    sample.forEach((sample) => {
      if (sample.user.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ type: 'sample', item: sample });
      }
    });

    setSearchResults(results);
  };

  const handleResultClick = (result) => {
    if (result.type === 'user') {
      navigate(`/users/${result.item.id}`);
    } else if (result.type === 'sample') {
      navigate(`/browse-samples/${result.item.id}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name for samples or users"
      />

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.item.id} onClick={() => handleResultClick(result)}>
              {result.type === 'user' ? result.item.name : result.item.user.name}'s{' '}
              {result.type}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchBar;