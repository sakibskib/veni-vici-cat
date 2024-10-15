import React from 'react';

const APIForm = ({ inputs, handleChange, onSubmit }) => {
  return (
    <>
      <h2>Select Your Preferences</h2>
      <form className='form-container' onSubmit={(e) => e.preventDefault()}>
        {/* In this example, the form is not functional but is included for structure */}
        <li className='form'>
          <h2>Breed</h2>
          <input
            type='text'
            name='breed'
            value={inputs.breed}
            placeholder='Enter breed (optional)...'
            onChange={handleChange}
            className='textbox'
          />
          <br />
          <br />
          <p>Enter a cat breed you're interested in.</p>
        </li>
        <button type='submit' className='button' onClick={onSubmit}>
          Discover Cat! 🐾
        </button>
      </form>
    </>
  );
};

export default APIForm;
