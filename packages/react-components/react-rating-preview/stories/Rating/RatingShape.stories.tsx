import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';
import { CircleFilled, CircleRegular, SquareFilled, SquareRegular } from '@fluentui/react-icons';

export const Shape = () => {
  return (
    <>
      <Rating iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} />
      <Rating iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} />
      <Rating />
    </>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story:
        'You can pass in custom icons to the Rating component. You can specify the icons with the "iconFilled" and "iconOutline" props.',
    },
  },
};
