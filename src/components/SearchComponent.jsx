// SearchComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const SearchComponent = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
  if (searchTerm.trim() !== '') {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  } else {
    setSearchResults([]);
  }
}, [searchTerm, posts]);


  return (
    <div className="search-container">
      <input
       className="search-input"
        type="text"
        placeholder="Search for posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="search-results">
        {searchResults.map((result) => (
          <li key={result.id}>
            <Link to={`/post/${result.id}`}>{result.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
