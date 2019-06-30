import React from 'react';
import { Card, Button, Rate, Tag } from 'antd';

const Restaurant = ({
  restaurant = { name: '', types: [], geometry: { location: {} } }
}) => {
  return (
    <Card>
      {restaurant.name !== '' && <h2>{restaurant.name}</h2>}
      <div>{restaurant.vicinity}</div>
      <Rate value={restaurant.rating} disabled />
      <div style={{ marginTop: '12px' }}>
        {restaurant.types.length !== 0 &&
          restaurant.types.map((type, index) => {
            const typeCap = type.charAt(0).toUpperCase() + type.slice(1);
            const removeUnder = typeCap.replace(/_/g, ' ');
            return <Tag key={type + '-' + index}>{removeUnder}</Tag>;
          })}
      </div>
      <br />
      {restaurant.geometry.location && (
        <Button
          type="primary"
          block
          href={`https://maps.google.com/maps?daddr=${
            restaurant.geometry.location.lat
          },${restaurant.geometry.location.lng}&amp;ll=`}
        >
          ไปร้านนี้
        </Button>
      )}
    </Card>
  );
};

export default Restaurant;
