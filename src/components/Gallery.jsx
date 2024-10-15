import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div className='gallery'>
      {images.map((cat, index) => (
        <div key={index} className='gallery-item'>
          <img src={cat.url} alt={`Cat ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
