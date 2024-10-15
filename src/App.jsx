import { useState, useEffect } from 'react';
import './App.css';
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';

function App() {
  const [currentCat, setCurrentCat] = useState(null); // Current cat data
  const [prevCats, setPrevCats] = useState([]); // History of viewed cats
  const [banList, setBanList] = useState([]); // List of banned breeds

  const [inputs, setInputs] = useState({
    breed: '',
    category: '',
  });

  const API_KEY = 'live_gjVY7mqkh6kBC2pzSZBp29Voz6WPkgVaoFgNQVMKOvPWTHk55nejQRWRWK2MCiPm'; // Replace with your actual Cat API key

  // Function to fetch a random cat
  const fetchRandomCat = async () => {
    let query = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;

    try {
      const response = await fetch(query);
      const data = await response.json();
      const catData = data[0];

      // Check if the breed information is available and the breed is not in the ban list
      const breedData = catData?.breeds?.[0]; // Safely access the first breed if available
      const breedName = breedData?.name || 'Unknown Breed';

      if (!banList.includes(breedName)) {
        setCurrentCat(catData);
        setPrevCats((cats) => [...cats, catData]); // Add the cat to the history
      } else {
        // If breed is banned, fetch another cat
        fetchRandomCat();
      }
    } catch (error) {
      console.error('Error fetching cat:', error);
    }
  };

  // Function to add breed to ban list
  const banBreed = (breed) => {
    if (breed && !banList.includes(breed)) {
      setBanList((prevList) => [...prevList, breed]);
    }
  };

  useEffect(() => {
    fetchRandomCat(); // Fetch a cat on initial load
  }, []);

  const reset = () => {
    setInputs({
      breed: '',
      category: '',
    });
  };

  const submitForm = () => {
    
    fetchRandomCat();
    reset();
  };

  return (
    <>
      <div className='whole-page'>
        <h1>Discover New Cats! 🐱</h1>
        <APIForm
          inputs={inputs}
          handleChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value.trim(),
            }))
          }
          onSubmit={submitForm}
        />

        <br />
        {currentCat ? (
          <div className='cat-display'>
            <img
              className='cat-image'
              src={currentCat.url}
              alt='Random Cat'
            />
            {currentCat.breeds.length > 0 ? (
              <div>
                <p>
                  <strong>Breed:</strong>{' '}
                  <span
                    className='clickable'
                    onClick={() => banBreed(currentCat.breeds[0]?.name)}
                  >
                    {currentCat.breeds[0]?.name}
                  </span>
                </p>
                <p>
                  <strong>Origin:</strong>{' '}
                  {currentCat.breeds[0]?.origin || 'Unknown'}
                </p>
                <p>
                  <strong>Temperament:</strong>{' '}
                  {currentCat.breeds[0]?.temperament || 'Unknown'}
                </p>
              </div>
            ) : (
              <p>No breed information available.</p>
            )}
            <button onClick={fetchRandomCat}>Discover Another Cat!</button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <br />

        <div className='container'>
          <h2>Ban List</h2>
          <ul>
            {banList.map((breed, index) => (
              <li key={index}>{breed}</li>
            ))}
          </ul>
        </div>

        <div className='container'>
          <h2>Previously Viewed Cats</h2>
          <Gallery images={prevCats} />
        </div>

        <br />
      </div>
    </>
  );
}

export default App;
