import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';

export const ReadOnly = () => {
  return <Rating readOnly defaultValue={3} ratingLabel={3} ratingCountLabel={'1,160'} />;
};

ReadOnly.parameters = {
  docs: {
    description: {
      story: 'A readonly Rating can be used for display purposes, and is not functional.',
    },
  },
};
