import * as React from 'react';
import { Rating, RatingProps } from '@fluentui/react-components';

export const Default = (props: Partial<RatingProps>) => {
  return <Rating {...props} />;
};
