import * as React from 'react';
import { Rating, type RatingProps } from '@fluentui/react-modern-components-preview/rating';

export const Default = (props: Partial<RatingProps>): React.ReactNode => {
  return <Rating {...props} />;
};
