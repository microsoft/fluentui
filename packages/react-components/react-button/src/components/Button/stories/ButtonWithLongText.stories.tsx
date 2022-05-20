import * as React from 'react';
import { Button } from '../../../Button';

export const WithLongText = () => (
  <>
    <Button>Short text</Button>
    <Button>Long text truncates after it hits the max width of the component</Button>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width of the component.',
    },
  },
};
