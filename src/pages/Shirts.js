import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShirtCard from '../components/ShirtCard';
import axios from 'axios';
import { apiURL } from '../constants/constants';

function Shirts () {

  useEffect(() => {
    if(!shirts)
      fetchShirts();
  });

  const fetchShirts = () => {
    axios.get(`${apiURL}shirts`)
      .then(function (response) {
        setShirts(response.data);
    });
  };

  const renderShirts = () => {
    return (
      <div className="d-flex flex-row flex-wrap justify-content-start">
        {
          shirts && shirts.map((shirt) => (
            <ShirtCard
              key={shirt.id}
              shirt={shirt}
            />
          ))
        }
      </div>
    )
  };

	const [shirts, setShirts] = useState(null);

  return (
  	<div className="shirts-page">
	  <Header />
	  <div className="shirts mt-4 ml-2">
      { renderShirts() }
	  </div>
	</div>
  );
}

export default Shirts;