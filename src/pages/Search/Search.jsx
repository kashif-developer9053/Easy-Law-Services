// Search.jsx
import React from 'react';
import Lawyers from '../../components/lawyers/lawers';
import { useSearchContext } from '../Search/SearchContext'; // Adjust the path

const SearchComponent = () => {
  const { searchTerm, showResults } = useSearchContext();

  return (
    <div>
      {showResults && (
        <>
          {/* You can add any additional UI elements here */}
          <h2>Search Results</h2>
          <p>Search term: {searchTerm}</p>
          <Lawyers />
        </>
      )}
    </div>
  );
};

export default SearchComponent;
