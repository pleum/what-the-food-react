import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

import SearchBox from './SearchBox';
import Restaurant from './Restaurant';

import { Row, Col } from 'antd';

const mockRestaurant = {
  geometry: {
    location: { lat: 13.9109864, lng: 100.5916223 },
    viewport: {
      northeast: { lat: 13.9124235302915, lng: 100.5930463302915 },
      southwest: { lat: 13.9097255697085, lng: 100.5903483697085 }
    }
  },
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png',
  id: '45d7d5430a062d580c9a19592ced55ff014faced',
  name: 'Montri Resort Donmuang Bangkok',
  photos: [
    {
      height: 460,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/115045917781145333862/photos">Montri Resort Donmuang Bangkok</a>'
      ],
      photo_reference:
        'CmRaAAAAUiMRJNMKBMPx4F6rtT2c_y5O-8nj28vnfwqjIM6YMNCePNgtPeY20guOZjFJUP3MEmYP_D420bKfn_6a9rFXkGHP87x6tNu4oDWPTAZIZqfU300-7azVzUreO7Inp-oEEhB3gY8Eq9yJVs1cePrPS1AmGhSp58Y-KsrUbJ75kHA424AAOvZAWw',
      width: 819
    }
  ],
  place_id: 'ChIJf9u0IPSC4jARSvt42PQVNw8',
  plus_code: {
    compound_code: 'WH6R+9J Bangkok, Thailand',
    global_code: '7P52WH6R+9J'
  },
  rating: 3.9,
  reference: 'ChIJf9u0IPSC4jARSvt42PQVNw8',
  types: [
    'restaurant',
    'food',
    'lodging',
    'point_of_interest',
    'establishment'
  ],
  user_ratings_total: 227,
  vicinity: '11 Chang Akat Uthit 3 Alley, Lane 4, Don Mueang'
};

const App = ({ coords, isGeolocationEnabled, isGeolocationAvailable }) => {
  const [isFetch, setFetch] = useState(true);
  const [searchRadius, setSearchRadius] = useState(1500);
  const [restaurants, setRestaurants] = useState([]);
  const [pickIndex, setPickIndex] = useState(null);

  // Fetch
  useEffect(() => {
    if (coords !== null) {
      setFetch(true);
      setPickIndex(null);
      axios
        .post(
          'https://us-central1-pleum-ea670.cloudfunctions.net/searchPlace',
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
            radius: searchRadius
          }
        )
        .then(response => {
          setRestaurants(response.data.results);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setFetch(false);
        });
    }
  }, [searchRadius, coords]);

  const handleSearchRadiusChange = radius => {
    setSearchRadius(radius);
  };

  const handleRandomPick = () => {
    if (restaurants.length !== 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length) + 1;
      setPickIndex(randomIndex);
    } else {
      setPickIndex(null);
    }
  };

  return (
    <Row type="flex" justify="center">
      <Col xs={22} md={18} lg={14} xl={8}>
        <h1 style={{ textAlign: 'center', marginTop: '12px' }}>แดรกไรดี</h1>

        <SearchBox
          value={searchRadius}
          step={100}
          min={300}
          max={2000}
          isFetch={isFetch}
          pickIndex={pickIndex}
          handleValue={handleSearchRadiusChange}
          handleRandomPick={handleRandomPick}
        />
        <br />

        {!isFetch && pickIndex && (
          <Restaurant restaurant={restaurants[pickIndex]} />
        )}
      </Col>
    </Row>
  );
};

export default geolocated()(App);
