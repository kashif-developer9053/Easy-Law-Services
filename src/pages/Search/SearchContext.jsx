// SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Implement your search logic here
    // For now, let's assume you have a function to fetch search results
    // Replace this with your actual search logic
    const results = fetchSearchResults(term);
    setSearchResults(results);
  };

  const fetchSearchResults = (term) => {
    // Implement your actual search logic here
    // For now, return some dummy data
    return [
      { id: 1, name: 'Lawyer 1', category: 'Family Lawyer' },
      { id: 2, name: 'Lawyer 2', category: 'Criminal Lawyer' },
      // Add more results as needed
    ];
  };

  const handleSearchClick = () => {
    handleSearch(searchTerm);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, searchResults, handleSearch, handleSearchClick }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
