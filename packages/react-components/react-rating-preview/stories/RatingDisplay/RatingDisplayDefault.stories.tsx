import * as React from 'react';
import { RatingDisplay, RatingDisplayProps } from '@fluentui/react-rating-preview';

export const Default = (props: Partial<RatingDisplayProps>) => (
  <RatingDisplay {...props} value={3} ratingDisplayCountLabel={'1,160'} />
);
