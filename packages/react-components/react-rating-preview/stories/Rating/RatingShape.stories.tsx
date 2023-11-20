import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';

export const Shape = () => {
  return (
    <>
      <Rating shape="circle" />
      <Rating shape="square" />
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
