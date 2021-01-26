import React, { useState } from 'react';
import { default_woman_shirt } from '../constants/constants';

const ShirtCard = ({ shirt }) => {
  console.log(shirt.image);
  const src = shirt.image ? shirt.image : default_woman_shirt
  return (
    <div className="card mr-5 mb-5 card bg-dark text-light">
      <div className="d-flex justify-content-center mt-2 mr-2 ml-2">
        <img
          src={src}
          width="280"
          height="280"
          alt="User"
        />  
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="card-title text-center">
          <strong>
            {shirt.title}
          </strong>
        </div>
        <div className="d-flex flex-column align-items-left">
          <div className="d-flex">
            {shirt.description}
          </div>
          <div className="d-flex">
            <strong className="mr-1">Price:</strong>
            {shirt.price} $
          </div>
        </div>
        <div className="d-flex mt-2">
          <button
            type="button"
            className="btn btn-primary flex-fill mr-3"
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtCard;