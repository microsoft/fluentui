import * as React from 'react';
import { Rating, RatingProps } from '@fluentui/react-rating-preview';

export const Default = (props: Partial<RatingProps>) => {
  return <Rating {...props} />;
};
