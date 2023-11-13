import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';

export const ReadOnly = () => {
  return <Rating readOnly defaultValue={3} valueLabel={3} countLabel={'1,160'} />;
};

ReadOnly.parameters = {
  docs: {
    description: {
      story: 'A readonly Rating can be used for display purposes, and is not functional.',
    },
  },
};
