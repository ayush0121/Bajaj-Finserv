import React, { useState } from 'react';
import './App.css'; // Importing the CSS file

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [responseData, setResponseData] = useState({});

  const hardCodedData = {
    "is_success": true,
    "user_id": "john_doe_17091999",
    "email": "john@xyz.com",
    "roll_number": "ABCD123",
    "numbers": ["1", "334", "4"],
    "alphabets": ["M", "B", "Z", "a"],
    "highest_lowercase_alphabet": ["a"]
  };

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = () => {
    try {
      JSON.parse(jsonInput); // Validate if it's a JSON
      setError('');
      setResponseData(hardCodedData); // Use the hardcoded JSON array
      setOptions(['Alphabets', 'Numbers', 'Highest lowercase alphabet']);
    } catch (e) {
      setError('Invalid JSON');
      setResponseData({});
      setOptions([]);
    }
  };

  const handleOptionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    processResponse(selectedOptions);
  };

  const processResponse = (selectedOptions) => {
    let processedData = [];

    if (selectedOptions.includes('Alphabets')) {
      processedData = [...processedData, ...responseData.alphabets];
    }

    if (selectedOptions.includes('Numbers')) {
      processedData = [...processedData, ...responseData.numbers];
    }

    if (selectedOptions.includes('Highest lowercase alphabet')) {
      processedData = [...processedData, ...responseData.highest_lowercase_alphabet];
    }

    setResponseData({ ...responseData, processed: processedData });
  };

  return (
    <div className="App">
      <p>API Input</p>
      <input
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter here..."
        
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}

      {options.length > 0 && (
        <>
          <label htmlFor="options">Select Options:</label>
          <select id="options" className="custom-multi-select" multiple onChange={handleOptionChange}>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </>
      )}

      {responseData.processed && responseData.processed.length > 0 && (
        <div>
          <h2>Processed Data:</h2>
          <ul>
            {responseData.processed.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;