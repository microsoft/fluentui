import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';

export const Size = () => {
  return (
    <div>
      <Rating size="small" />
      <Rating size="medium" />
      <Rating size="large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A Rating can be small, medium, or large. You can specify the size with the "size" prop.',
    },
  },
};
