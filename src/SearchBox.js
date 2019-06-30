import React from 'react';
import { Card, Slider, Button } from 'antd';

const SearchBox = ({
  value,
  step,
  min,
  max,
  handleValue,
  handleRandomPick,
  isFetch,
  pickIndex
}) => {
  return (
    <Card>
      <div>
        ระยะการค้นหา <span style={{ float: 'right' }}>{value} เมตร</span>
      </div>
      <Slider
        value={value}
        tipFormatter={null}
        step={step}
        min={min}
        max={max}
        onChange={handleValue}
      />
      <Button
        type="primary"
        block
        onClick={handleRandomPick}
        disabled={isFetch}
      >
        {!pickIndex ? 'หามาร้านนึงซิ๊' : 'เอาร้านอื่น'}
      </Button>
    </Card>
  );
};

export default SearchBox;
