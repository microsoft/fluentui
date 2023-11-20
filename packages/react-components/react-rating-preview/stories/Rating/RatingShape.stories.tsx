import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';
import { CircleFilled, CircleRegular, SquareFilled, SquareRegular } from '@fluentui/react-icons';

export const Shape = () => {
  return (
    <>
      <Rating iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} precision />
      <Rating iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} precision />
      <Rating />
    </>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story:
        'You can use different shapes to represent the Rating. By default it is star but it can also be circle or square',
    },
  },
};
