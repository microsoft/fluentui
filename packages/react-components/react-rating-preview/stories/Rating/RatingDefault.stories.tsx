import * as React from 'react';
import { Rating, RatingProps } from '@fluentui/react-rating-preview';

export const Default = (props: Partial<RatingProps>) => (
  <Rating {...props} precision defaultValue={2.5} valueLabel={3.5} countLabel={1000} />
);
